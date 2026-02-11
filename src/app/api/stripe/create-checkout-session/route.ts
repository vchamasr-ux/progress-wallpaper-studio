import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        const { successUrl, cancelUrl } = await req.json();

        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Missing STRIPE_SECRET_KEY");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // apiVersion: "2025-01-27.acacia", 
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Progress Wallpaper Pro Pack",
                        },
                        unit_amount: 699, // $6.99
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            // Stripe will replace {CHECKOUT_SESSION_ID} with the actual ID
            success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl,
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
