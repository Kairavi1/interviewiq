"use server";

import { supabaseAdmin } from "@/src/lib/supabase-server";

export async function uploadResume(formData: FormData) {
  const file = formData.get("resume") as File;

  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();

  const fileName = `${crypto.randomUUID()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from("resumes")
    .upload(fileName, Buffer.from(bytes), {
      contentType: file.type,
    });

  if (error) {
    throw error;
  }

  return data.path;
}
