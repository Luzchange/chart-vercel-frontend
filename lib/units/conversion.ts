/**
 * CHART+ Unit Conversion Engine
 * Validated against legacy CHART 2018 workbook and standard OEH physical constants.
 */

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function celsiusToKelvin(c: number): number {
  return c + 273.15;
}

/**
 * Convert gas/vapor concentration from ppm to mg/m3 at given temperature and molecular weight.
 * Formula from legacy CHART 2018 'CWA Entry' cell C4 & 'Instruction' sheet:
 * C(mg/m3) = C(ppm) * (MW / 24.45) * (298 / (273 + Temp_C))
 */
export function ppmToMgM3(ppm: number, molecularWeight: number, tempCelsius: number): number {
  if (tempCelsius < -273) {
    throw new Error("Temperature below absolute zero is invalid");
  }
  return ppm * (molecularWeight / 24.45) * (298 / (273 + tempCelsius));
}

/**
 * Convert gas/vapor concentration from mg/m3 to ppm at given temperature and molecular weight.
 */
export function mgM3ToPpm(mgM3: number, molecularWeight: number, tempCelsius: number): number {
  if (molecularWeight <= 0) {
    throw new Error("Molecular weight must be positive");
  }
  return mgM3 * (24.45 / molecularWeight) * ((273 + tempCelsius) / 298);
}

/**
 * Minute Volume (MV) activity level adjustments.
 * Baseline in legacy CHART 2018 is 15 L/min (mild activity).
 * At rest = 10 L/min, moderate = 30-40 L/min, heavy = 50 L/min.
 */
export type WorkActivityLevel = "at_rest" | "mild" | "moderate" | "heavy";

export const WORK_ACTIVITY_MV: Record<WorkActivityLevel, { label: string; mvLitersPerMin: number }> = {
  at_rest: { label: "At Rest (10 L/min)", mvLitersPerMin: 10 },
  mild: { label: "Mild Activity - Standard (15 L/min)", mvLitersPerMin: 15 },
  moderate: { label: "Moderate Work (30 L/min)", mvLitersPerMin: 30 },
  heavy: { label: "Heavy Work (50 L/min)", mvLitersPerMin: 50 },
};

export function adjustDosageForMinuteVolume(
  dose: number,
  activityLevel: WorkActivityLevel
): number {
  const mv = WORK_ACTIVITY_MV[activityLevel].mvLitersPerMin;
  return dose * (mv / 15);
}

/**
 * Flow and volume conversions
 */
export function cubicFeetToCubicMeters(cuFt: number): number {
  return cuFt * 0.028316846592;
}

export function cubicMetersToCubicFeet(m3: number): number {
  return m3 / 0.028316846592;
}

/**
 * Radiation dose rate conversions
 */
export function roentgenToMilliRoentgen(r: number): number {
  return r * 1000;
}

export function milliRoentgenToRoentgen(mR: number): number {
  return mR / 1000;
}

export function radToMilliRad(rad: number): number {
  return rad * 1000;
}

export function milliRadToRad(mrad: number): number {
  return mrad / 1000;
}

export function radToGray(rad: number): number {
  return rad * 0.01;
}

export function grayToRad(gy: number): number {
  return gy * 100;
}

export function remToSievert(rem: number): number {
  return rem * 0.01;
}

export function sievertToRem(sv: number): number {
  return sv * 100;
}
