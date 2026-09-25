"use client";

import React, { useState } from "react";
import {
  Compass,
  ShieldAlert,
  Radio,
  Bomb,
  HeartPulse,
  Wrench,
  FileText,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { CcaWorkflowSimulator } from "@/components/quick-reference/CcaWorkflowSimulator";
import { SensorTelemetrySimulator } from "@/components/quick-reference/SensorTelemetrySimulator";
import { MoppPostureMatrix } from "@/components/quick-reference/MoppPostureMatrix";
import { UxoSpotReportGuide } from "@/components/quick-reference/UxoSpotReportGuide";
import { BioSampleChainOfCustody } from "@/components/quick-reference/BioSampleChainOfCustody";
import { CasualtySurgeModule } from "@/components/quick-reference/CasualtySurgeModule";
import { AdrRunwayCalculator } from "@/components/quick-reference/AdrRunwayCalculator";

export default function QuickReferenceHubPage() {
  const [activeTab, setActiveTab] = useState<
    "cca-decon" | "telemetry" | "mopp-matrix" | "uxo-9line" | "bio-custody" | "casualty-surge" | "adr-runway"
  >("cca-decon");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Compass className="w-6 h-6 text-primary" />
              Tactical CBRN Quick Reference & Operational Simulators
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time interactive decision tools, decontamination workflows, sensor telemetry, MOPP posture matrix, 9-Line UXO reports, biological chain-of-custody, hospital casualty surge, and ADR timeline modeling.
          </p>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-border/80 bg-card/60 shadow-sm">
        <button
          onClick={() => setActiveTab("cca-decon")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "cca-decon"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-red-400" /> CCA Decon Simulator
        </button>

        <button
          onClick={() => setActiveTab("telemetry")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "telemetry"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <Radio className="w-4 h-4 text-purple-400" /> Sensor Telemetry (JCAD/HAPSITE/ADM)
        </button>

        <button
          onClick={() => setActiveTab("mopp-matrix")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "mopp-matrix"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <Shield className="w-4 h-4 text-amber-400" /> MOPP Posture Matrix
        </button>

        <button
          onClick={() => setActiveTab("uxo-9line")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "uxo-9line"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <Bomb className="w-4 h-4 text-red-400" /> UXO Guide & 9-Line Report
        </button>

        <button
          onClick={() => setActiveTab("bio-custody")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "bio-custody"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <FileText className="w-4 h-4 text-teal-400" /> Bio Sampling & DD 1911
        </button>

        <button
          onClick={() => setActiveTab("casualty-surge")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "casualty-surge"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <HeartPulse className="w-4 h-4 text-rose-400" /> Hospital Casualty Surge
        </button>

        <button
          onClick={() => setActiveTab("adr-runway")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "adr-runway"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <Wrench className="w-4 h-4 text-orange-400" /> ADR Runway Repair
        </button>
      </div>

      {/* Render Active Component */}
      <div className="pt-2">
        {activeTab === "cca-decon" && <CcaWorkflowSimulator />}
        {activeTab === "telemetry" && <SensorTelemetrySimulator />}
        {activeTab === "mopp-matrix" && <MoppPostureMatrix />}
        {activeTab === "uxo-9line" && <UxoSpotReportGuide />}
        {activeTab === "bio-custody" && <BioSampleChainOfCustody />}
        {activeTab === "casualty-surge" && <CasualtySurgeModule />}
        {activeTab === "adr-runway" && <AdrRunwayCalculator />}
      </div>
    </div>
  );
}
