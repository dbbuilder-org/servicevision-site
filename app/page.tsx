import Link from "next/link";
import Image from "next/image";

const features = [
  {
    name: "SaaS Products",
    description:
      "From MVP to scale. Your dedicated team builds AI-powered applications with direct access to senior engineers who know your business inside and out.",
    image: "/media/data-visualization.png",
    href: "/services#saas",
  },
  {
    name: "Enterprise AI",
    description:
      "Custom AI solutions with enterprise-grade compliance. We handle the complexity so you get results—with a named point of contact for every project.",
    image: "/media/neural-abstract.png",
    href: "/services#enterprise",
  },
  {
    name: "Startup Partnership",
    description:
      "More than a vendor—a technical partner invested in your success. Weekly strategy calls, rapid iteration, and the accountability you deserve.",
    image: "/media/llm-abstract.png",
    href: "/services#startup",
  },
];

const industries = [
  { name: "Healthcare & Life Sciences", icon: "🏥" },
  { name: "Financial Services", icon: "💳" },
  { name: "E-commerce & Retail", icon: "🛒" },
  { name: "Education & EdTech", icon: "📚" },
  { name: "Professional Services", icon: "💼" },
  { name: "Manufacturing & Logistics", icon: "🏭" },
];

const capabilities = [
  "Custom LLM integrations with human oversight built in",
  "Compliant automation that meets your regulatory requirements",
  "Predictive analytics with explainable, auditable results",
  "Conversational AI reviewed by real engineers before launch",
  "Document processing with accuracy guarantees",
  "AI features designed with your risk tolerance in mind",
];

const stats = [
  { value: "100%", label: "Compliance Rate" },
  { value: "4hr", label: "Response Time" },
  { value: "1:1", label: "Dedicated Support" },
  { value: "24/7", label: "Always Available" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 -z-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover scale-105"
            poster="/media/hero-image.png"
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-primary/60" />

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float delay-300" />

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-8 animate-fade-in">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                AI-Powered Development
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight animate-slide-up">
              AI-powered.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 animate-pulse">
                Human-delivered.
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-300 leading-relaxed animate-slide-up delay-200">
              We combine cutting-edge AI with the high-touch, compliance-first service
              you can&apos;t find anywhere else. Real relationships. Real accountability.
              Technology that actually works for your business.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-slide-up delay-300">
              <Link
                href="/contact"
                className="btn-glow group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105"
              >
                Start a Project
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-10 mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl shadow-gray-900/10 ring-1 ring-gray-900/5">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <div key={stat.label} className="group px-6 py-10 text-center transition-colors hover:bg-gray-50/50">
                <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-24 sm:py-32 bg-grid">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Your Team
            </span>
            <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI expertise with a{" "}
              <span className="gradient-text">human face</span>
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              No ticket systems. No rotating contractors. Just a dedicated team that picks up when you call.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="card-hover group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-gray-900/5"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="glass rounded-full px-3 py-1 text-xs font-medium text-white">
                      {index === 0 ? "Popular" : index === 1 ? "Enterprise" : "Startups"}
                    </span>
                  </div>
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">
                    {feature.name}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                    Learn more
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                Experience
              </span>
              <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Trusted across{" "}
                <span className="gradient-text">industries</span>
              </p>
              <p className="mt-6 text-lg text-gray-600 leading-8">
                We&apos;ve built AI solutions for companies across sectors—from healthcare
                platforms processing medical data to fintech apps handling millions in transactions.
              </p>
              <p className="mt-4 text-gray-600 leading-7">
                Our cross-industry experience means we bring proven patterns and fresh
                perspectives to every project.
              </p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  Learn about our approach
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {industries.map((industry, index) => (
                <div
                  key={industry.name}
                  className="card-hover group rounded-2xl bg-white p-6 text-center shadow-soft ring-1 ring-gray-900/5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors">
                    <span className="text-2xl">{industry.icon}</span>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-gray-900">{industry.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section with Video Background */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        {/* Video Background */}
        <div className="absolute inset-0 -z-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/media/capabilities-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 -z-10 animated-gradient opacity-95" />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-float delay-200" />
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-white/10 rounded-full animate-float delay-400" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <span className="inline-block glass rounded-full px-4 py-1.5 text-sm font-semibold text-white mb-4">
              Capabilities
            </span>
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              AI with guardrails built in
            </p>
            <p className="mt-6 text-lg text-white/80 leading-8">
              We bring cutting-edge AI to your business—with the compliance, security, and human oversight your stakeholders expect.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {capabilities.map((capability, index) => (
                <li
                  key={capability}
                  className="group flex items-start gap-4 rounded-2xl glass p-5 transition-all hover:bg-white/20 hover:scale-[1.02]"
                >
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium leading-relaxed">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media/ai-ecosystem.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-primary/30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute h-full w-full rounded-full bg-green-500/20 animate-ping" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white text-xl">
                  25%
                </span>
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Building for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Good
              </span>
            </h2>
            <p className="mt-6 text-lg text-gray-300 leading-8">
              We believe technology should create positive change. That&apos;s why we donate{" "}
              <span className="font-semibold text-green-400">25% of our profits</span> to
              organizations using technology to make an impact.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/about#impact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                Learn About Our Impact
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-grid">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-[2.5rem] animated-gradient px-6 py-24 text-center shadow-2xl shadow-primary/20 sm:px-16">
            {/* Animated gradient orbs */}
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl animate-float" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl animate-float delay-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ready for AI that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                  actually works?
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/80 leading-8">
                Skip the chatbot. Talk to a real engineer about your project.
                We&apos;ll give you an honest assessment—not a sales pitch.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-glow group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-xl shadow-white/20 transition-all hover:shadow-2xl hover:scale-105"
                >
                  Start a Conversation
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
