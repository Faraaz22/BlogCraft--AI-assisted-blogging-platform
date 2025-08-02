import { BlogPostCard } from "./components/General/BlogpostCard";
import { prisma } from "./utils/db";
import React, { Suspense } from "react";


function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-64 rounded-md animate-shimmer"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm mb-10">
         Latest Posts
      </h1>

      <Suspense fallback={<BlogSkeleton />}>
        <BlogPosts />
      </Suspense>
    </main>
  );
}

async function BlogPosts() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div
          key={item.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="animate-fadeInUp transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
        >
          <BlogPostCard data={item} />
        </div>
      ))}
    </div>
  );
}
