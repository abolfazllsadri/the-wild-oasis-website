import { ClassValue, clsx } from "clsx";
import { formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSafePath(path?: string, fallback = "/account") {
  return path && path.startsWith("/") && !path.startsWith("//")
    ? path
    : fallback;
}

export const DAY_MS = 24 * 60 * 60 * 1000;

export const roundToUTCDay = (value: string | Date) =>
  new Date(Math.round(new Date(value).getTime() / DAY_MS) * DAY_MS);

export const toUTCDate = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

export function fromUTCDate(value: string | Date) {
  const day = roundToUTCDay(value);
  return new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate());
}

export const formatDistanceFromNow = (date: Date | string) =>
  formatDistance(new Date(date), new Date(), { addSuffix: true }).replace(
    "about ",
    "",
  );
