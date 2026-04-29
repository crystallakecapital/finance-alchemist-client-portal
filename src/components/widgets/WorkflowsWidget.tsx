import type { PortalItem } from "@/db/schema";
import { formatDate } from "@/lib/format";

const STATUS_MAP: Record<string, { className: string; label: string }> = {
  active: { className: "bg-green-100 text-green-800", label: "● prebieha" },
  pending: { className: "bg-amber/20 text-amber", label: "◷ čaká" },
  done: { className: "bg-purple-100 text-purple-800", label: "✓ hotovo" },
};

export function WorkflowsWidget({ items }: { items: PortalItem[] }) {
  return (
    <section className="card">
      <h2 className="font-display text-xl mb-4">Aktívne workflowy</h2>
      {items.length === 0 ? (
        <p className="text-navy/50 text-sm">Žiadne aktívne workflowy.</p>
      ) : (
        <ul className="divide-y divide-navy/10">
          {items.map((item) => {
            const status =
              STATUS_MAP[item.status ?? ""] ?? {
                className: "bg-navy/10 text-navy",
                label: item.status ?? "—",
              };
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <span className={`badge ${status.className}`}>
                  {status.label}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                </div>
                {item.deadlineDate && (
                  <span className="font-mono text-xs text-navy/60 whitespace-nowrap">
                    {formatDate(item.deadlineDate)}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
