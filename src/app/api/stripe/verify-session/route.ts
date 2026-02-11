import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Missing STRIPE_SECRET_KEY");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // apiVersion: "2025-01-27.acacia",
        });

        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            return NextResponse.json({ verified: true });
        } else {
            return NextResponse.json({ verified: false });
        }
    } catch (err: any) {
        console.error("Stripe Verify Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
