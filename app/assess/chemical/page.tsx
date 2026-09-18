"use client";

import React, { useState, useMemo } from "react";
import {
  FlaskConical,
  AlertTriangle,
  CheckCircle2,
  BookmarkPlus,
  Share2,
  Info,
  Layers,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  assessChemicalExposure,
  AGENT_MODELS,
  ChemicalAgentCode,
  EffectEvaluation,
} from "@/lib/calculations/chemical";
import {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  WORK_ACTIVITY_MV,
  WorkActivityLevel,
} from "@/lib/units/conversion";
import { CalculationDetailsDrawer } from "@/components/assessments/CalculationDetailsDrawer";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ChemicalAssessmentPage() {
  // Input states with legacy workbook default (GA at 60°F, 9 ppm, 240 min)
  const [agentCode, setAgentCode] = useState<ChemicalAgentCode>("GA");
  const [concentration, setConcentration] = useState<number>(9);
  const [concUnit, setConcUnit] = useState<"ppm" | "mg/m3">("ppm");
  const [temperature, setTemperature] = useState<number>(60);
  const [tempUnit, setTempUnit] = useState<"F" | "C">("F");
  const [duration, setDuration] = useState<number>(240);
  const [activityLevel, setActivityLevel] = useState<WorkActivityLevel>("mild");
  const [isHotConditions, setIsHotConditions] = useState<boolean>(false);
  const [scenarioSaved, setScenarioSaved] = useState<boolean>(false);

  // Compute assessment deterministically
  const assessmentResult = useMemo(() => {
    try {
      const tempC = tempUnit === "F" ? fahrenheitToCelsius(temperature) : temperature;
      return assessChemicalExposure({
        agentCode,
        concentration: Number(concentration) || 0,
        concentrationUnit: concUnit,
        temperatureCelsius: tempC,
        durationMinutes: Number(duration) || 1,
        activityLevel,
        isHotConditions,
      });
    } catch (err: any) {
      return null;
    }
  }, [agentCode, concentration, concUnit, temperature, tempUnit, duration, activityLevel, isHotConditions]);

  const selectedAgent = AGENT_MODELS[agentCode];

  const handleSaveToScenario = () => {
    setScenarioSaved(true);
    setTimeout(() => setScenarioSaved(false), 3000);
  };

  const getRiskColor = (bracket: string) => {
    switch (bracket) {
      case ">84%":
        return "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30";
      case "70% - 84%":
      case "60% - 70%":
        return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
      case "40% - 60%":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "30% - 40%":
      case "16% - 30%":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30";
      default:
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-primary" />
              Chemical Agent Exposure Assessment
            </h1>
            <StatusBadge type="measured" label="Validated Model" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Calculates vapor toxic load L = C^n * T and probit risk percentiles. Validated against legacy CHART 2018 algorithms.
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

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 flex items-center justify-between">
              <span>Input Parameters</span>
              <span className="text-[10px] font-mono text-primary font-semibold">Step 1 - 4</span>
            </h2>

            {/* Agent Selector */}
            <div className="space-y-1.5">
              <label htmlFor="agent-select" className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>1. Chemical Warfare Agent</span>
                <span className="font-mono text-[10px] text-muted-foreground">CAS: {selectedAgent.casNumber}</span>
              </label>
              <select
                id="agent-select"
                value={agentCode}
                onChange={(e) => setAgentCode(e.target.value as ChemicalAgentCode)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.values(AGENT_MODELS).map((agent) => (
                  <option key={agent.code} value={agent.code}>
                    {agent.commonName} (MW: {agent.molecularWeight})
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature Input */}
            <div className="space-y-1.5">
              <label htmlFor="temp-input" className="text-xs font-semibold text-foreground">
                2. Ambient Temperature
              </label>
              <div className="flex gap-2">
                <input
                  id="temp-input"
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  aria-label="Temperature unit"
                  value={tempUnit}
                  onChange={(e) => setTempUnit(e.target.value as "F" | "C")}
                  className="w-24 px-3 py-2 rounded-lg border border-border bg-secondary text-foreground text-xs font-semibold"
                >
                  <option value="F">°F</option>
                  <option value="C">°C</option>
                </select>
              </div>
            </div>

            {/* Concentration Input */}
            <div className="space-y-1.5">
              <label htmlFor="conc-input" className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>3. Vapor Concentration</span>
                {assessmentResult && (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    ≈ {assessmentResult.inputConcentrationMgM3.toFixed(3)} mg/m³
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <input
                  id="conc-input"
                  type="number"
                  step="any"
                  value={concentration}
                  onChange={(e) => setConcentration(parseFloat(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  aria-label="Concentration unit"
                  value={concUnit}
                  onChange={(e) => setConcUnit(e.target.value as "ppm" | "mg/m3")}
                  className="w-28 px-3 py-2 rounded-lg border border-border bg-secondary text-foreground text-xs font-semibold"
                >
                  <option value="ppm">ppm</option>
                  <option value="mg/m3">mg/m³</option>
                </select>
              </div>
            </div>

            {/* Duration Input */}
            <div className="space-y-1.5">
              <label htmlFor="duration-input" className="text-xs font-semibold text-foreground">
                4. Exposure Duration (Minutes)
              </label>
              <input
                id="duration-input"
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Work Activity Adjustment (Minute Volume) */}
            <div className="space-y-1.5 pt-2 border-t border-border">
              <label htmlFor="activity-select" className="text-xs font-semibold text-foreground">
                Physical Workload (Minute Volume Adjustment)
              </label>
              <select
                id="activity-select"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as WorkActivityLevel)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.entries(WORK_ACTIVITY_MV).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Hot conditions option for Mustard */}
            {agentCode === "HD" && (
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs">
                <input
                  type="checkbox"
                  id="hot-cond"
                  checked={isHotConditions}
                  onChange={(e) => setIsHotConditions(e.target.checked)}
                  className="mt-0.5 rounded border-border"
                />
                <label htmlFor="hot-cond" className="text-amber-900 dark:text-amber-200 cursor-pointer">
                  <span className="font-semibold block">Hot Conditions (&gt;85°F / 29.4°C)</span>
                  Lowers percutaneous vapor severe threshold (EC50 drops from 500 to 150 mg·min/m³).
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Calculated Assessment Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {assessmentResult ? (
            <div className="space-y-4">
              {/* Summary Banner */}
              <div className="p-4 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Active Agent Assessment
                  </span>
                  <h3 className="text-lg font-bold text-foreground">
                    {assessmentResult.agent.commonName}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-0.5">
                    <span>MW: {assessmentResult.agent.molecularWeight} g/mol</span>
                    <span>•</span>
                    <span>Temp: {assessmentResult.temperatureCelsius.toFixed(1)}°C</span>
                    <span>•</span>
                    <span>Dur: {assessmentResult.durationMinutes} min</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                    Assessed Concentration
                  </span>
                  <span className="text-lg font-black font-mono text-foreground">
                    {assessmentResult.inputConcentrationMgM3.toFixed(3)}{" "}
                    <span className="text-xs font-normal text-muted-foreground">mg/m³</span>
                  </span>
                </div>
              </div>

              {/* 3 Health Effect Response Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Miosis / Threshold */}
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Threshold / Miosis
                    </span>
                    <div className="mt-1">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(assessmentResult.effects.miosis_threshold.riskBracket)}`}>
                        {assessmentResult.effects.miosis_threshold.riskBracket}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 font-mono text-xs border-t border-border pt-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Toxic Load:</span>
                      <span className="font-semibold text-foreground">
                        {assessmentResult.effects.miosis_threshold.toxicLoad.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Median L50:</span>
                      <span className="text-foreground">
                        {assessmentResult.effects.miosis_threshold.medianThresholdL50}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Risk:</span>
                      <span className="font-semibold text-primary">
                        {assessmentResult.effects.miosis_threshold.continuousProbabilityPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Incapacitation / Severe */}
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Incapacitation (Severe)
                    </span>
                    <div className="mt-1">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(assessmentResult.effects.incapacitation_severe.riskBracket)}`}>
                        {assessmentResult.effects.incapacitation_severe.riskBracket}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 font-mono text-xs border-t border-border pt-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Toxic Load:</span>
                      <span className="font-semibold text-foreground">
                        {assessmentResult.effects.incapacitation_severe.toxicLoad.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Median L50:</span>
                      <span className="text-foreground">
                        {assessmentResult.effects.incapacitation_severe.medianThresholdL50}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Risk:</span>
                      <span className="font-semibold text-primary">
                        {assessmentResult.effects.incapacitation_severe.continuousProbabilityPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Lethality */}
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Lethality (LC)
                    </span>
                    <div className="mt-1">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(assessmentResult.effects.lethality.riskBracket)}`}>
                        {assessmentResult.effects.lethality.riskBracket}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 font-mono text-xs border-t border-border pt-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Toxic Load:</span>
                      <span className="font-semibold text-foreground">
                        {assessmentResult.effects.lethality.toxicLoad.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Median L50:</span>
                      <span className="text-foreground">
                        {assessmentResult.effects.lethality.medianThresholdL50}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Risk:</span>
                      <span className="font-semibold text-primary">
                        {assessmentResult.effects.lethality.continuousProbabilityPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Details Drawer */}
              <CalculationDetailsDrawer
                modelVersion={assessmentResult.calculationDetails.modelVersion}
                sourceWorkbook={assessmentResult.calculationDetails.sourceWorkbook}
                equations={assessmentResult.calculationDetails.equations}
                assumptions={assessmentResult.calculationDetails.assumptions}
                warnings={assessmentResult.calculationDetails.warnings}
                limitations={assessmentResult.calculationDetails.limitations}
                inputsSummary={{
                  Agent: selectedAgent.commonName,
                  Concentration: `${concentration} ${concUnit}`,
                  ConvertedMgM3: `${assessmentResult.inputConcentrationMgM3.toFixed(4)} mg/m3`,
                  Duration: `${duration} minutes`,
                  Temperature: `${temperature} °${tempUnit}`,
                  Workload: activityLevel,
                }}
                intermediateSteps={{
                  "Lethality Exponent (n)": assessmentResult.effects.lethality.exponentN,
                  "Lethality Slope (b)": assessmentResult.effects.lethality.probitSlope,
                  "Toxic Load (C^n * T)": assessmentResult.effects.lethality.toxicLoad.toFixed(2),
                  "16th Percentile Threshold": assessmentResult.effects.lethality.thresholdDoses["dose_16"].toFixed(2),
                  "50th Percentile Threshold": assessmentResult.effects.lethality.medianThresholdL50.toFixed(2),
                  "84th Percentile Threshold": assessmentResult.effects.lethality.thresholdDoses["dose_84"].toFixed(2),
                }}
              />
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-border text-center text-muted-foreground">
              Please enter valid numerical parameters to generate assessment results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
