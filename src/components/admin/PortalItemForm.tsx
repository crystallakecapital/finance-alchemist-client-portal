import type { PortalItem, SectionType } from "@/db/schema";
import {
  createPortalItem,
  updatePortalItem,
} from "@/app/admin/actions";

const FIELD_BY_SECTION: Record<
  SectionType,
  Array<"title" | "url" | "description" | "deadlineDate" | "responsiblePerson" | "status">
> = {
  quicklink: ["title", "url"],
  deadline: ["title", "deadlineDate", "status", "description"],
  workflow: ["title", "status", "deadlineDate"],
  contact: ["title", "description", "url", "responsiblePerson"],
  document: ["title", "url", "description"],
};

const LABELS: Record<string, string> = {
  title: "Názov",
  url: "URL",
  description: "Popis",
  deadlineDate: "Termín",
  responsiblePerson: "Zodpovedná osoba",
  status: "Stav",
};

const STATUS_OPTIONS: Record<string, { value: string; label: string }[]> = {
  workflow: [
    { value: "active", label: "prebieha" },
    { value: "pending", label: "čaká" },
    { value: "done", label: "hotovo" },
  ],
  deadline: [
    { value: "open", label: "otvorený" },
    { value: "done", label: "splnený" },
  ],
};

function labelFor(section: SectionType, field: string): string {
  if (section === "contact") {
    if (field === "title") return "Meno";
    if (field === "description") return "Pozícia";
    if (field === "url") return "Email";
    if (field === "responsiblePerson") return "Telefón";
  }
  return LABELS[field] ?? field;
}

function inputType(field: string): string {
  if (field === "deadlineDate") return "date";
  if (field === "url") return "text";
  return "text";
}

export function PortalItemForm({
  clientId,
  section,
  item,
  onCancelHref,
}: {
  clientId: string;
  section: SectionType;
  item?: PortalItem;
  onCancelHref?: string;
}) {
  const fields = FIELD_BY_SECTION[section];
  const action = item ? updatePortalItem : createPortalItem;
  const statusOptions = STATUS_OPTIONS[section];

  return (
    <form action={action} className="space-y-3">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="clientId" value={clientId} />
      <input type="hidden" name="sectionType" value={section} />

      {fields.map((field) => {
        const label = labelFor(section, field);
        const defaultValue =
          item && field in item ? (item[field as keyof PortalItem] ?? "") : "";

        if (field === "status" && statusOptions) {
          return (
            <div key={field}>
              <label className="label">{label}</label>
              <select
                name={field}
                defaultValue={String(defaultValue)}
                className="input"
              >
                <option value="">—</option>
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field === "description" && section === "deadline") {
          return (
            <div key={field}>
              <label className="label">{label}</label>
              <textarea
                name={field}
                defaultValue={String(defaultValue)}
                className="input min-h-[80px]"
              />
            </div>
          );
        }

        return (
          <div key={field}>
            <label className="label">{label}</label>
            <input
              type={inputType(field)}
              name={field}
              defaultValue={String(defaultValue ?? "")}
              className="input"
              required={field === "title"}
            />
          </div>
        );
      })}

      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-amber">
          {item ? "Uložiť zmeny" : "Pridať"}
        </button>
        {onCancelHref && (
          <a href={onCancelHref} className="btn-secondary">
            Zrušiť
          </a>
        )}
      </div>
    </form>
  );
}
