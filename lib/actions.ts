"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import {
  deleteBooking,
  getBookedDatesByCabinId,
  getBookings,
} from "@/lib/data-service";
import supabase from "@/lib/supabase";
import type { Booking } from "@/lib/types";
import {
  eachDayOfInterval,
  isBefore,
  isSameDay,
  isValid,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID")?.toString() ?? "";
  const [nationality, countryFlag] =
    formData.get("nationality")?.toString().split("%") ?? [];

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID!");

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

type BookingData = {
  startDate: string | Date;
  endDate: string | Date;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

export async function createReservation(
  bookingData: BookingData,
  formData: FormData,
) {
  const session = await auth();
  if (!session || !session?.user)
    throw new Error("You must be logged in to create a reservation");

  const hasBreakfast =
    formData.get("hasBreakfast")?.toString() === "" ||
    formData.get("hasBreakfast")?.toString() === "false"
      ? false
      : true;

  const newBooking: Booking = {
    ...bookingData,
    startDate: (bookingData.startDate as string) ?? "",
    endDate: (bookingData.endDate as string) ?? "",
    guestId: Number(session.user.guestId),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString()?.slice(0, 500) ?? "",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateReservation(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(Number(session?.user?.guestId));
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this reservation");

  // 3) Create update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString().slice(0, 500) ?? "",
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  const guestBookings = await getBookings(Number(session?.user?.guestId));
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
