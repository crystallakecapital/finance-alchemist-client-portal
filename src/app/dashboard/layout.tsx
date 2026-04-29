import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { syncUser } from "@/lib/user";
import { Logo } from "@/components/Logo";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await syncUser();
  if (!user) redirect("/login");

  let companyName: string | null = null;
  if (user.clientId) {
    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.id, user.clientId))
      .limit(1);
    if (client) companyName = client.companyName;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/dashboard">
            <Logo variant="light" />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-white">{user.email}</span>
              {companyName && (
                <span className="text-white/60 font-mono text-xs">
                  {companyName}
                </span>
              )}
            </div>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="text-amber hover:text-amber/80 text-sm font-medium"
              >
                Admin
              </Link>
            )}
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
      <footer className="border-t border-navy/10 py-6 text-center text-xs text-navy/50 font-mono">
        © {new Date().getFullYear()} Finance Alchemist
      </footer>
    </div>
  );
}
