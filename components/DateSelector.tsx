"use client";

import { useReservation } from "@/components/ReservationContext";
import type { Cabin, Settings } from "@/lib/types";
import { fromUTCDate } from "@/lib/utils";
import {
  differenceInDays,
  format,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(
  range: DateRange | undefined,
  datesArr: Date[],
): boolean {
  return (
    !!range?.from &&
    !!range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! }),
    )
  );
}

type DateSelectorProps = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

export default function DateSelector({
  settings,
  bookedDates,
  cabin,
}: DateSelectorProps) {
  const { regularPrice, discount } = cabin;
  const { range, setRange, resetRange } = useReservation();

  const bookedDays = bookedDates.map(fromUTCDate);

  const displayRange = isAlreadyBooked(range, bookedDays)
    ? { to: undefined, from: undefined }
    : range;

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex h-full flex-col">
      <DayPicker
        mode="range"
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        className="self-center pt-6 sm:pt-12"
        disabled={(curDate) =>
          isPast(curDate) || bookedDays.some((date) => isSameDay(date, curDate))
        }
      />

      {/* Stay summary */}
      <div className="flex flex-1 items-center justify-center px-6 py-6">
        <div className="w-full max-w-md rounded-xl border border-primary-700 bg-primary-900/40 p-5">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
            Your stay
          </p>

          {displayRange?.from ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="mb-1 text-sm text-slate-400">Check-in</p>
                <p className="font-semibold text-slate-100">
                  {format(displayRange.from, "MMM dd, yyyy")}
                </p>
              </div>

              <div className="text-center">
                <p className="mb-1 text-sm text-slate-400">Check-out</p>
                <p className="font-semibold text-slate-100">
                  {displayRange.to
                    ? format(displayRange.to, "MMM dd, yyyy")
                    : "Select date"}
                </p>
              </div>

              {displayRange.to && numNights > 0 && (
                <div className="col-span-2 mt-2 flex items-center justify-between border-t border-primary-700 pt-3">
                  <span className="text-sm text-slate-400">Length of stay</span>
                  <span className="font-semibold text-slate-100">
                    {numNights} {numNights === 1 ? "night" : "nights"}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm leading-6 text-slate-300">
              Select your check-in and check-out dates on the calendar to plan
              your stay.
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex min-h-[72px] shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-accent-500 px-4 py-3 text-primary-800 sm:px-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 sm:gap-x-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-bold">
                  ${regularPrice - discount}
                </span>

                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>

          {numNights ? (
            <>
              <p className="rounded-lg bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="text-lg font-semibold uppercase tracking-widest">
                  Total
                </span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            type="button"
            onClick={resetRange}
            className="rounded-lg border border-primary-800 px-4 py-2 text-sm font-semibold"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
