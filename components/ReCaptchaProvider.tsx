"use client";

// reCAPTCHA v2 doesn't need a provider wrapper
// The component is used directly in the form
export default function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
