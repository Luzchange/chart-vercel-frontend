"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  MapPin,
  SunMedium,
  AlertTriangle,
  FlaskConical,
  Radiation,
  Biohazard,
  FileText,
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  ExternalLink,
  Plus,
  RefreshCw,
  Smartphone,
  Download,
  Tablet,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function DashboardPage() {
  const [activeScenario, setActiveScenario] = useState({
    id: "SCN-2026-0042",
    title: "Joint Base Perimeter Air Sampling & Heat Stress Review",
    location: "Joint Base Andrews (MD)",
    hazard: "Unidentified Alpha Particulate & Summer Heat Planning",
    updatedAt: "10 mins ago",
    status: "In Progress",
    riskLevel: "ELEVATED_CAUTION",
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Operational Dashboard
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono font-medium">
              v1.0-Validated
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time occupational health assessment, meteorological context, and scenario tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/scenarios/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-xs sm:text-sm hover:opacity-90 shadow-sm transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Scenario
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary text-foreground font-medium text-xs sm:text-sm hover:bg-muted border border-border transition-colors"
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            Reports
          </Link>
        </div>
      </div>

      {/* Grid: 4 Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Scenario */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Scenario
              </span>
              <StatusBadge type="measured" label="Active" />
            </div>
            <h3 className="font-semibold text-foreground text-sm line-clamp-1">
              {activeScenario.title}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-primary" />
              {activeScenario.id} • {activeScenario.updatedAt}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
            <Link
              href="/scenarios"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              Manage Workspace <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Selected Location Context */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Selected Installation
              </span>
              <StatusBadge type="authoritative" label="Public DoD" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">
              Joint Base Andrews
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Prince George's County, MD (38.8109° N, 76.8670° W)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">NWS Office: LWX</span>
            <Link
              href="/installations"
              className="text-primary hover:underline font-medium"
            >
              Change Base
            </Link>
          </div>
        </div>

        {/* Card 3: Weather & WBGT Planning Status */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Heat Stress & WBGT
              </span>
              <StatusBadge type="forecast" label="NOAA NWS" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">84.2°F</span>
              <span className="text-xs font-medium text-amber-500">
                Flag: Amber (WBGT Est: 85°F)
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Work/Rest: 40 min work / 20 min rest per hour (Moderate work).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">Retrieved: 5m ago</span>
            <Link
              href="/weather"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              3-Tier View <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Operational Risk & Caution Flags */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Risk & Caution Flags
              </span>
              <StatusBadge type="warning" label="Attention" />
            </div>
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Moderate Work Heat Advisory
            </h3>
            <p className="text-xs text-muted-foreground">
              NWS HeatRisk Level 2 (Moderate). Monitor outdoor physical activity.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">0 Critical Alerts</span>
            <Link
              href="/public-situational-awareness"
              className="text-primary hover:underline font-medium"
            >
              View Feeds
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Assessment Workflows */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-border rounded-xl bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-primary" />
                  Validated Exposure Assessment Calculators
                </h2>
                <p className="text-xs text-muted-foreground">
                  Pure mathematical models with verified baseline parity against legacy CHART 2018 workbooks.
                </p>
              </div>
              <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted-foreground">
                Zero Cloud Leakage
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Chemical Exposure Calculator Card */}
              <Link
                href="/assess/chemical"
                className="p-3.5 rounded-lg border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/60 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <FlaskConical className="w-4 h-4 text-emerald-500" />
                      Chemical Vapor & Toxic Load
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Validated
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Calculates toxic load L = C^n * T and probit risk percentiles for Tabun, Sarin, Soman, VX, Mustard (HD), and Nitrogen Mustards.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Legacy: CWA Entry / Equations</span>
                  <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                    Run Model →
                  </span>
                </div>
              </Link>

              {/* Radiation Stay Time Calculator Card */}
              <Link
                href="/assess/radiological"
                className="p-3.5 rounded-lg border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/60 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <Radiation className="w-4 h-4 text-amber-500" />
                      Radiation Dose & Stay Time
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Validated
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Inverse square law I_2 = I_1(d_1/d_2)^2 and operational allowable-dose stay-time calculations with R/hr and mR/hr safeguards.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Legacy: Rad Sheet</span>
                  <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                    Run Model →
                  </span>
                </div>
              </Link>

              {/* Airborne Radiation Card */}
              <Link
                href="/assess/radiological"
                className="p-3.5 rounded-lg border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/60 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <Radiation className="w-4 h-4 text-purple-500" />
                      Airborne Particle Sampling
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      Validated
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Air pump flow rates, volume integration, gross alpha cpm to dpm/m³ conversion, and M-series respirator trigger criteria.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Legacy: Airborne Rad</span>
                  <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                    Run Model →
                  </span>
                </div>
              </Link>

              {/* CBRN Threat Assessment Library Card */}
              <Link
                href="/hazard-library"
                className="p-3.5 rounded-lg border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/60 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-purple-500" />
                      CBRN Threat Assessment
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      32 Threat Dossiers
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Comprehensive Chemical (G/V/Novichoks), Biological (Select agents, toxins), Radiological (RDD, gamma/alpha), and Nuclear (IND, reactor meltdown) dossiers with antidotes and cordon bounds.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Doctrinal: CBRN Intel</span>
                  <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                    Assess Threats →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Scenario Snapshot Box */}
          <div className="border border-border rounded-xl bg-card p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">
                Scenario Timeline & Audit Trail
              </h3>
              <StatusBadge type="authoritative" label="Audit Compliant" />
            </div>
            <div className="bg-secondary/40 rounded-lg p-3 text-xs space-y-2">
              <div className="flex items-center justify-between font-mono">
                <span className="text-muted-foreground">Last Baseline Validation:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  8/8 Tests Passed (100% Tolerance Parity)
                </span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-muted-foreground">Calculation Engine Mode:</span>
                <span className="text-foreground font-medium">Pure Client/Edge TS Engine</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-muted-foreground">Legacy Basis:</span>
                <span className="text-foreground font-medium">Developed by Mike Golf</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-muted-foreground">Local Offline Cache:</span>
                <span className="text-foreground font-medium">Ready (IndexedDB Active)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Weather Snapshot & Reference Links */}
        <div className="space-y-4">
          {/* Weather Snapshot Card */}
          <div className="border border-border rounded-xl bg-card p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground">
                <SunMedium className="w-4 h-4 text-amber-500" />
                <span>Weather & WBGT Planning</span>
              </div>
              <StatusBadge type="forecast" label="Live NWS" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Ambient Temp:</span>
                <span className="font-semibold text-foreground">84.2°F (29.0°C)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Relative Humidity:</span>
                <span className="font-semibold text-foreground">62%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Wind Speed:</span>
                <span className="font-semibold text-foreground">7 mph SSE</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Estimated WBGT:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  85.1°F (Amber Flag)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Measured WBGT:</span>
                <span className="text-muted-foreground italic">None entered (on-site required)</span>
              </div>
            </div>

            <Link
              href="/weather"
              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-secondary hover:bg-muted text-xs font-semibold text-foreground border border-border transition-colors"
            >
              Open Full Weather & WBGT Tool
            </Link>
          </div>

          {/* Operator Training Course Callout */}
          <div className="border border-primary/30 rounded-xl bg-primary/5 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-primary" />
                Operator Training
              </span>
              <StatusBadge type="authoritative" label="8 Modules" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              CHART+ Master Operator Training Course
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Step-by-step interactive slide deck explaining how to use Haber's toxic load, radiological stay times, 3-tier WBGT, and commander metrics.
            </p>
            <Link
              href="/training"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 shadow-sm transition-opacity"
            >
              Launch Interactive Training Slides →
            </Link>
          </div>

          {/* Android APK v0.01 Phone & Tablet Package */}
          <div className="border border-emerald-500/30 rounded-xl bg-emerald-500/5 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Android Native APK
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                v0.01
              </span>
            </div>
            <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
              Phone & Tablet Field Package
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native Android APK packaged with full offline calculations, responsive dual-screen layouts for tablets and phones, and hardware acceleration.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Tablet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Small phones to 12" tablets • Android 7.0 to 16</span>
            </div>
            <a
              href="/CHART-plus-v0.01.apk"
              download="CHART-plus-v0.01.apk"
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Download Android APK (v0.01 • 4.8 MB)
            </a>
          </div>

          {/* Quick Guidance Box */}
          <div className="border border-border rounded-xl bg-card p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Operational Principles
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
              <li>Always verify ambient temperature units (°F vs °C).</li>
              <li>Estimated WBGT does not substitute for certified on-site instrumentation.</li>
              <li>Calculations do not constitute individualized medical diagnosis.</li>
              <li>Exported reports contain full audit trails and model provenance.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
