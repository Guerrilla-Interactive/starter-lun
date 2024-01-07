import { NextResponse } from "next/server";
import Stripe from "stripe";

import { clientEnv } from "@/src/env/client.mjs";

const stripe = new Stripe(clientEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "", {
  apiVersion: "2023-10-16",
});

// Define an interface for the expected structure of the request body
interface RequestBody {
  itineraryId: string;
}

export async function POST(req: Request) {
  try {
    // Cast the body to the defined interface
    const body = (await req.json()) as RequestBody;

    if (!body.itineraryId) {
      throw new Error("Missing itinerary_id");
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Itinerary",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        itinerary_id: body.itineraryId,
      },
      success_url: `${clientEnv.NEXT_PUBLIC_SITE_URL}/success?itineraryId=${body.itineraryId}`,
      cancel_url: `${clientEnv.NEXT_PUBLIC_SITE_URL}/`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json({ result: checkoutSession, ok: true });

  } catch (error) {

    console.error(error);
    return NextResponse.json(
      { message: "something went wrong", ok: false },
      { status: 500 }
    );
  }
}
