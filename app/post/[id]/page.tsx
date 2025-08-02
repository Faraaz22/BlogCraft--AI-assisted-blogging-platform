import { buttonVariants } from "@/app/components/ui/button";
import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Server-side data fetch
async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!data) return notFound();
  return data;
}

type Params = Promise<{ id: string }>;

export default async function IdPage({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getData(id);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <Link
        className={buttonVariants({ variant: "secondary" })}
        href="/"
      >
        ← Back to Dashboard
      </Link>

      <article className="mt-10 space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 mb-4">
            {data.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image
                  src={data.authorImage}
                  alt={data.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{data.authorName}</span>
            </div>
            <span className="text-gray-400">•</span>
            <time>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(data.createdAt)}
            </time>
          </div>
        </header>

        <div className="relative h-72 w-full overflow-hidden rounded-lg shadow-sm sm:h-96">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <Card className="shadow-none border-none p-0">
          <CardContent className="p-0">
            <div className="prose prose-lg max-w-none text-gray-800">
              <p>{data.content}</p>
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  );
}
