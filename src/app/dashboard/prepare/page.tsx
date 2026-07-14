"use client";

import { useState } from "react";
import ResumeDropzone from "@/src/components/ResumeDropzone";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { generateInterview } from "@/src/actions/generateInterview";
import { useRouter } from "next/navigation";

export default function PreparePage() {
  const [resume, setResume] = useState<File | null>(null);
  const [resumePath, setResumePath] = useState("");

  const [jobDescription, setJobDescription] = useState("");
  const [seniority, setSeniority] = useState("MID");
  const [focusArea, setFocusArea] = useState("ALL");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-[#3d3d3a]">New session</h1>

      <p className="mt-2 text-base font-medium text-[#898781]">
        Upload your resume and paste the job description to generate tailored
        questions.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <ResumeDropzone
          onFileSelect={(file, path) => {
            setResume(file);
            setResumePath(path);
          }}
        />

        <div>
          <h2 className="mb-3 text-[20px] font-semibold text-[#3d3d3a]">
            Job description
          </h2>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="h-[270px] w-full resize-none rounded-3xl border border-[#e4e2dc] bg-white p-6 text-lg placeholder:text-[#b1afaa] focus:border-[#184f95] focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-[#e8e5dd] bg-white p-8">
        <div className="mb-8 flex items-center gap-3">
          <SlidersHorizontal
            size={28}
            strokeWidth={2.2}
            className="text-[#52514e]"
          />

          <h2 className="text-xl font-bold text-[#3d3d3a]">Session settings</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-3 block text-[20px] font-semibold text-[#52514e]">
              Seniority level
            </label>

            <select
              value={seniority}
              onChange={(e) =>
                setSeniority(e.target.value as "JUNIOR" | "MID" | "SENIOR")
              }
              className="h-12 w-full rounded-2xl border border-[#e6e3db] bg-white px-6 text-lg font-medium text-[#3d3d3a] outline-none focus:border-[#184f95]"
            >
              <option value="JUNIOR">Junior (0–2 yrs)</option>
              <option value="MID">Mid-level (2–5 yrs)</option>
              <option value="SENIOR">Senior (5+ yrs)</option>
            </select>
          </div>

          <div>
            <label className="mb-3 block text-[20px] font-semibold text-[#52514e]">
              Focus area
            </label>

            <select
              value={focusArea}
              onChange={(e) =>
                setFocusArea(
                  e.target.value as "ALL" | "TECHNICAL" | "BEHAVIORAL",
                )
              }
              className="h-12 w-full rounded-2xl border border-[#e6e3db] bg-white px-6 text-lg font-medium text-[#3d3d3a] outline-none focus:border-[#184f95]"
            >
              <option value="ALL">All categories</option>
              <option value="TECHNICAL">Technical only</option>
              <option value="BEHAVIORAL">Behavioral only</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[16px] font-medium text-[#898781]">
            12 questions will be generated across 4 categories.
          </p>

          <button
            disabled={loading}
            onClick={async () => {
              if (loading) return;

              if (!resume) {
                alert("Please upload your resume.");
                return;
              }

              if (!jobDescription.trim()) {
                alert("Please paste the job description.");
                return;
              }

              try {
                setLoading(true);

                const formData = new FormData();

                formData.append("resume", resume);
                formData.append("jobDescription", jobDescription);
                formData.append("seniority", seniority);
                formData.append("focusArea", focusArea);

                const result = await generateInterview(formData);

                if (result.success) {
                  sessionStorage.setItem(
                    "interview",
                    JSON.stringify(result.interview),
                  );

                  router.push("/dashboard/interview");
                }
              } catch (err) {
                console.error(err);
              } finally {
                setLoading(false);
              }
            }}
            className={`flex h-14 items-center gap-3 rounded-2xl border border-[#e6e3db] bg-white px-8 text-[20px] font-semibold text-[#1a1a1a] transition-colors ${
              loading ? "cursor-not-allowed opacity-60" : "hover:bg-[#f8f8f6]"
            }`}
          >
            <Sparkles size={22} strokeWidth={2.2} />

            {loading ? "Generating..." : "Generate questions"}
          </button>
        </div>
      </div>
    </div>
  );
}
