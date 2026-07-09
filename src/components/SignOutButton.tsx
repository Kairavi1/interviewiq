import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition hover:bg-[#f7f6f2]">
        <LogOut size={18} />
        Sign out
      </button>
    </form>
  );
}
