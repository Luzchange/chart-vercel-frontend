"use client";

import React, { useState } from "react";
import { Network, Building2, Users, Shield, Plus, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function OrganizationContextPage() {
  const [activeOrg, setActiveOrg] = useState("779th Aerospace Medicine Squadron");

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Network className="w-6 h-6 text-primary" />
              Organization & Installation Context
            </h1>
            <StatusBadge type="authoritative" label="Role Configuration" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure unit echelons, mission profiles, authorized chemical/rad officer rosters, and equipment inventories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-sm">Parent Installation</h3>
          </div>
          <p className="text-xs text-foreground font-semibold">Joint Base Andrews (MD)</p>
          <span className="text-[11px] text-muted-foreground font-mono block">DoD Base ID: JBA-2026</span>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-foreground text-sm">Assigned Unit</h3>
          </div>
          <p className="text-xs text-foreground font-semibold">{activeOrg}</p>
          <span className="text-[11px] text-muted-foreground font-mono block">Flight: Bioenvironmental Engineering</span>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-foreground text-sm">Operational Readiness</h3>
          </div>
          <p className="text-xs text-foreground font-semibold">Tier 1 CBRN Defense Ready</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block">● Instruments Calibrated</span>
        </div>
      </div>
    </div>
  );
}
