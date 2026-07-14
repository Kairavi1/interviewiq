"use server";

import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

type GenerateInterviewInput = {
  jobDescription: string;
  seniority: "JUNIOR" | "MID" | "SENIOR";
  focusArea: "ALL" | "TECHNICAL" | "BEHAVIORAL";
};

export async function generateInterview(data: GenerateInterviewInput) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const interview = await prisma.interviewSession.create({
    data: {
      userId: user.id,

      company: "",
      role: "",

      jobDescription: data.jobDescription,

      seniority: data.seniority,
      focusArea: data.focusArea,

      status: "PREPARING",
    },
  });

  return interview;
}
