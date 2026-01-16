"use client";

import Link from "next/link";
import { useState } from "react";

const wizardSteps = [
  {
    id: 1,
    title: "Welcome",
    content: {
      heading: "Welcome to ServiceVision Setup Wizard",
      description: "This wizard will help you understand our services and find the right solution for your project.",
      details: [
        "Learn about our service offerings",
        "Understand our process",
        "See how we can help your business",
      ],
    },
  },
  {
    id: 2,
    title: "SaaS Products",
    content: {
      heading: "SaaS Product Development",
      description: "Your dedicated engineering team builds AI-powered applications with the compliance and security your customers demand.",
      details: [
        "Named project lead with direct communication",
        "Compliance-first architecture design",
        "Weekly progress calls and demos",
        "Full documentation and knowledge transfer",
        "90-day post-launch support included",
      ],
    },
  },
  {
    id: 3,
    title: "Enterprise AI",
    content: {
      heading: "Enterprise AI Solutions",
      description: "AI implementations built for regulated industries. We understand SOC 2, HIPAA, and the audits that come with them.",
      details: [
        "Dedicated compliance review process",
        "Human-in-the-loop AI design",
        "Audit trail and explainability built in",
        "Executive stakeholder communication",
        "On-call support with 4-hour response SLA",
      ],
    },
  },
  {
    id: 4,
    title: "Startup Partnership",
    content: {
      heading: "Startup Technical Partnership",
      description: "More than contractors—a technical partner invested in your success. We answer our phones and show up to your board meetings.",
      details: [
        "Weekly strategy calls with senior engineers",
        "Direct Slack/phone access to your team",
        "Investor deck and due diligence support",
        "Flexible engagement as you grow",
        "No lock-in—we earn your business monthly",
      ],
    },
  },
  {
    id: 5,
    title: "AI Integration",
    content: {
      heading: "AI Integration & Augmentation",
      description: "Add AI to your existing systems with guardrails and oversight. We make sure it works before your customers see it.",
      details: [
        "Thorough testing before any production deployment",
        "Human review of AI outputs in critical paths",
        "Rollback plans and monitoring dashboards",
        "Staff training and change management",
        "Ongoing optimization and support",
      ],
    },
  },
  {
    id: 6,
    title: "Our Process",
    content: {
      heading: "How We Work Together",
      description: "A collaborative, iterative approach that keeps you informed at every step.",
      details: [
        "01. Listen — We learn your business and constraints",
        "02. Plan — Collaborative design with your team",
        "03. Build — Weekly demos, you always know status",
        "04. Support — Real support post-launch, not a help desk",
      ],
    },
  },
  {
    id: 7,
    title: "Finish",
    content: {
      heading: "Ready to Get Started?",
      description: "Schedule a call with a senior engineer. No salespeople, no pressure—just an honest conversation about what you need.",
      details: [
        "Free consultation call",
        "No obligation to proceed",
        "Talk directly with engineers",
        "Get honest project assessment",
      ],
    },
  },
];

export default function ServicesPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = wizardSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;

  return (
    <div className="min-h-screen bg-[#008080] flex items-center justify-center p-4 pt-24">
      {/* Windows 95 Wizard Window */}
      <div className="win95-window w-full max-w-3xl">
        {/* Title Bar */}
        <div className="win95-titlebar">
          <span className="win95-titlebar-text">ServiceVision Services Wizard</span>
          <div className="win95-titlebar-buttons">
            <button className="win95-titlebar-btn">_</button>
            <button className="win95-titlebar-btn">□</button>
            <button className="win95-titlebar-btn">×</button>
          </div>
        </div>

        {/* Wizard Content */}
        <div className="flex">
          {/* Left Sidebar */}
          <div className="win95-wizard-sidebar hidden sm:block">
            <div className="win95-wizard-sidebar-title">
              ServiceVision
              <br />
              Services
              <br />
              Wizard
            </div>
            <div className="mt-8">
              {wizardSteps.map((s, i) => (
                <div
                  key={s.id}
                  className={`text-xs py-1 ${
                    i === currentStep
                      ? "text-white font-bold"
                      : i < currentStep
                      ? "text-blue-200"
                      : "text-blue-300/60"
                  }`}
                >
                  {i < currentStep ? "✓ " : ""}
                  {s.title}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 win95-content">
            {/* Step Content */}
            <div className="min-h-[320px]">
              <h2 className="win95-text-large font-bold mb-4">
                {step.content.heading}
              </h2>

              <p className="win95-text mb-4 leading-relaxed">
                {step.content.description}
              </p>

              {/* Features List */}
              <div className="win95-inset mt-4">
                <div className="space-y-2">
                  {step.content.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 win95-text">
                      <span className="text-green-700">►</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Link on Welcome */}
              {isFirstStep && (
                <div className="mt-6 win95-groupbox">
                  <span className="win95-groupbox-title win95-text">
                    Explore AI Capabilities
                  </span>
                  <Link
                    href="/ai"
                    className="win95-text text-blue-800 underline hover:text-blue-600"
                  >
                    → Learn about our AI expertise in an interactive format
                  </Link>
                </div>
              )}

              {/* Contact CTA on Last Step */}
              {isLastStep && (
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="win95-btn win95-btn-primary inline-block"
                  >
                    Start a Conversation
                  </Link>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="win95-divider" />

            {/* Progress */}
            <div className="mb-4">
              <div className="win95-text mb-2">
                Step {currentStep + 1} of {wizardSteps.length}
              </div>
              <div className="win95-progress">
                <div
                  className="win95-progress-bar transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / wizardSteps.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={isFirstStep}
                className="win95-btn"
              >
                &lt; Back
              </button>

              <div className="flex gap-2">
                <Link href="/contact" className="win95-btn">
                  Cancel
                </Link>

                {isLastStep ? (
                  <Link href="/contact" className="win95-btn win95-btn-primary">
                    Finish
                  </Link>
                ) : (
                  <button
                    onClick={handleNext}
                    className="win95-btn win95-btn-primary"
                  >
                    Next &gt;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="fixed bottom-8 left-8 hidden lg:flex flex-col gap-4">
        <Link href="/" className="flex flex-col items-center group">
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            🏠
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            Home
          </span>
        </Link>
        <Link href="/ai" className="flex flex-col items-center group">
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            🤖
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            AI Chat
          </span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center group">
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            📧
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            Contact
          </span>
        </Link>
      </div>

      {/* Taskbar hint */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#c0c0c0] border-t-2 border-white hidden lg:flex items-center px-2">
        <button className="win95-btn py-1 px-3 flex items-center gap-2">
          <span className="text-lg">🪟</span>
          <span className="win95-text font-bold">Start</span>
        </button>
        <div className="flex-1" />
        <div className="win95-inset px-4 py-0.5 win95-text">
          ServiceVision © 2026
        </div>
      </div>
    </div>
  );
}
