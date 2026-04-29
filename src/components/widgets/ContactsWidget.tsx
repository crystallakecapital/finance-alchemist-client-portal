import type { PortalItem } from "@/db/schema";

export function ContactsWidget({ items }: { items: PortalItem[] }) {
  return (
    <section className="card">
      <h2 className="font-display text-xl mb-4">Kontakty &amp; zodpovednosti</h2>
      {items.length === 0 ? (
        <p className="text-navy/50 text-sm">Žiadne kontakty.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="border-hairline border-navy/10 rounded-lg p-4"
            >
              <p className="font-semibold text-navy">{item.title}</p>
              {item.description && (
                <p className="text-amber text-xs uppercase tracking-wide mt-0.5">
                  {item.description}
                </p>
              )}
              {item.url && (
                <a
                  href={`mailto:${item.url}`}
                  className="block mt-2 text-sm text-navy/80 hover:text-amber break-all"
                >
                  {item.url}
                </a>
              )}
              {item.responsiblePerson && (
                <a
                  href={`tel:${item.responsiblePerson}`}
                  className="block text-sm text-navy/80 hover:text-amber font-mono"
                >
                  {item.responsiblePerson}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
