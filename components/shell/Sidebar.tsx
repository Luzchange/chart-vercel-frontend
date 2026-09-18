"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import { clsx } from "clsx";
import { Smartphone, Download } from "lucide-react";

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
      <div className="pt-3 border-t border-border px-3 text-[11px] text-muted-foreground space-y-1.5">
        <div className="flex items-center justify-between">
          <span>Engine Model:</span>
          <span className="font-mono text-foreground font-medium">CHART+ v1.0</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span>Legacy Basis:</span>
            <span className="font-mono text-foreground font-semibold">Jan 2018 Validated</span>
          </div>
          <div className="text-[10px] text-primary/90 font-medium">
            Original Tool Developed by Mike Golf
          </div>
        </div>

        <a
          href="/CHART-plus-v0.01.apk"
          download="CHART-plus-v0.01.apk"
          className="mt-2 flex items-center justify-between px-2 py-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors text-[10px] font-semibold"
          title="Download CHART+ Android APK v0.01 for Phone & Tablet"
        >
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" />
            Android APK (v0.01)
          </span>
          <Download className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
}
