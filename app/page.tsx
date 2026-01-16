"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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

const terminalQuestions = [
  "Where do I even begin?",
  "How can I finish this project?",
  "Who can I trust to help me?",
  "How do I make this SOC 2 compliant?",
  "Can AI actually help my business?",
  "Who knows best practices best?",
  "How do I scale without breaking things?",
  "Where do I find engineers who care?",
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const question = terminalQuestions[currentQuestion];

    if (isTyping) {
      if (displayedText.length < question.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(question.slice(0, displayedText.length + 1));
        }, 50 + Math.random() * 50); // Variable typing speed for realism
        return () => clearTimeout(timeout);
      } else {
        // Pause at end of question
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Delete text
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Move to next question
        setCurrentQuestion((prev) => (prev + 1) % terminalQuestions.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentQuestion]);

  return (
    <>
      {/* Hero Section - Terminal Style */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center bg-gray-950">
        {/* Subtle scan lines effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
          }}
        />

        {/* Subtle glow in corner */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Terminal Window */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-xs text-gray-500 font-mono">you@startup ~ </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono">
                <div className="text-gray-500 text-sm mb-4">$ thinking about your next project...</div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 text-2xl sm:text-3xl lg:text-4xl font-bold">&gt;</span>
                  <span className="text-emerald-400 text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {displayedText}
                    <span className="inline-block w-3 sm:w-4 h-8 sm:h-10 bg-emerald-400 ml-1 animate-pulse" />
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div className="mt-12 space-y-6">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                We have the answers.
                <span className="block text-gray-400 text-xl sm:text-2xl lg:text-3xl font-normal mt-2">
                  AI-powered development with humans who actually pick up the phone.
                </span>
              </p>

              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Compliance-first. High-touch service. Real accountability.
                We&apos;re the technical partner you&apos;ve been looking for.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-gray-900 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105"
                >
                  Start a Conversation
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-4 text-sm font-semibold text-gray-300 transition-all hover:bg-gray-800 hover:border-gray-600 hover:text-white"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 -mt-8">
        <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-800">
            {stats.map((stat) => (
              <div key={stat.label} className="group px-6 py-8 text-center transition-colors hover:bg-gray-800/50">
                <p className="text-3xl font-bold tracking-tight text-emerald-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-400">{stat.label}</p>
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
              AI expertise with{" "}
              <span className="gradient-text">real accountability</span>
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
