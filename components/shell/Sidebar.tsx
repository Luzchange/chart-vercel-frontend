"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import { clsx } from "clsx";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary Navigation"
      className="hidden md:flex flex-col w-64 border-r border-border bg-card/60 backdrop-blur-sm min-h-[calc(100vh-4rem)] p-3 select-none flex-shrink-0"
    >
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2">
        Workflows & Intelligence
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon
                className={clsx(
                  "w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Legacy Provenance Stamp */}
      <div className="pt-3 border-t border-border px-3 text-[11px] text-muted-foreground space-y-1">
        <div className="flex items-center justify-between">
          <span>Engine Model:</span>
          <span className="font-mono text-foreground font-medium">CHART+ v1.0</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Legacy Basis:</span>
          <span className="font-mono text-foreground">Jan 2018 Validated</span>
        </div>
      </div>
    </aside>
  );
}
