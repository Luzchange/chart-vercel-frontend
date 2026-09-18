"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  Droplets,
  Clock,
  MapPin,
  AlertOctagon,
  Copy,
  Check,
  Radio,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GlobalLocationRecord } from "@/lib/data/locations";
import {
  IntelSignal,
  getSignalsForLocation,
  evaluateThreatMetrics,
} from "@/lib/data/intel-signals";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface CommanderDecisionMatrixProps {
  location: GlobalLocationRecord;
  chemicalThreatRisk?: string;
  wbgtFlag?: "None" | "Green" | "Yellow" | "Red" | "Black";
  onApplyDirectives?: (directives: string) => void;
}

export function CommanderDecisionMatrix({
  location,
  chemicalThreatRisk = "<16%",
  wbgtFlag = "Yellow",
  onApplyDirectives,
}: CommanderDecisionMatrixProps) {
  const [copied, setCopied] = useState(false);
  const [showSignalsDrawer, setShowSignalsDrawer] = useState(false);

  const signals = getSignalsForLocation(location.id);
  const threatMetrics = evaluateThreatMetrics(location.id);

  // Compute Commander Decision Metrics
  // 1. MOPP Posture recommendation based on threat and signals
  let recommendedMopp: "MOPP 0" | "MOPP 1" | "MOPP 2" | "MOPP 3" | "MOPP 4" = "MOPP 0";
  let moppDetails = "Overgarment available within 2 hours. Normal duty uniform.";

  if (chemicalThreatRisk?.includes(">84%") || threatMetrics.maxThreatLevel === "critical") {
    recommendedMopp = "MOPP 4";
    moppDetails = "Full protective ensemble (Overgarment, Boots, Mask & Hood, Gloves) closed and sealed. Hot zone operations only.";
  } else if (
    chemicalThreatRisk?.includes("70%") ||
    chemicalThreatRisk?.includes("60%") ||
    chemicalThreatRisk?.includes("High") ||
    threatMetrics.maxThreatLevel === "high"
  ) {
    recommendedMopp = "MOPP 3";
    moppDetails = "Overgarment, Boots, and Mask & Hood donned. Gloves carried. Prepare for imminent gas/vapor contact.";
  } else if (
    chemicalThreatRisk?.includes("40%") ||
    chemicalThreatRisk?.includes("30%") ||
    chemicalThreatRisk?.includes("16%") ||
    chemicalThreatRisk?.includes("Moderate") ||
    threatMetrics.maxThreatLevel === "elevated"
  ) {
    recommendedMopp = "MOPP 2";
    moppDetails = "Overgarment and chemical protective boots donned. Mask and gloves carried on person.";
  } else {
    recommendedMopp = "MOPP 1";
    moppDetails = "Overgarment worn open or readily available at workstation. Protective mask in carrier.";
  }

  // 2. FPCON Level
  const recommendedFpcon = threatMetrics.recommendedFpcon;

  // 3. Work/Rest Cycle & Hydration Quota (adjusting for heat + MOPP)
  let workRestCycle = "50 min work / 10 min rest per hour";
  let hydrationQuota = "0.75 qt / hour (approx 750 mL)";

  if (wbgtFlag === "Black" || recommendedMopp === "MOPP 4") {
    workRestCycle = "15 min work / 45 min rest per hour in shade";
    hydrationQuota = "1.0 to 1.25 qt / hour (Do not exceed 1.5 qt/hr)";
  } else if (wbgtFlag === "Red" || recommendedMopp === "MOPP 3") {
    workRestCycle = "20 min work / 40 min rest per hour";
    hydrationQuota = "1.0 qt / hour";
  } else if (wbgtFlag === "Yellow" || recommendedMopp === "MOPP 2") {
    workRestCycle = "30 min work / 30 min rest per hour";
    hydrationQuota = "0.75 to 1.0 qt / hour";
  } else if (wbgtFlag === "Green") {
    workRestCycle = "45 min work / 15 min rest per hour";
    hydrationQuota = "0.75 qt / hour";
  }

  // 4. Standoff / Cordon Distances
  let hotZoneRadius = "300 meters (Upwind)";
  let warmZoneRadius = "800 meters (Perimeter)";
  let downwindEvacuation = "1.5 km Downwind Corridor";

  if (chemicalThreatRisk?.includes(">84%") || threatMetrics.maxThreatLevel === "critical") {
    hotZoneRadius = "500 meters (Immediate Exclusion)";
    warmZoneRadius = "1,500 meters (Decon Outer Cordon)";
    downwindEvacuation = "4.0 km Downwind Protective Action Distance";
  } else if (
    chemicalThreatRisk?.includes("70%") ||
    chemicalThreatRisk?.includes("60%") ||
    chemicalThreatRisk?.includes("High")
  ) {
    hotZoneRadius = "400 meters";
    warmZoneRadius = "1,000 meters";
    downwindEvacuation = "2.5 km Downwind";
  }

  // Generate Commander BLUF (Bottom Line Up Front)
  const commanderBluf = `COMMANDER DECISION BRIEFING (BLUF)
LOCATION: ${location.name} (${location.stateOrProvince}, ${location.country})
TIMESTAMP: ${new Date().toUTCString()}
CORRELATED THREAT LEVEL: ${threatMetrics.maxThreatLevel.toUpperCase()}
MOPP DIRECTIVE: ${recommendedMopp} (${moppDetails})
FPCON ALIGNMENT: FPCON ${recommendedFpcon}
WORK / REST DIRECTIVE: ${workRestCycle}
HYDRATION QUOTA: ${hydrationQuota}
ISOLATION CORDON: Hot Zone: ${hotZoneRadius} | Downwind Hazard: ${downwindEvacuation}
MULTI-INT CORROBORATION: ${signals.length} Active Open Signals (${threatMetrics.highestConfidence.toUpperCase()} confidence)`;

  const handleCopyBluf = () => {
    navigator.clipboard.writeText(commanderBluf);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-wide">
                Commander Decision Metrics Matrix (CDMM)
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                Threat-Adaptive
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Synthesis of verified toxic load, WBGT physiological strain, and open multi-INT indicators for {location.name}.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyBluf}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold self-start sm:self-center transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              Copy Commander BLUF
            </>
          )}
        </button>
      </div>

      {/* 4 Core Decision Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5">
        {/* 1. MOPP Recommendation */}
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                MOPP Directive
              </span>
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black font-mono text-primary">
                {recommendedMopp}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
            {moppDetails}
          </p>
        </div>

        {/* 2. FPCON Posture */}
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                FPCON Baseline
              </span>
              <AlertOctagon className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black font-mono text-foreground">
                FPCON {recommendedFpcon}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
            Gate access controls, sentry protective posture, and perimeter vehicle random inspections aligned to threat.
          </p>
        </div>

        {/* 3. Work/Rest Cycle */}
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Work / Rest Ratio
              </span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-1">
              <span className="text-lg font-bold font-mono text-foreground">
                {workRestCycle.split("per")[0]}
              </span>
              <span className="text-[10px] text-muted-foreground block font-mono">
                per hour under current WBGT ({wbgtFlag} Flag)
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2 border-t border-border flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span>Quota: <strong className="text-foreground">{hydrationQuota}</strong></span>
          </div>
        </div>

        {/* 4. Protective Isolation Cordon */}
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Isolation Cordon
              </span>
              <MapPin className="w-4 h-4 text-rose-500" />
            </div>
            <div className="mt-1 space-y-0.5">
              <div className="text-xs font-mono">
                <span className="text-muted-foreground">Hot: </span>
                <span className="font-bold text-foreground">{hotZoneRadius}</span>
              </div>
              <div className="text-xs font-mono">
                <span className="text-muted-foreground">Downwind: </span>
                <span className="font-bold text-rose-500">{downwindEvacuation}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground pt-2 border-t border-border">
            Based on atmospheric dispersion and inverse-square boundary contours.
          </p>
        </div>
      </div>

      {/* Correlated Open Multi-INT Signals Drawer Toggle */}
      <div className="px-4 sm:px-5 pb-4">
        <button
          type="button"
          onClick={() => setShowSignalsDrawer(!showSignalsDrawer)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 text-xs font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-bold text-foreground">
              Correlated Open Multi-INT Signals ({signals.length})
            </span>
            <span className="text-muted-foreground">
              • Open HUMINT, Civil RF/SIGINT, Satellite GEOINT Feeds
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <span>{showSignalsDrawer ? "Hide Signals" : "View Signal Detail"}</span>
            {showSignalsDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showSignalsDrawer && (
          <div className="mt-3 space-y-2.5 pt-2 border-t border-border">
            {signals.length === 0 ? (
              <p className="text-xs text-muted-foreground italic p-3 text-center">
                No active open-source incident signals flagged for {location.name} in current monitor window.
              </p>
            ) : (
              signals.map((sig) => (
                <div
                  key={sig.id}
                  className="p-3.5 rounded-xl border border-border bg-card/60 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold border border-primary/20 uppercase">
                        {sig.categoryLabel}
                      </span>
                      <h4 className="font-bold text-foreground text-xs">
                        {sig.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {sig.timestamp}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          sig.threatLevel === "critical"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                            : sig.threatLevel === "high"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                        }`}
                      >
                        {sig.threatLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {sig.details}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-border font-mono text-[11px]">
                    <span className="text-primary font-semibold">
                      Recommendation: {sig.recommendedAction}
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      Source: {sig.source}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
