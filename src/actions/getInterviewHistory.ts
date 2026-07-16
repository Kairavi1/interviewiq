"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";

export async function getInterviewHistory() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return [];

  const interviews = await prisma.interviewSession.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      company: true,
      role: true,
      createdAt: true,
      status: true,
    },
  });

  return interviews;
}
