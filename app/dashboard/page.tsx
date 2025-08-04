import Link from 'next/link';
import { buttonVariants } from '../components/ui/button';
import { prisma } from '../utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { BlogPostCard } from '../components/General/BlogpostCard';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';a

async function getData(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/register');
  }

  const data = await getData(user.id);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Suspense fallback={<p className="text-gray-500">Loading header...</p>}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Blog Articles
          </h2>
          <Link className={buttonVariants({ variant: 'default' })} href="/dashboard/create">
            + Create Post
          </Link>
        </div>
      </Suspense>

      <Suspense fallback={<p className="text-gray-500">Loading your posts...</p>}>
        {data.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
<p className="text-lg">You haven&apos;t written any posts yet.</p>
            <Link
              href="/dashboard/create"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Start writing →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <BlogPostCard data={item} key={item.id} />
            ))}
          </div>
        )}
      </Suspense>
    </main>
  );
}
