"use client";

import React, { useState } from "react";
import {
  Syringe,
  Activity,
  AlertTriangle,
  HeartPulse,
  Clock,
  ShieldAlert,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import {
  calculateAntidoteTriage,
  AgentFamily,
  CholinergicSeverity,
} from "@/lib/calculations/cbrn-advanced";

export function AntidoteTriageCalculator() {
  const [agentFamily, setAgentFamily] = useState<AgentFamily>("nerve_v");
  const [severity, setSeverity] = useState<CholinergicSeverity>("moderate");
  const [totalCas, setTotalCas] = useState<number>(45);
  const [pedCas, setPedCas] = useState<number>(5);

  // Stockpile on hand
  const [stockpileAtnaa, setStockpileAtnaa] = useState<number>(100);
  const [stockpileCana, setStockpileCana] = useState<number>(50);
  const [stockpile2Pam, setStockpile2Pam] = useState<number>(40);
  const [stockpileCyanokit, setStockpileCyanokit] = useState<number>(10);

  const result = calculateAntidoteTriage({
    agentFamily,
    severity,
    totalCasualties: totalCas,
    pediatricCasualties: pedCas,
    stockpileAtnaa,
    stockpileCana,
    stockpile2Pam,
    stockpileCyanokit,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center">
            <Syringe className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Casualty Antidote Triage & Stockpile Calculator
            </h2>
            <p className="text-xs text-muted-foreground">
              Clinical Dosing: ATNAA (Atropine/2-PAM), CANA (Diazepam/Midazolam), Cyanokit, & Pediatric Formulations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/30">
            Total Casualties: {totalCas} ({pedCas} Pediatric)
          </span>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Agent Family */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-purple-400" /> Suspected Agent Class
          </label>
          <select
            value={agentFamily}
            onChange={(e) => setAgentFamily(e.target.value as AgentFamily)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="nerve_v">Nerve Agent V-Series (VX)</option>
            <option value="nerve_g">Nerve Agent G-Series (Sarin, Soman, Tabun)</option>
            <option value="novichok">Novichok A-Series (Ultra-Potent)</option>
            <option value="blood_cyanide">Blood Agent (Cyanide / AC / CK)</option>
            <option value="vesicant_lewisite">Vesicant Arsenical (Lewisite / BAL)</option>
          </select>
        </div>

        {/* Severity */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-red-400" /> Symptom Severity
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as CholinergicSeverity)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs"
          >
            <option value="mild">Mild (Miosis, Rhinorrhea, Localized Sweating)</option>
            <option value="moderate">Moderate (Dyspnea, Bronchospasm, Fasciculations)</option>
            <option value="severe">Severe (Convulsions, Apnea, Cyanosis, Coma)</option>
          </select>
        </div>

        {/* Total Casualties */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-primary" /> Total Casualties
          </label>
          <input
            type="number"
            min="1"
            value={totalCas}
            onChange={(e) => setTotalCas(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
        </div>

        {/* Pediatric Casualties */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-cyan-400" /> Pediatric Sub-Count (&lt; 14 yr)
          </label>
          <input
            type="number"
            min="0"
            max={totalCas}
            value={pedCas}
            onChange={(e) => setPedCas(Math.min(totalCas, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
          />
        </div>
      </div>

      {/* Stockpile Inputs & Inventory Depletion Status */}
      <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Current Unit Medical Stockpile Inventory (On-Hand)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-[11px] text-muted-foreground">ATNAA Autoinjectors</label>
            <input
              type="number"
              value={stockpileAtnaa}
              onChange={(e) => setStockpileAtnaa(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground">CANA (Diazepam 10mg)</label>
            <input
              type="number"
              value={stockpileCana}
              onChange={(e) => setStockpileCana(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground">2-PAM Standalone Vials</label>
            <input
              type="number"
              value={stockpile2Pam}
              onChange={(e) => setStockpile2Pam(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground">Cyanokit (5g Vials)</label>
            <input
              type="number"
              value={stockpileCyanokit}
              onChange={(e) => setStockpileCyanokit(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* Dosing Demand Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ATNAA */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>ATNAA Needed</span>
            <Syringe className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">
            {result.totalAtnaaNeeded} <span className="text-xs font-normal">doses</span>
          </div>
          <div className="text-[11px] flex justify-between pt-1">
            <span className="text-muted-foreground">Per Casualty:</span>
            <span className="font-bold">{result.atnaaPerCasualty}</span>
          </div>
          {result.atnaaDeficit > 0 && (
            <div className="text-[11px] text-red-400 font-bold pt-1">
              DEFICIT: -{result.atnaaDeficit} Doses
            </div>
          )}
        </div>

        {/* CANA */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>CANA Needed</span>
            <HeartPulse className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">
            {result.totalCanaNeeded} <span className="text-xs font-normal">doses</span>
          </div>
          <div className="text-[11px] flex justify-between pt-1">
            <span className="text-muted-foreground">Per Casualty:</span>
            <span className="font-bold">{result.canaPerCasualty}</span>
          </div>
          {result.canaDeficit > 0 && (
            <div className="text-[11px] text-red-400 font-bold pt-1">
              DEFICIT: -{result.canaDeficit} Doses
            </div>
          )}
        </div>

        {/* 2-PAM */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Extra 2-PAM Vials</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">
            {result.total2PamNeeded} <span className="text-xs font-normal">vials</span>
          </div>
          <div className="text-[11px] flex justify-between pt-1">
            <span className="text-muted-foreground">Per Casualty:</span>
            <span className="font-bold">{result.additional2PamPerCasualty}</span>
          </div>
        </div>

        {/* Cyanokit */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Cyanokit 5g Vials</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">
            {result.totalCyanokitNeeded} <span className="text-xs font-normal">kits</span>
          </div>
          <div className="text-[11px] flex justify-between pt-1">
            <span className="text-muted-foreground">Per Casualty:</span>
            <span className="font-bold">{result.cyanokitPerCasualty}</span>
          </div>
          {result.cyanokitDeficit > 0 && (
            <div className="text-[11px] text-red-400 font-bold pt-1">
              DEFICIT: -{result.cyanokitDeficit} Kits
            </div>
          )}
        </div>
      </div>

      {/* Clinical Directives & Pediatric Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Directives */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Immediate Clinical Antidote Directives
          </h4>
          <div className="space-y-2">
            {result.immediateClinicalDirectives.map((d, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-background/50 border border-border text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{d}</span>
              </div>
            ))}
            {result.dosingIntervalNotes.map((n, idx) => (
              <div key={`n-${idx}`} className="p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs text-foreground leading-relaxed flex items-start gap-2">
                <span className="text-primary font-bold">ℹ</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pediatric Guidelines */}
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4" /> Pediatric & Mass Casualty Adaptation Guidelines
          </h4>
          <div className="space-y-2">
            {result.pediatricGuidelines.map((p, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-background/50 border border-border text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
