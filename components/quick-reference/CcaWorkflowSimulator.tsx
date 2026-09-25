"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Droplets,
  Activity,
  Layers,
  ChevronRight,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { calculateCcaThroughput } from "@/lib/calculations/cbrn-advanced";

interface CcaStation {
  id: number;
  name: string;
  subTitle: string;
  zone: "Dirty (Hot)" | "Transition (Warm)" | "Clean (Cold)";
  zoneColor: string;
  durationSec: number;
  checks: string[];
  equipmentValidation: {
    type: "chemical" | "biological";
    description: string;
    threshold: string;
    instrument: string;
  };
}

const CCA_STATIONS: CcaStation[] = [
  {
    id: 1,
    name: "Station 1: Arrival, Disarm & Equipment Drop",
    subTitle: "Hot Zone Ingress Point",
    zone: "Dirty (Hot)",
    zoneColor: "text-red-400 border-red-500/30 bg-red-950/20",
    durationSec: 60,
    checks: [
      "Confirm casualty weapon is cleared, safe, and deposited in designated weapons rack.",
      "Drop field pack, tactical vest, and outer load-bearing equipment in primary drop bins.",
      "Conduct rapid gross radiological / chemical survey (AN/VDR-2 or JCAD sniffer).",
    ],
    equipmentValidation: {
      type: "chemical",
      description: "Gross chemical sniffer check across weapon and pack straps.",
      threshold: "< 1 Bar on JCAD / CAM",
      instrument: "JCAD / CAM (Chemical Agent Monitor)",
    },
  },
  {
    id: 2,
    name: "Station 2: Gross Liquid Wash & Mask Wipe",
    subTitle: "Liquid Neutralization Basin",
    zone: "Dirty (Hot)",
    zoneColor: "text-red-400 border-red-500/30 bg-red-950/20",
    durationSec: 90,
    checks: [
      "Immerse outer rubber boots in 5% hypochlorite decontamination solution foot-bath (30 sec).",
      "Scrub outer butyl gloves in 5% hypochlorite basin.",
      "Wipe MCU-2P or M50 mask outer rubber facepiece and canister intake with 0.5% bleach sponge.",
      "Ensure eyewash solution does not penetrate canister air intakes.",
    ],
    equipmentValidation: {
      type: "chemical",
      description: "Verify absence of free liquid droplets on overgarment.",
      threshold: "M8/M9 paper negative (no color change to pink, yellow, or blue)",
      instrument: "M8 / M9 Chemical Detection Paper",
    },
  },
  {
    id: 3,
    name: "Station 3: Outer Boot & Overgarment Doffing",
    subTitle: "Transition Boundary",
    zone: "Transition (Warm)",
    zoneColor: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    durationSec: 120,
    checks: [
      "Decon assistant cuts and strips contaminated outer vinyl/butyl boot covers.",
      "Casualty steps forward across the hot-line into the intermediate shuffle-box.",
      "Unzip JSLIST jacket and slide off shoulders turning sleeves inside out.",
      "Remove JSLIST trousers ensuring trousers do not contact clean sock-clad feet.",
    ],
    equipmentValidation: {
      type: "biological",
      description: "ATP surface bioluminescence swab on undergarment transition collar.",
      threshold: "< 25 Relative Light Units (RLU)",
      instrument: "Handheld ATP Luminometer",
    },
  },
  {
    id: 4,
    name: "Station 4: Inner Glove Wash & Suit Cut",
    subTitle: "Undergarment Inspection",
    zone: "Transition (Warm)",
    zoneColor: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    durationSec: 90,
    checks: [
      "Dip inner cotton/nitrile gloves in 0.5% bleach solution wash bucket.",
      "Carefully peel inner gloves from wrists downward, turning inside out.",
      "Assistants monitor for chemical blister burns or liquid breakthrough onto skin.",
      "Apply Reactive Skin Decontamination Lotion (RSDL) packet if liquid breakthrough spotted.",
    ],
    equipmentValidation: {
      type: "chemical",
      description: "Sniff check across casualty neck, wrists, and skin junctions.",
      threshold: "0 Bars (Clear / No Vapor off-gassing)",
      instrument: "JCAD Chemical Agent Detector",
    },
  },
  {
    id: 5,
    name: "Station 5: Medical Triage & Cholinergic Check",
    subTitle: "Vital Signs & Clinical Assessment",
    zone: "Transition (Warm)",
    zoneColor: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    durationSec: 60,
    checks: [
      "Examine pupils for miosis (pinpoint pupils indicating nerve agent vapor absorption).",
      "Auscultate lungs for wheezing or rhonchi (pulmonary or cholinergic hypersecretion).",
      "Check pulse rate: severe bradycardia requires immediate 2.1 mg Atropine auto-injection.",
      "Assess mental status, shivering, or heat-exhaustion core body temperature.",
    ],
    equipmentValidation: {
      type: "chemical",
      description: "Screen for latent vapor absorption or organophosphate intoxication.",
      threshold: "Normal pupil light reflex & HR > 60 bpm",
      instrument: "Clinical Triage Diagnostic Penlight & Pulse Oximeter",
    },
  },
  {
    id: 6,
    name: "Station 6: Equipment De-Masking Validation",
    subTitle: "Critical Clean Air Sniff Point",
    zone: "Transition (Warm)",
    zoneColor: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    durationSec: 60,
    checks: [
      "Position casualty in forward-facing airlock draft hood.",
      "Insert CAM / JCAD sniffing probe into mask peripheral face-seal edge.",
      "Verify zero chemical vapor off-gassing from hair, scalp, and mask periphery.",
      "Casualty takes a deep breath, holds breath, closes eyes, unhooks head harness, and pulls mask off forward.",
      "Exhale forcefully through mouth and nose while walking through air curtain into Station 7.",
    ],
    equipmentValidation: {
      type: "chemical",
      description: "Comprehensive multi-point de-masking chemical vapor validation.",
      threshold: "CAM < 0.1 Bar G/H / Zero alarm on JCAD",
      instrument: "JCAD / AP4C Flame Spectrometry Sniffer",
    },
  },
  {
    id: 7,
    name: "Station 7: Clean Dressing & Personal Monitoring",
    subTitle: "Cold Zone Entry",
    zone: "Clean (Cold)",
    zoneColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
    durationSec: 90,
    checks: [
      "Conduct final full-body alpha/beta contamination sweep (ADM-300 or AP2C).",
      "Issue clean disposable paper scrubs or replacement uniform and socks.",
      "Issue oral electrolyte rehydration fluid (0.5 to 1.0 L).",
      "Record casualty roster number, entry time, and decontamination log.",
    ],
    equipmentValidation: {
      type: "biological",
      description: "Rapid protein assay swab of exposed facial features and ears.",
      threshold: "Negative (No color shift / < 10 RLU)",
      instrument: "Protein Swab Assay Kit",
    },
  },
  {
    id: 8,
    name: "Station 8: Clean Rest Area & Medical Discharge",
    subTitle: "Collective Protection Integration",
    zone: "Clean (Cold)",
    zoneColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
    durationSec: 60,
    checks: [
      "Transition into pressurized Collective Protection System (CPS) shelter.",
      "Rest in cooling bay (WBGT monitoring for heat recovery).",
      "Continuous observation for 60 minutes for delayed mustard vesication or nerve agent rebound.",
      "Discharge to operational readiness or field hospital ward.",
    ],
    equipmentValidation: {
      type: "chemical",
      description: "Continuous shelter air trace detector.",
      threshold: "< 0.0001 mg/m3 (Below military unmasked exposure limit)",
      instrument: "Fixed Facility Chemical Agent Monitor (ICAD / Shelter JCAD)",
    },
  },
];

export function CcaWorkflowSimulator() {
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [stationTimers, setStationTimers] = useState<number[]>(CCA_STATIONS.map((s) => s.durationSec));
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedStations, setCompletedStations] = useState<boolean[]>(new Array(CCA_STATIONS.length).fill(false));
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [validationPassed, setValidationPassed] = useState<{ [key: number]: boolean }>({});

  // Logistics state
  const [lanes, setLanes] = useState<number>(2);
  const [queueCount, setQueueCount] = useState<number>(35);
  const [rinseGal, setRinseGal] = useState<number>(5);

  const logistics = calculateCcaThroughput({
    lanesCount: lanes,
    processingTimePerPersonMin: 10,
    incomingCasualtyQueue: queueCount,
    operatingHours: 8,
    rinseWaterGalPerPerson: rinseGal,
    bleach5PctGalPerPerson: 1.5,
    bleach05PctGalPerPerson: 1.0,
  });

  const currentStation = CCA_STATIONS[activeStationIndex];

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && stationTimers[activeStationIndex] > 0) {
      interval = setInterval(() => {
        setStationTimers((prev) => {
          const next = [...prev];
          next[activeStationIndex] = Math.max(0, next[activeStationIndex] - 1);
          return next;
        });
      }, 1000);
    } else if (stationTimers[activeStationIndex] === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, activeStationIndex, stationTimers]);

  const toggleCheck = (checkKey: string) => {
    setCheckedItems((prev) => ({ ...prev, [checkKey]: !prev[checkKey] }));
  };

  const handleValidationToggle = (stationId: number) => {
    setValidationPassed((prev) => ({ ...prev, [stationId]: !prev[stationId] }));
  };

  const completeCurrentStation = () => {
    setCompletedStations((prev) => {
      const next = [...prev];
      next[activeStationIndex] = true;
      return next;
    });
    if (activeStationIndex < CCA_STATIONS.length - 1) {
      setActiveStationIndex(activeStationIndex + 1);
      setIsTimerRunning(false);
    }
  };

  const resetSimulator = () => {
    setStationTimers(CCA_STATIONS.map((s) => s.durationSec));
    setIsTimerRunning(false);
    setCompletedStations(new Array(CCA_STATIONS.length).fill(false));
    setCheckedItems({});
    setValidationPassed({});
    setActiveStationIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Header and status banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Contamination Control Area (CCA) Workflow Simulator
              </h2>
              <p className="text-xs text-muted-foreground">
                Tactical 8-Station CBRN Personnel Decontamination Line with Instrument Validation & Waste Containment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-background/60 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Simulator
          </button>
          <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-xs font-bold text-primary">
            Active: Station {activeStationIndex + 1} of 8
          </div>
        </div>
      </div>

      {/* Station Navigation Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {CCA_STATIONS.map((station, idx) => {
          const isActive = idx === activeStationIndex;
          const isDone = completedStations[idx];
          return (
            <button
              key={station.id}
              onClick={() => {
                setActiveStationIndex(idx);
                setIsTimerRunning(false);
              }}
              className={`flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                isActive
                  ? "border-primary bg-primary/15 shadow-sm shadow-primary/20"
                  : isDone
                  ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-400"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/80"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>Stn {station.id}</span>
                {isDone ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Clock className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
              <span className="text-[11px] font-medium truncate mt-1 text-foreground">
                {station.name.split(":")[1]}
              </span>
              <span className={`text-[9px] uppercase font-bold mt-1 px-1 py-0.5 rounded ${station.zoneColor}`}>
                {station.zone.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Station Active Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Station Interactive Protocol & Timer */}
        <div className="lg:col-span-2 space-y-5 p-5 rounded-xl border border-border/60 bg-card/40">
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-xs uppercase font-extrabold px-2.5 py-1 rounded-md border ${currentStation.zoneColor}`}>
                {currentStation.zone}
              </span>
              <h3 className="text-lg font-bold text-foreground mt-2">{currentStation.name}</h3>
              <p className="text-xs text-muted-foreground">{currentStation.subTitle}</p>
            </div>

            {/* Countdown Timer Widget */}
            <div className="flex flex-col items-center p-3 rounded-xl border border-border bg-background/80 shadow-inner min-w-[140px]">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground">Station Dwell Timer</span>
              <span className={`text-3xl font-mono font-black my-1 ${stationTimers[activeStationIndex] === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                {Math.floor(stationTimers[activeStationIndex] / 60)}:
                {(stationTimers[activeStationIndex] % 60).toString().padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 ${
                    isTimerRunning
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isTimerRunning ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setStationTimers((prev) => {
                      const next = [...prev];
                      next[activeStationIndex] = currentStation.durationSec;
                      return next;
                    });
                  }}
                  className="p-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Line-by-line Station Checks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-primary" /> Mandatory Decon Checks & Doffing Protocol
            </h4>
            <div className="space-y-2">
              {currentStation.checks.map((chk, idx) => {
                const key = `stn-${currentStation.id}-chk-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <label
                    key={idx}
                    onClick={() => toggleCheck(key)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? "border-emerald-500/40 bg-emerald-950/20 text-foreground"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:border-border"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-border text-primary focus:ring-0"
                    />
                    <span className="text-xs leading-relaxed">{chk}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Equipment De-masking & Contamination Validation Step */}
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground">
                  Instrument Validation: {currentStation.equipmentValidation.instrument}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                currentStation.equipmentValidation.type === "chemical"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
              }`}>
                {currentStation.equipmentValidation.type} validation
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {currentStation.equipmentValidation.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="text-xs">
                <span className="text-muted-foreground">Required Pass Threshold: </span>
                <span className="font-mono font-bold text-foreground">
                  {currentStation.equipmentValidation.threshold}
                </span>
              </div>
              <button
                onClick={() => handleValidationToggle(currentStation.id)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  validationPassed[currentStation.id]
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {validationPassed[currentStation.id] ? "✓ Validated Clear" : "Record Clear Reading"}
              </button>
            </div>
          </div>

          {/* Complete and advance button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={completeCurrentStation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
            >
              Confirm Station {currentStation.id} Complete & Advance <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Waste Liquid Containment & Logistics Calculator */}
        <div className="space-y-5 p-5 rounded-xl border border-border/60 bg-card/40">
          <div className="flex items-center gap-2 pb-2 border-b border-border/60">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Waste Liquid Containment & Effluent Metrics
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-muted-foreground font-semibold">Decon Lanes</label>
              <input
                type="number"
                min="1"
                max="4"
                value={lanes}
                onChange={(e) => setLanes(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground font-semibold">Casualty Queue</label>
              <input
                type="number"
                min="1"
                value={queueCount}
                onChange={(e) => setQueueCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
          </div>

          {/* Liquid Output Breakdown */}
          <div className="space-y-2.5 pt-2">
            <div className="p-3 rounded-lg bg-background/60 border border-border/60 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Total Graywater Effluent:</span>
                <span className="font-mono font-bold text-cyan-400">{logistics.totalGraywaterEffluentGal} gal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">500-Gal Bladders Needed:</span>
                <span className="font-mono font-bold text-amber-400">{logistics.graywaterBladdersNeeded} Bladder(s)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">5% Bleach Volume Required:</span>
                <span className="font-mono font-bold text-foreground">{logistics.totalBleach5PctGal} gal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">0.5% Skin Bleach Volume:</span>
                <span className="font-mono font-bold text-foreground">{logistics.totalBleach05PctGal} gal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Clean Rinse Water:</span>
                <span className="font-mono font-bold text-foreground">{logistics.totalWaterRequiredGal} gal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Thiosulfate Neutralizer:</span>
                <span className="font-mono font-bold text-emerald-400">{logistics.neutralizerRequiredKg} kg</span>
              </div>
            </div>

            {/* Throughput KPI metrics */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Processing Capacity:</span>
                <span className="font-mono font-bold text-primary">{logistics.personnelPerHour} PPH</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Time to Clear Queue:</span>
                <span className="font-mono font-bold text-foreground">{logistics.hoursToClearQueue} hrs</span>
              </div>
              <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                <span className="font-bold text-amber-400">Bottleneck: </span>
                <span>{logistics.bottleneckStation}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/30 border border-border/40 text-[11px] text-muted-foreground space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Containment Regulations (AFMAN 10-2503)
            </div>
            <p>
              Under no circumstances may graywater effluent from 5% bleach decontamination footbaths be released into open soil or storm drains. All wastewater must be vacuumed into sealable containment bladders and neutralized with sodium thiosulfate prior to disposal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
