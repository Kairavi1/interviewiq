import { signIn } from "@/auth";
import { Brain } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-1 mt-5 w-[95%] mx-auto z-10">
      <div className="h-22 rounded-xl bg-white px-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#cde2fb]">
            <Brain size={24} strokeWidth={2.5} className="text-[#184f95]" />
          </div>

          <h1
            className="text-2xl font-bold
           tracking-tight text-zinc-900"
          >
            InterviewIQ
          </h1>
        </div>

        <form
          action={async () => {
            "use server";

            await signIn("google", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <button
            type="submit"
            className="flex h-13 items-center gap-3 rounded-xl border border-zinc-300 bg-white px-5 text-[20px] font-semibold text-black transition-colors duration-200 hover:bg-zinc-50"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </button>
        </form>
      </div>
    </header>
  );
}
