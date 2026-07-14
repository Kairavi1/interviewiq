"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText } from "lucide-react";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function ResumeDropzone({ onFileSelect }: Props) {
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      setFileName(file.name);
      onFileSelect(file);
    },
    [onFileSelect],
  );

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

        <FileText size={54} strokeWidth={1.8} className="text-[#8b897f]" />

        <h3 className="mt-6 text-[20px] font-semibold text-[#4b4b48]">
          {fileName || "Drop your PDF here"}
        </h3>

        <p className="mt-2 text-[18px] text-[#898781]">
          {fileName ? "Click to replace" : "or click to browse"}
        </p>
      </div>
    </div>
  );
}
