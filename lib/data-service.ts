import type {
  Booking,
  Cabin,
  CabinPrice,
  Guest,
  ReservationCardBooking,
  Settings,
} from "@/lib/types";
import supabase from "@/lib/supabase";
import { DAY_MS, roundToUTCDay } from "@/lib/utils";

/* ---------- GET ---------- */
export async function getCabin(id: string): Promise<Cabin | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) console.error(error);

  return data;
}

export async function getCabinPrice(id: number): Promise<CabinPrice | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return data;
}

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return data as unknown as Booking;
}

export async function getBookings(
  guestId: number,
): Promise<ReservationCardBooking[]> {
  const { data, error, count } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, isPaid, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate")
    .overrideTypes<ReservationCardBooking[], { merge: false }>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(
  cabinId: number,
): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("startDate, endDate")
    .eq("cabinId", cabinId)
    .gte("endDate", todayISO);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data.flatMap(
    (booking: Pick<Booking, "startDate" | "endDate">) => {
      const first = roundToUTCDay(booking.startDate).getTime();
      const last = roundToUTCDay(booking.endDate).getTime();
      const days = Math.round((last - first) / DAY_MS) + 1;

      return Array.from(
        { length: days },
        (_, i) => new Date(first + i * DAY_MS),
      );
    },
  );

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

/* ---------- CREATE ---------- */
export async function createGuest(newGuest: Guest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking: Booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/* ---------- UPDATE ---------- */
export async function updateGuest(id: number, updatedFields: Partial<Guest>) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  return data;
}

export async function updateBooking(
  id: number,
  updatedFields: Partial<Booking>,
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

/* ---------- DELETE ---------- */
export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
