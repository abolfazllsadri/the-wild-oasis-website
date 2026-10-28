import DateSelector from "@/components/DateSelector";
import LoginMessage from "@/components/LoginMessage";
import ReservationForm from "@/components/ReservationForm";
import { auth } from "@/lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import type { Cabin } from "@/lib/types";

type ReservationProps = {
  cabin: Cabin;
};

export default async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id),
  ]);

  const session = await auth();

  return (
    <div className="grid min-h-[400px] grid-cols-2 items-stretch divide-x-2 divide-primary-700 overflow-hidden rounded-lg border border-primary-800">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />

      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
