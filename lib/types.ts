/**
 * Shared domain types for The Wild Oasis website.
 *
 * These mirror the shapes used by the (currently uninitialised) Supabase
 * backend and are referenced by the components and the data-service layer.
 */

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
};

export type CabinPrice = {
  regularPrice: number;
  discount: number;
};

export type BookingStatus = "checked-in" | "checked-out" | "unconfirmed";

export type Booking = {
  id?: number;
  created_at?: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
};

export type ReservationCardBooking = Pick<
  Booking,
  | "id"
  | "guestId"
  | "startDate"
  | "endDate"
  | "numNights"
  | "totalPrice"
  | "numGuests"
  | "created_at"
> & {
  cabins: {
    name: string;
    image: string;
  };
};

export type Guest = {
  id?: number;
  created_at?: string;
  fullName: string;
  email: string;
  nationality?: string;
  countryFlag?: string;
  nationalID?: string;
};

export type Settings = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type Country = {
  names: { common: string };
  flag: { url_png: string };
};

export type CountriesResponse = {
  data: {
    objects: Country[];
  };
};

export type CapacityFilter = "all" | "small" | "medium" | "large";
