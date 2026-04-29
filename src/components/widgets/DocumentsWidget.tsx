import type { PortalItem } from "@/db/schema";

export function DocumentsWidget({ items }: { items: PortalItem[] }) {
  return (
    <section className="card">
      <h2 className="font-display text-xl mb-4">Dokumenty</h2>
      {items.length === 0 ? (
        <p className="text-navy/50 text-sm">Žiadne dokumenty.</p>
      ) : (
        <ul className="divide-y divide-navy/10">
          {items.map((item) => (
            <li key={item.id} className="py-3 first:pt-0 last:pb-0">
              <a
                href={item.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="text-amber text-lg" aria-hidden>
                  ▤
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-amber transition-colors truncate">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-xs text-navy/50 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-navy/40 group-hover:text-amber">↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
