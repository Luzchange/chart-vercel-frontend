/**
 * CHART+ Radiological Assessment Engine
 * Pure TypeScript deterministic calculation engine.
 * Validated against legacy CHART 2018 workbook ('Rad' worksheet).
 */

export interface InverseSquareInput {
  knownDistance: number;
  knownDistanceUnit: "meters" | "feet";
  knownDoseRate: number;
  knownDoseRateUnit: "R/hr" | "mR/hr" | "uR/hr";
  targetDistance?: number;
  targetDoseRate?: number;
}

export interface InverseSquareResult {
  calculatedDoseRateAtTargetDistance?: number;
  calculatedDistanceToTargetDoseRate?: number;
  distanceUnit: "meters" | "feet";
  doseRateUnit: "R/hr" | "mR/hr" | "uR/hr";
  equation: string;
}

/**
 * Calculate radiation dose rate at new distance using inverse square law:
 * I2 = I1 * (d1 / d2)^2
 */
export function calculateDoseRateAtDistance(
  d1: number,
  i1: number,
  d2: number
): number {
  if (d1 <= 0 || d2 <= 0) {
    throw new Error("Distances must be strictly positive");
  }
  if (i1 < 0) {
    throw new Error("Dose rate cannot be negative");
  }
  return i1 * Math.pow(d1 / d2, 2);
}

/**
 * Calculate distance to a target dose rate using inverse square law:
 * d2 = sqrt( d1^2 * I1 / I2 )
 */
export function calculateDistanceToDoseRate(
  d1: number,
  i1: number,
  i2: number
): number {
  if (d1 <= 0) {
    throw new Error("Distance must be strictly positive");
  }
  if (i1 <= 0 || i2 <= 0) {
    throw new Error("Dose rates must be strictly positive");
  }
  return Math.sqrt((Math.pow(d1, 2) * i1) / i2);
}

export interface StayTimeInput {
  allowableDose: number;
  allowableDoseUnit: "Rad" | "mRad" | "Rem" | "mRem" | "Gy" | "Sv";
  startDoseRate: number;
  finishDoseRate: number;
  doseRateUnit: "R/hr" | "mR/hr";
}

export interface StayTimeResult {
  allowableDoseStandardRad: number;
  averageDoseRateMRPerHr: number;
  stayTimeMinutes: number;
  stayTimeHours: number;
  calculationDetails: {
    modelVersion: string;
    sourceWorkbook: string;
    equations: string[];
    assumptions: string[];
    warnings: string[];
  };
}

/**
 * Calculate stay time for an allowable dose given entry and exit radiation rates.
 * Formula from legacy CHART 2018 'Rad' worksheet cell I16:
 * Stay Time (min) = (Allowable Dose / Avg Dose Rate) * 60
 */
export function calculateStayTime(input: StayTimeInput): StayTimeResult {
  if (input.allowableDose <= 0) {
    throw new Error("Allowable dose must be greater than zero");
  }
  if (input.startDoseRate < 0 || input.finishDoseRate < 0) {
    throw new Error("Dose rates cannot be negative");
  }

  // Convert allowable dose to standard Rad (assuming 1 Rad ≈ 1 Rem for gamma/beta)
  let doseRad = input.allowableDose;
  if (input.allowableDoseUnit === "mRad" || input.allowableDoseUnit === "mRem") {
    doseRad = input.allowableDose / 1000;
  } else if (input.allowableDoseUnit === "Gy") {
    doseRad = input.allowableDose * 100;
  } else if (input.allowableDoseUnit === "Sv") {
    doseRad = input.allowableDose * 100;
  }

  // Convert dose rates to mR/hr for uniform arithmetic
  const rToMr = (rate: number, unit: "R/hr" | "mR/hr") => (unit === "R/hr" ? rate * 1000 : rate);
  const startMrHr = rToMr(input.startDoseRate, input.doseRateUnit);
  const finishMrHr = rToMr(input.finishDoseRate, input.doseRateUnit);

  const avgDoseRateMrHr = (startMrHr + finishMrHr) / 2;
  if (avgDoseRateMrHr <= 0) {
    throw new Error("Average dose rate must be greater than zero");
  }

  // 1 Rad = 1000 mRad ≈ 1000 mR (for gamma exposure in soft tissue)
  const allowableMr = doseRad * 1000;
  const stayTimeHours = allowableMr / avgDoseRateMrHr;
  const stayTimeMinutes = stayTimeHours * 60;

  return {
    allowableDoseStandardRad: doseRad,
    averageDoseRateMRPerHr: avgDoseRateMrHr,
    stayTimeMinutes: Math.round(stayTimeMinutes * 100) / 100,
    stayTimeHours: Math.round(stayTimeHours * 1000) / 1000,
    calculationDetails: {
      modelVersion: "CHART-2018-RAD-v1.0",
      sourceWorkbook: "CHART_2018 January.xlsm (Worksheet: Rad)",
      equations: [
        "Average Rate: I_avg = (I_start + I_finish) / 2",
        "Stay Time (hr): T = Allowable Dose / I_avg",
        "Stay Time (min): T_min = T_hr * 60",
      ],
      assumptions: [
        "Point source approximation for inverse square calculations.",
        "Uniform linear gradient between start and finish dose rate.",
        "Operational Exposure Guidance (OEG) limits set by authorized radiation safety officer.",
      ],
      warnings: [
        "Stay time calculations do not account for internal contamination or ingestion.",
        "Always adhere to As Low As Reasonably Achievable (ALARA) principles.",
      ],
    },
  };
}
