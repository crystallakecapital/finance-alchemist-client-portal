import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { syncUser } from "@/lib/user";
import { Logo } from "@/components/Logo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await syncUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/admin">
            <Logo variant="light" />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline font-mono text-xs text-amber uppercase tracking-wider">
              Admin
            </span>
            <Link href="/dashboard" className="text-white/70 hover:text-white">
              Dashboard
            </Link>
            <SignOutButton redirectUrl="/login">
              <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-md transition-colors">
                Odhlásiť sa
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
