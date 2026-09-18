"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, ShieldAlert, BookOpen, AlertTriangle } from "lucide-react";

interface CalculationDetailsDrawerProps {
  modelVersion: string;
  sourceWorkbook: string;
  equations: string[];
  assumptions: string[];
  warnings: string[];
  limitations?: string[];
  inputsSummary?: Record<string, string | number>;
  intermediateSteps?: Record<string, string | number>;
}

export function CalculationDetailsDrawer({
  modelVersion,
  sourceWorkbook,
  equations,
  assumptions,
  warnings,
  limitations = [],
  inputsSummary,
  intermediateSteps,
}: CalculationDetailsDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-muted/40 hover:bg-muted/70 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-semibold text-xs sm:text-sm text-foreground">
            Calculation Details, Method Traceability & Limitations
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">
            {modelVersion}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 text-xs border-t border-border bg-card/60">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-border">
            <div>
              <span className="text-muted-foreground block text-[11px]">Model Version:</span>
              <span className="font-mono font-medium text-foreground">{modelVersion}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Source Workbook Provenance:</span>
              <span className="font-mono font-medium text-foreground">{sourceWorkbook}</span>
            </div>
          </div>

          {/* Inputs & Intermediates */}
          {(inputsSummary || intermediateSteps) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-border">
              {inputsSummary && (
                <div>
                  <h4 className="font-semibold text-foreground mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    Input Parameters & Units
                  </h4>
                  <ul className="space-y-1 font-mono text-[11px] bg-secondary/50 p-2.5 rounded-lg border border-border">
                    {Object.entries(inputsSummary).map(([key, val]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="text-foreground font-medium">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {intermediateSteps && (
                <div>
                  <h4 className="font-semibold text-foreground mb-1.5 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-primary" />
                    Intermediate Calculations
                  </h4>
                  <ul className="space-y-1 font-mono text-[11px] bg-secondary/50 p-2.5 rounded-lg border border-border">
                    {Object.entries(intermediateSteps).map(([key, val]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="text-foreground font-medium">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Governing Equations */}
          <div>
            <h4 className="font-semibold text-foreground mb-1.5">Governing Mathematical Equations:</h4>
            <div className="space-y-1 font-mono bg-secondary/40 p-2.5 rounded-lg border border-border text-[11px]">
              {equations.map((eq, i) => (
                <div key={i} className="text-foreground">
                  • {eq}
                </div>
              ))}
            </div>
          </div>

          {/* Assumptions */}
          <div>
            <h4 className="font-semibold text-foreground mb-1">Scientific & Operational Assumptions:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {assumptions.map((asmp, i) => (
                <li key={i}>{asmp}</li>
              ))}
            </ul>
          </div>

          {/* Warnings & Limits */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-amber-900 dark:text-amber-200 space-y-1.5">
            <h4 className="font-semibold flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Safety Warnings & Applicability Limits:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              {warnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
              {limitations.map((lim, i) => (
                <li key={i}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
