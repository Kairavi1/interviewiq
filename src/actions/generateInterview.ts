"use server";

import { auth } from "@/auth";
import { gemini } from "@/src/lib/gemini";

async function generateWithRetry(contents: any) {
  const models = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-3-flash",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ];

  for (const model of models) {
    try {
      console.log("Trying model:", model);

      const response = await gemini.models.generateContent({
        model,
        contents,
      });

      console.log("Success with:", model);

      return response;
    } catch (error: any) {
      console.log(`${model} failed:`, error?.status, error?.message);

      if (
        error?.status === 503 || // overloaded
        error?.status === 429 || // rate limit
        error?.status === 500 || // server issue
        error?.status === 404 // model unavailable
      ) {
        console.log(`Switching from ${model}...`);

        continue;
      }

      throw error;
    }
  }

  throw new Error("All Gemini models are currently unavailable");
}

export async function generateInterview(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const resume = formData.get("resume") as File;

  const jobDescription = formData.get("jobDescription") as string;

  const seniority = formData.get("seniority") as "JUNIOR" | "MID" | "SENIOR";

  const focusArea = formData.get("focusArea") as
    | "ALL"
    | "TECHNICAL"
    | "BEHAVIORAL";

  console.log("=================");
  console.log("User:", session.user.email);
  console.log("Resume:", resume.name);
  console.log("Size:", resume.size);
  console.log("Type:", resume.type);
  console.log("JD:", jobDescription);
  console.log("Seniority:", seniority);
  console.log("Focus:", focusArea);
  console.log("=================");

  // Convert PDF into base64

  const bytes = await resume.arrayBuffer();

  const base64 = Buffer.from(bytes).toString("base64");

  const response = await generateWithRetry([
    {
      inlineData: {
        mimeType: "application/pdf",
        data: base64,
      },
    },

    {
      text: `
You are an experienced Senior Software Engineer and Technical Interviewer.

You are conducting a real interview.

You are given:

1. Candidate resume PDF.
2. Job description.


Job Description:

${jobDescription}


Candidate Seniority:

${seniority}


Interview Focus:

${focusArea}



Instructions:

Analyze BOTH the resume and job description.

Generate questions personalized to this candidate.

Use:

- projects
- internships
- technologies
- achievements
- education
- skills


Match questions with the job requirements.


Difficulty Rules:

JUNIOR:
Mostly EASY with some MEDIUM.


MID:
Mostly MEDIUM with some EASY and HARD.


SENIOR:
Mostly HARD with some MEDIUM.



Focus Rules:


If focus is ALL:

Generate:

- TECHNICAL
- BEHAVIORAL
- SYSTEM_DESIGN
- CULTURE_FIT


If focus is TECHNICAL:

Generate mostly:

- TECHNICAL
- SYSTEM_DESIGN


If focus is BEHAVIORAL:

Generate mostly:

- BEHAVIORAL
- CULTURE_FIT



Requirements:

- Generate EXACTLY 12 questions.
- Questions must be personalized.
- Reference actual resume experience.
- Do not invent experience.
- Keep questions concise.
- Return ONLY valid JSON.



JSON FORMAT:


{
  "company": "Company name from JD or empty string",
  "role": "Role title",
  "questions": [
    {
      "order": 1,
      "category": "TECHNICAL",
      "difficulty": "MEDIUM",
      "question": "Question text"
    }
  ]
}


Do not wrap JSON in markdown.

Return ONLY JSON.
`,
    },
  ]);

  console.log(response.text);

  if (!response.text) {
    throw new Error("Gemini returned empty response");
  }

  let interview;

  try {
    interview = JSON.parse(response.text.trim());
  } catch (error) {
    console.log("Invalid JSON from Gemini:", response.text);

    throw new Error("Gemini returned invalid JSON");
  }

  return {
    success: true,
    interview,
  };
}
