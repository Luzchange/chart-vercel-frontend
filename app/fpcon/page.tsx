"use client";

import React, { useState } from "react";
import { ShieldAlert, ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const FPCON_LEVELS = [
  {
    level: "NORMAL",
    name: "FPCON Normal",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    summary: "General global threat of possible terrorist activity exists and warrants a routine security posture.",
    measures: "Standard access control, routine identification checks, regular security patrols.",
  },
  {
    level: "ALPHA",
    name: "FPCON Alpha",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
    summary: "Increased general threat of possible terrorist activity against personnel and facilities, nature and extent unpredictable.",
    measures: "Random vehicle inspections, increased gate staffing, personnel situational awareness alerts.",
  },
  {
    level: "BRAVO",
    name: "FPCON Bravo",
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    summary: "Increased or more predictable threat of terrorist activity exists.",
    measures: "Closer inspection of commercial delivery vehicles, 100% ID checks, restricted non-essential visitor access.",
  },
  {
    level: "CHARLIE",
    name: "FPCON Charlie",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    summary: "An incident occurs or intelligence indicates that terrorist action or targeting against personnel/facilities is likely.",
    measures: "Strict vehicle inspections, entry control point barriers active, recall of specialized personnel, enhanced physical perimeter defense.",
  },
  {
    level: "DELTA",
    name: "FPCON Delta",
    color: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30",
    summary: "Immediate area where a terrorist attack has occurred or when intelligence indicates terrorist action against a specific location is imminent.",
    measures: "Total installation lockdown, entry restricted strictly to mission-essential emergency responders, arms bearing for security details.",
  },
];

export default function FpconPage() {
  const [selectedLevel, setSelectedLevel] = useState(FPCON_LEVELS[2]); // Bravo default

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-amber-500" />
              Force Protection Condition (FPCON) Educational Reference
            </h1>
            <StatusBadge type="authoritative" label="Training & Education" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Unclassified doctrinal reference on DoD force protection posture and physical security baselines.
          </p>
        </div>

        <a
          href="/training"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          View in Training & Education Hub →
        </a>
      </div>

      <div className="p-3.5 rounded-lg bg-secondary/40 border border-border text-xs text-muted-foreground space-y-1">
        <span className="font-semibold text-foreground block">
          Educational Boundary Notice:
        </span>
        <p>
          This module contains exclusively unclassified, publicly published baseline definitions from DoD Directive 2000.12 and Joint Pub 3-07.2. It never displays active installation threat conditions or tactical countermeasure schedules.
        </p>
      </div>

      {/* FPCON Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {FPCON_LEVELS.map((fp) => {
          const isSelected = selectedLevel.level === fp.level;

          return (
            <button
              key={fp.level}
              onClick={() => setSelectedLevel(fp)}
              className={`p-4 rounded-xl border text-left transition-all ${fp.color} ${
                isSelected ? "ring-2 ring-primary scale-105 shadow-md" : "opacity-80 hover:opacity-100"
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase block tracking-wider opacity-75">
                Level
              </span>
              <h3 className="font-black text-base">{fp.level}</h3>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Level Dossier */}
      <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-lg font-bold text-foreground">
            {selectedLevel.name} Standard Baseline
          </h2>
          <span className={`px-2.5 py-1 rounded text-xs font-bold border ${selectedLevel.color}`}>
            {selectedLevel.level}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-muted-foreground block">
            Threat Condition & Operational Definition:
          </span>
          <p className="text-foreground leading-relaxed text-sm">
            {selectedLevel.summary}
          </p>
        </div>

        <div className="space-y-2 text-xs pt-2 border-t border-border">
          <span className="font-bold uppercase tracking-wider text-muted-foreground block">
            Doctrinal Baseline Measures & Readiness Actions:
          </span>
          <p className="text-muted-foreground leading-relaxed">
            {selectedLevel.measures}
          </p>
        </div>
      </div>
    </div>
  );
}
