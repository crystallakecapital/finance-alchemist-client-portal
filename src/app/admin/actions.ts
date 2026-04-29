"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clients, portalItems } from "@/db/schema";
import { requireAdmin } from "@/lib/user";

function str(value: FormDataEntryValue | null): string | null {
  if (value === null) return null;
  const s = String(value).trim();
  return s.length === 0 ? null : s;
}

function required(value: FormDataEntryValue | null, name: string): string {
  const s = str(value);
  if (!s) throw new Error(`Pole "${name}" je povinné.`);
  return s;
}

export async function createClient(formData: FormData) {
  await requireAdmin();
  await db.insert(clients).values({
    companyName: required(formData.get("companyName"), "Názov firmy"),
    contactName: required(formData.get("contactName"), "Kontaktná osoba"),
  });
  revalidatePath("/admin");
}

export async function updateClient(formData: FormData) {
  await requireAdmin();
  const id = required(formData.get("id"), "id");
  await db
    .update(clients)
    .set({
      companyName: required(formData.get("companyName"), "Názov firmy"),
      contactName: required(formData.get("contactName"), "Kontaktná osoba"),
    })
    .where(eq(clients.id, id));
  revalidatePath("/admin");
}

export async function deleteClient(formData: FormData) {
  await requireAdmin();
  const id = required(formData.get("id"), "id");
  await db.delete(clients).where(eq(clients.id, id));
  revalidatePath("/admin");
}

export async function createPortalItem(formData: FormData) {
  await requireAdmin();
  const clientId = required(formData.get("clientId"), "clientId");
  const sectionType = required(formData.get("sectionType"), "sectionType");
  await db.insert(portalItems).values({
    clientId,
    sectionType,
    title: required(formData.get("title"), "Názov"),
    url: str(formData.get("url")),
    description: str(formData.get("description")),
    deadlineDate: str(formData.get("deadlineDate")),
    responsiblePerson: str(formData.get("responsiblePerson")),
    status: str(formData.get("status")),
    sortOrder: Number(str(formData.get("sortOrder")) ?? "0") || 0,
  });
  revalidatePath("/admin");
}

export async function updatePortalItem(formData: FormData) {
  await requireAdmin();
  const id = required(formData.get("id"), "id");
  await db
    .update(portalItems)
    .set({
      title: required(formData.get("title"), "Názov"),
      url: str(formData.get("url")),
      description: str(formData.get("description")),
      deadlineDate: str(formData.get("deadlineDate")),
      responsiblePerson: str(formData.get("responsiblePerson")),
      status: str(formData.get("status")),
      sortOrder: Number(str(formData.get("sortOrder")) ?? "0") || 0,
    })
    .where(eq(portalItems.id, id));
  revalidatePath("/admin");
}

export async function deletePortalItem(formData: FormData) {
  await requireAdmin();
  const id = required(formData.get("id"), "id");
  await db.delete(portalItems).where(eq(portalItems.id, id));
  revalidatePath("/admin");
}
