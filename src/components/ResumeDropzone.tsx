"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Loader2 } from "lucide-react";
import { uploadResume } from "@/src/actions/uploadResume";

export default function ResumeDropzone() {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const path = await uploadResume(formData);

      console.log("Uploaded path:", path);

      setFileName(file.name);
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div>
      <label className="mb-3 block text-[18px] font-semibold text-[#4b4b48]">
        Your resume (PDF)
      </label>

      <div
        {...getRootProps()}
        className={`flex h-[270px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition ${
          isDragActive
            ? "border-[#184f95] bg-[#f3f8ff]"
            : "border-[#d9d7d0] bg-white hover:border-[#184f95]"
        }`}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <>
            <Loader2 size={50} className="animate-spin text-[#184f95]" />

            <h3 className="mt-6 text-[20px] font-semibold text-[#4b4b48]">
              Uploading...
            </h3>
          </>
        ) : (
          <>
            <FileText size={54} strokeWidth={1.8} className="text-[#8b897f]" />

            <h3 className="mt-6 text-[20px] font-semibold text-[#4b4b48]">
              {fileName || "Drop your PDF here"}
            </h3>

            <p className="mt-2 text-[18px] text-[#898781]">
              {fileName ? "Click to replace" : "or click to browse"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
