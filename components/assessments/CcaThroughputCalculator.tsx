"use client";

import React, { useState } from "react";
import {
  Droplets,
  Users,
  Clock,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Activity,
  ArrowRight,
  Shield,
} from "lucide-react";
import { calculateCcaThroughput } from "@/lib/calculations/cbrn-advanced";

export function CcaThroughputCalculator() {
  const [lanes, setLanes] = useState<number>(2);
  const [processingTimeMin, setProcessingTimeMin] = useState<number>(10);
  const [queue, setQueue] = useState<number>(50);
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [waterPerPerson, setWaterPerPerson] = useState<number>(5);
  const [bleach5PerPerson, setBleach5PerPerson] = useState<number>(1.5);
  const [bleach05PerPerson, setBleach05PerPerson] = useState<number>(1.0);

  const result = calculateCcaThroughput({
    lanesCount: lanes,
    processingTimePerPersonMin: processingTimeMin,
    incomingCasualtyQueue: queue,
    operatingHours: shiftHours,
    rinseWaterGalPerPerson: waterPerPerson,
    bleach5PctGalPerPerson: bleach5PerPerson,
    bleach05PctGalPerPerson: bleach05PerPerson,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Contamination Control Area (CCA) Throughput & Logistics Calculator
            </h2>
            <p className="text-xs text-muted-foreground">
              Processing Capacity (PPH), Graywater Containment Bladders, Bleach 5% & 0.5% Consumption, and Queue Bottleneck Analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/30">
            Capacity: {result.personnelPerHour} PPH ({result.totalShiftCapacity} per shift)
          </span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Decon Lanes */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-primary" /> Active Decon Lanes
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={lanes}
            onChange={(e) => setLanes(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Parallel processing corridors.</p>
        </div>

        {/* Processing Time */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" /> Cycle Time per Person (min)
          </label>
          <input
            type="number"
            min="4"
            max="30"
            value={processingTimeMin}
            onChange={(e) => setProcessingTimeMin(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Total dwell through 8 stations.</p>
        </div>

        {/* Queue Count */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-cyan-400" /> Incoming Casualty Queue
          </label>
          <input
            type="number"
            min="0"
            max="1000"
            value={queue}
            onChange={(e) => setQueue(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Personnel awaiting processing.</p>
        </div>

        {/* Shift Duration */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" /> Operating Shift (hours)
          </label>
          <input
            type="number"
            min="1"
            max="24"
            value={shiftHours}
            onChange={(e) => setShiftHours(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">Continuous team operational cycle.</p>
        </div>
      </div>

      {/* Fluid Consumption Inputs */}
      <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Decon Solution & Rinse Logistics Rates (Per Casualty)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[11px] text-muted-foreground">Clean Rinse Water (gal/person)</label>
            <input
              type="number"
              step="0.5"
              value={waterPerPerson}
              onChange={(e) => setWaterPerPerson(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground">5% Bleach (gal/person - Boots/Equip)</label>
            <input
              type="number"
              step="0.5"
              value={bleach5PerPerson}
              onChange={(e) => setBleach5PerPerson(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground">0.5% Bleach (gal/person - Skin/Gloves)</label>
            <input
              type="number"
              step="0.5"
              value={bleach05PerPerson}
              onChange={(e) => setBleach05PerPerson(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* KPI Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PPH */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Throughput Capacity</span>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-mono font-black text-primary">
            {result.personnelPerHour} <span className="text-xs font-normal">PPH</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Personnel processed per hour across {lanes} active lane(s).
          </p>
        </div>

        {/* Time to clear */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Queue Clearance Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-black text-amber-400">
            {result.hoursToClearQueue} <span className="text-xs font-normal">hours</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            To clear {queue} casualties currently waiting.
          </p>
        </div>

        {/* Total Effluent */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Graywater Effluent</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-black text-cyan-400">
            {result.totalGraywaterEffluentGal} <span className="text-xs font-normal">gallons</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Total contaminated wastewater generated.
          </p>
        </div>

        {/* Bladders Needed */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>500-Gal Bladders</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-black text-emerald-400">
            {result.graywaterBladdersNeeded} <span className="text-xs font-normal">bladder(s)</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Required military liquid containment bladders.
          </p>
        </div>
      </div>

      {/* Bottleneck Analysis & Solution Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Personnel Queue Bottleneck Identification
          </h4>
          <div className="p-3.5 rounded-lg bg-background/50 border border-border text-xs space-y-2">
            <div className="font-bold text-foreground">Critical Bottleneck Station:</div>
            <div className="text-amber-400 font-mono text-[11px]">{result.bottleneckStation}</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
              Station cycle times must be synchronized. If doffing assistants or de-masking validation operators lag, casualties accumulate in warm zone shuffle boxes, increasing heat exhaustion risk in MOPP 4.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-cyan-400" /> Decon Solution & Neutralization Inventory
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2.5 rounded-lg bg-background/50 border border-border">
              <span className="text-muted-foreground">5% Bleach Stock Required:</span>
              <span className="font-bold text-foreground">{result.totalBleach5PctGal} gal</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-background/50 border border-border">
              <span className="text-muted-foreground">0.5% Bleach Stock Required:</span>
              <span className="font-bold text-foreground">{result.totalBleach05PctGal} gal</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-background/50 border border-border">
              <span className="text-muted-foreground">Clean Rinse Water:</span>
              <span className="font-bold text-foreground">{result.totalWaterRequiredGal} gal</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-background/50 border border-border">
              <span className="text-muted-foreground">Sodium Thiosulfate Neutralizer:</span>
              <span className="font-bold text-emerald-400">{result.neutralizerRequiredKg} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
