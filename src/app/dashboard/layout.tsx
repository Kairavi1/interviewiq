import { auth } from "@/auth";
import DashboardHeader from "@/src/components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen bg-[#f9f9f7]">
      <DashboardHeader session={session} />

      {children}
    </main>
  );
}
