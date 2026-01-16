import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark mb-8"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {post.category}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{post.description}</p>
            <div className="mt-6 text-sm text-gray-500">By {post.author}</div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <article className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Want to learn more?
            </h2>
            <p className="mt-4 text-gray-600">
              Contact us to discuss how AI can help transform your organization.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/blog"
                className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
