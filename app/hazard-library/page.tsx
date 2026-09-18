"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Search,
  Filter,
  FlaskConical,
  Radiation,
  Biohazard,
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  ArrowRightLeft,
  AlertTriangle,
  Zap,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { CBRN_HAZARDS, CbrnHazard, CbrnCategory, ThreatLevel } from "@/lib/data/hazards";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function HazardLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | CbrnCategory>("all");
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<"all" | ThreatLevel>("all");
  const [activeHazard, setActiveHazard] = useState<CbrnHazard>(CBRN_HAZARDS[0]);
  const [compareList, setCompareList] = useState<CbrnHazard[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredHazards = useMemo(() => {
    return CBRN_HAZARDS.filter((h) => {
      const matchCat = selectedCategory === "all" || h.category === selectedCategory;
      const matchLevel = selectedThreatLevel === "all" || h.threatLevel === selectedThreatLevel;
      const term = searchTerm.toLowerCase();
      const matchSearch =
        h.name.toLowerCase().includes(term) ||
        (h.casNumber && h.casNumber.toLowerCase().includes(term)) ||
        (h.formulaOrIsotope && h.formulaOrIsotope.toLowerCase().includes(term)) ||
        h.threatClass.toLowerCase().includes(term) ||
        h.antidote.toLowerCase().includes(term) ||
        h.description.toLowerCase().includes(term);

      return matchCat && matchLevel && matchSearch;
    });
  }, [searchTerm, selectedCategory, selectedThreatLevel]);

  const toggleCompare = (hazard: CbrnHazard) => {
    if (compareList.some((c) => c.id === hazard.id)) {
      setCompareList(compareList.filter((c) => c.id !== hazard.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 hazards simultaneously.");
        return;
      }
      setCompareList([...compareList, hazard]);
    }
  };

  const getCategoryIcon = (category: CbrnCategory, className = "w-4 h-4") => {
    switch (category) {
      case "chemical":
        return <FlaskConical className={`${className} text-emerald-500`} />;
      case "biological":
        return <Biohazard className={`${className} text-rose-500`} />;
      case "radiological":
        return <Radiation className={`${className} text-amber-500`} />;
      case "nuclear":
        return <Zap className={`${className} text-purple-500`} />;
      default:
        return <ShieldAlert className={`${className} text-primary`} />;
    }
  };

  const chemicalCount = CBRN_HAZARDS.filter((h) => h.category === "chemical").length;
  const biologicalCount = CBRN_HAZARDS.filter((h) => h.category === "biological").length;
  const radiologicalCount = CBRN_HAZARDS.filter((h) => h.category === "radiological").length;
  const nuclearCount = CBRN_HAZARDS.filter((h) => h.category === "nuclear").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-primary" />
              CBRN Assessment & Hazard Intelligence Library
            </h1>
            <StatusBadge type="authoritative" label="Verified Threat Reference" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Authoritative Chemical, Biological, Radiological, and Nuclear threat profiles with validated clinical countermeasures, physical properties, lethality metrics, and operational standoff boundaries.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Compare Threats ({compareList.length}/3)
          </button>
        )}
      </div>

      {/* 4 Pillars Summary Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedCategory(selectedCategory === "chemical" ? "all" : "chemical")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedCategory === "chemical"
              ? "border-emerald-500 bg-emerald-500/10 shadow-sm"
              : "border-border bg-card hover:bg-secondary/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Chemical (CWA & TIC)
            </span>
            <FlaskConical className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">{chemicalCount} Threats</span>
          <span className="text-[10px] text-muted-foreground block">Nerve, Blister, Blood, Choking</span>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === "biological" ? "all" : "biological")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedCategory === "biological"
              ? "border-rose-500 bg-rose-500/10 shadow-sm"
              : "border-border bg-card hover:bg-secondary/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Biological (Bio-Agents)
            </span>
            <Biohazard className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">{biologicalCount} Threats</span>
          <span className="text-[10px] text-muted-foreground block">Select Agents, Toxins, VHFs</span>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === "radiological" ? "all" : "radiological")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedCategory === "radiological"
              ? "border-amber-500 bg-amber-500/10 shadow-sm"
              : "border-border bg-card hover:bg-secondary/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Radiological (RDD / Sources)
            </span>
            <Radiation className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">{radiologicalCount} Threats</span>
          <span className="text-[10px] text-muted-foreground block">Gamma, Alpha, Beta Isotope Sources</span>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === "nuclear" ? "all" : "nuclear")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedCategory === "nuclear"
              ? "border-purple-500 bg-purple-500/10 shadow-sm"
              : "border-border bg-card hover:bg-secondary/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Nuclear (IND & Criticality)
            </span>
            <Zap className="w-4 h-4 text-purple-500" />
          </div>
          <span className="text-xl font-black font-mono text-foreground">{nuclearCount} Threats</span>
          <span className="text-[10px] text-muted-foreground block">IND Detonation, Reactor Meltdown</span>
        </button>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, CAS, isotope, antidote (e.g. Sarin, Atropine, 137-Cs, Anthrax)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Quick Select */}
          <div className="flex flex-wrap gap-1.5">
            {(["all", "chemical", "biological", "radiological", "nuclear"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {cat === "all" ? `All (${CBRN_HAZARDS.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Filter Strip */}
        <div className="flex items-center gap-2 text-xs pt-1 border-t border-border flex-wrap">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Threat Level:
          </span>
          <button
            onClick={() => setSelectedThreatLevel("all")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium border ${
              selectedThreatLevel === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            All Severity
          </button>
          <button
            onClick={() => setSelectedThreatLevel("critical")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium border ${
              selectedThreatLevel === "critical"
                ? "bg-rose-600 text-white border-rose-600"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setSelectedThreatLevel("high")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium border ${
              selectedThreatLevel === "high"
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            High
          </button>
          <button
            onClick={() => setSelectedThreatLevel("elevated")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium border ${
              selectedThreatLevel === "elevated"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Elevated
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hazard List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
          {filteredHazards.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-border rounded-xl text-muted-foreground text-xs">
              No matching CBRN hazards found for the active filter.
            </div>
          ) : (
            filteredHazards.map((hazard) => {
              const isSelected = activeHazard.id === hazard.id;
              const inCompare = compareList.some((c) => c.id === hazard.id);

              return (
                <div
                  key={hazard.id}
                  onClick={() => setActiveHazard(hazard)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:bg-secondary/40"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(hazard.category)}
                      <span className="font-semibold text-sm text-foreground truncate">
                        {hazard.name}
                      </span>
                    </div>

                    <div className="text-[11px] text-muted-foreground flex items-center gap-2 font-mono flex-wrap">
                      <span className="uppercase">{hazard.id}</span>
                      <span>•</span>
                      <span className="truncate">{hazard.threatClass}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <span
                        className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase font-mono ${
                          hazard.threatLevel === "critical"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : hazard.threatLevel === "high"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {hazard.threatLevel}
                      </span>
                      {hazard.formulaOrIsotope && (
                        <span className="text-[10px] font-mono text-muted-foreground truncate">
                          {hazard.formulaOrIsotope}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      title={inCompare ? "Remove from comparison" : "Add to comparison"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(hazard);
                      }}
                      className={`p-1.5 rounded border text-xs font-semibold ${
                        inCompare
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground ${isSelected ? "text-primary" : ""}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed CBRN Threat Dossier (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            {/* Dossier Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {activeHazard.id} • {activeHazard.category.toUpperCase()} THREAT
                  </span>
                  <StatusBadge type="authoritative" label={activeHazard.sourceAgency} />
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      activeHazard.threatLevel === "critical"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : activeHazard.threatLevel === "high"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {activeHazard.threatLevel} Priority
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  {getCategoryIcon(activeHazard.category, "w-6 h-6")}
                  {activeHazard.name}
                </h2>
                <p className="text-xs font-semibold text-primary mt-0.5">
                  {activeHazard.threatClass}
                </p>
                {activeHazard.formulaOrIsotope && (
                  <span className="text-xs font-mono text-muted-foreground block mt-0.5">
                    Formula / Isotope: {activeHazard.formulaOrIsotope}
                  </span>
                )}
                {activeHazard.casNumber && (
                  <span className="text-xs font-mono text-muted-foreground block">
                    CAS Registry: {activeHazard.casNumber}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
                Verified: {activeHazard.lastVerified}
              </span>
            </div>

            {/* Antidote & Medical Countermeasure Callout Box */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Primary Antidote & Life-Saving Medical Countermeasure:
                </span>
                <span className="font-mono text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  {activeHazard.antidote}
                </span>
              </div>
              <p className="leading-relaxed text-[11px]">
                <strong>Immediate Action Protocol:</strong> {activeHazard.immediateAction}
              </p>
            </div>

            {/* Detailed Tactical Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1">
                <span className="font-bold text-foreground block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Standoff & Cordon Boundaries:
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {activeHazard.cordonDistance}
                </p>
              </div>

              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1">
                <span className="font-bold text-foreground block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Environmental Persistence:
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {activeHazard.persistence}
                </p>
              </div>

              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1">
                <span className="font-bold text-foreground block">
                  Primary Exposure Routes:
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {activeHazard.primaryRoute}
                </p>
              </div>

              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1">
                <span className="font-bold text-foreground block">
                  PPE & Force Posture (MOPP):
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {activeHazard.ppeRecommendation}
                </p>
              </div>

              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1 sm:col-span-2">
                <span className="font-bold text-foreground block flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Lethality & Toxicity Benchmarks:
                </span>
                <p className="text-muted-foreground font-mono text-[11px] leading-relaxed">
                  {activeHazard.lethalityMetrics}
                </p>
              </div>

              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1 sm:col-span-2">
                <span className="font-bold text-foreground block">
                  Decontamination Protocol:
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {activeHazard.deconMethod}
                </p>
              </div>
            </div>

            {/* Description & Mechanism */}
            <div className="space-y-1 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Doctrinal Threat Description & Mechanism:
              </h3>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {activeHazard.description}
              </p>
            </div>

            {/* Quick Action Links to Calculators */}
            <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {activeHazard.category === "chemical" && (
                  <Link
                    href="/assess/chemical"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    Open Chemical Haber Exposure Calculator
                  </Link>
                )}
                {activeHazard.category === "radiological" && (
                  <Link
                    href="/assess/stay-time"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    <Radiation className="w-3.5 h-3.5" />
                    Open Stay-Time Stay Limit Calculator
                  </Link>
                )}
                {activeHazard.category === "nuclear" && (
                  <Link
                    href="/assess/stay-time"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Calculate Nuclear Fallout Stay Times
                  </Link>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggleCompare(activeHazard)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                {compareList.some((c) => c.id === activeHazard.id)
                  ? "Remove from Comparison Matrix"
                  : "Add to Comparison Matrix"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-5xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                CBRN Threat Comparison Matrix ({compareList.length} Selected)
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {compareList.map((item) => (
                <div key={item.id} className="p-4 rounded-lg border border-border bg-secondary/30 space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-muted-foreground">
                        {item.category} • {item.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-primary">
                        {item.threatLevel}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5 mt-1">
                      {getCategoryIcon(item.category)}
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-muted-foreground block truncate">
                      {item.threatClass}
                    </span>
                  </div>

                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-bold block text-emerald-600 dark:text-emerald-400">
                      Antidote / Countermeasure:
                    </span>
                    <p className="text-foreground">{item.antidote}</p>
                  </div>

                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">Lethality / Metrics:</span>
                    <p className="text-foreground font-mono">{item.lethalityMetrics}</p>
                  </div>

                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">Routes & PPE:</span>
                    <p className="text-foreground">{item.ppeRecommendation}</p>
                  </div>

                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">Cordon Distance:</span>
                    <p className="text-foreground">{item.cordonDistance}</p>
                  </div>

                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">Decontamination:</span>
                    <p className="text-foreground">{item.deconMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
