import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ServiceVision builds AI-powered software for startups and enterprises. Learn about our approach to development and our commitment to quality.",
};

const values = [
  {
    name: "Compliance First",
    description:
      "We build for regulated industries. SOC 2, HIPAA, audit trails—compliance isn't an afterthought, it's where we start.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Always Available",
    description:
      "4-hour response time. Direct phone and Slack access. When you have a question, you get a person—not a ticket.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Human Oversight",
    description:
      "We use AI, but humans review every critical output. Automation with guardrails—not black boxes.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Real Partnership",
    description:
      "We show up to your meetings, learn your business, and take ownership. Not vendors—partners who share your goals.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "from-green-500 to-teal-500",
  },
];

const technologies = [
  { name: "TypeScript", category: "Language" },
  { name: "React / Next.js", category: "Frontend" },
  { name: "Python / FastAPI", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "OpenAI / Anthropic", category: "AI" },
  { name: "LangChain", category: "AI" },
  { name: "AWS / Vercel", category: "Cloud" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero with Image */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/media/neural-abstract.png"
            alt="AI visualization"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold text-cyan-400">Who We Are</h2>
            <p className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              About ServiceVision
            </p>
            <p className="mt-6 text-xl text-gray-300 leading-8">
              We&apos;re a software development studio that believes AI should come with
              accountability. Real engineers. Real relationships. Real results.
            </p>
          </div>
        </div>
      </section>

      {/* Story with Image */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/media/data-visualization.png"
                  alt="AI data visualization"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-20" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The ServiceVision Difference
              </h2>
              <div className="mt-8 space-y-6 text-lg text-gray-600 leading-8">
                <p>
                  You&apos;ve probably worked with agencies that disappear after the contract is signed.
                  Offshore teams you can never reach. AI vendors who promise the world and deliver a demo.
                </p>
                <p>
                  We&apos;re different. When you work with us, you get a named engineer who knows your
                  business, picks up when you call, and takes personal responsibility for your success.
                  We build AI-powered software with the oversight and compliance your stakeholders demand.
                </p>
                <p>
                  Our clients stay with us because we treat their problems like our own.
                  No ticket systems. No rotating contractors. Just a dedicated team that delivers.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary-dark"
                >
                  See our services
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">Our Promise</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What You Can Expect
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              The commitments we make to every client, every project.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.name}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${value.color}`} />
                  <dt className="flex items-center gap-x-4 text-xl font-semibold text-gray-900">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${value.color} text-white shadow-lg`}>
                      {value.icon}
                    </div>
                    {value.name}
                  </dt>
                  <dd className="mt-4 text-base text-gray-600 leading-7">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/media/llm-abstract.png"
            alt=""
            fill
            className="object-cover opacity-15"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">Technology</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Stack
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Modern, battle-tested technologies for every layer of your application.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow-md ring-1 ring-gray-900/5 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <p className="text-xs font-medium text-primary uppercase tracking-wider">{tech.category}</p>
                  <p className="mt-2 text-base font-semibold text-gray-900">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Giving Back with Video */}
      <section id="impact" className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/media/capabilities-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Building for Good
            </h2>
            <p className="mt-6 text-xl text-white/80 leading-8">
              We believe technology should create positive change. That&apos;s why we
              donate <span className="font-semibold text-white">a portion of our profits</span> to
              organizations using technology for social good.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 ring-1 ring-white/20">
                <span className="text-2xl font-bold text-white">25%</span>
                <span className="ml-2 text-white/80">of profits donated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
            <div className="absolute inset-0 -z-10 opacity-30">
              <Image
                src="/media/ai-ecosystem.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Experience the Difference
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-8">
              Schedule a call with a senior engineer. See what it&apos;s like to work with a team that actually cares.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl hover:scale-105"
              >
                Get in Touch
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
