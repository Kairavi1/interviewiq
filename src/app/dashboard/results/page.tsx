"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("results");

    console.log("Stored results:", stored);

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      setResults(parsed.evaluation);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleNewSession = () => {
    sessionStorage.removeItem("interview");
    sessionStorage.removeItem("results");

    router.push("/dashboard/prepare");
  };

  if (!results) {
    return <div className="p-10 text-xl font-semibold">Loading results...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-[#3d3d3a]">Session Results</h1>

      <p className="mt-2 text-[#898781]">
        AI evaluation of your interview performance.
      </p>

      {/* Score Cards */}

      <div className="mt-8 grid grid-cols-4 gap-6">
        <div className="rounded-3xl border border-[#e6e3db] bg-white p-6">
          <p className="text-sm font-semibold text-[#898781]">OVERALL</p>

          <h2 className="mt-1 text-5xl font-bold text-[#184f95]">
            {results.overallScore}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#e6e3db] bg-white p-6">
          <p className="text-sm font-semibold text-[#898781]">TECHNICAL</p>

          <h2 className="mt-1 text-5xl font-bold text-[#184f95]">
            {results.categoryScores.technical}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#e6e3db] bg-white p-6">
          <p className="text-sm font-semibold text-[#898781]">BEHAVIORAL</p>

          <h2 className="mt-1 text-5xl font-bold text-[#016301]">
            {results.categoryScores.behavioral}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#e6e3db] bg-white p-6">
          <p className="text-sm font-semibold text-[#898781]">CULTURE FIT</p>

          <h2 className="mt-1 text-5xl font-bold text-[#744500]">
            {results.categoryScores.cultureFit}
          </h2>
        </div>
      </div>

      {/* Feedback */}

      <div className="mt-8 space-y-8">
        {results.feedback.map((item: any, index: number) => (
          <div
            key={index}
            className="rounded-3xl border border-[#e6e3db] bg-white p-8"
          >
            <div className="flex items-start justify-between">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  item.category === "TECHNICAL"
                    ? "bg-[#cde2fb] text-[#184f95]"
                    : item.category === "BEHAVIORAL"
                      ? "bg-[#caeac7] text-[#016301]"
                      : item.category === "SYSTEM_DESIGN"
                        ? "bg-[#cde2fb] text-[#184f95]"
                        : "bg-[#f9dca4] text-[#744500]"
                }`}
              >
                {item.category.replace("_", " ")}
              </span>

              <div className="text-right">
                <h2
                  className={`text-2xl font-bold ${
                    item.score >= 8
                      ? "text-[#016301]"
                      : item.score >= 5
                        ? "text-[#7b4f12]"
                        : "text-[#b42318]"
                  }`}
                >
                  {item.score}
                </h2>

                <p className="text-sm text-[#898781]">/10</p>
              </div>
            </div>

            <h2 className="mt-3 text-xl font-semibold text-[#3d3d3a]">
              {item.question}
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#caeac7] p-5">
                <h3 className="text-sm font-semibold text-[#016301]">
                  What worked
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#016301]">
                  {item.worked}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f9dca4] p-5">
                <h3 className="text-sm font-semibold text-[#744500]">
                  Missing
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#744500]">
                  {item.missing}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#f7f7f5] p-5">
              <h3 className="text-sm font-semibold text-[#898781]">Tip</h3>

              <p className="mt-2 text-sm leading-6 text-[#52514e]">
                {item.tip}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* New Session */}

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleNewSession}
          className="rounded-2xl bg-[#184f95] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#143d73]"
        >
          New Session
        </button>
      </div>
    </div>
  );
}
