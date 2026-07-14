"use server";

import { gemini } from "@/src/lib/gemini";

export async function testGemini() {
  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Say hello in exactly five words.",
  });

  return response.text;
}
