"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wifi,
  WifiOff,
  Sun,
  Moon,
  Contrast,
  Search,
  Bell,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface HeaderBarProps {
  currentLocationName?: string;
}

export function HeaderBar({ currentLocationName = "Joint Base Andrews (Public Ref)" }: HeaderBarProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark" | "high-contrast">("dark");
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial timestamp
    setLastRefreshed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.remove("dark", "high-contrast");

    if (theme === "dark") {
      setTheme("high-contrast");
      root.classList.add("high-contrast");
    } else if (theme === "high-contrast") {
      setTheme("light");
    } else {
      setTheme("dark");
      root.classList.add("dark");
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between gap-4">
      {/* Brand & Active Location */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-105 transition-transform">
            C+
          </div>
          <div>
            <span className="font-bold tracking-tight text-base sm:text-lg text-foreground block leading-none">
              CHART<span className="text-primary font-black">+</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-mono">
              OEH Decision Suite
            </span>
          </div>
        </Link>

        {/* Selected Installation Context */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs text-muted-foreground border border-border">
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="font-medium text-foreground">{currentLocationName}</span>
          <span className="text-[10px] opacity-75">(Public Grid)</span>
        </div>
      </div>

      {/* Global Status Indicators & Theme Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Offline / Online Status */}
        {isOnline ? (
          <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            <Wifi className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-medium">Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 animate-pulse">
            <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-semibold">Offline Core Active</span>
          </div>
        )}

        {/* Data Freshness Indicator */}
        <div className="hidden md:flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
          <RefreshCw className="w-3 h-3" />
          <span>Synced: {lastRefreshed}</span>
        </div>

        {/* Theme Toggle (Light / Dark / High-Contrast) */}
        <button
          onClick={toggleTheme}
          aria-label={`Current theme: ${theme}. Click to switch theme.`}
          className="p-2 rounded-md hover:bg-muted text-foreground transition-colors border border-border"
          title={`Theme: ${theme}`}
        >
          {theme === "dark" && <Moon className="w-4 h-4 text-sky-400" />}
          {theme === "high-contrast" && <Contrast className="w-4 h-4 text-yellow-400" />}
          {theme === "light" && <Sun className="w-4 h-4 text-amber-500" />}
        </button>

        {/* Help & Limits */}
        <Link
          href="/limitations"
          className="text-xs px-2.5 py-1.5 rounded-md bg-secondary hover:bg-muted text-foreground font-medium border border-border transition-colors hidden sm:inline-block"
        >
          Limitations
        </Link>
      </div>
    </header>
  );
}
