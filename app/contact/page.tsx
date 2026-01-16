import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ServiceVision. Let's discuss your AI development project.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">Get in Touch</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Contact Us
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Have a project in mind? Let&apos;s talk about how we can help you build it.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Let&apos;s start a conversation
              </h3>
              <p className="mt-4 text-base text-gray-600 leading-7">
                Tell us about your project and we&apos;ll get back to you within 24 hours
                to discuss how we can help.
              </p>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-gray-900">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:info@servicevision.net"
                      className="text-base text-primary hover:text-primary-dark"
                    >
                      info@servicevision.net
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-900">Response Time</dt>
                  <dd className="mt-1 text-base text-gray-600">
                    We typically respond within 24 business hours.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-900">Location</dt>
                  <dd className="mt-1 text-base text-gray-600">
                    We work with clients across North America.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Form */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
