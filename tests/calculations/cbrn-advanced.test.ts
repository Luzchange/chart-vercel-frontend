import { describe, it, expect } from "vitest";
import {
  calculateCcaThroughput,
  calculateAntidoteTriage,
  calculateCpsPurge,
  calculateMoppPosture,
  calculateCasualtySurge,
  calculateAdrRrrTimeline,
} from "../../lib/calculations/cbrn-advanced";

describe("Advanced CBRN Tactical Calculators", () => {
  it("calculates CCA throughput, queue clearing time, and bleach volumes accurately", () => {
    const result = calculateCcaThroughput({
      lanesCount: 2,
      processingTimePerPersonMin: 10,
      incomingCasualtyQueue: 60,
      operatingHours: 8,
      rinseWaterGalPerPerson: 5,
      bleach5PctGalPerPerson: 1.5,
      bleach05PctGalPerPerson: 1.0,
    });

    // PPH = (60 / 10) * 2 = 12
    expect(result.personnelPerHour).toBe(12);
    expect(result.totalShiftCapacity).toBe(96);
    expect(result.hoursToClearQueue).toBe(5);
    expect(result.totalWaterRequiredGal).toBe(300);
    expect(result.totalBleach5PctGal).toBe(90);
    expect(result.totalBleach05PctGal).toBe(60);
    expect(result.totalGraywaterEffluentGal).toBe(450);
    expect(result.graywaterBladdersNeeded).toBe(1); // 450 <= 500 gal
    expect(result.neutralizerRequiredKg).toBeGreaterThan(0);
  });

  it("calculates Antidote Triage and stockpile depletion for severe nerve agent exposures", () => {
    const result = calculateAntidoteTriage({
      agentFamily: "nerve_v",
      severity: "severe",
      totalCasualties: 50,
      pediatricCasualties: 5,
      stockpileAtnaa: 100,
      stockpileCana: 100,
      stockpile2Pam: 50,
      stockpileCyanokit: 0,
    });

    // Severe nerve: 3 ATNAA + 3 CANA per casualty
    expect(result.atnaaPerCasualty).toBe(3);
    expect(result.canaPerCasualty).toBe(3);
    expect(result.totalAtnaaNeeded).toBe(150);
    expect(result.totalCanaNeeded).toBe(150);
    expect(result.atnaaDeficit).toBe(50); // 150 needed - 100 on hand
    expect(result.canaDeficit).toBe(50);
    expect(result.pediatricGuidelines.length).toBeGreaterThan(0);
    expect(result.immediateClinicalDirectives.length).toBeGreaterThan(0);
  });

  it("calculates Collective Protection System (CPS) turnover, airlock purge, and filter life", () => {
    const result = calculateCpsPurge({
      shelterVolumeFt3: 20000,
      airlockVolumeFt3: 500,
      filtrationFlowCfm: 2000,
      airlockPurgeBlowerCfm: 500,
      ambientContaminantMgM3: 50,
      protectiveOverpressureInWc: 0.3,
      relativeHumidityPct: 65,
      hoursInHighThreat: 10,
    });

    // ACH = (2000 * 60) / 20000 = 6
    expect(result.airChangesPerHour).toBe(6);
    expect(result.shelterTurnoverMinutes).toBe(10);
    // Airlock purge = 4.6 * (500 / 500) = 4.6 min
    expect(result.airlockPurgeTimeMinutes).toBe(4.6);
    expect(result.isOverpressureCompliant).toBe(true);
    expect(result.filterLifespanRemainingPct).toBeGreaterThan(0);
    expect(result.maxIngressPersonsPerCycle).toBeGreaterThanOrEqual(1);
  });

  it("recommends correct MOPP posture and heat-strain work/rest limits under WBGT", () => {
    const result = calculateMoppPosture({
      distanceZone: "ground_zero",
      agentType: "persistent_liquid",
      workRate: "moderate_30",
      wbgtFlag: "red",
      isCoveredShelter: false,
    });

    expect(result.recommendedMopp).toBe("MOPP 4");
    expect(result.maskRequired).toBe(true);
    expect(result.overgarmentRequired).toBe(true);
    expect(result.bootsRequired).toBe(true);
    expect(result.glovesRequired).toBe(true);
    expect(result.workRestCycleMin).toContain("15 min work");
    expect(result.waterIntakeQuartsPerHour).toBeGreaterThanOrEqual(1.0);
  });

  it("estimates casualty surge, triage breakdown, and ICU ventilator demand", () => {
    const result = calculateCasualtySurge({
      exposedPopulation: 1000,
      protectionPosture: "unprotected_mopp0",
      agentToxicityClass: "nerve_agent",
      distanceToEpicenterKm: 1.0,
    });

    expect(result.totalCasualties).toBeGreaterThan(100);
    expect(result.triageImmediateT1).toBeGreaterThan(0);
    expect(result.icuVentilatorDemand).toBeGreaterThan(0);
    expect(result.autoinjectorDoses24h).toBeGreaterThan(0);
    expect(result.surgeSurgeTimelineHours.length).toBe(7);
  });

  it("calculates Airfield Damage Repair (ADR) runway timeline and agent weathering half-life", () => {
    const result = calculateAdrRrrTimeline({
      runwayCratersCount: 2,
      ambientTempF: 75,
      windSpeedMph: 12,
      surfaceAgent: "sarin_gb",
      moppLevel: "MOPP 4",
      wbgtFlag: "yellow",
    });

    expect(result.totalRepairTimeHours).toBeGreaterThan(5);
    expect(result.workerShiftLimitMinutes).toBe(60);
    expect(result.weatheringHalfLifeHours).toBeGreaterThan(0);
    expect(result.safeSortieLaunchWindowHours).toBeGreaterThan(result.totalRepairTimeHours);
    expect(result.mitigationDirectives.length).toBeGreaterThan(0);
  });
});
