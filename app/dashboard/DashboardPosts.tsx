// app/dashboard/DashboardPosts.tsx
'use client';

import { useEffect, useState } from 'react';
import { BlogPostCard } from '../components/General/BlogpostCard';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorImage: string;
  authorName: string;
  createdAt: string;
};

export default function DashboardPosts({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/dashboard-posts?userId=${userId}`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, [userId]);

  if (loading) return null; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} data={post} />
      ))}
    </div>
  );
}
