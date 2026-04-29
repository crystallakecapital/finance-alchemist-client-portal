import type { PortalItem, SectionType } from "@/db/schema";
import { deletePortalItem } from "@/app/admin/actions";
import { ConfirmSubmit } from "./ConfirmSubmit";
import { Collapsible } from "./Collapsible";
import { PortalItemForm } from "./PortalItemForm";

const SECTION_TITLES: Record<SectionType, string> = {
  quicklink: "Rýchle odkazy",
  deadline: "Deadliny",
  workflow: "Workflowy",
  contact: "Kontakty",
  document: "Dokumenty",
};

export function SectionEditor({
  clientId,
  section,
  items,
  editingId,
}: {
  clientId: string;
  section: SectionType;
  items: PortalItem[];
  editingId: string | null;
}) {
  return (
    <section className="card">
      <h3 className="font-display text-xl mb-4">{SECTION_TITLES[section]}</h3>

      {items.length === 0 ? (
        <p className="text-navy/50 text-sm mb-4">Zatiaľ žiadne položky.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {items.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <li
                key={item.id}
                className="border-hairline border-navy/10 rounded-lg p-3"
              >
                {isEditing ? (
                  <PortalItemForm
                    clientId={clientId}
                    section={section}
                    item={item}
                    onCancelHref={`/admin?client=${clientId}`}
                  />
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-xs text-navy/50 font-mono truncate">
                        {item.url ?? item.deadlineDate ?? item.status ?? ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`/admin?client=${clientId}&edit=${item.id}#${section}`}
                        className="btn-secondary text-sm px-3 py-1"
                      >
                        Upraviť
                      </a>
                      <form action={deletePortalItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <ConfirmSubmit
                          message="Naozaj zmazať túto položku?"
                          className="btn-danger"
                        >
                          Zmazať
                        </ConfirmSubmit>
                      </form>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Collapsible title="+ Pridať novú položku">
        <PortalItemForm clientId={clientId} section={section} />
      </Collapsible>
    </section>
  );
}
