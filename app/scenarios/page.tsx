"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Plus,
  FileText,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  SunMedium,
  Radiation,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ScenarioItem {
  id: string;
  title: string;
  installation: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
  riskSummary: string;
  attachedCalculationsCount: number;
  hasWeatherSnapshot: boolean;
}

const SAMPLE_SCENARIOS: ScenarioItem[] = [
  {
    id: "SCN-2026-0042",
    title: "Joint Base Perimeter Air Sampling & Heat Stress Review",
    installation: "Joint Base Andrews (MD)",
    status: "active",
    createdAt: "2026-03-01 08:30",
    updatedAt: "2026-03-01 10:15",
    riskSummary: "Amber Flag Heat Stress (85.1°F WBGT) + Low Alpha Particulate (<20 dpm/m³)",
    attachedCalculationsCount: 2,
    hasWeatherSnapshot: true,
  },
  {
    id: "SCN-2026-0041",
    title: "Depot Chemical Vapor Monitoring Exercise - Sarin Simulant",
    installation: "Wright-Patterson Air Force Base (OH)",
    status: "draft",
    createdAt: "2026-02-28 14:00",
    updatedAt: "2026-02-28 16:45",
    riskSummary: "Toxic load evaluated under moderate workload conditions. MOPP gear verified.",
    attachedCalculationsCount: 3,
    hasWeatherSnapshot: true,
  },
  {
    id: "SCN-2026-0039",
    title: "Industrial Radiography Field Inspection & Perimeter Survey",
    installation: "Naval Station Norfolk (VA)",
    status: "archived",
    createdAt: "2026-02-15 09:00",
    updatedAt: "2026-02-15 17:30",
    riskSummary: "Stay times calculated for 0.050 Rad OEG. All doses remained within ALARA limits.",
    attachedCalculationsCount: 1,
    hasWeatherSnapshot: false,
  },
];

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(SAMPLE_SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem>(SAMPLE_SCENARIOS[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FolderGit2 className="w-6 h-6 text-primary" />
              Scenarios & Case Management Workspace
            </h1>
            <StatusBadge type="authoritative" label="Audit Logging" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Multi-step operational scenario documentation, attached exposure runs, weather snapshots, and immutable revision tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary text-foreground text-xs sm:text-sm font-semibold hover:bg-muted border border-border"
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            Audit Reports
          </Link>
          <button
            onClick={() => alert("New Scenario template initialized")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            New Scenario
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scenario List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Saved Operational Scenarios ({scenarios.length})
          </h2>

          <div className="space-y-3">
            {scenarios.map((sc) => {
              const isSelected = selectedScenario.id === sc.id;

              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                      : "border-border bg-card hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground font-semibold">
                      {sc.id}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                        sc.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : sc.status === "draft"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {sc.status}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-foreground">
                    {sc.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span className="truncate">{sc.installation}</span>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {sc.riskSummary}
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>{sc.attachedCalculationsCount} Attached Runs</span>
                    <span>Updated: {sc.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Scenario Inspector & Checklist (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {selectedScenario.id} • Active Workspace Dossier
                </span>
                <h2 className="text-xl font-bold text-foreground mt-0.5">
                  {selectedScenario.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{selectedScenario.installation}</span>
                </div>
              </div>

              <Link
                href="/reports"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <FileText className="w-3.5 h-3.5" />
                Generate Audit Report
              </Link>
            </div>

            {/* Attached Items Overview */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Attached Decision Artifacts & Records
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg border border-border bg-secondary/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <SunMedium className="w-4 h-4 text-amber-500" />
                      Weather Snapshot
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Attached</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    WBGT: 85.1°F (Amber Flag). Wind: 7 mph SSE. NWS Station: LWX.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border bg-secondary/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Radiation className="w-4 h-4 text-purple-500" />
                      Airborne Rad Sampling
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Attached</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Alpha Activity: 673.27 dpm/m³. Full-face respiratory protection required.
                  </p>
                </div>
              </div>
            </div>

            {/* OEH Operational Considerations Checklist */}
            <div className="space-y-2 pt-2 border-t border-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                OEH Operational Verification Checklist
              </h3>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded bg-secondary/30 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span className="text-foreground">Verify ambient temperature and humidity units (°F vs °C)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-secondary/30 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span className="text-foreground">Confirm minute volume matches actual mission physical workload (mild vs heavy)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-secondary/30 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span className="text-foreground">Document instrument model, serial number, and calibration date in scenario log</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-secondary/30 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-foreground">Brief command on flag condition work/rest cycle and mandatory hydration rate</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
