"use server";

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
        error?.status === 503 ||
        error?.status === 429 ||
        error?.status === 500 ||
        error?.status === 404
      ) {
        console.log(`Switching from ${model}...`);
        continue;
      }

      throw error;
    }
  }

  throw new Error("All Gemini models are currently unavailable");
}

export async function evaluateInterview(data: any) {
  const prompt = `
You are an expert technical interviewer.

Evaluate this interview.

You have:

Role:
${data.role}

Company:
${data.company || "Unknown"}


Candidate Answers:

${JSON.stringify(data.answers, null, 2)}



Analyze every answer.

Return ONLY valid JSON.

Do not use markdown.

Return exactly this structure:


{
  "overallScore": 7.4,

  "categoryScores": {
    "technical": 6.8,
    "behavioral": 8.1,
    "cultureFit": 7.5
  },

  "feedback": [
    {
      "category": "TECHNICAL",

      "question": "Original question",

      "score": 8.5,

      "worked": "What candidate did well",

      "missing": "What concepts were missing",

      "tip": "How candidate can improve"
    }
  ]
}


Rules:

- Score every answer from 0-10.
- Be strict like a real interviewer.
- Mention specific technologies/concepts.
- Identify weak points.
- Give actionable improvement advice.
- Evaluate technical accuracy.
- Evaluate communication quality.
- Evaluate structure for behavioral answers.
- Return ONLY JSON.
`;

  const response = await generateWithRetry([
    {
      text: prompt,
    },
  ]);

  if (!response.text) {
    throw new Error("Gemini returned empty response");
  }

  let evaluation;

  try {
    evaluation = JSON.parse(response.text.trim());
  } catch (error) {
    console.log("Invalid JSON from Gemini:");
    console.log(response.text);

    throw new Error("Gemini returned invalid JSON");
  }

  return {
    success: true,
    evaluation,
  };
}
