"use client";

import React, { useState, useEffect } from "react";
import {
  Radio,
  Activity,
  AlertTriangle,
  Flame,
  Zap,
  ShieldAlert,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Bell,
  Cpu,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export type SensorAlarmType = "clear" | "sarin_gb" | "vx_liquid" | "cs137_dirty_bomb" | "chlorine_tic";

export function SensorTelemetrySimulator() {
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [activeAlarm, setActiveAlarm] = useState<SensorAlarmType>("clear");
  const [streamTick, setStreamTick] = useState<number>(0);

  // Sensor state: JCAD
  const [jcadGBars, setJcadGBars] = useState<number>(0);
  const [jcadVBars, setJcadVBars] = useState<number>(0);
  const [jcadHBars, setJcadHBars] = useState<number>(0);
  const [jcadConcMgM3, setJcadConcMgM3] = useState<number>(0.0);
  const [jcadAlarm, setJcadAlarm] = useState<"CLEAR" | "LOW ALARM" | "HIGH ALARM">("CLEAR");

  // Sensor state: HAPSITE ER GC/MS
  const [hapsiteCompound, setHapsiteCompound] = useState<string>("Background Ambient Air");
  const [hapsiteRetentionTime, setHapsiteRetentionTime] = useState<number>(1.12);
  const [hapsiteMatchPct, setHapsiteMatchPct] = useState<number>(99.2);
  const [hapsitePpm, setHapsitePpm] = useState<number>(0.0);

  // Sensor state: ADM-300
  const [admDoseRateMRh, setAdmDoseRateMRh] = useState<number>(0.015);
  const [admCumulativeDoseMR, setAdmCumulativeDoseMR] = useState<number>(0.08);
  const [admAlarm, setAdmAlarm] = useState<"NORMAL" | "CAUTION" | "CRITICAL RADIATION">("NORMAL");

  // Telemetry stream generator
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setStreamTick((t) => t + 1);

      // Micro jitter for realistic digital telemetry
      const jitter = (Math.random() - 0.5) * 0.04;

      if (activeAlarm === "clear") {
        setJcadGBars(0);
        setJcadVBars(0);
        setJcadHBars(0);
        setJcadConcMgM3(Math.max(0, 0.0001 + jitter * 0.001));
        setJcadAlarm("CLEAR");

        setHapsiteCompound("Background Ambient Hydrocarbons / N2");
        setHapsiteRetentionTime(1.1 + Math.random() * 0.05);
        setHapsiteMatchPct(98.5 + Math.random() * 1.0);
        setHapsitePpm(0.01);

        setAdmDoseRateMRh(Math.max(0.01, 0.015 + jitter * 0.005));
        setAdmAlarm("NORMAL");
      } else if (activeAlarm === "sarin_gb") {
        // High G-bar alarm
        setJcadGBars(7);
        setJcadVBars(0);
        setJcadHBars(0);
        setJcadConcMgM3(Math.max(0.05, 0.85 + jitter * 0.15));
        setJcadAlarm("HIGH ALARM");

        setHapsiteCompound("GB / Sarin (Isopropyl methylphosphonofluoridate)");
        setHapsiteRetentionTime(3.42 + Math.random() * 0.02);
        setHapsiteMatchPct(96.8 + Math.random() * 1.5);
        setHapsitePpm(0.145 + jitter * 0.02);

        setAdmDoseRateMRh(0.015);
        setAdmAlarm("NORMAL");
      } else if (activeAlarm === "vx_liquid") {
        // High V-bar alarm
        setJcadGBars(0);
        setJcadVBars(8);
        setJcadHBars(0);
        setJcadConcMgM3(Math.max(0.02, 0.42 + jitter * 0.08));
        setJcadAlarm("HIGH ALARM");

        setHapsiteCompound("VX (O-ethyl S-[2-(diisopropylamino)ethyl] methylphosphonothioate)");
        setHapsiteRetentionTime(8.15 + Math.random() * 0.03);
        setHapsiteMatchPct(98.1 + Math.random() * 0.8);
        setHapsitePpm(0.038 + jitter * 0.005);

        setAdmDoseRateMRh(0.015);
        setAdmAlarm("NORMAL");
      } else if (activeAlarm === "cs137_dirty_bomb") {
        // Radiation alarm on ADM-300
        setJcadGBars(0);
        setJcadVBars(0);
        setJcadHBars(0);
        setJcadConcMgM3(0.0001);
        setJcadAlarm("CLEAR");

        setHapsiteCompound("Atmospheric Particulates / Incombustible Dust");
        setHapsiteRetentionTime(2.1);
        setHapsiteMatchPct(89.2);
        setHapsitePpm(0.05);

        setAdmDoseRateMRh(145.8 + Math.random() * 15.0);
        setAdmCumulativeDoseMR((prev) => prev + 1.2);
        setAdmAlarm("CRITICAL RADIATION");
      } else if (activeAlarm === "chlorine_tic") {
        // Toxic industrial gas
        setJcadGBars(0);
        setJcadVBars(0);
        setJcadHBars(5);
        setJcadConcMgM3(12.4 + jitter * 2.0);
        setJcadAlarm("HIGH ALARM");

        setHapsiteCompound("Chlorine Gas (Cl2) - Toxic Industrial Chemical");
        setHapsiteRetentionTime(0.85);
        setHapsiteMatchPct(99.4);
        setHapsitePpm(4.2 + jitter * 0.5);

        setAdmDoseRateMRh(0.015);
        setAdmAlarm("NORMAL");
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming, activeAlarm]);

  const triggerAlarm = (type: SensorAlarmType) => {
    setActiveAlarm(type);
  };

  return (
    <div className="space-y-6">
      {/* Header and Telemetry Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </span>
            {isStreaming && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">
                CBRNE Real-Time Sensor Telemetry Simulator
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-bold">
                TICK #{streamTick}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Synthetic Field Telemetry: Joint Chemical Agent Detector (JCAD), HAPSITE ER GC/MS, & ADM-300 Radiological Survey Meter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              isStreaming
                ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-400"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isStreaming ? "Streaming Active" : "Stream Paused"}
          </button>
          <button
            onClick={() => triggerAlarm("clear")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/40 text-xs font-semibold text-foreground hover:bg-secondary"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear / Ambient Baseline
          </button>
        </div>
      </div>

      {/* Alarm Injection Bar */}
      <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Zap className="w-4 h-4 text-amber-400" /> Test Trigger: Simulated CBRN Alarm Injection
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => triggerAlarm("sarin_gb")}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeAlarm === "sarin_gb"
                ? "border-red-500 bg-red-950/40 text-red-300 ring-2 ring-red-500/30"
                : "border-border bg-background/50 hover:border-red-500/50 hover:bg-red-950/20 text-foreground"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Sarin (GB) Vapor</span>
              <Flame className="w-3.5 h-3.5 text-red-400" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">High G-Bar Spike (0.85 mg/m³)</p>
          </button>

          <button
            onClick={() => triggerAlarm("vx_liquid")}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeAlarm === "vx_liquid"
                ? "border-purple-500 bg-purple-950/40 text-purple-300 ring-2 ring-purple-500/30"
                : "border-border bg-background/50 hover:border-purple-500/50 hover:bg-purple-950/20 text-foreground"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span>VX Nerve Agent</span>
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Persistent V-Bar Alert (0.42 mg/m³)</p>
          </button>

          <button
            onClick={() => triggerAlarm("cs137_dirty_bomb")}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeAlarm === "cs137_dirty_bomb"
                ? "border-amber-500 bg-amber-950/40 text-amber-300 ring-2 ring-amber-500/30"
                : "border-border bg-background/50 hover:border-amber-500/50 hover:bg-amber-950/20 text-foreground"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Cs-137 Dirty Bomb</span>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">ADM-300 Spike (145.8 mR/h)</p>
          </button>

          <button
            onClick={() => triggerAlarm("chlorine_tic")}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeAlarm === "chlorine_tic"
                ? "border-cyan-500 bg-cyan-950/40 text-cyan-300 ring-2 ring-cyan-500/30"
                : "border-border bg-background/50 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-foreground"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Chlorine (TIC) Gas</span>
              <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Industrial Gas Plume (4.2 ppm)</p>
          </button>
        </div>
      </div>

      {/* 3 Synthetic Sensor Instrument Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Instrument 1: JCAD M4A1 */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <div>
                <h3 className="text-sm font-bold text-foreground">JCAD M4A1</h3>
                <p className="text-[10px] text-muted-foreground font-mono">Joint Chemical Agent Detector</p>
              </div>
            </div>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                jcadAlarm === "HIGH ALARM"
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {jcadAlarm}
            </span>
          </div>

          {/* Bar Display Simulation */}
          <div className="space-y-2.5 font-mono text-xs">
            {/* G Bar */}
            <div>
              <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                <span>G-BAR (Nerve Tabun/Sarin/Soman):</span>
                <span className="font-bold text-foreground">{jcadGBars} / 8 BARS</span>
              </div>
              <div className="grid grid-cols-8 gap-1 h-3 bg-secondary/50 p-0.5 rounded">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full rounded-sm ${
                      i < jcadGBars ? "bg-red-500 shadow-sm shadow-red-500/50" : "bg-muted/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* V Bar */}
            <div>
              <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                <span>V-BAR (Persistent Nerve VX):</span>
                <span className="font-bold text-foreground">{jcadVBars} / 8 BARS</span>
              </div>
              <div className="grid grid-cols-8 gap-1 h-3 bg-secondary/50 p-0.5 rounded">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full rounded-sm ${
                      i < jcadVBars ? "bg-purple-500 shadow-sm shadow-purple-500/50" : "bg-muted/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* H Bar */}
            <div>
              <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                <span>H-BAR (Blister Mustard/Lewisite):</span>
                <span className="font-bold text-foreground">{jcadHBars} / 8 BARS</span>
              </div>
              <div className="grid grid-cols-8 gap-1 h-3 bg-secondary/50 p-0.5 rounded">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full rounded-sm ${
                      i < jcadHBars ? "bg-amber-500 shadow-sm shadow-amber-500/50" : "bg-muted/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-background/60 border border-border/60 text-xs space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Concentration:</span>
              <span className="font-bold text-foreground">{jcadConcMgM3.toFixed(4)} mg/m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ion Mobility Cell:</span>
              <span className="text-emerald-400 font-bold">NOMINAL 100%</span>
            </div>
          </div>
        </div>

        {/* Instrument 2: HAPSITE ER GC/MS */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-foreground">HAPSITE ER</h3>
                <p className="text-[10px] text-muted-foreground font-mono">Person-Portable GC/MS</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              NIST 90%+
            </span>
          </div>

          <div className="p-3 rounded-lg bg-background/60 border border-border/60 text-xs space-y-2 font-mono">
            <div>
              <span className="text-[10px] uppercase text-muted-foreground">Identified Analyte:</span>
              <p className="font-bold text-foreground text-xs mt-0.5 leading-snug">{hapsiteCompound}</p>
            </div>
            <div className="flex justify-between pt-1 border-t border-border/40">
              <span className="text-muted-foreground">Retention Time (tR):</span>
              <span className="font-bold text-foreground">{hapsiteRetentionTime.toFixed(2)} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">NIST Library Match:</span>
              <span className="font-bold text-emerald-400">{hapsiteMatchPct.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantification:</span>
              <span className="font-bold text-cyan-400">{hapsitePpm.toFixed(3)} ppm</span>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground leading-relaxed p-2.5 rounded-lg bg-secondary/30 border border-border/40">
            Confirmatory quadrupole mass spectrometer validated against DoD CWA chemical spectral libraries.
          </div>
        </div>

        {/* Instrument 3: ADM-300 Radiac */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-foreground">ADM-300</h3>
                <p className="text-[10px] text-muted-foreground font-mono">Multi-Function Radiac Survey Meter</p>
              </div>
            </div>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                admAlarm === "CRITICAL RADIATION"
                  ? "bg-amber-500 text-black animate-pulse"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {admAlarm}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-background/80 border border-border/80 text-center space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Current Dose Rate</span>
            <div className={`text-2xl font-mono font-black ${admDoseRateMRh > 10 ? "text-amber-400" : "text-foreground"}`}>
              {admDoseRateMRh.toFixed(3)} <span className="text-xs font-normal">mR/h</span>
            </div>
            <div className="text-[11px] font-mono text-muted-foreground">
              ({(admDoseRateMRh * 10).toFixed(1)} µSv/h)
            </div>
          </div>

          <div className="p-3 rounded-lg bg-background/60 border border-border/60 text-xs space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cumulative Dose:</span>
              <span className="font-bold text-foreground">{admCumulativeDoseMR.toFixed(3)} mR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Probe Connection:</span>
              <span className="text-emerald-400 font-bold">BP-100 BETA PROBE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Automated CHART Risk Calculation Integration Banner */}
      {activeAlarm !== "clear" && (
        <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-red-300">
                ACTIVE CBRN THREAT TRIGGERED: AUTOMATED RISK CALCULATION UPDATED
              </div>
              <p className="text-xs text-muted-foreground">
                Synthetic sensor telemetry shows hazardous agent concentration exceeding safe threshold. Chemical toxic load or stay-time calculations required immediately.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeAlarm === "cs137_dirty_bomb" ? (
              <Link
                href="/assess/radiological"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 flex items-center gap-1.5 shadow"
              >
                Compute Stay-Time Limit <TrendingUp className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/assess/chemical"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 flex items-center gap-1.5 shadow"
              >
                Compute Toxic Vapor Load <TrendingUp className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
