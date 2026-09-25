"use client";

import React, { useState } from "react";
import {
  Shield,
  ShieldAlert,
  ThermometerSun,
  Activity,
  Layers,
  Clock,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Wind,
} from "lucide-react";
import {
  calculateMoppPosture,
  HazardZoneDistance,
  AgentVolatilityType,
  WorkRateMinuteVolume,
  WbgtFlagCategory,
} from "@/lib/calculations/cbrn-advanced";

export function MoppPostureMatrix() {
  const [distanceZone, setDistanceZone] = useState<HazardZoneDistance>("inner_1km");
  const [agentType, setAgentType] = useState<AgentVolatilityType>("persistent_liquid");
  const [workRate, setWorkRate] = useState<WorkRateMinuteVolume>("moderate_30");
  const [wbgtFlag, setWbgtFlag] = useState<WbgtFlagCategory>("yellow");
  const [isCoveredShelter, setIsCoveredShelter] = useState<boolean>(false);

  const result = calculateMoppPosture({
    distanceZone,
    agentType,
    workRate,
    wbgtFlag,
    isCoveredShelter,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Dynamic MOPP Posture Recommendation Matrix
            </h2>
            <p className="text-xs text-muted-foreground">
              Doctrinal Force Protection Adaptation: CHEMRAT Downwind Distance, Agent Volatility, Minute Volume, & WBGT Heat Index
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground shadow">
            Active: {result.recommendedMopp}
          </span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Downwind Distance Zone */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-primary" /> CHEMRAT Downwind Zone
          </label>
          <select
            value={distanceZone}
            onChange={(e) => setDistanceZone(e.target.value as HazardZoneDistance)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="ground_zero">Ground Zero / Impact Zone (&lt; 200m)</option>
            <option value="inner_1km">Inner Plume (&lt; 1 km)</option>
            <option value="downwind_1_5km">Downwind Hazard Corridor (1 - 5 km)</option>
            <option value="outer_5_10km">Outer Downwind Buffer (5 - 10 km)</option>
            <option value="clear_zone">Clear Zone (&gt; 10 km)</option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            Corresponds to CHEMRAT hazard prediction plume boundaries.
          </p>
        </div>

        {/* 2. Active Agent Volatility */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> Active Agent Volatility
          </label>
          <select
            value={agentType}
            onChange={(e) => setAgentType(e.target.value as AgentVolatilityType)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="persistent_liquid">Persistent Liquid (VX, Mustard HD)</option>
            <option value="volatile_vapor">Volatile Vapor (Sarin GB, Hydrogen Cyanide)</option>
            <option value="toxic_industrial_gas">Toxic Industrial Chemical (Chlorine, Phosgene)</option>
            <option value="biological_aerosol">Biological Aerosol (Anthrax, Tularemia)</option>
            <option value="radiological_fallout">Radiological Particulate Fallout</option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            Contact persistence vs inhalation hazard profile.
          </p>
        </div>

        {/* 3. Minute Volume Work Rate */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400" /> Minute Volume Work Rate
          </label>
          <select
            value={workRate}
            onChange={(e) => setWorkRate(e.target.value as WorkRateMinuteVolume)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="resting_10">Resting (10 L/min - Command Post)</option>
            <option value="light_15">Light Work (15 L/min - Sentry, Vehicle Driving)</option>
            <option value="moderate_30">Moderate Work (30 L/min - Aircraft Refueling)</option>
            <option value="heavy_45">Heavy Work (45 L/min - Munitions Loading, ADR)</option>
            <option value="severe_60">Severe Work (60 L/min - Rapid Runway Repair)</option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            Respiratory volume determines toxic intake speed and metabolic heat.
          </p>
        </div>

        {/* 4. NOAA WBGT Heat Flag */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <ThermometerSun className="w-4 h-4 text-red-400" /> NOAA WBGT Heat Flag
          </label>
          <select
            value={wbgtFlag}
            onChange={(e) => setWbgtFlag(e.target.value as WbgtFlagCategory)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="white">White Flag (&lt; 78°F / 25.5°C)</option>
            <option value="green">Green Flag (80 - 84.9°F / 26.7 - 29.3°C)</option>
            <option value="yellow">Yellow Flag (85 - 87.9°F / 29.4 - 31°C)</option>
            <option value="red">Red Flag (88 - 89.9°F / 31.1 - 32.1°C)</option>
            <option value="black">Black Flag (≥ 90°F / ≥ 32.2°C)</option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            Wet Bulb Globe Temperature: +10°F added when in full MOPP.
          </p>
        </div>
      </div>

      {/* Shelter Toggle */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-card/40">
        <input
          type="checkbox"
          id="cps-shelter-toggle"
          checked={isCoveredShelter}
          onChange={(e) => setIsCoveredShelter(e.target.checked)}
          className="rounded border-border text-primary focus:ring-0 w-4 h-4 cursor-pointer"
        />
        <label htmlFor="cps-shelter-toggle" className="text-xs cursor-pointer select-none">
          <span className="font-bold text-foreground">Certified Pressurized Collective Protection (CPS) Shelter Active</span>
          <span className="text-muted-foreground block text-[11px]">
            Positive pressure &gt; 0.25 in W.C. with verified chemical filtration allows personnel to downgrade to MOPP 0 indoors.
          </span>
        </label>
      </div>

      {/* Results Matrix & Visual Ensemble */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Posture Card */}
        <div className="p-5 rounded-xl border border-primary/40 bg-primary/5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Mandatory Force Posture
            </span>
            <span className="text-xs font-black px-3 py-1 rounded-md bg-primary text-primary-foreground shadow">
              {result.recommendedMopp}
            </span>
          </div>

          {/* Visual Gear Diagram */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">
              Required Protective Ensemble Items:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                className={`p-2.5 rounded-lg border flex items-center justify-between ${
                  result.maskRequired
                    ? "border-red-500/50 bg-red-950/20 text-red-300 font-bold"
                    : "border-border/60 bg-background/50 text-muted-foreground line-through"
                }`}
              >
                <span>M50 / MCU-2P Mask</span>
                {result.maskRequired ? <CheckCircle2 className="w-4 h-4 text-red-400" /> : null}
              </div>

              <div
                className={`p-2.5 rounded-lg border flex items-center justify-between ${
                  result.overgarmentRequired
                    ? "border-amber-500/50 bg-amber-950/20 text-amber-300 font-bold"
                    : "border-border/60 bg-background/50 text-muted-foreground line-through"
                }`}
              >
                <span>JSLIST Overgarment</span>
                {result.overgarmentRequired ? <CheckCircle2 className="w-4 h-4 text-amber-400" /> : null}
              </div>

              <div
                className={`p-2.5 rounded-lg border flex items-center justify-between ${
                  result.bootsRequired
                    ? "border-blue-500/50 bg-blue-950/20 text-blue-300 font-bold"
                    : "border-border/60 bg-background/50 text-muted-foreground line-through"
                }`}
              >
                <span>Overboot Covers</span>
                {result.bootsRequired ? <CheckCircle2 className="w-4 h-4 text-blue-400" /> : null}
              </div>

              <div
                className={`p-2.5 rounded-lg border flex items-center justify-between ${
                  result.glovesRequired
                    ? "border-purple-500/50 bg-purple-950/20 text-purple-300 font-bold"
                    : "border-border/60 bg-background/50 text-muted-foreground line-through"
                }`}
              >
                <span>Butyl Rubber Gloves</span>
                {result.glovesRequired ? <CheckCircle2 className="w-4 h-4 text-purple-400" /> : null}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2 border-t border-border/40 leading-relaxed">
            {result.tacticalRationale}
          </p>
        </div>

        {/* Thermal Strain & Work/Rest Cycle Card */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-border/60">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Thermal Strain & Work/Rest Limitations
            </h3>
          </div>

          <div className="p-3.5 rounded-lg bg-background/60 border border-border/60 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Work/Rest Cycle:</span>
              <span className="font-mono font-bold text-foreground text-right">{result.workRestCycleMin}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Max Continuous Work:</span>
              <span className="font-mono font-bold text-amber-400">{result.maxWorkDurationHours} hours</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Mandatory Fluid Intake:</span>
              <span className="font-mono font-bold text-cyan-400">{result.waterIntakeQuartsPerHour} qt/hr</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-xs text-red-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Heat Casualty Warning
            </div>
            <p className="text-[11px] leading-relaxed">{result.heatStrainAlert}</p>
          </div>
        </div>

        {/* Doctrinal Reference MOPP Scale Card */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3 shadow-sm text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-border/60">
            <Layers className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Doctrinal MOPP Levels Quick Guide
            </h3>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="p-1.5 rounded bg-background/50 flex justify-between">
              <span className="font-bold text-foreground">MOPP Ready:</span>
              <span className="text-muted-foreground">Carry mask; gear readily accessible within 2 hrs.</span>
            </div>
            <div className="p-1.5 rounded bg-background/50 flex justify-between">
              <span className="font-bold text-foreground">MOPP 0:</span>
              <span className="text-muted-foreground">Carry mask; gear in work area within 30 min.</span>
            </div>
            <div className="p-1.5 rounded bg-background/50 flex justify-between">
              <span className="font-bold text-foreground">MOPP 1:</span>
              <span className="text-muted-foreground">Overgarment worn; carry mask, gloves, boots.</span>
            </div>
            <div className="p-1.5 rounded bg-background/50 flex justify-between">
              <span className="font-bold text-foreground">MOPP 2:</span>
              <span className="text-muted-foreground">Overgarment & boots worn; carry mask & gloves.</span>
            </div>
            <div className="p-1.5 rounded bg-background/50 flex justify-between">
              <span className="font-bold text-foreground">MOPP 3:</span>
              <span className="text-muted-foreground">Overgarment, boots, & mask worn; carry gloves.</span>
            </div>
            <div className="p-1.5 rounded bg-background/50 flex justify-between">
              <span className="font-bold text-foreground">MOPP 4:</span>
              <span className="text-muted-foreground">All protective gear worn & sealed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
