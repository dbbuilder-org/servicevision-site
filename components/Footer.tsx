import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  isAI?: boolean;
}

const navigation: {
  services: NavItem[];
  company: NavItem[];
  divisions: { name: string; href: string }[];
  social: { name: string; href: string }[];
} = {
  services: [
    { name: "SaaS Products", href: "/services#saas_products" },
    { name: "Enterprise AI", href: "/services#enterprise_ai" },
    { name: "Startup Partnership", href: "/services#startup_partnership" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our AI Capabilities", href: "/ai", isAI: true },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  divisions: [
    { name: "SchoolVision", href: "https://schoolvision.ai" },
    { name: "StartupVision", href: "https://startupvision.net" },
    { name: "MobileID.ai", href: "https://mobileid.ai" },
    { name: "Portfolio", href: "https://portfolio.servicevision.io" },
  ],
  social: [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/servicevision",
    },
    {
      name: "GitHub",
      href: "https://github.com/servicevision",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="h-16 bg-gradient-to-b from-purple-900/20 to-transparent" />

      {/* ===== MOBILE FOOTER (< md) ===== */}
      <div className="md:hidden px-6 py-8">
        <Link href="/contact" className="block text-center group">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-emerald-400 font-mono text-lg">&gt;</span>
            <span className="font-bold text-white text-xl group-hover:text-emerald-400 transition-colors">
              ServiceVision
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            AI-powered software development with the high-touch, compliance-first service you deserve.
          </p>
          <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Get in touch →
          </span>
        </Link>
        <div className="mt-6 pt-4 border-t border-[#2a2a2a] text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            {navigation.divisions.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-emerald-400 transition-colors font-mono"
              >
                {item.name}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 font-mono mb-2">
            built on the Vision Data Platform
          </p>
          <p className="text-xs text-gray-600 font-mono">
            &copy; {new Date().getFullYear()} ServiceVision
          </p>
          <p className="mt-1 text-[11px] text-gray-600 font-mono">
            A division of the DBBuilder constellation by Vision Companies
          </p>
        </div>
      </div>

      {/* ===== DESKTOP FOOTER (md+) ===== */}
      <div className="hidden md:block mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Terminal-style header */}
        <div className="font-mono text-sm text-gray-500 mb-12">
          <span className="text-emerald-400">$</span> cat footer.txt
        </div>

        <div className="grid grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-emerald-400 font-mono text-lg">&gt;</span>
              <span className="font-bold text-white text-xl group-hover:text-emerald-400 transition-colors">
                ServiceVision
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-md leading-relaxed">
              AI-powered software development with the high-touch, compliance-first service you deserve.
            </p>
            <div className="mt-6 font-mono text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>status: online</span>
              </div>
              <p className="mt-3 text-gray-600">
                <span className="text-gray-500">&gt;</span> built on the Vision Data Platform
              </p>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-sm font-semibold text-white font-mono mb-4">
              ./services
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-mono"
                  >
                    <span className="text-gray-600 mr-2">&gt;</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Constellation / sibling divisions column */}
          <div>
            <h3 className="text-sm font-semibold text-white font-mono mb-4">
              ./constellation
            </h3>
            <ul className="space-y-3">
              {navigation.divisions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-mono"
                  >
                    <span className="text-gray-600 mr-2">&gt;</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-gray-600 font-mono leading-relaxed">
              Four Stars. One Constellation.
            </p>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold text-white font-mono mb-4">
              ./company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors font-mono ${
                      item.isAI
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-gray-400 hover:text-emerald-400"
                    }`}
                  >
                    <span className={item.isAI ? "text-purple-600 mr-2" : "text-gray-600 mr-2"}>&gt;</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white font-mono mb-3">
                ./contact
              </h3>
              <a
                href="mailto:info@servicevision.io"
                className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-mono"
              >
                info@servicevision.io
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-mono"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [{item.name}]
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-[#2a2a2a]">
          <div className="flex flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 font-mono">
                &copy; {new Date().getFullYear()} ServiceVision. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-gray-600 font-mono">
                A division of the DBBuilder constellation by Vision Companies &middot; Est. 2001 &middot; 25 years
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>10% of profits donated to tech-for-good orgs</span>
            </div>
          </div>
        </div>

        {/* ASCII art decoration */}
        <div className="mt-8 text-center font-mono text-[10px] text-gray-700 leading-none">
          <pre>{`
    ╔══════════════════════════════════════════════════════╗
    ║  Built with care. Powered by AI. Guided by humans.  ║
    ╚══════════════════════════════════════════════════════╝
          `}</pre>
        </div>
      </div>
    </footer>
  );
}
