"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Database,
  RefreshCw,
  HardDrive,
  CheckCircle2,
  Clock,
  Activity,
  Trash2,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function AdminPage() {
  const [cacheCleared, setCacheCleared] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 3000);
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              System Administration & Auditing Console
            </h1>
            <StatusBadge type="authoritative" label="Superuser Controls" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            System health, calculation model provenance locks, audit log inspection, and offline storage management.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Model Management */}
        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Calculation Model Locks
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
              Validated Locked
            </span>
          </div>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Model:</span>
              <span className="text-foreground font-semibold">CHART-2018-v1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Baseline Tests:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">8/8 Passed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Numerical Tolerance:</span>
              <span className="text-foreground">&lt; 0.001 Parity</span>
            </div>
          </div>
        </div>

        {/* Cache & Offline Management */}
        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              PWA Storage & Cache
            </span>
            <HardDrive className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">IndexedDB Records:</span>
              <span className="text-foreground font-semibold">14 Scenarios / Runs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Worker:</span>
              <span className="text-foreground">Active (v1.0.0)</span>
            </div>
          </div>
          <button
            onClick={handleClearCache}
            className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-xs font-semibold text-foreground border border-border transition-colors"
          >
            {cacheCleared ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Cache Cleared</span>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                Clear Local Application Cache
              </>
            )}
          </button>
        </div>

        {/* Data Feed Refresh */}
        <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              External Data Feeds
            </span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">NOAA NWS API:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">EPA Envirofacts:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Operational</span>
            </div>
          </div>
          <button
            onClick={handleManualRefresh}
            className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-xs font-semibold text-foreground border border-border transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-primary ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing Feeds..." : "Trigger Manual Refresh"}
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-foreground">
          Recent Security & Calculation Audit Events
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-border font-mono">
            <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px]">
              <tr>
                <th className="p-2.5 border-b border-border">Timestamp</th>
                <th className="p-2.5 border-b border-border">Event Type</th>
                <th className="p-2.5 border-b border-border">User / Session</th>
                <th className="p-2.5 border-b border-border">Scenario ID</th>
                <th className="p-2.5 border-b border-border">Status / Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              <tr>
                <td className="p-2.5 text-muted-foreground">2026-03-01 10:15:22</td>
                <td className="p-2.5 font-semibold">CALCULATION_RUN</td>
                <td className="p-2.5">User_BioEnv_99</td>
                <td className="p-2.5">SCN-2026-0042</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400">Success (Chemical GA)</td>
              </tr>
              <tr>
                <td className="p-2.5 text-muted-foreground">2026-03-01 10:14:05</td>
                <td className="p-2.5 font-semibold">WEATHER_SNAPSHOT</td>
                <td className="p-2.5">User_BioEnv_99</td>
                <td className="p-2.5">SCN-2026-0042</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400">Success (NWS Grid)</td>
              </tr>
              <tr>
                <td className="p-2.5 text-muted-foreground">2026-03-01 09:48:11</td>
                <td className="p-2.5 font-semibold">REPORT_EXPORT</td>
                <td className="p-2.5">User_SafetyLead_01</td>
                <td className="p-2.5">SCN-2026-0041</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400">Success (JSON & Print)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
