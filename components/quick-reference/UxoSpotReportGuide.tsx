"use client";

import React, { useState } from "react";
import {
  Bomb,
  ShieldAlert,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Target,
  Layers,
  Flame,
  Radio,
  FileText,
} from "lucide-react";

interface MunitionProfile {
  id: string;
  name: string;
  category: "Artillery Projectile" | "Aviation Bomb" | "Submunition / Cluster" | "Spray Tank / Missile";
  cbrnMarking: string;
  standoffBlastMeters: number;
  fragRadiusMeters: number;
  chemicalDownwindMeters: number;
  fuzingHazards: string[];
  identificationTips: string[];
}

const CBRN_MUNITIONS: MunitionProfile[] = [
  {
    id: "proj_155",
    name: "155mm Chemical Artillery Projectile (M121 / M122)",
    category: "Artillery Projectile",
    cbrnMarking: "Olive drab body with 2 dark green bands and yellow lettering (GB/VX/HD)",
    standoffBlastMeters: 300,
    fragRadiusMeters: 500,
    chemicalDownwindMeters: 2000,
    fuzingHazards: [
      "Point-detonating fuze (M572) with internal M36 burster tube charge.",
      "Vapor or liquid leakage around nose threads or base plate.",
      "Subsurface unexploded dud may have armed internal firing pin sensitive to vibration.",
    ],
    identificationTips: [
      "Check ogive for green color banding indicating chemical agent fill.",
      "Listen for fluid sloshing when safely viewed from standoff.",
      "Inspect rotating band for rifling engravement indicating projectile was fired.",
    ],
  },
  {
    id: "bomb_750",
    name: "Aviation Chemical Bomb (MC-1 / MK-94 500/750 lb)",
    category: "Aviation Bomb",
    cbrnMarking: "Gray body with three green bands and gas symbol",
    standoffBlastMeters: 600,
    fragRadiusMeters: 1000,
    chemicalDownwindMeters: 5000,
    fuzingHazards: [
      "Nose and tail fuze wells may contain hydrostatic or impact burster charges.",
      "Air-burst proximity radar altimeter fuzes may remain armed.",
      "Corrosion or cracked casing allows continuous toxic vapor release.",
    ],
    identificationTips: [
      "Suspension lugs on casing for aircraft pylon attachment.",
      "Central burster well tube extending length of bomb body.",
      "Liquid fill plug located on sidewall.",
    ],
  },
  {
    id: "cluster_sub",
    name: "CBRN Cluster Submunition / Bomblet (M139 / M138)",
    category: "Submunition / Cluster",
    cbrnMarking: "Small metallic spheres (baseball size) or vanes with green color dots",
    standoffBlastMeters: 150,
    fragRadiusMeters: 300,
    chemicalDownwindMeters: 1200,
    fuzingHazards: [
      "EXTREME SENSITIVITY: Armed spin/impact vane fuzes detonate on slightest tilt or disturbance.",
      "Anti-disturbance springs and magnetic influence switches.",
      "Partial deployment leaves unexploded bomblets hidden in grass or rubble.",
    ],
    identificationTips: [
      "Usually found scattered in large footprint (100–500m dispersal oval).",
      "Spherical or cylindrical body with aerodynamic stabilizing vanes.",
      "Liquid fill burster breaks on impact to create aerosol vapor.",
    ],
  },
  {
    id: "spray_tank",
    name: "Persistent Chemical Spray Tank / Cruise Missile Warhead",
    category: "Spray Tank / Missile",
    cbrnMarking: "Aerodynamic pod with ram-air intake scoops and aft atomizing spray nozzles",
    standoffBlastMeters: 400,
    fragRadiusMeters: 600,
    chemicalDownwindMeters: 8000,
    fuzingHazards: [
      "Pyrotechnic cutting charges on discharge valves.",
      "Pressurized nitrogen expulsion bladder may rupture on handling.",
      "Undischarged persistent liquid (VX) presents severe contact hazard.",
    ],
    identificationTips: [
      "Vane-driven venturi spray nozzles at rear of pod.",
      "Pressurization gauges visible on maintenance access panels.",
      "Mounted on downed drone or cruise missile fuselage.",
    ],
  },
];

export function UxoSpotReportGuide() {
  const [selectedMunition, setSelectedMunition] = useState<MunitionProfile>(CBRN_MUNITIONS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  // 9-Line Fields State
  const [line1Dtg, setLine1Dtg] = useState<string>("242330Z SEP 2026");
  const [line2Location, setLine2Location] = useState<string>("38S LC 8492 1038 (Al-Udeid Runway Alpha)");
  const [line3Contact, setLine3Contact] = useState<string>("Freq 38.45 MHz / Callsign WARHAWK 06");
  const [line4Munition, setLine4Munition] = useState<string>("155mm Projectile with dual green bands, leaking vapor");
  const [line5Cbrn, setLine5Cbrn] = useState<string>("CHEMICAL (Persistent Blister / Mustard odor detected)");
  const [line6Target, setLine6Target] = useState<string>("Active Runway 34R, F-15E Alert Shelters");
  const [line7Impact, setLine7Impact] = useState<string>("Runway closed; flight operations halted");
  const [line8Protective, setLine8Protective] = useState<string>("500m cordon established; MOPP 4 ordered upwind");
  const [line9Priority, setLine9Priority] = useState<string>("IMMEDIATE (Halts Primary Flight Mission)");

  const generate9LineReportText = () => {
    return `========================================================
NATO / JOINT 9-LINE CBRN UXO SPOT REPORT
========================================================
LINE 1 (Date-Time Group): ${line1Dtg}
LINE 2 (Location / MGRS): ${line2Location}
LINE 3 (Contact Freq / Callsign): ${line3Contact}
LINE 4 (Type of Munition): ${line4Munition}
LINE 5 (CBRN Contamination): ${line5Cbrn}
LINE 6 (Target / Resources Threatened): ${line6Target}
LINE 7 (Impact on Mission): ${line7Impact}
LINE 8 (Protective Measures Taken): ${line8Protective}
LINE 9 (Recommended Priority): ${line9Priority}
========================================================
ESTIMATED STANDOFF DISTANCES (AFMAN 10-2503):
- Minimum Blast Standoff: ${selectedMunition.standoffBlastMeters} meters
- Maximum Fragmentation Standoff: ${selectedMunition.fragRadiusMeters} meters
- Downwind Chemical Hazard Arc: ${selectedMunition.chemicalDownwindMeters} meters
========================================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generate9LineReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generate9LineReportText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `9Line_UXO_CBRN_Report_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center">
            <Bomb className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Unexploded Ordnance (UXO) & CBRN Submunition Guide
            </h2>
            <p className="text-xs text-muted-foreground">
              Doctrinal Munition Recognition, Fuzing Hazard Protocols, & Automated NATO 9-Line UXO Spot Report Generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied 9-Line!" : "Copy 9-Line Report"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-xs font-semibold text-foreground hover:bg-secondary"
          >
            <Download className="w-3.5 h-3.5" /> Export .txt
          </button>
        </div>
      </div>

      {/* Munition Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CBRN_MUNITIONS.map((m) => {
          const isSelected = m.id === selectedMunition.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMunition(m);
                setLine4Munition(`${m.name} (${m.cbrnMarking})`);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-red-500 bg-red-950/30 shadow-sm shadow-red-500/20"
                  : "border-border/60 bg-card/40 hover:bg-card/80 text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="truncate">{m.name.split("(")[0]}</span>
                <Bomb className="w-3.5 h-3.5 text-red-400 shrink-0" />
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-400 mt-1 block">
                {m.category}
              </span>
              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                {m.cbrnMarking}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Munition Detail & Standoff Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Munition Detail & Fuzing Hazard Checks */}
        <div className="lg:col-span-1 space-y-4 p-5 rounded-xl border border-border/80 bg-card/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30">
              {selectedMunition.category}
            </span>
            <h3 className="text-base font-bold text-foreground mt-2">{selectedMunition.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{selectedMunition.cbrnMarking}</p>
          </div>

          {/* Standoff Radii */}
          <div className="p-3.5 rounded-xl bg-background/60 border border-border/60 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Doctrinal Standoff Distances</span>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blast Standoff:</span>
              <span className="font-mono font-bold text-foreground">{selectedMunition.standoffBlastMeters} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fragmentation Standoff:</span>
              <span className="font-mono font-bold text-amber-400">{selectedMunition.fragRadiusMeters} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Downwind CBRN Arc:</span>
              <span className="font-mono font-bold text-red-400">{selectedMunition.chemicalDownwindMeters} m</span>
            </div>
          </div>

          {/* Fuzing Hazards */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Fuzing Hazards & Anti-Disturbance
            </span>
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              {selectedMunition.fuzingHazards.map((haz, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{haz}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Tips */}
          <div className="space-y-2 text-xs pt-2 border-t border-border/40">
            <span className="text-[10px] font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Field Identification Tips
            </span>
            <ul className="space-y-1 text-[11px] text-muted-foreground">
              {selectedMunition.identificationTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Interactive 9-Line UXO Spot Report Form */}
        <div className="lg:col-span-2 space-y-4 p-5 rounded-xl border border-border/80 bg-card/60">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Interactive 9-Line UXO Spot Report Generator</h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-muted-foreground">NATO / Joint Standard</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 1: Date-Time Group (DTG)</label>
              <input
                type="text"
                value={line1Dtg}
                onChange={(e) => setLine1Dtg(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 2: Location (MGRS or Landmark)</label>
              <input
                type="text"
                value={line2Location}
                onChange={(e) => setLine2Location(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 3: Contact Freq & Callsign</label>
              <input
                type="text"
                value={line3Contact}
                onChange={(e) => setLine3Contact(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 4: Type of Munition</label>
              <input
                type="text"
                value={line4Munition}
                onChange={(e) => setLine4Munition(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 5: CBRN Contamination</label>
              <input
                type="text"
                value={line5Cbrn}
                onChange={(e) => setLine5Cbrn(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 6: Target / Resources Threatened</label>
              <input
                type="text"
                value={line6Target}
                onChange={(e) => setLine6Target(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 7: Impact on Mission</label>
              <input
                type="text"
                value={line7Impact}
                onChange={(e) => setLine7Impact(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 8: Protective Measures Taken</label>
              <input
                type="text"
                value={line8Protective}
                onChange={(e) => setLine8Protective(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">LINE 9: Recommended Priority</label>
              <select
                value={line9Priority}
                onChange={(e) => setLine9Priority(e.target.value)}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              >
                <option value="IMMEDIATE (Halts Primary Flight or Defensive Mission)">IMMEDIATE (Halts Primary Flight or Defensive Mission)</option>
                <option value="INDIRECT (Stops Support Operations / Munitions Loading)">INDIRECT (Stops Support Operations / Munitions Loading)</option>
                <option value="MINOR (Little Impact on Active Operational Line)">MINOR (Little Impact on Active Operational Line)</option>
                <option value="NO THREAT (Safe Distance / Cordon Functional)">NO THREAT (Safe Distance / Cordon Functional)</option>
              </select>
            </div>
          </div>

          {/* Formatted Preview Box */}
          <div className="p-3.5 rounded-lg bg-background/80 border border-border font-mono text-[11px] text-muted-foreground space-y-1">
            <span className="text-[10px] uppercase font-bold text-foreground block mb-1">
              Formatted Radio Transmission Transcript:
            </span>
            <p><span className="text-primary font-bold">LINE 1:</span> {line1Dtg}</p>
            <p><span className="text-primary font-bold">LINE 2:</span> {line2Location}</p>
            <p><span className="text-primary font-bold">LINE 3:</span> {line3Contact}</p>
            <p><span className="text-primary font-bold">LINE 4:</span> {line4Munition}</p>
            <p><span className="text-primary font-bold">LINE 5:</span> {line5Cbrn}</p>
            <p><span className="text-primary font-bold">LINE 6:</span> {line6Target}</p>
            <p><span className="text-primary font-bold">LINE 7:</span> {line7Impact}</p>
            <p><span className="text-primary font-bold">LINE 8:</span> {line8Protective}</p>
            <p><span className="text-primary font-bold">LINE 9:</span> {line9Priority}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
