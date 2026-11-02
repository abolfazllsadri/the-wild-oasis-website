import stripe from "@/lib/stripe";
import supabase from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    const bookingId = Number(session.metadata?.bookingId);

    if (bookingId && session.payment_status === "paid") {
      const { error } = await supabase
        .from("bookings")
        .update({ isPaid: true })
        .eq("id", bookingId);

      if (error) {
        console.error(error);
        return new Response("Database error", { status: 500 });
      }
    }
  }

  return new Response(null, { status: 200 });
}
