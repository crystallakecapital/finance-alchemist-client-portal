import type { PortalItem } from "@/db/schema";

export function QuickLinksWidget({ items }: { items: PortalItem[] }) {
  return (
    <section className="card">
      <h2 className="font-display text-xl mb-4">Rýchle odkazy</h2>
      {items.length === 0 ? (
        <p className="text-navy/50 text-sm">Zatiaľ žiadne odkazy.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 border-hairline border-navy/10 rounded-lg px-4 py-3 hover:border-amber hover:bg-amber/5 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber" />
                  <span className="font-medium">{item.title}</span>
                </span>
                <span className="text-navy/40 group-hover:text-amber transition-colors">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
