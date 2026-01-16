import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  isAI?: boolean;
}

const navigation: {
  services: NavItem[];
  company: NavItem[];
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
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Terminal-style header */}
        <div className="font-mono text-sm text-gray-500 mb-12">
          <span className="text-emerald-400">$</span> cat footer.txt
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
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
                href="mailto:info@servicevision.net"
                className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-mono"
              >
                info@servicevision.net
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-500 font-mono">
              &copy; {new Date().getFullYear()} ServiceVision. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>25% of profits donated to tech-for-good orgs</span>
            </div>
          </div>
        </div>

        {/* ASCII art decoration */}
        <div className="mt-8 text-center font-mono text-[10px] text-gray-700 leading-none hidden md:block">
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
