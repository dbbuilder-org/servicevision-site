import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development services for startups and enterprises. SaaS products, custom platforms, integrations, and AI-driven development.",
};

const services = [
  {
    id: "saas",
    name: "SaaS Product Development",
    description:
      "Your dedicated engineering team builds AI-powered applications with the compliance and security your customers demand.",
    image: "/media/data-visualization.png",
    features: [
      "Named project lead with direct communication",
      "Compliance-first architecture design",
      "Weekly progress calls and demos",
      "Full documentation and knowledge transfer",
      "90-day post-launch support included",
    ],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "enterprise",
    name: "Enterprise AI Solutions",
    description:
      "AI implementations built for regulated industries. We understand SOC 2, HIPAA, and the audits that come with them.",
    image: "/media/neural-abstract.png",
    features: [
      "Dedicated compliance review process",
      "Human-in-the-loop AI design",
      "Audit trail and explainability built in",
      "Executive stakeholder communication",
      "On-call support with 4-hour response SLA",
    ],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: "startup",
    name: "Startup Technical Partnership",
    description:
      "More than contractors—a technical partner invested in your success. We answer our phones and show up to your board meetings.",
    image: "/media/llm-abstract.png",
    features: [
      "Weekly strategy calls with senior engineers",
      "Direct Slack/phone access to your team",
      "Investor deck and due diligence support",
      "Flexible engagement as you grow",
      "No lock-in—we earn your business monthly",
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "integration",
    name: "AI Integration & Augmentation",
    description:
      "Add AI to your existing systems with guardrails and oversight. We make sure it works before your customers see it.",
    image: "/media/ai-sustainability.png",
    features: [
      "Thorough testing before any production deployment",
      "Human review of AI outputs in critical paths",
      "Rollback plans and monitoring dashboards",
      "Staff training and change management",
      "Ongoing optimization and support",
    ],
    gradient: "from-green-500 to-teal-500",
  },
];

const process = [
  {
    step: "01",
    title: "Listen",
    description: "We learn your business, constraints, and what success looks like",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Plan",
    description: "Collaborative design with your team, not just deliverables",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Build",
    description: "Weekly demos and calls—you always know where we are",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Support",
    description: "We stay with you post-launch. Real support, not a help desk.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero with Image Background */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/media/hero-option-2.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold text-cyan-400">What We Do</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Services
            </p>
            <p className="mt-6 text-xl text-gray-300 leading-8">
              High-touch AI development with real accountability.
              A dedicated team, not a ticket number.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.name}
                id={service.id}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${service.gradient} opacity-40`} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/80 to-transparent">
                      <span className={`inline-block rounded-full bg-gradient-to-r ${service.gradient} px-4 py-1 text-sm font-semibold text-white`}>
                        {service.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-lg text-gray-600 leading-8">{service.description}</p>
                  <ul className="mt-8 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${service.gradient}`}>
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${service.gradient} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105`}
                    >
                      Get Started
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-cyan-400">Our Process</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              How We Work
            </p>
            <p className="mt-6 text-lg text-gray-400 leading-8">
              A collaborative, iterative approach to building great software.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Connector line */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
                  )}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                      {item.icon}
                    </div>
                    <div className="mt-4 text-4xl font-bold text-gray-700">{item.step}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let&apos;s talk about your project
            </h2>
            <p className="mt-6 text-xl text-white/80 leading-8">
              Schedule a call with a senior engineer. No salespeople, no pressure—just an honest conversation about what you need.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl hover:scale-105"
              >
                Start a Conversation
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
