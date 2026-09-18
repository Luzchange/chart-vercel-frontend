"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_PRIMARY_NAV } from "@/lib/navigation";
import { clsx } from "clsx";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-card/95 backdrop-blur-md z-50 flex items-center justify-around px-2"
    >
      {MOBILE_PRIMARY_NAV.map((item) => {
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
              "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-5 h-5 mb-1" aria-hidden="true" />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
