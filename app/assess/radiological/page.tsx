"use client";

import React, { useState, useMemo } from "react";
import {
  Radiation,
  Calculator,
  Clock,
  ShieldCheck,
  CheckCircle2,
  BookmarkPlus,
  AlertTriangle,
  Wind,
} from "lucide-react";
import {
  calculateDoseRateAtDistance,
  calculateDistanceToDoseRate,
  calculateStayTime,
} from "@/lib/calculations/radiological";
import { assessAirborneRadiological } from "@/lib/calculations/airborne-rad";
import { CalculationDetailsDrawer } from "@/components/assessments/CalculationDetailsDrawer";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function RadiologicalAssessmentPage() {
  const [activeTab, setActiveTab] = useState<"stay_time" | "inverse_square" | "airborne">("stay_time");
  const [scenarioSaved, setScenarioSaved] = useState(false);

  // --- Stay Time States (Legacy defaults: 0.050 Rad, 700 start, 60 finish => 8 min) ---
  const [allowableDose, setAllowableDose] = useState<number>(0.05);
  const [doseUnit, setDoseUnit] = useState<"Rad" | "mRad" | "Rem" | "mRem">("Rad");
  const [startDoseRate, setStartDoseRate] = useState<number>(700);
  const [finishDoseRate, setFinishDoseRate] = useState<number>(60);
  const [rateUnit, setRateUnit] = useState<"mR/hr" | "R/hr">("mR/hr");

  // --- Inverse Square States (Legacy defaults: 19725 mR/hr at 1 m) ---
  const [knownDist, setKnownDist] = useState<number>(1);
  const [knownRate, setKnownRate] = useState<number>(19725);
  const [targetDist, setTargetDist] = useState<number>(284.6);
  const [targetRate, setTargetRate] = useState<number>(0.2435);

  // --- Airborne States (Legacy defaults: 123 cfm, 8 min, 1325 cpm => 673 dpm/m3) ---
  const [startFlow, setStartFlow] = useState<number>(123);
  const [stopFlow, setStopFlow] = useState<number>(123);
  const [sampleTime, setSampleTime] = useState<number>(8);
  const [alphaCpm, setAlphaCpm] = useState<number>(1325);
  const [backgroundCpm, setBackgroundCpm] = useState<number>(0);

  // Calculations
  const stayTimeResult = useMemo(() => {
    try {
      return calculateStayTime({
        allowableDose: Number(allowableDose) || 0,
        allowableDoseUnit: doseUnit,
        startDoseRate: Number(startDoseRate) || 0,
        finishDoseRate: Number(finishDoseRate) || 0,
        doseRateUnit: rateUnit,
      });
    } catch {
      return null;
    }
  }, [allowableDose, doseUnit, startDoseRate, finishDoseRate, rateUnit]);

  const inverseSquareDoseAtDist = useMemo(() => {
    try {
      return calculateDoseRateAtDistance(knownDist, knownRate, targetDist);
    } catch {
      return null;
    }
  }, [knownDist, knownRate, targetDist]);

  const inverseSquareDistToRate = useMemo(() => {
    try {
      return calculateDistanceToDoseRate(knownDist, knownRate, targetRate);
    } catch {
      return null;
    }
  }, [knownDist, knownRate, targetRate]);

  const airborneResult = useMemo(() => {
    try {
      return assessAirborneRadiological({
        startFlowRateCfm: startFlow,
        stopFlowRateCfm: stopFlow,
        sampleTimeMinutes: sampleTime,
        alphaGrossCpm: alphaCpm,
        alphaBackgroundCpm: backgroundCpm,
      });
    } catch {
      return null;
    }
  }, [startFlow, stopFlow, sampleTime, alphaCpm, backgroundCpm]);

  const handleSaveToScenario = () => {
    setScenarioSaved(true);
    setTimeout(() => setScenarioSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Radiation className="w-6 h-6 text-amber-500" />
              Radiological & Airborne Rad Assessment
            </h1>
            <StatusBadge type="measured" label="Validated Model" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Distance decay, operational stay-time decision tools, and air filter sampling analysis.
          </p>
        </div>

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

      {/* Tabs */}
      <div className="flex border-b border-border gap-2">
        <button
          onClick={() => setActiveTab("stay_time")}
          className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === "stay_time"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          1. Stay Time & Allowable Dose
        </button>
        <button
          onClick={() => setActiveTab("inverse_square")}
          className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === "inverse_square"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          2. Inverse Square Law (Distance / Rate)
        </button>
        <button
          onClick={() => setActiveTab("airborne")}
          className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === "airborne"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          3. Airborne Particle Sampling
        </button>
      </div>

      {/* TAB 1: Stay Time */}
      {activeTab === "stay_time" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                Mission Operational Parameters
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Allowable Dose (OEG Limit)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={allowableDose}
                    onChange={(e) => setAllowableDose(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    aria-label="Allowable dose unit"
                    value={doseUnit}
                    onChange={(e) => setDoseUnit(e.target.value as any)}
                    className="w-28 px-3 py-2 rounded-lg border border-border bg-secondary text-foreground text-xs font-semibold"
                  >
                    <option value="Rad">Rad</option>
                    <option value="mRad">mRad</option>
                    <option value="Rem">Rem</option>
                    <option value="mRem">mRem</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Radiation Dose Rate at Entry / Start
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={startDoseRate}
                    onChange={(e) => setStartDoseRate(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    aria-label="Start dose rate unit"
                    value={rateUnit}
                    onChange={(e) => setRateUnit(e.target.value as any)}
                    className="w-28 px-3 py-2 rounded-lg border border-border bg-secondary text-foreground text-xs font-semibold"
                  >
                    <option value="mR/hr">mR/hr</option>
                    <option value="R/hr">R/hr</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Radiation Dose Rate at Exit / Finish
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={finishDoseRate}
                    onChange={(e) => setFinishDoseRate(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="w-28 px-3 py-2 rounded-lg border border-border bg-muted text-muted-foreground text-xs font-semibold flex items-center justify-center">
                    {rateUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {stayTimeResult && (
              <>
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase text-muted-foreground">
                    Calculated Operational Stay Time
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-primary">
                      {Math.round(stayTimeResult.stayTimeMinutes)}{" "}
                      <span className="text-lg font-normal text-muted-foreground">minutes</span>
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      ({stayTimeResult.stayTimeHours.toFixed(2)} hours)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border font-mono text-xs">
                    <div className="bg-secondary/40 p-3 rounded-lg">
                      <span className="text-muted-foreground block text-[11px]">Avg Dose Rate:</span>
                      <span className="text-base font-bold text-foreground">
                        {stayTimeResult.averageDoseRateMRPerHr.toFixed(1)} mR/hr
                      </span>
                    </div>
                    <div className="bg-secondary/40 p-3 rounded-lg">
                      <span className="text-muted-foreground block text-[11px]">Allowable Dose:</span>
                      <span className="text-base font-bold text-foreground">
                        {stayTimeResult.allowableDoseStandardRad} Rad
                      </span>
                    </div>
                  </div>
                </div>

                <CalculationDetailsDrawer
                  modelVersion={stayTimeResult.calculationDetails.modelVersion}
                  sourceWorkbook={stayTimeResult.calculationDetails.sourceWorkbook}
                  equations={stayTimeResult.calculationDetails.equations}
                  assumptions={stayTimeResult.calculationDetails.assumptions}
                  warnings={stayTimeResult.calculationDetails.warnings}
                  inputsSummary={{
                    "Allowable Dose": `${allowableDose} ${doseUnit}`,
                    "Entry Rate": `${startDoseRate} ${rateUnit}`,
                    "Exit Rate": `${finishDoseRate} ${rateUnit}`,
                  }}
                  intermediateSteps={{
                    "Average Dose Rate": `${stayTimeResult.averageDoseRateMRPerHr} mR/hr`,
                    "Standardized Allowable Dose": `${stayTimeResult.allowableDoseStandardRad} Rad`,
                    "Calculated Hours": `${stayTimeResult.stayTimeHours} hrs`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Inverse Square Law */}
      {activeTab === "inverse_square" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sub-tool 1: Dose Rate at New Distance */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">
              1. Calculate Dose Rate at New Distance
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Known Distance d1 (meters)
                </label>
                <input
                  type="number"
                  value={knownDist}
                  onChange={(e) => setKnownDist(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Measured Dose Rate I1 (mR/hr)
                </label>
                <input
                  type="number"
                  value={knownRate}
                  onChange={(e) => setKnownRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Target Distance d2 (meters)
                </label>
                <input
                  type="number"
                  value={targetDist}
                  onChange={(e) => setTargetDist(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border bg-secondary/40 p-3 rounded-lg">
              <span className="text-[11px] text-muted-foreground block font-mono">
                Calculated Dose Rate at {targetDist}m:
              </span>
              <span className="text-2xl font-bold font-mono text-primary">
                {inverseSquareDoseAtDist !== null ? inverseSquareDoseAtDist.toFixed(4) : "—"}{" "}
                <span className="text-xs font-normal text-muted-foreground">mR/hr</span>
              </span>
            </div>
          </div>

          {/* Sub-tool 2: Distance to Specified Dose Rate */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">
              2. Determine Distance to a Specified Dose Rate
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Known Distance d1 (meters)
                </label>
                <input
                  type="number"
                  value={knownDist}
                  onChange={(e) => setKnownDist(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Measured Dose Rate I1 (mR/hr)
                </label>
                <input
                  type="number"
                  value={knownRate}
                  onChange={(e) => setKnownRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Target Dose Rate of Interest I2 (mR/hr)
                </label>
                <input
                  type="number"
                  step="any"
                  value={targetRate}
                  onChange={(e) => setTargetRate(parseFloat(e.target.value) || 0.001)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border bg-secondary/40 p-3 rounded-lg">
              <span className="text-[11px] text-muted-foreground block font-mono">
                Distance to Drop to {targetRate} mR/hr:
              </span>
              <span className="text-2xl font-bold font-mono text-primary">
                {inverseSquareDistToRate !== null ? inverseSquareDistToRate.toFixed(1) : "—"}{" "}
                <span className="text-xs font-normal text-muted-foreground">meters</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Airborne Rad */}
      {activeTab === "airborne" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                Air Sampler & Detector Inputs
              </h2>
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium text-foreground block mb-1">
                      Start Flow (cfm)
                    </label>
                    <input
                      type="number"
                      value={startFlow}
                      onChange={(e) => setStartFlow(parseFloat(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-foreground block mb-1">
                      Stop Flow (cfm)
                    </label>
                    <input
                      type="number"
                      value={stopFlow}
                      onChange={(e) => setStopFlow(parseFloat(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-foreground block mb-1">
                    Sample Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={sampleTime}
                    onChange={(e) => setSampleTime(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium text-foreground block mb-1">
                      Gross Alpha (cpm)
                    </label>
                    <input
                      type="number"
                      value={alphaCpm}
                      onChange={(e) => setAlphaCpm(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-foreground block mb-1">
                      Background (cpm)
                    </label>
                    <input
                      type="number"
                      value={backgroundCpm}
                      onChange={(e) => setBackgroundCpm(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {airborneResult && (
              <>
                <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-muted-foreground">
                      Airborne Alpha Activity
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary font-mono">
                      Probe: ADM-300 AP-100
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-foreground">
                      {airborneResult.airborneConcentrationDpmM3.toFixed(2)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">dpm/m³</span>
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      ({airborneResult.airborneConcentrationBqM3.toFixed(2)} Bq/m³)
                    </span>
                  </div>

                  {/* Respiratory Recommendation Alert Banner */}
                  <div
                    className={`p-4 rounded-lg border text-xs flex items-start gap-3 ${
                      airborneResult.respiratoryProtectionRequired
                        ? "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block uppercase tracking-wider text-[11px]">
                        Protection Requirement:
                      </span>
                      <p className="mt-0.5 font-medium">
                        {airborneResult.respiratoryRecommendation}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs border-t border-border">
                    <div className="bg-secondary/40 p-2.5 rounded-lg">
                      <span className="text-muted-foreground block text-[10px]">Sample Volume:</span>
                      <span className="font-semibold text-foreground">
                        {airborneResult.sampleVolumeCuFt} ft³ ({airborneResult.sampleVolumeCubicMeters} m³)
                      </span>
                    </div>
                    <div className="bg-secondary/40 p-2.5 rounded-lg">
                      <span className="text-muted-foreground block text-[10px]">Net Filter Activity:</span>
                      <span className="font-semibold text-foreground">
                        {airborneResult.totalAlphaDpm.toFixed(1)} DPM
                      </span>
                    </div>
                  </div>
                </div>

                <CalculationDetailsDrawer
                  modelVersion={airborneResult.calculationDetails.modelVersion}
                  sourceWorkbook={airborneResult.calculationDetails.sourceWorkbook}
                  equations={airborneResult.calculationDetails.equations}
                  assumptions={airborneResult.calculationDetails.assumptions}
                  warnings={airborneResult.calculationDetails.warnings}
                  inputsSummary={{
                    "Flow Start/Stop": `${startFlow} / ${stopFlow} cfm`,
                    "Sample Time": `${sampleTime} min`,
                    "Gross / Net Alpha": `${alphaCpm} / ${airborneResult.netAlphaCpm} cpm`,
                  }}
                  intermediateSteps={{
                    "Volume Cu Ft": `${airborneResult.sampleVolumeCuFt} cuft`,
                    "Volume Cubic Meters": `${airborneResult.sampleVolumeCubicMeters} m3`,
                    "Total Activity DPM": `${airborneResult.totalAlphaDpm} dpm`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
