"use client";

import React, { useState } from "react";
import { Radio, AlertTriangle, ShieldCheck, ExternalLink, RefreshCw } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function PublicSituationalAwarenessPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Radio className="w-6 h-6 text-primary" />
              Public-Source Situational Awareness
            </h1>
            <StatusBadge type="public_signal" label="Open Feeds Only" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Aggregated open-source public alerts, NOAA weather watches, USGS seismic notices, and EPA Envirofacts.
          </p>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-amber-900 dark:text-amber-200 text-xs space-y-1">
        <span className="font-bold block uppercase tracking-wider text-[11px]">
          Public Information Safeguard Notice:
        </span>
        <p>
          Feeds are strictly restricted to public APIs and open public domain data. CHART+ never integrates classified, restricted, tactical movement, or sensitive operational command streams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">NOAA Weather Alerts (Region LWX)</span>
            <StatusBadge type="forecast" label="Live NWS" />
          </div>
          <p className="text-xs text-muted-foreground">
            No active severe convective or chemical plume alerts in current Maryland / DC capital grid. Heat advisory remains in effect for afternoon hours.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">EPA Envirofacts Public Registry</span>
            <StatusBadge type="authoritative" label="EPA Clean Air Act" />
          </div>
          <p className="text-xs text-muted-foreground">
            0 major industrial toxic chemical release alerts reported in adjacent commercial zones over the preceding 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
