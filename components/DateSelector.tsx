"use client";

import { useReservation } from "@/components/ReservationContext";
import type { Cabin, Settings } from "@/lib/types";
import {
  differenceInDays,
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
  const { range, setRange, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { to: undefined, from: undefined }
    : range;

  const numNights = differenceInDays(
    displayRange?.to ?? "",
    displayRange?.from ?? "",
  );

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
        className="place-self-center pt-12"
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
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
                  {displayRange.from.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="text-center">
                <p className="mb-1 text-sm text-slate-400">Check-out</p>
                <p className="font-semibold text-slate-100">
                  {displayRange.to
                    ? displayRange.to.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
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

      <div className="mt-auto flex h-[72px] shrink-0 items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
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
