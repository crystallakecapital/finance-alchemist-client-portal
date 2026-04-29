"use client";

import { useState } from "react";

export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-hairline border-navy/10 rounded-lg bg-white">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium hover:bg-navy/5"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <span className="text-navy/40">{open ? "▾" : "▸"}</span>
      </button>
      {open && <div className="p-4 border-t border-navy/10">{children}</div>}
    </div>
  );
}
