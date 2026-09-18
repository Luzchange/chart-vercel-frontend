"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
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
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface HazardRecord {
  id: string;
  name: string;
  category: "chemical" | "radiological" | "biological";
  casNumber?: string;
  commonFormula?: string;
  primaryRoute: string;
  ppeRecommendation: string;
  immediateAction: string;
  description: string;
  sourceAgency: string;
  lastVerified: string;
}

const HAZARDS_DATA: HazardRecord[] = [
  // Biological Agents (from legacy CHART Bio sheet)
  {
    id: "BIO-01",
    name: "Bacillus anthracis (Anthrax)",
    category: "biological",
    primaryRoute: "Inhalation, Cutaneous, Gastrointestinal",
    ppeRecommendation: "Level B/C with PAPR / N95 or P100 filter. Gloves and non-permeable coveralls.",
    immediateAction: "Post-exposure prophylaxis: Ciprofloxacin or Doxycycline within 48h. Anthrax vaccine adsorbed (AVA).",
    description: "Gram-positive spore-forming rod. Spores survive environmental extremes. Inhalation anthrax carries high lethality without prompt antimicrobial therapy.",
    sourceAgency: "CDC / DoD OEH",
    lastVerified: "2026-02-15",
  },
  {
    id: "BIO-02",
    name: "Yersinia pestis (Plague)",
    category: "biological",
    primaryRoute: "Inhalation (Pneumonic), Flea Vector (Bubonic)",
    ppeRecommendation: "Droplet & contact precautions. N95 respirator minimum.",
    immediateAction: "Immediate isolation. Streptomycin, Gentamicin, or Doxycycline within 24h of symptom onset.",
    description: "Gram-negative coccobacillus. Pneumonic plague spreads person-to-person via respiratory droplets with rapid progression.",
    sourceAgency: "WHO / CDC",
    lastVerified: "2026-01-20",
  },
  {
    id: "BIO-03",
    name: "Francisella tularensis (Tularemia)",
    category: "biological",
    primaryRoute: "Inhalation, Arthropod bite, Ingestion",
    ppeRecommendation: "Airborne / droplet protection (PAPR or tight-fitting respirator).",
    immediateAction: "Streptomycin, Gentamicin, or Doxycycline prophylaxis. Strict barrier nursing.",
    description: "Extremely low infectious dose (10-50 organisms). Ulceroglandular and pneumonic presentations.",
    sourceAgency: "CDC NIOSH",
    lastVerified: "2026-02-10",
  },
  {
    id: "BIO-04",
    name: "Clostridium botulinum neurotoxin",
    category: "biological",
    primaryRoute: "Ingestion, Inhalation (Aerosolized)",
    ppeRecommendation: "Full splash protection, Level C with HEPA/P100 filter.",
    immediateAction: "Heptavalent botulinum antitoxin (HBAT). Mechanical ventilatory support preparation.",
    description: "Most potent biological toxin known. Flaccid descending symmetric paralysis leading to respiratory arrest.",
    sourceAgency: "CDC / USAMRIID",
    lastVerified: "2026-02-12",
  },
  {
    id: "BIO-05",
    name: "Ricin (Ricinus communis)",
    category: "biological",
    primaryRoute: "Inhalation, Injection, Ingestion",
    ppeRecommendation: "Level B PPE for powders/aerosols. P100 particulate filter.",
    immediateAction: "No specific antitoxin. Supportive care: aggressive airway management and pulmonary edema management.",
    description: "Ribosome-inactivating protein extracted from castor beans. Inhalation leads to acute pulmonary edema within 24h.",
    sourceAgency: "CDC / NIOSH",
    lastVerified: "2026-01-30",
  },

  // Chemical Agents (from legacy CHART CWA Entry & Equations)
  {
    id: "CHM-01",
    name: "Sarin (GB)",
    category: "chemical",
    casNumber: "107-44-8",
    commonFormula: "C4H10FO2P",
    primaryRoute: "Inhalation vapor, Ocular, Percutaneous",
    ppeRecommendation: "Level A (Vapor-protective suit) or MOPP 4 with M-series mask.",
    immediateAction: "Auto-injector administration: Atropine + 2-PAM (Pralidoxime) + Midazolam. Immediate decontamination.",
    description: "Volatile organophosphate G-series nerve agent. Acetylcholinesterase inhibitor causing hypersecretion, bronchoconstriction, and convulsions.",
    sourceAgency: "DoD / USAMRICD",
    lastVerified: "2026-03-01",
  },
  {
    id: "CHM-02",
    name: "VX (Nerve Agent)",
    category: "chemical",
    casNumber: "50782-69-9",
    commonFormula: "C11H26NO2PS",
    primaryRoute: "Percutaneous liquid, Inhalation aerosol",
    ppeRecommendation: "Level A or impermeable butyl suit (MOPP 4). Extreme persistent contact hazard.",
    immediateAction: "RSDL (Reactive Skin Decontamination Lotion) or copious warm soapy water. Atropine + 2-PAM.",
    description: "Persistent, oily liquid nerve agent with low volatility but high percutaneous lethality. Environmental persistence of days to weeks.",
    sourceAgency: "DoD / USAMRICD",
    lastVerified: "2026-03-01",
  },
  {
    id: "CHM-03",
    name: "Sulfur Mustard (HD)",
    category: "chemical",
    casNumber: "505-60-2",
    commonFormula: "C4H8Cl2S",
    primaryRoute: "Vapor & Liquid percutaneous, Ocular, Inhalation",
    ppeRecommendation: "Level A/B butyl rubber protective gear. Full barrier protection.",
    immediateAction: "Decontaminate within 1-2 minutes with RSDL. Delayed vesication symptoms (4-24h latency).",
    description: "Vesicant (blister) agent. Alkylating agent causing severe DNA cross-linking, ocular ulceration, and bone marrow suppression.",
    sourceAgency: "OSHA / DoD OEH",
    lastVerified: "2026-02-28",
  },

  // Radiological Hazards (from legacy CHART Rad sheet)
  {
    id: "RAD-01",
    name: "Cesium-137 (Cs-137)",
    category: "radiological",
    primaryRoute: "External gamma, Ingestion/Inhalation beta",
    ppeRecommendation: "Level C with HEPA/P100 filter. Anti-contamination coveralls.",
    immediateAction: "Time, distance, shielding. Decorporation with Prussian Blue (Radiogardase) if internal ingestion suspected.",
    description: "Major beta and gamma emitter (half-life 30.17 years). Common industrial and radiological dispersal threat.",
    sourceAgency: "NRC / EPA / DoD",
    lastVerified: "2026-02-14",
  },
  {
    id: "RAD-02",
    name: "Cobalt-60 (Co-60)",
    category: "radiological",
    primaryRoute: "High-energy external gamma (1.17 & 1.33 MeV)",
    ppeRecommendation: "Strict inverse square distance controls, lead/heavy shielding.",
    immediateAction: "Evacuate high-dose field. ALARA enforcement. Survey with ADM-300 or calibrated ion chamber.",
    description: "Industrial radiography and irradiator source. Produces deep penetrating tissue dose.",
    sourceAgency: "NRC / EPA",
    lastVerified: "2026-02-18",
  },
];

export default function HazardLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeHazard, setActiveHazard] = useState<HazardRecord>(HAZARDS_DATA[0]);
  const [compareList, setCompareList] = useState<HazardRecord[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredHazards = useMemo(() => {
    return HAZARDS_DATA.filter((h) => {
      const matchCat = selectedCategory === "all" || h.category === selectedCategory;
      const matchSearch =
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (h.casNumber && h.casNumber.includes(searchTerm)) ||
        h.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const toggleCompare = (hazard: HazardRecord) => {
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              OEH Hazard Intelligence Library
            </h1>
            <StatusBadge type="authoritative" label="Public Source Verified" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Curated chemical, biological, and radiological reference profiles with verified countermeasures and exposure guidance.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Compare Hazards ({compareList.length}/3)
          </button>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search hazard by name, CAS number, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "chemical", "radiological", "biological"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hazard List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredHazards.map((hazard) => {
            const isSelected = activeHazard.id === hazard.id;
            const inCompare = compareList.some((c) => c.id === hazard.id);

            return (
              <div
                key={hazard.id}
                onClick={() => setActiveHazard(hazard)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {hazard.category === "chemical" && <FlaskConical className="w-4 h-4 text-emerald-500" />}
                    {hazard.category === "radiological" && <Radiation className="w-4 h-4 text-amber-500" />}
                    {hazard.category === "biological" && <Biohazard className="w-4 h-4 text-rose-500" />}
                    <span className="font-semibold text-sm text-foreground truncate">
                      {hazard.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-2 font-mono">
                    <span>{hazard.id}</span>
                    {hazard.casNumber && <span>• CAS: {hazard.casNumber}</span>}
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
          })}
        </div>

        {/* Right Column: Detailed Hazard Dossier (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            {/* Dossier Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {activeHazard.id} • {activeHazard.category.toUpperCase()}
                  </span>
                  <StatusBadge type="authoritative" label={activeHazard.sourceAgency} />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {activeHazard.name}
                </h2>
                {activeHazard.casNumber && (
                  <span className="text-xs font-mono text-muted-foreground">
                    CAS Registry Number: {activeHazard.casNumber}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                Verified: {activeHazard.lastVerified}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Description & Toxicology Overview
              </h3>
              <p className="text-xs text-foreground leading-relaxed">
                {activeHazard.description}
              </p>
            </div>

            {/* Route & PPE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1">
                <span className="font-bold text-foreground block">
                  Primary Exposure Routes:
                </span>
                <p className="text-muted-foreground font-mono">
                  {activeHazard.primaryRoute}
                </p>
              </div>

              <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1">
                <span className="font-bold text-foreground block">
                  Recommended PPE Guidance:
                </span>
                <p className="text-muted-foreground font-mono">
                  {activeHazard.ppeRecommendation}
                </p>
              </div>
            </div>

            {/* Immediate Action / Medical Countermeasures */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs space-y-1.5">
              <h4 className="font-bold flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Medical Countermeasures & Immediate Decontamination:
              </h4>
              <p className="leading-relaxed">
                {activeHazard.immediateAction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                Hazard Comparison Matrix ({compareList.length} Selected)
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
                    <span className="text-[10px] uppercase font-mono text-muted-foreground">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                  </div>
                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">Route:</span>
                    <p className="text-foreground">{item.primaryRoute}</p>
                  </div>
                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">PPE:</span>
                    <p className="text-foreground">{item.ppeRecommendation}</p>
                  </div>
                  <div className="space-y-1 border-t border-border pt-2 text-[11px]">
                    <span className="font-semibold block text-muted-foreground">Action:</span>
                    <p className="text-foreground">{item.immediateAction}</p>
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
