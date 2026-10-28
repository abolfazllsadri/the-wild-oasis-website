import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

export const dynamic = "force-static";

export async function GET(
  request: Request,
  { params }: { params: { cabinId: string } },
) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(+cabinId),
    ]);

    if (cabin === null) return Response.json({ message: "Cabin not found!" });

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({
      message: "Something went wrong in fetching cabin!",
    });
  }
}

// export async function POST(request: Request) {}
