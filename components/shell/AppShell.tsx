"use client";

import React from "react";
import { HeaderBar } from "./HeaderBar";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { HighConsequenceDisclaimer } from "./HighConsequenceDisclaimer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* High-Consequence Mandatory Disclaimer Banner */}
      <HighConsequenceDisclaimer />

      {/* Global Header */}
      <HeaderBar />

      {/* Main Container */}
      <div className="flex-1 flex max-w-full">
        {/* Desktop / Tablet Sidebar */}
        <Sidebar />

        {/* Primary Page Canvas */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
