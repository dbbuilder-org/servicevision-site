import { getAllPosts, formatDate } from "@/lib/blog";
import LibraryClient from "./LibraryClient";

export default function LibraryPage() {
  const posts = getAllPosts();

  // Transform posts into the format the client component expects
  const articles = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    excerpt: post.description,
    category: post.category,
    author: post.author,
    date: formatDate(post.date),
    readTime: post.readTime,
    tags: [post.category],
  }));

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  return <LibraryClient articles={articles} categories={categories} />;
}
