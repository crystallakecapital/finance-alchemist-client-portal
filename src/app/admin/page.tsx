import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { clients, portalItems, users } from "@/db/schema";
import { ClientPicker } from "@/components/admin/ClientPicker";
import { ClientsManager } from "@/components/admin/ClientsManager";
import { UsersManager } from "@/components/admin/UsersManager";
import { SectionEditor } from "@/components/admin/SectionEditor";
import type { SectionType } from "@/db/schema";

export const dynamic = "force-dynamic";

const SECTIONS: SectionType[] = [
  "quicklink",
  "deadline",
  "workflow",
  "contact",
  "document",
];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { client?: string; edit?: string };
}) {
  const allClients = await db
    .select()
    .from(clients)
    .orderBy(asc(clients.companyName));

  const allUsers = await db.select().from(users).orderBy(asc(users.email));

  const selectedClientId =
    searchParams.client && allClients.some((c) => c.id === searchParams.client)
      ? searchParams.client
      : null;

  const items = selectedClientId
    ? await db
        .select()
        .from(portalItems)
        .where(eq(portalItems.clientId, selectedClientId))
        .orderBy(asc(portalItems.sortOrder), asc(portalItems.createdAt))
    : [];

  const editingId = searchParams.edit ?? null;

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs text-amber uppercase tracking-wider">
          Admin
        </p>
        <h1 className="font-display text-3xl mt-1">Správa portálu</h1>
      </div>

      <div className="card">
        <ClientPicker clients={allClients} selectedId={selectedClientId} />
        {!selectedClientId && (
          <p className="mt-3 text-sm text-navy/60">
            Vyberte klienta pre úpravu obsahu jeho portálu.
          </p>
        )}
      </div>

      {selectedClientId && (
        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <div key={section} id={section}>
              <SectionEditor
                clientId={selectedClientId}
                section={section}
                items={items.filter((i) => i.sectionType === section)}
                editingId={editingId}
              />
            </div>
          ))}
        </div>
      )}

      <ClientsManager clients={allClients} />
      <UsersManager users={allUsers} clients={allClients} />
    </div>
  );
}
