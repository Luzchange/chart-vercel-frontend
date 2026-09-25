"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  Users,
  Shield,
  Layers,
  TrendingUp,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { calculateCasualtySurge } from "@/lib/calculations/cbrn-advanced";

export function CasualtySurgeModule() {
  const [exposedPop, setExposedPop] = useState<number>(1200);
  const [posture, setPosture] = useState<"unprotected_mopp0" | "sheltered_cps" | "partial_mopp2" | "full_mopp4">("partial_mopp2");
  const [agentClass, setAgentClass] = useState<"nerve_agent" | "pulmonary_choking" | "biological_pathogen" | "radiological_dirty_bomb">("nerve_agent");
  const [distanceKm, setDistanceKm] = useState<number>(1.2);

  const result = calculateCasualtySurge({
    exposedPopulation: exposedPop,
    protectionPosture: posture,
    agentToxicityClass: agentClass,
    distanceToEpicenterKm: distanceKm,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Hospital & Triage Casualty Surge Estimator
            </h2>
            <p className="text-xs text-muted-foreground">
              Medical Facility Surge Projections: NATO Triage Categories (T1–T4), ICU Ventilator Demands, & Autoinjector Depletion Curves
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-950/40 text-red-400 border border-red-500/30 shadow">
            Projected Surge: {result.totalCasualties} Casualties
          </span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Exposed Population */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" /> Exposed Personnel Population
          </label>
          <input
            type="number"
            min="10"
            max="25000"
            value={exposedPop}
            onChange={(e) => setExposedPop(Math.max(10, parseInt(e.target.value) || 10))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">
            Personnel within affected base quadrant or facility perimeter.
          </p>
        </div>

        {/* Protection Posture */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-400" /> Baseline Force Posture
          </label>
          <select
            value={posture}
            onChange={(e) => setPosture(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="unprotected_mopp0">Unprotected / MOPP 0 (Highest Surge)</option>
            <option value="partial_mopp2">Partial Posture / MOPP 2 (Standard Sentry)</option>
            <option value="full_mopp4">Full Protective Gear / MOPP 4 (Hardened)</option>
            <option value="sheltered_cps">Pressurized CPS Shelter (Lowest Ingress)</option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            Gear worn at exact moment of strike impact.
          </p>
        </div>

        {/* Agent Toxicity Class */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-red-400" /> CBRN Threat Class
          </label>
          <select
            value={agentClass}
            onChange={(e) => setAgentClass(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="nerve_agent">Organophosphate Nerve Agent (GB / VX)</option>
            <option value="pulmonary_choking">Pulmonary / Choking Agent (Phosgene / Cl2)</option>
            <option value="biological_pathogen">Biological Aerosol (Anthrax / Tularemia)</option>
            <option value="radiological_dirty_bomb">Radiological Dispersal Device (RDD)</option>
          </select>
          <p className="text-[11px] text-muted-foreground">
            Determines critical mechanical ventilation and antidote demand.
          </p>
        </div>

        {/* Epicenter Distance */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Distance from Epicenter (km)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.2"
            max="20"
            value={distanceKm}
            onChange={(e) => setDistanceKm(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
          <p className="text-[11px] text-muted-foreground">
            Gaussian plume dilution over downwind distance.
          </p>
        </div>
      </div>

      {/* Triage NATO START Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* T1 Red */}
        <div className="p-4 rounded-xl border border-red-500/50 bg-red-950/20 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-red-400">
            <span>T1 IMMEDIATE (Red)</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground mt-1">
            {result.triageImmediateT1}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Life-threatening airway compromise, apnea, severe convulsions. Immediate resuscitation required.
          </p>
        </div>

        {/* T2 Yellow */}
        <div className="p-4 rounded-xl border border-amber-500/50 bg-amber-950/20 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
            <span>T2 DELAYED (Yellow)</span>
            <Activity className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground mt-1">
            {result.triageDelayedT2}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Moderate dyspnea, localized fasciculations, vomiting, chemical burns. Stable for 1–2 hours.
          </p>
        </div>

        {/* T3 Green */}
        <div className="p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/20 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>T3 MINIMAL (Green)</span>
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground mt-1">
            {result.triageMinimalT3}
          </div>
          <p className="text-[11px] text-muted-foreground">
            "Walking wounded", mild rhinorrhea or miosis, acute anxiety, minimal dermal contact.
          </p>
        </div>

        {/* T4 Black */}
        <div className="p-4 rounded-xl border border-zinc-700/50 bg-zinc-900/40 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span>T4 EXPECTANT (Black)</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-muted-foreground mt-1">
            {result.triageExpectantT4}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Prolonged asystole, fixed dilated pupils, lethal dose received in mass casualty triaging.
          </p>
        </div>
      </div>

      {/* Critical Demands & Surge Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hospital Demands */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border/60">
            <Stethoscope className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Critical ICU & Stockpile Resource Demands
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-background/60 border border-border/60 flex justify-between items-center">
              <div>
                <span className="text-muted-foreground block text-[11px]">ICU Mechanical Ventilators:</span>
                <span className="text-[10px] text-muted-foreground font-sans">For central apnea & bronchospasm</span>
              </div>
              <span className="text-xl font-bold text-red-400">{result.icuVentilatorDemand} Units</span>
            </div>

            <div className="p-3 rounded-lg bg-background/60 border border-border/60 flex justify-between items-center">
              <div>
                <span className="text-muted-foreground block text-[11px]">Autoinjectors Needed (24h):</span>
                <span className="text-[10px] text-muted-foreground font-sans">ATNAA & CANA doses</span>
              </div>
              <span className="text-xl font-bold text-amber-400">{result.autoinjectorDoses24h} Doses</span>
            </div>

            <div className="p-3 rounded-lg bg-background/60 border border-border/60 flex justify-between items-center">
              <div>
                <span className="text-muted-foreground block text-[11px]">Avg Inpatient Hospital Stay:</span>
                <span className="text-[10px] text-muted-foreground font-sans">ICU + Step-down days</span>
              </div>
              <span className="text-xl font-bold text-cyan-400">{result.estimatedHospitalStayDaysAvg} Days</span>
            </div>
          </div>
        </div>

        {/* Surge Timeline Arrival Graph */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-border/80 bg-card/60 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                24-Hour Cumulative Casualty Arrival Surge Curve
              </h3>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">Cumulative Influx</span>
          </div>

          <div className="space-y-3 pt-2">
            {result.surgeSurgeTimelineHours.map((pt) => {
              const pct = result.totalCasualties > 0 ? (pt.cumulativeCasualties / result.totalCasualties) * 100 : 0;
              return (
                <div key={pt.hour} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Hour +{pt.hour.toString().padStart(2, "0")}h:</span>
                    <span className="font-bold text-foreground">
                      {pt.cumulativeCasualties} / {result.totalCasualties} ({Math.round(pct)}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground pt-2">
            Standard sigmoidal surge distribution: peak medical influx occurs between hours 3 and 6 post-detonation as walking wounded and buddy-evacuated casualties overwhelm triage bays.
          </p>
        </div>
      </div>
    </div>
  );
}
