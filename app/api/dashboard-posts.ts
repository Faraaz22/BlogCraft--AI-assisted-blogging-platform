// pages/api/dashboard-posts.ts
import { prisma } from "@/app/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Missing or invalid user ID" });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching dashboard posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
