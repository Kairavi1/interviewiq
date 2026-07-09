"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";

type Props = {
  session: any;
};

export default function DashboardHeader({ session }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const tabs = [
    {
      name: "Prepare",
      href: "/dashboard",
    },
    {
      name: "Interview",
      href: "/dashboard/interview",
    },
    {
      name: "Results",
      href: "/dashboard/results",
    },
    {
      name: "History",
      href: "/dashboard/history",
    },
  ];

  return (
    <header className="w-full border-b border-[#e8e5dd] bg-white">
      {/* Top */}
      <div className="mx-auto flex h-24 w-[95%] items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#cde2fb]">
            <Brain size={28} strokeWidth={2.5} className="text-[#184f95]" />
          </div>

          <h1 className="text-[24px] font-bold tracking-tight text-black">
            InterviewIQ
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <h2 className="text-[18px] font-medium text-[#4d4b47]">Sessions</h2>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="profile"
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d9d2ff] text-lg font-semibold text-[#5d46d8]">
                  {session?.user?.name?.charAt(0)}
                </div>
              )}

              <ChevronDown size={18} />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-[#e6e3db] bg-white p-2 shadow-xl">
                <div className="rounded-xl px-4 py-3">
                  <p className="font-semibold text-black">
                    {session?.user?.name}
                  </p>

                  <p className="mt-1 text-sm text-[#898781]">
                    {session?.user?.email}
                  </p>
                </div>

                <div className="my-2 h-px bg-[#eceae3]" />

                <form action="/api/auth/signout" method="post">
                  <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition hover:bg-[#f7f6f2]">
                    <LogOut size={18} />
                    Sign out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="mx-auto flex h-18 w-[95%] items-end gap-12">
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`border-b-[3px] pb-5 text-[20px] font-semibold transition ${
                active
                  ? "border-black text-black"
                  : "border-transparent text-[#898781] hover:text-black"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
