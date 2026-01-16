import { Resend } from "resend";

// Lazy initialization to avoid build-time errors when env vars aren't available
let resendInstance: Resend | null = null;

export const getResend = () => {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
};

// For backwards compatibility
export const resend = {
  emails: {
    send: (...args: Parameters<Resend["emails"]["send"]>) => getResend().emails.send(...args),
  },
};
