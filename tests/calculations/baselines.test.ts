/**
 * Automated Baseline Tests - CHART+ Calculation Engine vs Legacy CHART 2018 Workbook
 * Citing provenance: 'CHART_2018 January.xlsm.xlsx' worksheets:
 * - 'CWA Entry'
 * - 'Equations'
 * - 'Calculations (Toxic Load)'
 * - 'Rad'
 * - 'Airborne Rad'
 */

import { describe, it, expect } from "vitest";
import {
  assessChemicalExposure,
  calculatePercentileDosage,
  AGENT_MODELS,
} from "../../lib/calculations/chemical";
import {
  calculateDoseRateAtDistance,
  calculateDistanceToDoseRate,
  calculateStayTime,
} from "../../lib/calculations/radiological";
import { assessAirborneRadiological } from "../../lib/calculations/airborne-rad";
import {
  fahrenheitToCelsius,
  ppmToMgM3,
  mgM3ToPpm,
} from "../../lib/units/conversion";

describe("Legacy Workbook Baseline Validations: Physical Units & Conversions", () => {
  it("CWA Entry C4: converts 9 ppm Tabun (GA, MW 162.1) at 60°F to 61.62 mg/m3", () => {
    // Legacy cell B3 = 60 F, B4 = (60-32)*5/9 = 15.5556 C
    const tempF = 60;
    const tempC = fahrenheitToCelsius(tempF);
    expect(tempC).toBeCloseTo(15.5556, 3);

    // Legacy cell C4: =C3*(162.1/24.45)*298/(273+B4) => 61.62167
    const mgM3 = ppmToMgM3(9, 162.1, tempC);
    expect(mgM3).toBeCloseTo(61.6217, 3);

    // Inverse conversion returns initial 9 ppm
    const backToPpm = mgM3ToPpm(mgM3, 162.1, tempC);
    expect(backToPpm).toBeCloseTo(9, 3);
  });
});

describe("Legacy Workbook Baseline Validations: Chemical Toxic Load & Risk Brackets", () => {
  it("Equations & Calculations (Toxic Load): GA probit dosage thresholds match legacy table", () => {
    // GA Lethality: L50 = 414.1, n = 1.5, b = 12
    const l50 = 414.1;
    const n = 1.5;
    const b = 12;

    // Row 4: LC 16 (Z = -1) => 414.1 * 10^(1.5 * -1 / 12) = 414.1 * 10^(-0.125) = 310.53
    const d16 = calculatePercentileDosage(l50, n, b, -1.0);
    expect(d16).toBeCloseTo(310.531, 2);

    // Row 10: LC 84 (Z = 1) => 414.1 * 10^(1.5 * 1 / 12) = 414.1 * 10^(0.125) = 552.21
    const d84 = calculatePercentileDosage(l50, n, b, 1.0);
    expect(d84).toBeCloseTo(552.211, 2);
  });

  it("CWA Entry Baseline Scenario: Tabun (GA) 60°F, 9 ppm, 240 min exposure", () => {
    const result = assessChemicalExposure({
      agentCode: "GA",
      concentration: 9,
      concentrationUnit: "ppm",
      temperatureCelsius: fahrenheitToCelsius(60),
      durationMinutes: 240,
    });

    // Concentration in mg/m3 matches workbook cell C4
    expect(result.inputConcentrationMgM3).toBeCloseTo(61.6217, 2);

    // Toxic load L = 61.6217^1.5 * 240 = 116,094 (Calculations cell K4)
    expect(result.effects.lethality.toxicLoad).toBeCloseTo(116094.45, 0);

    // All effects exceed the 84th percentile threshold => '>84%' risk
    expect(result.effects.lethality.riskBracket).toBe(">84%");
    expect(result.effects.incapacitation_severe.riskBracket).toBe(">84%");
    expect(result.effects.miosis_threshold.riskBracket).toBe(">84%");
  });

  it("Calculations (Habers Law) Baseline: Sarin (GB) low dose produces <16% risk", () => {
    const result = assessChemicalExposure({
      agentCode: "GB",
      concentration: 0.005,
      concentrationUnit: "mg/m3",
      temperatureCelsius: 20,
      durationMinutes: 10,
    });

    // Toxic load = 0.005^1.5 * 10 = 0.00354 mg^1.5 min / m^4.5
    // Well below 16th percentile threshold of 109.78
    expect(result.effects.lethality.riskBracket).toBe("<16%");
    expect(result.effects.lethality.continuousProbabilityPercent).toBeLessThan(1);
  });
});

describe("Legacy Workbook Baseline Validations: Radiological Assessment ('Rad' Sheet)", () => {
  it("Rad Cell B47: Inverse square law dose rate calculation", () => {
    // Known: 19,725 mR/hr at 1 meter. Find rate at 284.6 meters
    const d1 = 1;
    const i1 = 19725;
    const d2 = 284.6;

    const calculatedI2 = calculateDoseRateAtDistance(d1, i1, d2);
    // Legacy workbook formula B47: =B46*A46^2/A47^2
    expect(calculatedI2).toBeCloseTo(0.2435, 3);
  });

  it("Rad Cell B49: Distance to target dose rate calculation", () => {
    // Known: 19,725 mR/hr at 1 meter. Find distance where rate drops to 0.2435 mR/hr
    const d1 = 1;
    const i1 = 19725;
    const targetI2 = 0.243534;

    const calculatedD2 = calculateDistanceToDoseRate(d1, i1, targetI2);
    // Legacy cell B49: =ROUND(SQRT(A48^2 * B48 / A49), 1) => 284.6 meters
    expect(calculatedD2).toBeCloseTo(284.6, 1);
  });

  it("Rad Cell I16: Allowable dose stay-time calculation", () => {
    // Legacy cell G14: 0.050 Rad allowable dose
    // Legacy cells H14: 700 mR/hr (start), I14: 60 mR/hr (finish)
    // Legacy formula I16: Stay time = ROUND(0.050 * 60 / ((700 + 60) / 2000), 0) = 8 minutes
    const result = calculateStayTime({
      allowableDose: 0.05,
      allowableDoseUnit: "Rad",
      startDoseRate: 700,
      finishDoseRate: 60,
      doseRateUnit: "mR/hr",
    });

    expect(result.averageDoseRateMRPerHr).toBe(380);
    // 50 mrad / (380 mR/hr) * 60 min/hr = 7.8947 min => rounds to 8 min
    expect(Math.round(result.stayTimeMinutes)).toBe(8);
  });
});

describe("Legacy Workbook Baseline Validations: Airborne Radiological ('Airborne Rad')", () => {
  it("Airborne Rad Cells B12-B22: Flow rate, volume, and alpha activity calculation", () => {
    // Legacy inputs: Flow 123 cfm, 8 minutes, alpha 1325 cpm
    const result = assessAirborneRadiological({
      startFlowRateCfm: 123,
      stopFlowRateCfm: 123,
      sampleTimeMinutes: 8,
      alphaGrossCpm: 1325,
      alphaBackgroundCpm: 0,
    });

    // Sample volume = 123 cfm * 8 min = 984 cu ft (Cell D17)
    expect(result.sampleVolumeCuFt).toBe(984);
    expect(result.sampleVolumeCubicMeters).toBeCloseTo(27.86, 1);

    // Activity matches legacy cell B19 (673.27 dpm/m3)
    expect(result.airborneConcentrationDpmM3).toBeCloseTo(673.27, 1);

    // High alpha activity requires full-face respiratory protection
    expect(result.respiratoryProtectionRequired).toBe(true);
    expect(result.respiratoryRecommendation).toContain("Full-face respiratory protection required");
  });
});
