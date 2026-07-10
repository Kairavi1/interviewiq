import ResumeDropzone from "@/src/components/ResumeDropzone";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function PreparePage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-[#3d3d3a]">New session</h1>

      <p className="mt-2 text-base font-medium text-[#898781]">
        Upload your resume and paste the job description to generate tailored
        questions.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <ResumeDropzone />

        {/* Job Description */}
        <div>
          <h2 className="mb-3 text-[20px] font-semibold text-[#3d3d3a]">
            Job description
          </h2>

          <textarea
            placeholder="Paste the full job description here..."
            className="h-[270px] w-full resize-none rounded-3xl border border-[#e4e2dc] bg-white p-6 text-lg placeholder:text-[#b1afaa] focus:border-[#184f95] focus:outline-none"
          />
        </div>
      </div>

      {/* Session Settings */}
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
              defaultValue="mid"
              className="h-12 w-full rounded-2xl border border-[#e6e3db] bg-white px-6 text-lg font-medium text-[#3d3d3a] outline-none focus:border-[#184f95]"
            >
              <option value="junior">Junior (0–2 yrs)</option>
              <option value="mid">Mid-level (2–5 yrs)</option>
              <option value="senior">Senior (5+ yrs)</option>
            </select>
          </div>

          <div>
            <label className="mb-3 block text-[20px] font-semibold text-[#52514e]">
              Focus area
            </label>

            <select
              defaultValue="all"
              className="h-12 w-full rounded-2xl border border-[#e6e3db] bg-white px-6 text-lg font-medium text-[#3d3d3a] outline-none focus:border-[#184f95]"
            >
              <option value="all">All categories</option>
              <option value="technical">Technical only</option>
              <option value="behavioral">Behavioral only</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[16px] font-medium text-[#898781]">
            12 questions will be generated across 4 categories.
          </p>

          <button className="flex h-14 items-center gap-3 rounded-2xl border border-[#e6e3db] bg-white px-8 text-[20px] font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f8f8f6]">
            <Sparkles size={22} strokeWidth={2.2} />
            Generate questions
          </button>
        </div>
      </div>
    </div>
  );
}
