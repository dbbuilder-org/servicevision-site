import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import ContactEmail from "@/emails/ContactEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: "ServiceVision Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "info@servicevision.net",
      replyTo: email,
      subject: `New contact from ${name}`,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send email. Please try again.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: errorMessage },
      { status: 500 }
    );
  }
}
