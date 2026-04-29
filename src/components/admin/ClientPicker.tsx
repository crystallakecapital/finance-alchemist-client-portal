"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Client } from "@/db/schema";

export function ClientPicker({
  clients,
  selectedId,
}: {
  clients: Client[];
  selectedId: string | null;
}) {
  const router = useRouter();
  const params = useSearchParams();

  if (clients.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-navy/80">Klient:</label>
      <select
        className="input max-w-xs"
        value={selectedId ?? ""}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          if (e.target.value) {
            next.set("client", e.target.value);
          } else {
            next.delete("client");
          }
          router.push(`/admin?${next.toString()}`);
        }}
      >
        <option value="">— Vyberte klienta —</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.companyName} ({c.contactName})
          </option>
        ))}
      </select>
    </div>
  );
}
