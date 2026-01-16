"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface LibraryClientProps {
  articles: Article[];
  categories: string[];
}

// Easter egg messages
const teamNotes = [
  { trigger: "sync", note: "Real engineers don't just sync—they ship. And pick up the phone." },
  { trigger: "cloud", note: "We've been doing 'cloud' since it was called 'someone else's computer.'" },
  { trigger: "enterprise", note: "Enterprise-ready means audit-ready. We've been through the trenches." },
  { trigger: "dashboard", note: "Dashboards are nice. Accountability is better. We provide both." },
  { trigger: "integration", note: "We've integrated systems older than some developers. Experience matters." },
  { trigger: "ai", note: "AI is a tool, not a replacement. 25 years taught us that." },
  { trigger: "compliance", note: "SOC 2, HIPAA, audits... we've seen them all and shipped through them." },
  { trigger: "legacy", note: "Legacy systems aren't problems—they're opportunities in disguise." },
];

export default function LibraryClient({ articles, categories }: LibraryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [syncProgress, setSyncProgress] = useState(100);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showTeamNote, setShowTeamNote] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Check for Easter egg triggers in search
  useEffect(() => {
    const note = teamNotes.find((n) => searchQuery.toLowerCase().includes(n.trigger));
    if (note) {
      setCurrentNote(note.note);
      setShowTeamNote(true);
      const timer = setTimeout(() => setShowTeamNote(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Fake sync animation
  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(0);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setNotificationMessage("All resources synced successfully");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Logo click Easter egg - reveals admin panel
  const handleLogoClick = () => {
    setEasterEggClicks((prev) => {
      if (prev + 1 >= 5) {
        setShowAdminPanel(true);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enterprise Header Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: App Switcher */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SV</span>
                </div>
                <span>ServiceVision Library</span>
              </button>

              <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">Home</span>
                <span className="text-gray-300">/</span>
                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">Resources</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSync}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border transition-all ${
                  isSyncing
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isSyncing ? "Syncing..." : "Sync"}
              </button>

              <Link
                href="/md"
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Markdown Editor
              </Link>

              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-emerald-400 transition-all">
                CT
              </div>
            </div>
          </div>

          {/* Sync Progress Bar */}
          {isSyncing && (
            <div className="h-1 bg-gray-100 -mx-4 sm:-mx-6 lg:-mx-8">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-gray-700">{notificationMessage}</p>
          </div>
        </div>
      )}

      {/* Team Note Easter Egg */}
      {showTeamNote && (
        <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-xl p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">A note from our team:</p>
                <p className="text-sm text-white/90">{currentNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Admin Panel Easter Egg */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Secret Admin Panel</h3>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="font-medium text-amber-800">You found it!</p>
                  <p className="text-sm text-amber-600">
                    This Easter egg proves we build software with personality. Imagine what we can build for you.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">System Status</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-green-600">● API: Healthy</span>
                  </div>
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-green-600">● DB: Connected</span>
                  </div>
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-green-600">● Cache: Active</span>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border border-blue-200">
                    <span className="text-blue-600">● Humans: Available</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center pt-2">
                &quot;Enterprise software doesn&apos;t have to be boring.&quot; — ServiceVision
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Search */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Try: &quot;cloud&quot;, &quot;ai&quot;, &quot;compliance&quot;
                </p>
              </div>

              {/* Categories */}
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {category}
                      {category !== "All" && (
                        <span className="float-right text-xs text-gray-400">
                          {articles.filter((a) => a.category === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Library Stats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Articles</span>
                    <span className="font-medium text-gray-900">{articles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-medium text-gray-900">{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium text-emerald-600">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Library</h1>
              <p className="text-gray-600">
                Insights, guides, and best practices from our team. Built on 25 years of enterprise experience.
              </p>
            </div>

            {/* Featured Article Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-6 mb-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-medium mb-3">
                  FEATURED ARTICLE
                </span>
                <h2 className="text-2xl font-bold mb-2">What 40 Years of Computing Taught Us</h2>
                <p className="text-white/80 mb-4 max-w-lg">
                  From mainframes to AI agents: the pattern of technological evolution that shaped ServiceVision.
                  Why history matters for enterprise transformation.
                </p>
                <Link
                  href="/blog/what-40-years-of-computing-taught-us"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-700 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Read Why History Matters
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Tool Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-medium mb-3">
                  FREE TOOL
                </span>
                <h2 className="text-2xl font-bold mb-2">Markdown Editor</h2>
                <p className="text-white/80 mb-4 max-w-lg">
                  Our free, visual-first markdown editor. No account required. Drag, drop, and download.
                  Inspired by Typora, built for the modern web.
                </p>
                <Link
                  href="/md"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Try the Editor
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-6">
              {filteredArticles.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium mb-2">
                            {article.category}
                          </span>
                          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            <Link href={`/blog/${article.id}`}>{article.title}</Link>
                          </h2>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4">{article.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {article.readTime}
                          </span>
                          <span>{article.date}</span>
                        </div>

                        <div className="flex gap-2">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 bg-white rounded-xl border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Want insights tailored to your project?
              </h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Our team has 25 years of enterprise experience. Let&apos;s talk about your specific challenges.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Start a Conversation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="border-t border-gray-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>ServiceVision Resource Library &bull; Enterprise-grade insights, human-delivered.</p>
            <p className="hidden sm:block">
              <span className="text-emerald-600">●</span> 4hr response time &bull;{" "}
              <span className="text-emerald-600">●</span> 24/7 availability
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
