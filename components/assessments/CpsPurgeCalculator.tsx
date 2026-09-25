"use client";

import React, { useState } from "react";
import {
  Building2,
  Wind,
  Shield,
  Gauge,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Layers,
  Activity,
} from "lucide-react";
import { calculateCpsPurge } from "@/lib/calculations/cbrn-advanced";

export function CpsPurgeCalculator() {
  const [shelterVol, setShelterVol] = useState<number>(25000);
  const [airlockVol, setAirlockVol] = useState<number>(600);
  const [mainCfm, setMainCfm] = useState<number>(2500);
  const [airlockCfm, setAirlockCfm] = useState<number>(600);
  const [contaminantMgM3, setContaminantMgM3] = useState<number>(50);
  const [overpressureInWc, setOverpressureInWc] = useState<number>(0.3);
  const [rhPct, setRhPct] = useState<number>(65);
  const [hoursThreat, setHoursThreat] = useState<number>(8);

  const result = calculateCpsPurge({
    shelterVolumeFt3: shelterVol,
    airlockVolumeFt3: airlockVol,
    filtrationFlowCfm: mainCfm,
    airlockPurgeBlowerCfm: airlockCfm,
    ambientContaminantMgM3: contaminantMgM3,
    protectiveOverpressureInWc: overpressureInWc,
    relativeHumidityPct: rhPct,
    hoursInHighThreat: hoursThreat,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Collective Protection System (CPS) Shelter Purge & Airlock Pressurization
            </h2>
            <p className="text-xs text-muted-foreground">
              Air Turnover Dynamics, Airlock Purge Dwell Timers, ASZM-TEDA Carbon Filter Longevity, & Overpressure Envelope Verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border shadow ${
              result.isOverpressureCompliant
                ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/40"
                : "bg-red-950/40 text-red-400 border-red-500/40"
            }`}
          >
            {result.isOverpressureCompliant ? "✓ Envelope Compliant (≥ 0.25 in W.C.)" : "⚠ Overpressure Failure"}
          </span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Shelter Volume */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-primary" /> Shelter Volume (cu ft)
          </label>
          <input
            type="number"
            min="1000"
            max="250000"
            value={shelterVol}
            onChange={(e) => setShelterVol(Math.max(100, parseInt(e.target.value) || 100))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Habitable clean air envelope.</p>
        </div>

        {/* Filtration Flow CFM */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-cyan-400" /> Blower Filtration Flow (CFM)
          </label>
          <input
            type="number"
            min="100"
            max="50000"
            value={mainCfm}
            onChange={(e) => setMainCfm(Math.max(10, parseInt(e.target.value) || 10))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Certified HEPA/ASZM-TEDA blower rating.</p>
        </div>

        {/* Airlock Volume */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" /> Airlock Volume (cu ft)
          </label>
          <input
            type="number"
            min="100"
            max="10000"
            value={airlockVol}
            onChange={(e) => setAirlockVol(Math.max(50, parseInt(e.target.value) || 50))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Ingress transition chamber size.</p>
        </div>

        {/* Airlock Purge Flow */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-emerald-400" /> Airlock Purge Blower (CFM)
          </label>
          <input
            type="number"
            min="50"
            max="5000"
            value={airlockCfm}
            onChange={(e) => setAirlockCfm(Math.max(10, parseInt(e.target.value) || 10))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Dedicated purge fan capacity.</p>
        </div>
      </div>

      {/* Environmental & Pressure Diagnostics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Measured Overpressure */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-primary" /> Measured Overpressure (in W.C.)
          </label>
          <input
            type="number"
            step="0.05"
            min="0"
            max="1.5"
            value={overpressureInWc}
            onChange={(e) => setOverpressureInWc(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Target ≥ 0.25 in W.C. per MIL-STD.</p>
        </div>

        {/* Ambient Toxic Vapor Conc */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-400" /> External Vapor Conc (mg/m³)
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={contaminantMgM3}
            onChange={(e) => setContaminantMgM3(Math.max(1, parseFloat(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Outside atmospheric challenge concentration.</p>
        </div>

        {/* Relative Humidity */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" /> Relative Humidity (%)
          </label>
          <input
            type="number"
            min="10"
            max="100"
            value={rhPct}
            onChange={(e) => setRhPct(Math.max(10, Math.min(100, parseInt(e.target.value) || 50)))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">High RH accelerates carbon bed saturation.</p>
        </div>

        {/* Hours in Threat */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" /> Hours Continuous Ingress
          </label>
          <input
            type="number"
            min="0"
            max="200"
            value={hoursThreat}
            onChange={(e) => setHoursThreat(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Filter bank runtime under load.</p>
        </div>
      </div>

      {/* KPI Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Airlock Purge Time */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Airlock Purge Dwell Time</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-black text-emerald-400">
            {result.airlockPurgeTimeMinutes} <span className="text-xs font-normal">minutes</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Required 99% vapor clearance dwell time prior to opening inner shelter door.
          </p>
        </div>

        {/* Shelter Turnover Time */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Shelter Air Turnover</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-black text-foreground">
            {result.shelterTurnoverMinutes} <span className="text-xs font-normal">min / turn</span>
          </div>
          <div className="text-[11px] text-muted-foreground">
            ({result.airChangesPerHour} Air Changes / Hour)
          </div>
        </div>

        {/* Filter Remaining Life */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>ASZM-TEDA Carbon Filter</span>
            <Filter className="w-4 h-4 text-purple-400" />
          </div>
          <div className={`text-2xl font-mono font-black ${result.filterLifespanRemainingPct < 25 ? "text-red-400" : "text-foreground"}`}>
            {result.filterLifespanRemainingPct}% <span className="text-xs font-normal">remaining</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            ~{result.estimatedFilterExhaustionHours} operating hours before breakthrough.
          </p>
        </div>

        {/* Max Persons Ingress */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Max Ingress per Cycle</span>
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-black text-amber-400">
            {result.maxIngressPersonsPerCycle} <span className="text-xs font-normal">personnel</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Based on chamber displacement and thermal ventilation capacity.
          </p>
        </div>
      </div>

      {/* Safety Recommendations Banner */}
      <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-primary" /> Collective Protection Directives & Airlock Protocol
        </h4>
        <div className="space-y-2">
          {result.safetyRecommendations.map((rec, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-background/50 border border-border text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
