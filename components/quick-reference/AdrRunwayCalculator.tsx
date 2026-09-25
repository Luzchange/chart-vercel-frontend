"use client";

import React, { useState } from "react";
import {
  Wrench,
  Clock,
  ThermometerSun,
  ShieldAlert,
  Wind,
  Plane,
  AlertTriangle,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { calculateAdrRrrTimeline, WbgtFlagCategory } from "@/lib/calculations/cbrn-advanced";

export function AdrRunwayCalculator() {
  const [craters, setCraters] = useState<number>(3);
  const [tempF, setTempF] = useState<number>(85);
  const [windMph, setWindMph] = useState<number>(10);
  const [agent, setAgent] = useState<"sarin_gb" | "mustard_hd" | "vx" | "rad_fallout">("mustard_hd");
  const [mopp, setMopp] = useState<"MOPP 4" | "MOPP 2" | "MOPP 0">("MOPP 4");
  const [wbgtFlag, setWbgtFlag] = useState<WbgtFlagCategory>("yellow");

  const result = calculateAdrRrrTimeline({
    runwayCratersCount: craters,
    ambientTempF: tempF,
    windSpeedMph: windMph,
    surfaceAgent: agent,
    moppLevel: mopp,
    wbgtFlag: wbgtFlag,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Airfield Damage Repair (ADR / RRR) Timeline Calculator
            </h2>
            <p className="text-xs text-muted-foreground">
              Runway Crater Repair Dwell Times, Concrete Contamination Weathering Decay, Worker Thermal Stay Limits, & Sortie Generation Windows
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg shadow ${
            result.crossContaminationRisk === "Critical"
              ? "bg-red-950/40 text-red-400 border border-red-500/30"
              : result.crossContaminationRisk === "High"
              ? "bg-amber-950/40 text-amber-400 border border-amber-500/30"
              : "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
          }`}>
            Risk: {result.crossContaminationRisk} Contamination
          </span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Craters */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground">Runway Craters</label>
          <input
            type="number"
            min="1"
            max="12"
            value={craters}
            onChange={(e) => setCraters(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
        </div>

        {/* Ambient Temp */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground">Runway Temp (°F)</label>
          <input
            type="number"
            min="30"
            max="130"
            value={tempF}
            onChange={(e) => setTempF(parseInt(e.target.value) || 75)}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
        </div>

        {/* Wind Speed */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground">Wind Speed (mph)</label>
          <input
            type="number"
            min="1"
            max="50"
            value={windMph}
            onChange={(e) => setWindMph(parseInt(e.target.value) || 5)}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
        </div>

        {/* Surface Agent */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground">Contaminant</label>
          <select
            value={agent}
            onChange={(e) => setAgent(e.target.value as any)}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="sarin_gb">Sarin (GB) - Volatile</option>
            <option value="mustard_hd">Mustard (HD) - Blister</option>
            <option value="vx">VX - Persistent Liquid</option>
            <option value="rad_fallout">Radiological Fallout</option>
          </select>
        </div>

        {/* MOPP Level */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground">Repair Crew MOPP</label>
          <select
            value={mopp}
            onChange={(e) => setMopp(e.target.value as any)}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="MOPP 4">MOPP 4 (Full Ensemble)</option>
            <option value="MOPP 2">MOPP 2 (Suit & Boots)</option>
            <option value="MOPP 0">MOPP 0 (Standard BDUs)</option>
          </select>
        </div>

        {/* WBGT Flag */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground">WBGT Heat Flag</label>
          <select
            value={wbgtFlag}
            onChange={(e) => setWbgtFlag(e.target.value as any)}
            className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="white">White (&lt; 78°F)</option>
            <option value="green">Green (80-84°F)</option>
            <option value="yellow">Yellow (85-87°F)</option>
            <option value="red">Red (88-89°F)</option>
            <option value="black">Black (≥ 90°F)</option>
          </select>
        </div>
      </div>

      {/* Primary KPI Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Repair Time */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Runway Repair Dwell</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-mono font-black text-foreground">
            {result.totalRepairTimeHours} <span className="text-xs font-normal">hours</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Based on {craters} craters in {mopp} with heavy machinery dexterity limits.
          </p>
        </div>

        {/* Worker Shift Stay Time */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Crew Shift Thermal Limit</span>
            <ThermometerSun className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-mono font-black text-red-400">
            {result.workerShiftLimitMinutes} <span className="text-xs font-normal">minutes</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Mandatory crew rotation to prevent heat stroke and fatal core hyperthermia.
          </p>
        </div>

        {/* Weathering Half-Life */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Concrete Weathering Half-Life</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-black text-cyan-400">
            {result.weatheringHalfLifeHours} <span className="text-xs font-normal">hours</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Evaporation / hydrolysis half-life on porous runway surface at {tempF}°F.
          </p>
        </div>

        {/* Safe Sortie Launch Window */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Safe Sortie Launch Window</span>
            <Plane className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-black text-emerald-400">
            +{result.safeSortieLaunchWindowHours} <span className="text-xs font-normal">hours</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Earliest safe launch time to prevent jet turbine ingestion and tire transfer.
          </p>
        </div>
      </div>

      {/* Mitigation Directives */}
      <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> Operational Sortie Generation & Decontamination Directives
        </h4>
        <div className="space-y-2">
          {result.mitigationDirectives.map((d, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-background/50 border border-border text-xs text-muted-foreground leading-relaxed">
              <span className="text-amber-400 font-bold">•</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
