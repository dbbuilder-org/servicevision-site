import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import ContactEmail from "@/emails/ContactEmail";

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // If no secret key configured, skip verification
  if (!secretKey) {
    console.log("reCAPTCHA secret key not configured, skipping verification");
    return true;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    // Accept if score is 0.5 or higher (default threshold)
    return data.success && (data.score === undefined || data.score >= 0.5);
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, recaptchaToken } = body;

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

    // Verify reCAPTCHA if token provided and secret key configured
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
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
