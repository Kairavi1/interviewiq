"use client";

import { useEffect, useState } from "react";
import { getInterviewHistory } from "@/src/actions/getInterviewHistory";
import { Building2, CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getInterviewHistory();
        setSessions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-[#3d3d3a]">Session History</h1>

        <p className="mt-4 text-[#898781]">Loading your interviews...</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-[#3d3d3a]">Session History</h1>

      <p className="mt-2 text-[#898781]">
        View all your previous AI interview sessions.
      </p>

      <div className="mt-8 space-y-5">
        {sessions.length === 0 ? (
          <div className="rounded-3xl border border-[#e6e3db] bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-[#3d3d3a]">
              No interview sessions yet
            </h2>

            <p className="mt-2 text-[#898781]">
              Complete your first interview to see it here.
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <Link key={session.id} href={`/dashboard/history/${session.id}`}>
              <div className="cursor-pointer rounded-3xl border border-[#e6e3db] bg-white p-6 transition hover:border-[#184f95] hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#3d3d3a]">
                      {session.role}
                    </h2>

                    <div className="mt-2 flex items-center gap-6 text-sm text-[#898781]">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} />

                        {session.company}
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />

                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-[#898781]">
                        Overall
                      </p>

                      <h2 className="text-3xl font-bold text-[#184f95]">
                        {session.overallScore ?? "-"}
                      </h2>
                    </div>

                    <ChevronRight size={22} className="text-[#898781]" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
