"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import EraToggle from "@/components/EraToggle";

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

// Modern Library UI (current clean design)
function ModernLibrary({ articles, categories }: LibraryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resource Library
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, guides, and best practices from our team. Built on 25 years of enterprise experience.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white"
                      : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8">
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Featured</span>
          <h2 className="text-2xl font-bold text-white mt-2 mb-3">What 40 Years of Computing Taught Us</h2>
          <p className="text-gray-400 mb-4">
            From mainframes to AI agents: the pattern of technological evolution that shaped ServiceVision.
          </p>
          <Link
            href="/blog/what-40-years-of-computing-taught-us"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Read Article
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No articles found matching your criteria.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="group bg-[#111] border border-[#222] rounded-xl p-6 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1 mb-2 group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.readTime}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Free Tool Banner */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Free Tool</span>
              <h3 className="text-xl font-bold text-white mt-1">Markdown Editor</h3>
              <p className="text-gray-400 text-sm mt-1">Visual-first markdown editing. No account required.</p>
            </div>
            <Link
              href="/md"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Try Editor
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center bg-[#111] border border-[#222] rounded-xl p-8">
          <h3 className="text-xl font-semibold text-white mb-2">Want insights tailored to your project?</h3>
          <p className="text-gray-400 mb-6">Our team has 25 years of enterprise experience.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Start a Conversation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// 2010s Mobile/Skeuomorphic Era Library
function RetroLibrary({ articles, categories }: LibraryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)" }}>
      {/* iOS-style Header Bar */}
      <div className="sticky top-28 z-20 backdrop-blur-xl" style={{ background: "rgba(28, 28, 30, 0.95)" }}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Library</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                <svg className="w-5 h-5 text-[#0a84ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* iOS-style Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white placeholder-gray-500 focus:outline-none"
              style={{ background: "rgba(118, 118, 128, 0.24)" }}
            />
          </div>
        </div>

        {/* iOS-style Segmented Control */}
        <div className="mb-6 p-1 rounded-lg overflow-x-auto" style={{ background: "rgba(118, 118, 128, 0.24)" }}>
          <div className="flex gap-1 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-[#3a3a3c] text-white shadow-sm"
                    : "text-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Card - iOS Style */}
        <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1c1c1e, #2c2c2e)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          <div className="p-5">
            <div className="text-xs font-semibold text-[#0a84ff] uppercase tracking-wider mb-2">Featured</div>
            <h2 className="text-xl font-bold text-white mb-2">What 40 Years of Computing Taught Us</h2>
            <p className="text-gray-400 text-sm mb-4">From mainframes to AI agents: the evolution that shaped us.</p>
            <Link
              href="/blog/what-40-years-of-computing-taught-us"
              className="inline-flex items-center text-[#0a84ff] text-sm font-medium"
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Articles List - iOS Table Style */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#2c2c2e" }}>
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No articles found
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="block"
              >
                <div
                  className={`flex items-center gap-4 px-4 py-4 ${
                    index < filteredArticles.length - 1 ? "border-b border-[#3a3a3c]" : ""
                  }`}
                >
                  {/* App-like Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${
                        article.category === "AI" ? "#34c759, #30d158" :
                        article.category === "Compliance" ? "#ff9500, #ff9f0a" :
                        article.category === "Technical" ? "#0a84ff, #5e5ce6" :
                        "#8e8e93, #636366"
                      })`
                    }}
                  >
                    {article.category.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{article.title}</h3>
                    <p className="text-gray-500 text-sm truncate">{article.excerpt}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Tool Card */}
        <div className="mt-6 rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #5e5ce6, #bf5af2)", boxShadow: "0 4px 20px rgba(94, 92, 230, 0.3)" }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Free Tool</div>
              <h3 className="text-lg font-bold text-white">Markdown Editor</h3>
              <p className="text-white/70 text-sm">Visual-first editing</p>
            </div>
            <Link
              href="/md"
              className="bg-white text-[#5e5ce6] px-4 py-2 rounded-full font-semibold text-sm"
            >
              Open
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 rounded-2xl p-6 text-center" style={{ background: "#2c2c2e" }}>
          <h3 className="text-lg font-semibold text-white mb-2">Need Custom Insights?</h3>
          <p className="text-gray-400 text-sm mb-4">25 years of enterprise experience at your service.</p>
          <Link
            href="/contact"
            className="inline-block bg-[#0a84ff] text-white px-6 py-2.5 rounded-full font-semibold text-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* iOS-style Tab Bar Spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default function LibraryClient({ articles, categories }: LibraryClientProps) {
  return (
    <EraToggle beforeYear="2010" beforeLabel="Mobile/iOS Era" defaultModern={true}>
      {{
        before: <RetroLibrary articles={articles} categories={categories} />,
        after: <ModernLibrary articles={articles} categories={categories} />,
      }}
    </EraToggle>
  );
}
