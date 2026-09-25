"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldAlert,
  Activity,
  Layers,
  ThermometerSnowflake,
  PackageCheck,
  CheckCircle2,
  BookmarkPlus,
  AlertTriangle,
  FlaskConical,
  Radiation,
} from "lucide-react";
import Link from "next/link";
import { BioSampleChainOfCustody } from "@/components/quick-reference/BioSampleChainOfCustody";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function BiologicalAssessmentPage() {
  const [activeTab, setActiveTab] = useState<"sampling-custody" | "pathogen-dossier" | "prophylaxis">("sampling-custody");
  const [scenarioSaved, setScenarioSaved] = useState<boolean>(false);

  const handleSaveToScenario = () => {
    setScenarioSaved(true);
    setTimeout(() => setScenarioSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-teal-400" />
              Biological Agent Assessment & Evidence Custody
            </h1>
            <StatusBadge type="measured" label="USAMRIID Protocol" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Bio-aerosol particulate collection, environmental substrate sampling, UN 2814 triple packaging standards, and automated DD Form 1911 / DA Form 4137 courier logging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveToScenario}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:opacity-90 shadow-sm transition-opacity"
          >
            {scenarioSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Saved to Active Scenario!
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4" />
                Attach to Active Scenario
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cross Assessment Links */}
      <div className="flex flex-wrap gap-2 text-xs">
        <Link
          href="/assess/chemical"
          className="px-3 py-1.5 rounded-lg border border-border bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all"
        >
          <FlaskConical className="w-3.5 h-3.5 text-primary" /> Chemical Assessment
        </Link>
        <span className="px-3 py-1.5 rounded-lg border border-teal-500/40 bg-teal-950/20 text-teal-300 font-bold flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-400" /> Biological Assessment (Active)
        </span>
        <Link
          href="/assess/radiological"
          className="px-3 py-1.5 rounded-lg border border-border bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all"
        >
          <Radiation className="w-3.5 h-3.5 text-amber-400" /> Radiological Assessment
        </Link>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-border/80 bg-card/60">
        <button
          onClick={() => setActiveTab("sampling-custody")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "sampling-custody"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <FileText className="w-4 h-4" /> Sampling Protocols & DD Form 1911
        </button>

        <button
          onClick={() => setActiveTab("pathogen-dossier")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "pathogen-dossier"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <Layers className="w-4 h-4 text-teal-400" /> Tier 1 Select Agent Profiles
        </button>

        <button
          onClick={() => setActiveTab("prophylaxis")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "prophylaxis"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" /> Medical Countermeasures & Prophylaxis
        </button>
      </div>

      {/* Content Rendering */}
      {activeTab === "sampling-custody" && <BioSampleChainOfCustody />}

      {activeTab === "pathogen-dossier" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
            <span className="text-[10px] uppercase font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-950/40 border border-teal-500/30">
              Bacterial Spore
            </span>
            <h3 className="text-base font-bold text-foreground">Bacillus anthracis (Anthrax)</h3>
            <p className="text-xs text-muted-foreground">
              Inhalation anthrax incubation: 1 to 6 days (latent spores up to 60 days). Lethal dose ID50 ~8,000 to 10,000 spores. Mediastinal widening on chest radiography.
            </p>
            <div className="p-3 rounded-lg bg-background/50 border border-border text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sampling Method:</span>
                <span className="font-bold">HEPA Filter Cassette</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Preservation:</span>
                <span className="font-bold">2°C to 8°C Wet Ice</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
            <span className="text-[10px] uppercase font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30">
              Gram-Negative Coccobacillus
            </span>
            <h3 className="text-base font-bold text-foreground">Francisella tularensis (Tularemia)</h3>
            <p className="text-xs text-muted-foreground">
              Pneumonic tularemia infectious dose ID50: 10 to 50 organisms. Acute onset of high fever, chills, substernal tightness, and pleuritic chest pain.
            </p>
            <div className="p-3 rounded-lg bg-background/50 border border-border text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sampling Method:</span>
                <span className="font-bold">Liquid Impinger / Dacron Swab</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Preservation:</span>
                <span className="font-bold">-20°C Dry Ice</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-3">
            <span className="text-[10px] uppercase font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30">
              Plant Glycoprotein Toxin
            </span>
            <h3 className="text-base font-bold text-foreground">Ricin (Ricinus communis)</h3>
            <p className="text-xs text-muted-foreground">
              Ribosome-inactivating protein. Inhalation causes severe acute respiratory distress syndrome (ARDS), non-cardiogenic pulmonary edema, and alveolar flooding within 12–24h.
            </p>
            <div className="p-3 rounded-lg bg-background/50 border border-border text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sampling Method:</span>
                <span className="font-bold">Surface Swab / Buffer Elution</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Preservation:</span>
                <span className="font-bold">4°C (Do Not Freeze)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "prophylaxis" && (
        <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            DoD Post-Exposure Prophylaxis (PEP) Regimens
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-background/50 border border-border space-y-2">
              <h4 className="font-bold text-foreground">Anthrax Post-Exposure Prophylaxis:</h4>
              <p className="text-muted-foreground leading-relaxed">
                Oral Ciprofloxacin 500 mg q12h OR Doxycycline 100 mg q12h for 60 consecutive days, coupled with 3-dose BioThrax (AVA) subcutaneous vaccine series at days 0, 14, and 28.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border space-y-2">
              <h4 className="font-bold text-foreground">Tularemia Post-Exposure Prophylaxis:</h4>
              <p className="text-muted-foreground leading-relaxed">
                Oral Ciprofloxacin 500 mg q12h OR Doxycycline 100 mg q12h for 14 days initiated within 24–48 hours of suspected aerosol exposure.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
