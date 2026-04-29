import type { PortalItem } from "@/db/schema";
import { daysUntil, formatDate } from "@/lib/format";

function badgeColor(days: number): string {
  if (days <= 0) return "bg-red-600 text-white";
  if (days <= 7) return "bg-amber text-navy";
  return "bg-navy text-white";
}

function daysLabel(days: number): string {
  if (days < 0) return `pred ${Math.abs(days)} dňami`;
  if (days === 0) return "dnes";
  if (days === 1) return "zajtra";
  return `o ${days} dní`;
}

export function DeadlinesWidget({ items }: { items: PortalItem[] }) {
  return (
    <section className="card">
      <h2 className="font-display text-xl mb-4">Deadliny</h2>
      {items.length === 0 ? (
        <p className="text-navy/50 text-sm">Žiadne deadliny.</p>
      ) : (
        <ul className="divide-y divide-navy/10">
          {items.map((item) => {
            const days = daysUntil(item.deadlineDate);
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <span className={`badge ${badgeColor(days)}`}>
                  {formatDate(item.deadlineDate)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-navy/50 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-xs font-mono text-navy/60 whitespace-nowrap">
                  {daysLabel(days)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
