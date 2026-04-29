import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type User } from "@/db/schema";

export async function syncUser(): Promise<User | null> {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    "";

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUser.id))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const [created] = await db
    .insert(users)
    .values({
      clerkUserId: clerkUser.id,
      email,
      role: "client",
      clientId: null,
    })
    .returning();

  return created;
}

export async function requireAdmin(): Promise<User> {
  const user = await syncUser();
  if (!user || user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return user;
}
