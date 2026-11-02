"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { getCountryByCode, getFlagUrl } from "@/lib/countries";
import {
  deleteBooking,
  getBookedDatesByCabinId,
  getBooking,
  getCabin,
  getSettings,
} from "@/lib/data-service";
import stripe from "@/lib/stripe";
import supabase from "@/lib/supabase";
import type { ActionResult, Booking } from "@/lib/types";
import { DAY_MS, getSafePath, roundToUTCDay } from "@/lib/utils";
import { isPast, isValid } from "date-fns";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

/* ---------- helpers ---------- */

async function requireGuestId() {
  const session = await auth();
  const guestId = Number(session?.user?.guestId);

  if (!guestId) throw new Error("You must be logged in");

  return guestId;
}

async function getOwnBooking(bookingId: number, errorMessage?: string) {
  const guestId = await requireGuestId();
  const booking = await getBooking(String(bookingId));

  if (!booking || Number(booking.guestId) !== guestId)
    throw new Error(
      errorMessage || "You are not allowed to change this reservation",
    );

  return booking;
}

function isValidGuestCount(numGuests: number, maxCapacity: number) {
  return (
    Number.isInteger(numGuests) && numGuests >= 1 && numGuests <= maxCapacity
  );
}

/* ---------- Guest ---------- */

export async function updateGuest(formData: FormData): Promise<ActionResult> {
  const guestId = await requireGuestId();

  const nationalID = formData.get("nationalID")?.toString().trim() ?? "";

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    return { error: "National ID must be 6 to 12 letters or numbers." };

  const country = getCountryByCode(
    formData.get("nationality")?.toString() ?? "",
  );

  const updateData = {
    nationalID,
    nationality: country?.name ?? "",
    countryFlag: country ? getFlagUrl(country.code) : "",
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");

  return { error: "" };
}

/* ---------- Reservations ---------- */

type BookingData = {
  startDate: Date;
  endDate: Date;
  cabinId: number;
};

export async function createReservation(
  bookingData: BookingData,
  formData: FormData,
): Promise<ActionResult> {
  const guestId = await requireGuestId();

  const cabin = await getCabin(String(bookingData.cabinId));
  if (!cabin) throw new Error("Cabin not found");

  const startDate = roundToUTCDay(bookingData.startDate);
  const endDate = roundToUTCDay(bookingData.endDate);

  if (!isValid(startDate) || !isValid(endDate))
    return { error: "Please select valid dates." };

  if (startDate.getTime() < Date.now() - DAY_MS)
    return { error: "Check-in cannot be in the past." };

  const numNights = Math.round(
    (endDate.getTime() - startDate.getTime()) / DAY_MS,
  );

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const minNights = Math.max(1, settings.minBookingLength);
  if (numNights < minNights || numNights > settings.maxBookingLength)
    return {
      error: `Stays must be between ${minNights} and ${settings.maxBookingLength} nights.`,
    };

  const taken = new Set(bookedDates.map((day) => day.getTime()));

  const isTaken = Array.from(
    { length: numNights + 1 },
    (_, i) => startDate.getTime() + i * DAY_MS,
  ).some((time) => taken.has(time));

  if (isTaken)
    return {
      error: "Some of these dates were just booked. Please pick other dates.",
    };

  const numGuests = Number(formData.get("numGuests"));
  if (!isValidGuestCount(numGuests, cabin.maxCapacity))
    return { error: `This cabin hosts up to ${cabin.maxCapacity} guests.` };

  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

  const hasBreakfast = formData.get("hasBreakfast")?.toString() === "true";
  const extrasPrice = hasBreakfast
    ? numNights * numGuests * settings?.breakfastPrice
    : 0;

  const newBooking: Booking = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    numNights,
    cabinPrice,
    cabinId: cabin.id,
    guestId,
    numGuests,
    observations: formData.get("observations")?.toString().slice(0, 500) ?? "",
    hasBreakfast,
    extrasPrice,
    totalPrice: cabinPrice + extrasPrice,
    isPaid: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${cabin.id}`);

  return { error: "" };
}

export async function updateReservation(
  formData: FormData,
): Promise<ActionResult> {
  const bookingId = Number(formData.get("bookingId"));
  const booking = await getOwnBooking(
    bookingId,
    "You are not allowed to update this booking",
  );

  if (isPast(new Date(booking.startDate)))
    return {
      error: "This reservation has already started and can't be edited.",
    };

  const cabin = await getCabin(String(booking.cabinId));
  if (!cabin) throw new Error("Cabin not found");

  const numGuests = Number(formData.get("numGuests"));
  if (!isValidGuestCount(numGuests, cabin.maxCapacity))
    return { error: `This cabin hosts up to ${cabin.maxCapacity} guests.` };

  let extrasPrice = booking.extrasPrice;

  if (numGuests !== booking.numGuests && booking.hasBreakfast) {
    if (booking.isPaid)
      return {
        error:
          "This reservation is already paid. Please contact us to change the number of guests.",
      };

    const settings = await getSettings();
    extrasPrice = booking.numNights * numGuests * settings.breakfastPrice;
  }

  const updateData = {
    numGuests,
    observations: formData.get("observations")?.toString().slice(0, 500) ?? "",
    extrasPrice,
    totalPrice: booking.cabinPrice + extrasPrice,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  return { error: "" };
}

export async function deleteReservation(
  bookingId: number,
): Promise<ActionResult> {
  const booking = await getOwnBooking(
    bookingId,
    "You are not allowed to delete this booking",
  );

  if (isPast(new Date(booking.startDate)))
    return {
      error: "This reservation has already started and can't be deleted.",
    };

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");

  return { error: "" };
}

/* ---------- Payment ---------- */

export async function confirmPayment(
  sessionId: string,
): Promise<ActionResult & { paid?: boolean }> {
  let checkout: Stripe.Checkout.Session;

  try {
    checkout = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return { error: "We couldn't verify this payment." };
  }

  const bookingId = Number(checkout.metadata?.bookingId);
  if (!bookingId) return { error: "We couldn't verify this payment." };

  const booking = await getOwnBooking(bookingId);

  if (checkout.payment_status !== "paid") return { paid: false };

  if (!booking.isPaid) {
    const { error } = await supabase
      .from("bookings")
      .update({ isPaid: true })
      .eq("id", bookingId);

    if (error) throw new Error("Payment could not be recorded");
  }

  revalidatePath("/account/reservations");
  return { paid: true };
}

const toCents = (amount: number) => Math.round(amount * 100);

export async function createCheckoutSession(
  bookingId: number,
): Promise<ActionResult & { url?: string }> {
  const booking = await getOwnBooking(bookingId);

  if (booking.isPaid) return { error: "This reservation is already paid." };

  if (roundToUTCDay(booking.endDate).getTime() < Date.now() - DAY_MS)
    return { error: "Past reservations can't be paid online." };

  const cabin = await getCabin(String(booking.cabinId));
  if (!cabin) throw new Error("Cabin not found");

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: toCents(booking.cabinPrice),
        product_data: {
          name: `Cabin ${cabin.name}`,
          description: `${booking.numNights} night${booking.numNights === 1 ? "" : "s"} at The Wild Oasis`,
        },
      },
    },
  ];

  if (booking.extrasPrice > 0)
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: toCents(booking.extrasPrice),
        product_data: {
          name: "Breakfast",
          description: `${booking.numGuests} guest${booking.numGuests === 1 ? "" : "s"} × ${booking.numNights} night${booking.numNights === 1 ? "" : "s"}`,
        },
      },
    });

  const session = await auth();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer_email: session?.user?.email ?? undefined,
    metadata: { bookingId: String(bookingId) },
    success_url: `${siteUrl}/account/reservations?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/account/reservations?payment=cancelled`,
  });

  if (!checkout.url) throw new Error("Stripe checkout URL is missing");

  return { url: checkout.url };
}

/* ---------- Auth ---------- */

export async function signInAction(redirectTo?: string) {
  await signIn("google", { redirectTo: getSafePath(redirectTo) });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
