"use client";

import React, { useState, useMemo } from "react";
import {
  Radio,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Eye,
  Activity,
  Satellite,
  Globe2,
  Filter,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";
import {
  OPEN_INTEL_SIGNALS,
  IntelCategory,
  IntelSignal,
} from "@/lib/data/intel-signals";
import { GLOBAL_LOCATIONS } from "@/lib/data/locations";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function PublicSituationalAwarenessPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | IntelCategory>("all");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");

  const filteredSignals = useMemo(() => {
    return OPEN_INTEL_SIGNALS.filter((sig) => {
      const matchCat = selectedCategory === "all" || sig.category === selectedCategory;
      const matchLoc =
        selectedLocationId === "all" ||
        sig.targetLocationId === selectedLocationId ||
        sig.targetLocationId === "ALL";
      return matchCat && matchLoc;
    });
  }, [selectedCategory, selectedLocationId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Radio className="w-6 h-6 text-primary" />
              Open Multi-INT Situational Awareness & Signal Correlation
            </h1>
            <StatusBadge type="public_signal" label="Unclassified OSINT" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Aggregated Open-Source Multi-INT indicators: Public Ground Spotters (HUMINT), Civil RF Spectrum & Sensor Telemetry (SIGINT), Earth Observation Satellites (GEOINT), and Regulatory Portals (OSINT).
          </p>
        </div>
      </div>

      {/* Safeguard Notice */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-amber-900 dark:text-amber-200 text-xs space-y-1">
        <span className="font-bold block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          Strict Open-Source & Public Privacy Safeguard:
        </span>
        <p>
          All signals displayed below are strictly derived from open, public domain sensors (NOAA All-Hazards Radio, EPA RadNet gamma monitors, OpenSky ADS-B receivers, NASA FIRMS satellite fire telemetry, and municipal health notices). No classified, restricted, tactical troop movement, or sensitive operational intelligence is ever integrated.
        </p>
      </div>

      {/* 4 Multi-INT Pillar Summary Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Open HUMINT
            </span>
            <Eye className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">
            {OPEN_INTEL_SIGNALS.filter((s) => s.category === "open_humint").length}
          </span>
          <span className="text-[10px] text-muted-foreground block">
            Spotters, Eyewitness, Clinics
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Open SIGINT / RF
            </span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">
            {OPEN_INTEL_SIGNALS.filter((s) => s.category === "open_sigint_rf").length}
          </span>
          <span className="text-[10px] text-muted-foreground block">
            ADS-B 7700, NOAA, RadNet
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Open GEOINT
            </span>
            <Satellite className="w-4 h-4 text-purple-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">
            {OPEN_INTEL_SIGNALS.filter((s) => s.category === "open_geoint").length}
          </span>
          <span className="text-[10px] text-muted-foreground block">
            NASA FIRMS, Sentinel SWIR
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Open OSINT
            </span>
            <Globe2 className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">
            {OPEN_INTEL_SIGNALS.filter((s) => s.category === "open_osint").length}
          </span>
          <span className="text-[10px] text-muted-foreground block">
            DOT PHMSA, Civil Defense
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap rounded-lg border border-border bg-secondary/50 p-0.5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Multi-INT ({OPEN_INTEL_SIGNALS.length})
          </button>
          <button
            onClick={() => setSelectedCategory("open_humint")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedCategory === "open_humint"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Open HUMINT
          </button>
          <button
            onClick={() => setSelectedCategory("open_sigint_rf")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedCategory === "open_sigint_rf"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Civil SIGINT / RF
          </button>
          <button
            onClick={() => setSelectedCategory("open_geoint")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedCategory === "open_geoint"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Open GEOINT
          </button>
          <button
            onClick={() => setSelectedCategory("open_osint")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              selectedCategory === "open_osint"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Open OSINT
          </button>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-muted-foreground font-semibold whitespace-nowrap">
            Filter Location:
          </label>
          <select
            value={selectedLocationId}
            onChange={(e) => setSelectedLocationId(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-foreground text-xs font-medium"
          >
            <option value="all">All Global Locations</option>
            {GLOBAL_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Signals Feed List */}
      <div className="space-y-3">
        {filteredSignals.map((signal) => {
          const targetLoc = GLOBAL_LOCATIONS.find((l) => l.id === signal.targetLocationId);

          return (
            <div
              key={signal.id}
              className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary font-bold border border-primary/20">
                    {signal.categoryLabel}
                  </span>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">
                    {signal.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-muted-foreground">{signal.timestamp}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      signal.threatLevel === "critical"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        : signal.threatLevel === "high"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                    }`}
                  >
                    {signal.threatLevel} Threat
                  </span>
                  <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase text-[10px] border border-border">
                    {signal.confidence}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                {signal.details}
              </p>

              {/* Indicators list */}
              {signal.indicators && signal.indicators.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Corroborating Telemetric Indicators:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {signal.indicators.map((ind, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground border border-border"
                      >
                        ✓ {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer info: target location, recommendation, source */}
              <div className="pt-3 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    Action: {signal.recommendedAction}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                  {targetLoc && (
                    <span>
                      Target: <strong className="text-foreground">{targetLoc.name}</strong>
                    </span>
                  )}
                  <span>Source: {signal.source}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
