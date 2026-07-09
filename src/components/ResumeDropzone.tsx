"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText } from "lucide-react";

export default function ResumeDropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    // later:
    // upload to server
    // parse PDF
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
        className={`flex h-[270px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition
        ${
          isDragActive
            ? "border-[#184f95] bg-[#f3f8ff]"
            : "border-[#d9d7d0] bg-white hover:border-[#184f95]"
        }`}
      >
        <input {...getInputProps()} />

        <FileText size={54} strokeWidth={1.8} className="text-[#8b897f]" />

        <h3 className="mt-6 text-[20px] font-semibold text-[#4b4b48]">
          {isDragActive ? "Drop your PDF here" : "Drop your PDF here"}
        </h3>

        <p className="mt-2 text-[18px] text-[#898781]">or click to browse</p>
      </div>
    </div>
  );
}
