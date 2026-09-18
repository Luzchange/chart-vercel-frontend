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
  Scale,
  ShieldAlert,
  Info,
  TrendingUp,
} from "lucide-react";
import {
  OPEN_INTEL_SIGNALS,
  IntelCategory,
  IntelSignal,
  BiasRating,
  FactualReporting,
} from "@/lib/data/intel-signals";
import { GLOBAL_LOCATIONS } from "@/lib/data/locations";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function PublicSituationalAwarenessPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | IntelCategory>("all");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [selectedReliabilityFilter, setSelectedReliabilityFilter] = useState<
    "all" | "high_credibility" | "state_or_social_caution" | "sensor_only"
  >("all");

  const filteredSignals = useMemo(() => {
    return OPEN_INTEL_SIGNALS.filter((sig) => {
      const matchCat = selectedCategory === "all" || sig.category === selectedCategory;
      const matchLoc =
        selectedLocationId === "all" ||
        sig.targetLocationId === selectedLocationId ||
        sig.targetLocationId === "ALL";

      let matchRel = true;
      if (selectedReliabilityFilter === "high_credibility") {
        matchRel = sig.reliability.credibilityScore >= 90;
      } else if (selectedReliabilityFilter === "state_or_social_caution") {
        matchRel =
          sig.reliability.sourceType === "state_affiliated_media" ||
          sig.reliability.sourceType === "unverified_social_media" ||
          sig.reliability.falseReportRisk === "high";
      } else if (selectedReliabilityFilter === "sensor_only") {
        matchRel = sig.reliability.sourceType === "official_sensor";
      }

      return matchCat && matchLoc && matchRel;
    });
  }, [selectedCategory, selectedLocationId, selectedReliabilityFilter]);

  // Statistics
  const totalSignals = OPEN_INTEL_SIGNALS.length;
  const highCredibilityCount = OPEN_INTEL_SIGNALS.filter((s) => s.reliability.credibilityScore >= 90).length;
  const cautionCount = OPEN_INTEL_SIGNALS.filter((s) => s.reliability.falseReportRisk === "high").length;
  const pureSensorCount = OPEN_INTEL_SIGNALS.filter((s) => s.reliability.sourceType === "official_sensor").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Radio className="w-6 h-6 text-primary" />
              Open Multi-INT Situational Awareness & News Bias Intelligence
            </h1>
            <StatusBadge type="public_signal" label="Unclassified OSINT" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Aggregated Open-Source Multi-INT indicators with integrated Media Bias, Source Credibility scoring, and False-Report Risk mitigation to prevent disinformation panic.
          </p>
        </div>
      </div>

      {/* Media Bias & False News Mitigation Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 via-primary/5 to-purple-500/10 border border-primary/20 p-4 rounded-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            Media Bias & False News Mitigation Doctrine:
          </span>
          <span className="text-[11px] font-mono text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded border border-border">
            Doctrinal Standard: Two-Source Sensor Verification
          </span>
        </div>
        <p className="text-xs text-foreground/90 leading-relaxed">
          Open-source reporting varies widely between calibrated physical telemetry (e.g. RadNet, NOAA, ADS-B), rigorous wire journalism (e.g. AP, Reuters), and unverified civilian social media or state-controlled media vectors. In wartime or civil emergencies, adversarial state broadcasters frequently amplify manufactured toxic spill or bioweapon rumors to trigger panic and operational paralysis. Every feed below carries an automated <strong>Media Bias Rating</strong>, <strong>Factual Accuracy Grade</strong>, and <strong>False-Report Risk Warning</strong> to safeguard commanders against fabricated intelligence.
        </p>
      </div>

      {/* 4 Multi-INT & Verification Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Total Signals
            </span>
            <Radio className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">{totalSignals}</span>
          <span className="text-[10px] text-muted-foreground block">Active Multi-INT Streams</span>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              High Credibility (≥90%)
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            {highCredibilityCount}
          </span>
          <span className="text-[10px] text-muted-foreground block">Calibrated Sensors & Wires</span>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Sensor Telemetry
            </span>
            <Satellite className="w-4 h-4 text-purple-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">{pureSensorCount}</span>
          <span className="text-[10px] text-muted-foreground block">Zero Narrative Bias</span>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Disinformation / Caution
            </span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-xl font-black font-mono text-rose-600 dark:text-rose-400">
            {cautionCount}
          </span>
          <span className="text-[10px] text-muted-foreground block">State-Aligned or Unvetted Viral</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-3 text-xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap rounded-lg border border-border bg-secondary/50 p-0.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Types ({OPEN_INTEL_SIGNALS.length})
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
              Open OSINT & News
            </button>
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-muted-foreground font-semibold whitespace-nowrap">
              Installation:
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

        {/* Bias & Reliability Filter Buttons */}
        <div className="pt-2 border-t border-border flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Reliability & Bias Filter:
          </span>
          <button
            onClick={() => setSelectedReliabilityFilter("all")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
              selectedReliabilityFilter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            All Sources
          </button>
          <button
            onClick={() => setSelectedReliabilityFilter("high_credibility")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
              selectedReliabilityFilter === "high_credibility"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Verified High Credibility Only (≥90%)
          </button>
          <button
            onClick={() => setSelectedReliabilityFilter("sensor_only")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
              selectedReliabilityFilter === "sensor_only"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Objective Sensors Only (0% Narrative Bias)
          </button>
          <button
            onClick={() => setSelectedReliabilityFilter("state_or_social_caution")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
              selectedReliabilityFilter === "state_or_social_caution"
                ? "bg-rose-600 text-white border-rose-600"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            ⚠️ High False-Report Risk & State/Social Caution
          </button>
        </div>
      </div>

      {/* Signals Feed List */}
      <div className="space-y-4">
        {filteredSignals.map((signal) => {
          const targetLoc = GLOBAL_LOCATIONS.find((l) => l.id === signal.targetLocationId);
          const rel = signal.reliability;
          const isHighRisk = rel.falseReportRisk === "high";

          return (
            <div
              key={signal.id}
              className={`p-5 rounded-xl border bg-card shadow-sm space-y-3.5 transition-all ${
                isHighRisk
                  ? "border-rose-500/50 bg-rose-500/[0.02]"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {/* Header Row */}
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
                </div>
              </div>

              {/* Media Bias & Credibility Score Strip */}
              <div className="p-3 rounded-lg bg-secondary/40 border border-border space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-primary" />
                      Source Bias:
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        rel.biasRating === "neutral_scientific" || rel.biasRating === "least_biased"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : rel.biasRating === "center"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {rel.biasLabel}
                    </span>

                    <span className="text-muted-foreground">•</span>

                    <span className="text-muted-foreground text-[11px]">
                      Factual Reporting:{" "}
                      <strong className="text-foreground capitalize">{rel.factualReporting}</strong>
                    </span>
                  </div>

                  {/* Credibility Progress Meter */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground">
                      Reliability Score:
                    </span>
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden border border-border">
                      <div
                        className={`h-full rounded-full ${
                          rel.credibilityScore >= 80
                            ? "bg-emerald-500"
                            : rel.credibilityScore >= 50
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        }`}
                        style={{ width: `${rel.credibilityScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-foreground">
                      {rel.credibilityScore}%
                    </span>
                  </div>
                </div>

                {/* Analytical Bias Insight */}
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  <strong>Analytical Assessment:</strong> {rel.biasAnalysis}
                </p>
              </div>

              {/* False Report Warning Box (If High or Moderate Risk) */}
              {isHighRisk && (
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg text-rose-800 dark:text-rose-300 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span>COMMANDER FALSE REPORT WARNING: High Disinformation or Viral Panic Risk</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    This reporting stream originates from an unverified or state-controlled outlet with documented narrative bias. <strong>Do NOT escalate force protection conditions, order mass evacuations, or alter chemical defense postures</strong> based solely on this uncorroborated report. Demand secondary ground-truth verification from Bioenvironmental Engineering or certified on-site sensors.
                  </p>
                </div>
              )}

              {/* Signal Details */}
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                {signal.details}
              </p>

              {/* Indicators list */}
              {signal.indicators && signal.indicators.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Telemetry / Corroborating Evidence:
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
