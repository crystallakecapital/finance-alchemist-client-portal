import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { clients, portalItems } from "@/db/schema";
import { syncUser } from "@/lib/user";
import { QuickLinksWidget } from "@/components/widgets/QuickLinksWidget";
import { DeadlinesWidget } from "@/components/widgets/DeadlinesWidget";
import { WorkflowsWidget } from "@/components/widgets/WorkflowsWidget";
import { ContactsWidget } from "@/components/widgets/ContactsWidget";
import { DocumentsWidget } from "@/components/widgets/DocumentsWidget";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await syncUser();
  if (!user) redirect("/login");

  if (!user.clientId) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <h1 className="font-display text-2xl mb-3">
          Váš portál sa pripravuje
        </h1>
        <p className="text-navy/70">
          Kontaktujte nás na{" "}
          <a
            href="mailto:michal@financealchemist.sk"
            className="text-amber hover:underline font-medium"
          >
            michal@financealchemist.sk
          </a>
          .
        </p>
      </div>
    );
  }

  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, user.clientId))
    .limit(1);

  const items = await db
    .select()
    .from(portalItems)
    .where(eq(portalItems.clientId, user.clientId))
    .orderBy(asc(portalItems.sortOrder), asc(portalItems.createdAt));

  const bySection = (type: string) =>
    items.filter((i) => i.sectionType === type);

  const deadlines = bySection("deadline").sort((a, b) => {
    const da = a.deadlineDate ?? "9999-12-31";
    const db_ = b.deadlineDate ?? "9999-12-31";
    return da.localeCompare(db_);
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs text-navy/50 uppercase tracking-wider">
          Klientsky portál
        </p>
        <h1 className="font-display text-3xl mt-1">
          {client?.contactName ?? ""}
        </h1>
        {client?.companyName && (
          <p className="text-navy/60">{client.companyName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickLinksWidget items={bySection("quicklink")} />
        <DeadlinesWidget items={deadlines} />
        <WorkflowsWidget items={bySection("workflow")} />
        <ContactsWidget items={bySection("contact")} />
        <div className="lg:col-span-2">
          <DocumentsWidget items={bySection("document")} />
        </div>
      </div>
    </div>
  );
}
