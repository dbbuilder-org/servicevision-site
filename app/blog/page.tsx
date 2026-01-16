import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and news about AI, technology, and service optimization from the ServiceVision team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">Insights</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Blog
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Insights, tips, and news about AI, technology, and service
              optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">
                Coming Soon
              </h2>
              <p className="mt-2 text-gray-600">
                We&apos;re working on some great content. Check back soon for insights
                on AI, technology, and service optimization.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Subscribe to updates →
                </Link>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <div className="space-y-12">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-gray-600 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      By {post.author}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
