/**
 * CHART+ Chemical Exposure Assessment Engine
 * Pure TypeScript deterministic calculation engine.
 * Validated against legacy CHART 2018 workbook (Equations, CWA Entry, Nerve, Mustard, HN and L).
 */

import { ppmToMgM3, adjustDosageForMinuteVolume, WorkActivityLevel } from "../units/conversion";

export type ChemicalAgentCode =
  | "GA"
  | "GB"
  | "GD"
  | "GF"
  | "VX"
  | "HD"
  | "HN1"
  | "HN2"
  | "HN3"
  | "LEWISITE";

export type EffectCategory = "miosis_threshold" | "incapacitation_severe" | "lethality";

export interface ProbitParameters {
  exponentN: number;
  medianDosageL50: number; // (C^n * T)_50 in (mg/m3)^n * min
  probitSlopeB: number;
}

export interface AgentModelConfig {
  code: ChemicalAgentCode;
  commonName: string;
  molecularWeight: number;
  casNumber: string;
  effects: {
    miosis_threshold: ProbitParameters;
    incapacitation_severe: ProbitParameters;
    lethality: ProbitParameters;
  };
  notes?: string;
}

/**
 * Standard normal percentiles (Z-scores) used in legacy CHART 2018.
 * Corresponding to: 16%, 30%, 40%, 50%, 60%, 70%, 84%
 */
export const Z_PERCENTILES = [
  { percentile: 16, z: -1.0 },
  { percentile: 30, z: -0.52 },
  { percentile: 40, z: -0.25 },
  { percentile: 50, z: 0.0 },
  { percentile: 60, z: 0.25 },
  { percentile: 70, z: 0.52 },
  { percentile: 84, z: 1.0 },
] as const;

/**
 * Agent parameters verified directly from 'Equations' sheet and 'Calculations (Toxic Load)' sheet:
 */
export const AGENT_MODELS: Record<ChemicalAgentCode, AgentModelConfig> = {
  GA: {
    code: "GA",
    commonName: "Tabun (GA)",
    molecularWeight: 162.1,
    casNumber: "77-81-6",
    effects: {
      miosis_threshold: { exponentN: 1.6, medianDosageL50: 0.152, probitSlopeB: 10 },
      incapacitation_severe: { exponentN: 1.5, medianDosageL50: 250.0, probitSlopeB: 12 },
      lethality: { exponentN: 1.5, medianDosageL50: 414.1, probitSlopeB: 12 },
    },
    notes: "Human LCT50 estimates verified against monkey animal data (Cresthull et al. 1957).",
  },
  GB: {
    code: "GB",
    commonName: "Sarin (GB)",
    molecularWeight: 140.1,
    casNumber: "107-44-8",
    effects: {
      miosis_threshold: { exponentN: 1.6, medianDosageL50: 0.152, probitSlopeB: 10 },
      incapacitation_severe: { exponentN: 1.5, medianDosageL50: 88.39, probitSlopeB: 12 },
      lethality: { exponentN: 1.5, medianDosageL50: 146.4, probitSlopeB: 12 },
    },
    notes: "Reutter-Wade (1994) and Sommerville (2001) historical models.",
  },
  GD: {
    code: "GD",
    commonName: "Soman (GD)",
    molecularWeight: 182.2,
    casNumber: "96-64-0",
    effects: {
      miosis_threshold: { exponentN: 1.4, medianDosageL50: 0.08, probitSlopeB: 10 },
      incapacitation_severe: { exponentN: 1.25, medianDosageL50: 47.0, probitSlopeB: 12 },
      lethality: { exponentN: 1.25, medianDosageL50: 71.6, probitSlopeB: 12 },
    },
    notes: "Same toxic load formulation as Cyclosarin (GF).",
  },
  GF: {
    code: "GF",
    commonName: "Cyclosarin (GF)",
    molecularWeight: 180.2,
    casNumber: "329-99-7",
    effects: {
      miosis_threshold: { exponentN: 1.4, medianDosageL50: 0.08, probitSlopeB: 10 },
      incapacitation_severe: { exponentN: 1.25, medianDosageL50: 47.0, probitSlopeB: 12 },
      lethality: { exponentN: 1.25, medianDosageL50: 71.6, probitSlopeB: 12 },
    },
  },
  VX: {
    code: "VX",
    commonName: "VX",
    molecularWeight: 267.4,
    casNumber: "50782-69-9",
    effects: {
      miosis_threshold: { exponentN: 1.0, medianDosageL50: 0.1, probitSlopeB: 4 },
      incapacitation_severe: { exponentN: 1.0, medianDosageL50: 10.0, probitSlopeB: 6 },
      lethality: { exponentN: 1.0, medianDosageL50: 15.0, probitSlopeB: 6 },
    },
    notes: "Grotte-Yang (2001) values with Haber's Law (n=1).",
  },
  HD: {
    code: "HD",
    commonName: "Sulfur Mustard (HD)",
    molecularWeight: 159.08,
    casNumber: "505-60-2",
    effects: {
      // For HD, threshold is ocular severe (OC vapor 75), incapacitation is PC vapor (500), lethality is IH (22360)
      miosis_threshold: { exponentN: 1.0, medianDosageL50: 75.0, probitSlopeB: 6 },
      incapacitation_severe: { exponentN: 1.0, medianDosageL50: 500.0, probitSlopeB: 3 },
      lethality: { exponentN: 1.5, medianDosageL50: 22360.0, probitSlopeB: 5 },
    },
    notes: "Inhalation lethality n=1.5; percutaneous/ocular n=1.0.",
  },
  HN1: {
    code: "HN1",
    commonName: "Nitrogen Mustard (HN-1)",
    molecularWeight: 170.1,
    casNumber: "538-07-8",
    effects: {
      miosis_threshold: { exponentN: 1.0, medianDosageL50: 100.0, probitSlopeB: 6 },
      incapacitation_severe: { exponentN: 1.0, medianDosageL50: 1000.0, probitSlopeB: 3 },
      lethality: { exponentN: 1.5, medianDosageL50: 25000.0, probitSlopeB: 5 },
    },
  },
  HN2: {
    code: "HN2",
    commonName: "Nitrogen Mustard (HN-2)",
    molecularWeight: 156.1,
    casNumber: "51-75-2",
    effects: {
      miosis_threshold: { exponentN: 1.0, medianDosageL50: 80.0, probitSlopeB: 6 },
      incapacitation_severe: { exponentN: 1.0, medianDosageL50: 800.0, probitSlopeB: 3 },
      lethality: { exponentN: 1.5, medianDosageL50: 20000.0, probitSlopeB: 5 },
    },
  },
  HN3: {
    code: "HN3",
    commonName: "Nitrogen Mustard (HN-3)",
    molecularWeight: 204.5,
    casNumber: "555-77-1",
    effects: {
      miosis_threshold: { exponentN: 1.0, medianDosageL50: 100.0, probitSlopeB: 6 },
      incapacitation_severe: { exponentN: 1.0, medianDosageL50: 1200.0, probitSlopeB: 3 },
      lethality: { exponentN: 1.5, medianDosageL50: 28000.0, probitSlopeB: 5 },
    },
  },
  LEWISITE: {
    code: "LEWISITE",
    commonName: "Lewisite (L)",
    molecularWeight: 207.3,
    casNumber: "541-25-3",
    effects: {
      miosis_threshold: { exponentN: 1.0, medianDosageL50: 50.0, probitSlopeB: 6 },
      incapacitation_severe: { exponentN: 1.0, medianDosageL50: 300.0, probitSlopeB: 4 },
      lethality: { exponentN: 1.0, medianDosageL50: 1200.0, probitSlopeB: 5 },
    },
  },
};

/**
 * Calculate percentile dosage threshold using the legacy formula:
 * (C^n * T)_XX = (C^n * T)_50 * 10^( (n * Z) / ProbitSlope )
 */
export function calculatePercentileDosage(
  medianL50: number,
  n: number,
  probitSlope: number,
  z: number
): number {
  return medianL50 * Math.pow(10, (n * z) / probitSlope);
}

/**
 * Standard Normal Cumulative Distribution Function (error function approximation)
 */
function normalCdf(z: number): number {
  // Abramowitz and Stegun approximation formula 7.1.26
  const p = 0.3275911;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;

  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;

  const t = 1.0 / (1.0 + p * x);
  const erf =
    1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * erf);
}

export type RiskBracket =
  | "<16%"
  | "16% - 30%"
  | "30% - 40%"
  | "40% - 60%"
  | "60% - 70%"
  | "70% - 84%"
  | ">84%";

export interface EffectEvaluation {
  effectName: string;
  toxicLoad: number;
  medianThresholdL50: number;
  probitSlope: number;
  exponentN: number;
  riskBracket: RiskBracket;
  continuousProbabilityPercent: number;
  thresholdDoses: Record<string, number>;
}

export interface ChemicalAssessmentInput {
  agentCode: ChemicalAgentCode;
  concentration: number;
  concentrationUnit: "mg/m3" | "ppm";
  temperatureCelsius: number;
  durationMinutes: number;
  activityLevel?: WorkActivityLevel;
  isHotConditions?: boolean; // For HD percutaneous vapor (temperature > 29.4°C / 85°F)
}

export interface ChemicalAssessmentResult {
  agent: AgentModelConfig;
  inputConcentrationMgM3: number;
  durationMinutes: number;
  temperatureCelsius: number;
  activityLevel: WorkActivityLevel;
  effects: {
    miosis_threshold: EffectEvaluation;
    incapacitation_severe: EffectEvaluation;
    lethality: EffectEvaluation;
  };
  calculationDetails: {
    modelVersion: string;
    sourceWorkbook: string;
    equations: string[];
    assumptions: string[];
    warnings: string[];
    limitations: string[];
  };
}

/**
 * Primary pure chemical assessment function
 */
export function assessChemicalExposure(
  input: ChemicalAssessmentInput
): ChemicalAssessmentResult {
  const agent = AGENT_MODELS[input.agentCode];
  if (!agent) {
    throw new Error(`Unknown chemical agent code: ${input.agentCode}`);
  }

  if (input.durationMinutes <= 0) {
    throw new Error("Exposure duration must be greater than zero minutes");
  }

  // Determine concentration in mg/m3
  let concMgM3 = input.concentration;
  if (input.concentrationUnit === "ppm") {
    concMgM3 = ppmToMgM3(input.concentration, agent.molecularWeight, input.temperatureCelsius);
  }

  if (concMgM3 < 0) {
    throw new Error("Concentration cannot be negative");
  }

  const activityLevel = input.activityLevel || "mild";

  const evaluateEffect = (
    name: string,
    params: ProbitParameters,
    overrideL50?: number
  ): EffectEvaluation => {
    const l50 = overrideL50 ?? params.medianDosageL50;
    const n = params.exponentN;
    const b = params.probitSlopeB;

    // Toxic Load L = C^n * T
    let rawLoad = Math.pow(concMgM3, n) * input.durationMinutes;

    // Minute volume adjustment if non-standard
    if (activityLevel !== "mild") {
      rawLoad = adjustDosageForMinuteVolume(rawLoad, activityLevel);
    }

    // Discrete percentile thresholds
    const thresholds: Record<string, number> = {};
    for (const p of Z_PERCENTILES) {
      thresholds[`dose_${p.percentile}`] = calculatePercentileDosage(l50, n, b, p.z);
    }

    // Risk bracket evaluation matching legacy workbook
    let bracket: RiskBracket = "<16%";
    if (rawLoad >= thresholds["dose_84"]) {
      bracket = ">84%";
    } else if (rawLoad >= thresholds["dose_70"]) {
      bracket = "70% - 84%";
    } else if (rawLoad >= thresholds["dose_60"]) {
      bracket = "60% - 70%";
    } else if (rawLoad >= thresholds["dose_40"]) {
      bracket = "40% - 60%";
    } else if (rawLoad >= thresholds["dose_30"]) {
      bracket = "30% - 40%";
    } else if (rawLoad >= thresholds["dose_16"]) {
      bracket = "16% - 30%";
    } else {
      bracket = "<16%";
    }

    // Continuous probit probability: Z = (b / n) * log10(L / L50)
    let continuousPct = 0;
    if (rawLoad > 0) {
      const zScore = (b / n) * Math.log10(rawLoad / l50);
      continuousPct = Math.round(normalCdf(zScore) * 1000) / 10;
    }

    return {
      effectName: name,
      toxicLoad: rawLoad,
      medianThresholdL50: l50,
      probitSlope: b,
      exponentN: n,
      riskBracket: bracket,
      continuousProbabilityPercent: continuousPct,
      thresholdDoses: thresholds,
    };
  };

  // Check HD hot condition (>29.4°C / 85°F) for percutaneous vapor
  let hdSevereL50 = agent.effects.incapacitation_severe.medianDosageL50;
  if (input.agentCode === "HD" && (input.isHotConditions || input.temperatureCelsius > 29.4444)) {
    hdSevereL50 = 150.0; // Hot conditions lower PC vapor EC50
  }

  const miosis = evaluateEffect("Threshold / Miosis", agent.effects.miosis_threshold);
  const severe = evaluateEffect(
    "Incapacitation / Severe",
    agent.effects.incapacitation_severe,
    hdSevereL50
  );
  const lethality = evaluateEffect("Lethality", agent.effects.lethality);

  return {
    agent,
    inputConcentrationMgM3: concMgM3,
    durationMinutes: input.durationMinutes,
    temperatureCelsius: input.temperatureCelsius,
    activityLevel,
    effects: {
      miosis_threshold: miosis,
      incapacitation_severe: severe,
      lethality,
    },
    calculationDetails: {
      modelVersion: "CHART-2018-CWA-v1.0",
      sourceWorkbook: "CHART_2018 January.xlsm (Worksheets: Equations, CWA Entry, Calculations)",
      equations: [
        "Toxic Load: L = C^n * T (C in mg/m3, T in minutes)",
        "Dosage Percentile: (C^n * T)_XX = (C^n * T)_50 * 10^((n * Z) / ProbitSlope)",
        "PPM to mg/m3: C_mg = C_ppm * (MW / 24.45) * (298 / (273 + T_c))",
      ],
      assumptions: [
        `Baseline minute volume = 15 L/min (mild activity). Current setting: ${activityLevel}.`,
        "Constant concentration over specified duration (no decay modeled).",
        "Adult military/workplace occupational cohort (not pediatric or clinical).",
      ],
      warnings: [
        "High consequence decision support only. Does not replace authorized clinical care or command direction.",
        "Effects represent statistical population percentiles (+/- 1 standard deviation for 16-84% range).",
      ],
      limitations: [
        "Does not account for terrain dispersion, chemical weathering, or multiple compound interactions.",
        "Percutaneous protection (MOPP gear) not factored into inhalation calculations.",
      ],
    },
  };
}
