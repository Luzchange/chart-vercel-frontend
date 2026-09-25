/**
 * CBRN Advanced Mathematical Calculations & Tactical Algorithms
 * - CCA Decontamination Throughput & Fluid Logistics
 * - Casualty Antidote Triage & Autoinjector Stockpile Demands
 * - Collective Protection System (CPS) Airlock Purge & Filter Degradation
 * - Dynamic MOPP Posture Matrix (CHEMRAT, Volatility, MV, WBGT)
 * - Hospital & Triage Casualty Surge & ICU Ventilator Demands
 * - Airfield Damage Repair (ADR / RRR) Weathering & Worker Stay-Times
 */

// =========================================================================
// 1. CCA DECONTAMINATION THROUGHPUT & LOGISTICS
// =========================================================================

export interface CcaThroughputInput {
  lanesCount: number; // e.g. 1 to 4 lanes
  processingTimePerPersonMin: number; // baseline 8 to 15 min per person
  incomingCasualtyQueue: number; // total casualties waiting
  operatingHours: number; // operational shift hours
  rinseWaterGalPerPerson: number; // default 5 gal
  bleach5PctGalPerPerson: number; // default 1.5 gal for equipment/boots
  bleach05PctGalPerPerson: number; // default 1.0 gal for skin/gloves
}

export interface CcaThroughputResult {
  personnelPerHour: number;
  totalShiftCapacity: number;
  hoursToClearQueue: number;
  bottleneckStation: string;
  totalWaterRequiredGal: number;
  totalBleach5PctGal: number;
  totalBleach05PctGal: number;
  totalGraywaterEffluentGal: number;
  graywaterBladdersNeeded: number; // standard 500-gallon military bladders
  neutralizerRequiredKg: number; // sodium thiosulfate needed to neutralize chlorine bleach
}

export function calculateCcaThroughput(input: CcaThroughputInput): CcaThroughputResult {
  const lanes = Math.max(1, input.lanesCount);
  const timePerPerson = Math.max(1, input.processingTimePerPersonMin);
  const queue = Math.max(0, input.incomingCasualtyQueue);
  const shiftHours = Math.max(1, input.operatingHours);

  // Hourly throughput = (60 / timePerPerson) * lanes
  const pph = Math.round((60 / timePerPerson) * lanes * 10) / 10;
  const shiftCapacity = Math.round(pph * shiftHours);
  const hoursToClear = pph > 0 ? Math.round((queue / pph) * 10) / 10 : 0;

  // Station bottleneck estimation based on station cycle times
  let bottleneck = "Station 4: Inner Suit Cut & Stripping (longest physical dwell time)";
  if (timePerPerson > 12) {
    bottleneck = "Station 2: Gross Wash & Mask Wipe (high liquid contact time required)";
  } else if (timePerPerson <= 7) {
    bottleneck = "Station 6: De-Masking Chemical Vapor Sniff Check (CAM/JCAD instrument latency)";
  }

  // Fluid logistics
  const totalWater = Math.round(queue * input.rinseWaterGalPerPerson);
  const totalBleach5 = Math.round(queue * input.bleach5PctGalPerPerson * 10) / 10;
  const totalBleach05 = Math.round(queue * input.bleach05PctGalPerPerson * 10) / 10;
  const totalEffluent = Math.round(totalWater + totalBleach5 + totalBleach05);

  // 500-gal bladders
  const bladders = Math.ceil(totalEffluent / 500);

  // Neutralizer: ~0.15 kg sodium thiosulfate per gallon of 5% bleach effluent
  const neutralizerKg = Math.round((totalBleach5 * 0.15 + totalBleach05 * 0.02) * 10) / 10;

  return {
    personnelPerHour: pph,
    totalShiftCapacity: shiftCapacity,
    hoursToClearQueue: hoursToClear,
    bottleneckStation: bottleneck,
    totalWaterRequiredGal: totalWater,
    totalBleach5PctGal: totalBleach5,
    totalBleach05PctGal: totalBleach05,
    totalGraywaterEffluentGal: totalEffluent,
    graywaterBladdersNeeded: bladders,
    neutralizerRequiredKg: neutralizerKg,
  };
}

// =========================================================================
// 2. CASUALTY ANTIDOTE TRIAGE & STOCKPILE CALCULATOR
// =========================================================================

export type AgentFamily = "nerve_g" | "nerve_v" | "novichok" | "blood_cyanide" | "vesicant_lewisite";
export type CholinergicSeverity = "mild" | "moderate" | "severe";

export interface AntidoteTriageInput {
  agentFamily: AgentFamily;
  severity: CholinergicSeverity;
  totalCasualties: number;
  pediatricCasualties: number;
  stockpileAtnaa: number;
  stockpileCana: number;
  stockpile2Pam: number;
  stockpileCyanokit: number;
}

export interface AntidoteTriageResult {
  atnaaPerCasualty: number;
  canaPerCasualty: number;
  additional2PamPerCasualty: number;
  cyanokitPerCasualty: number;
  totalAtnaaNeeded: number;
  totalCanaNeeded: number;
  total2PamNeeded: number;
  totalCyanokitNeeded: number;
  atnaaDeficit: number;
  canaDeficit: number;
  cyanokitDeficit: number;
  dosingIntervalNotes: string[];
  pediatricGuidelines: string[];
  immediateClinicalDirectives: string[];
}

export function calculateAntidoteTriage(input: AntidoteTriageInput): AntidoteTriageResult {
  const total = Math.max(1, input.totalCasualties);
  const peds = Math.min(total, Math.max(0, input.pediatricCasualties));
  const adults = total - peds;

  let atnaaPerCas = 0;
  let canaPerCas = 0;
  let pamPerCas = 0;
  let cyanokitPerCas = 0;

  const notes: string[] = [];
  const pedNotes: string[] = [];
  const directives: string[] = [];

  if (input.agentFamily === "nerve_g" || input.agentFamily === "nerve_v" || input.agentFamily === "novichok") {
    directives.push("Establish patent airway immediately; suction heavy tracheobronchial secretions.");
    directives.push("Administer ATNAA (Atropine 2.1 mg / 2-PAM 600 mg) deep intramuscularly into lateral thigh.");

    if (input.severity === "mild") {
      atnaaPerCas = 1;
      canaPerCas = 0;
      pamPerCas = 0;
      notes.push("Mild symptoms (miosis, rhinorrhea): 1 ATNAA. Reassess at 10 minutes. Do not administer CANA unless fasciculations or convulsions occur.");
    } else if (input.severity === "moderate") {
      atnaaPerCas = 2;
      canaPerCas = 1;
      pamPerCas = 1;
      notes.push("Moderate symptoms (dyspnea, wheezing, fasciculations, sweating): 2 ATNAA in rapid succession + 1 CANA. Repeat Atropine every 5-10 min until bronchospasm clears.");
    } else {
      atnaaPerCas = 3;
      canaPerCas = 3;
      pamPerCas = 2;
      notes.push("Severe symptoms (convulsions, apnea, cyanosis, loss of consciousness): 3 ATNAA + 3 CANA immediately in rapid sequence. Continued Atropine infusion required (2-5 mg/h).");
    }

    if (input.agentFamily === "novichok") {
      directives.push("Novichok agents cause ultra-prolonged acetylcholinesterase inhibition and profound refractory bradycardia. Prepare for high-dose Atropine infusions up to 50–100 mg over 24h.");
      pamPerCas += 1;
    }

    pedNotes.push("Pediatric dosing: In children < 40 kg, avoid adult autoinjectors if pediatric formulations (AtroPen) are available. Atropine: 0.05 mg/kg IV/IM (min 0.1 mg). 2-PAM: 25-50 mg/kg IV over 30 min.");
    pedNotes.push("If pediatric autoinjector unavailable in mass casualty: Children > 2 years can receive 1 adult ATNAA under severe life-threatening conditions.");
  } else if (input.agentFamily === "blood_cyanide") {
    cyanokitPerCas = 1;
    directives.push("Administer Cyanokit (Hydroxocobalamin 5g IV infusion over 15 minutes). Second 5g dose may be administered for refractory cardiac arrest.");
    directives.push("Avoid nitrites (Sodium Nitrite) in patients with concurrent smoke inhalation / suspected carboxyhemoglobinemia.");
    notes.push("Cyanokit binds cyanide ions to form non-toxic cyanocobalamin (Vitamin B12), eliminated renally.");
    pedNotes.push("Pediatric Cyanokit dosing: 70 mg/kg IV infusion over 15 minutes (maximum adult single dose 5g).");
  } else if (input.agentFamily === "vesicant_lewisite") {
    directives.push("Administer British Anti-Lewisite (BAL / Dimercaprol): 2.5–3 mg/kg deep IM in oil every 4 hours for 2 days.");
    directives.push("Decontaminate skin immediately with RSDL to halt deep tissue penetration.");
    notes.push("Lewisite shock requires rapid intravenous crystalloid fluid resuscitation due to systemic capillary permeability.");
    pedNotes.push("Dimercaprol (BAL) pediatric dosing: 2.5 to 3 mg/kg deep IM every 4 hours.");
  }

  const totalAtnaa = atnaaPerCas * total;
  const totalCana = canaPerCas * total;
  const totalPam = pamPerCas * total;
  const totalCyanokit = cyanokitPerCas * total;

  return {
    atnaaPerCasualty: atnaaPerCas,
    canaPerCasualty: canaPerCas,
    additional2PamPerCasualty: pamPerCas,
    cyanokitPerCasualty: cyanokitPerCas,
    totalAtnaaNeeded: totalAtnaa,
    totalCanaNeeded: totalCana,
    total2PamNeeded: totalPam,
    totalCyanokitNeeded: totalCyanokit,
    atnaaDeficit: Math.max(0, totalAtnaa - input.stockpileAtnaa),
    canaDeficit: Math.max(0, totalCana - input.stockpileCana),
    cyanokitDeficit: Math.max(0, totalCyanokit - input.stockpileCyanokit),
    dosingIntervalNotes: notes,
    pediatricGuidelines: pedNotes,
    immediateClinicalDirectives: directives,
  };
}

// =========================================================================
// 3. COLLECTIVE PROTECTION SYSTEM (CPS) PURGE & AIRLOCK CALCULATOR
// =========================================================================

export interface CpsPurgeInput {
  shelterVolumeFt3: number; // e.g. 20,000 cu ft
  airlockVolumeFt3: number; // e.g. 500 cu ft
  filtrationFlowCfm: number; // e.g. 2,000 CFM
  airlockPurgeBlowerCfm: number; // e.g. 600 CFM
  ambientContaminantMgM3: number; // external concentration
  protectiveOverpressureInWc: number; // e.g. 0.3 in W.C. (target >= 0.25)
  relativeHumidityPct: number; // e.g. 70%
  hoursInHighThreat: number; // e.g. 12 hours
}

export interface CpsPurgeResult {
  shelterTurnoverMinutes: number;
  airlockPurgeTimeMinutes: number;
  airChangesPerHour: number;
  isOverpressureCompliant: boolean;
  filterLifespanRemainingPct: number;
  estimatedFilterExhaustionHours: number;
  maxIngressPersonsPerCycle: number;
  safetyRecommendations: string[];
}

export function calculateCpsPurge(input: CpsPurgeInput): CpsPurgeResult {
  const shelterVol = Math.max(100, input.shelterVolumeFt3);
  const airlockVol = Math.max(50, input.airlockVolumeFt3);
  const mainCfm = Math.max(10, input.filtrationFlowCfm);
  const airlockCfm = Math.max(10, input.airlockPurgeBlowerCfm);

  // Air changes per hour (ACH) = (CFM * 60) / Volume
  const ach = Math.round(((mainCfm * 60) / shelterVol) * 10) / 10;
  // 1 full air turnover time
  const turnoverMin = Math.round((shelterVol / mainCfm) * 10) / 10;

  // Airlock purge time for 99% vapor clearance: t = 4.6 * (V_airlock / Q_airlock)
  // (4.6 time constants corresponds to ln(100) = 4.605)
  const airlockPurgeMin = Math.round(4.6 * (airlockVol / airlockCfm) * 10) / 10;

  // Overpressure compliance: military spec is >= 0.25 inches water column (in W.C.)
  const isOverpressureCompliant = input.protectiveOverpressureInWc >= 0.25;

  // Filter degradation curve:
  // Base ASZM-TEDA carbon life: ~100 hours at 100 mg/m3 at 50% RH.
  // Higher RH degrades carbon bed capacity exponentially above 70%.
  const rhPenalty = input.relativeHumidityPct > 70 ? 1 + (input.relativeHumidityPct - 70) * 0.03 : 1.0;
  const loadFactor = (Math.max(1, input.ambientContaminantMgM3) / 50) * rhPenalty;
  const nominalLifeHours = 120 / loadFactor;

  const hoursRun = Math.max(0, input.hoursInHighThreat);
  const remainingLifePct = Math.max(0, Math.round(((nominalLifeHours - hoursRun) / nominalLifeHours) * 100));
  const exhaustionHours = Math.max(0, Math.round(nominalLifeHours - hoursRun));

  // Max persons per airlock ingress cycle: approx 1 person per 50 cu ft airlock volume
  const maxIngress = Math.max(1, Math.floor(airlockVol / 60));

  const recs: string[] = [];
  if (!isOverpressureCompliant) {
    recs.push("WARNING: Shelter overpressure is BELOW 0.25 in W.C. Positive pressure envelope compromised; toxic vapor ingress hazard exists through structural seals.");
  } else {
    recs.push("Shelter positive pressure envelope compliant (>= 0.25 in W.C.). Outward airflow prevents inward leakage.");
  }

  if (remainingLifePct < 25) {
    recs.push("CRITICAL: Carbon adsorption bank has under 25% remaining capacity. Stage replacement filter sets and prepare for unmasking evacuation or MOPP 4 don.");
  }

  recs.push(`Enforce strict ${airlockPurgeMin}-minute airlock dwell timer before opening inner shelter door to prevent vapor contamination.`);

  return {
    shelterTurnoverMinutes: turnoverMin,
    airlockPurgeTimeMinutes: airlockPurgeMin,
    airChangesPerHour: ach,
    isOverpressureCompliant,
    filterLifespanRemainingPct: remainingLifePct,
    estimatedFilterExhaustionHours: exhaustionHours,
    maxIngressPersonsPerCycle: maxIngress,
    safetyRecommendations: recs,
  };
}

// =========================================================================
// 4. DYNAMIC MOPP POSTURE MATRIX (CHEMRAT, Volatility, MV, WBGT)
// =========================================================================

export type HazardZoneDistance = "ground_zero" | "inner_1km" | "downwind_1_5km" | "outer_5_10km" | "clear_zone";
export type AgentVolatilityType = "persistent_liquid" | "volatile_vapor" | "toxic_industrial_gas" | "biological_aerosol" | "radiological_fallout";
export type WorkRateMinuteVolume = "resting_10" | "light_15" | "moderate_30" | "heavy_45" | "severe_60";
export type WbgtFlagCategory = "white" | "green" | "yellow" | "red" | "black";

export interface MoppMatrixInput {
  distanceZone: HazardZoneDistance;
  agentType: AgentVolatilityType;
  workRate: WorkRateMinuteVolume;
  wbgtFlag: WbgtFlagCategory;
  isCoveredShelter: boolean;
}

export interface MoppMatrixResult {
  recommendedMopp: "MOPP Ready" | "MOPP 0" | "MOPP 1" | "MOPP 2" | "MOPP 3" | "MOPP 4" | "MOPP Open";
  maskRequired: boolean;
  overgarmentRequired: boolean;
  bootsRequired: boolean;
  glovesRequired: boolean;
  workRestCycleMin: string; // e.g. "20 min work / 40 min rest"
  maxWorkDurationHours: number;
  waterIntakeQuartsPerHour: number;
  heatStrainAlert: string;
  tacticalRationale: string;
}

export function calculateMoppPosture(input: MoppMatrixInput): MoppMatrixResult {
  let mopp: "MOPP Ready" | "MOPP 0" | "MOPP 1" | "MOPP 2" | "MOPP 3" | "MOPP 4" | "MOPP Open" = "MOPP 0";
  let mask = false;
  let overgarment = false;
  let boots = false;
  let gloves = false;

  // 1. Determine baseline threat MOPP
  if (input.distanceZone === "ground_zero" || input.distanceZone === "inner_1km") {
    mopp = "MOPP 4";
    mask = true;
    overgarment = true;
    boots = true;
    gloves = true;
  } else if (input.distanceZone === "downwind_1_5km") {
    if (input.agentType === "persistent_liquid") {
      mopp = "MOPP 4";
      mask = true;
      overgarment = true;
      boots = true;
      gloves = true;
    } else if (input.agentType === "volatile_vapor" || input.agentType === "toxic_industrial_gas") {
      mopp = "MOPP 3"; // Mask and overgarment, boots, loose gloves
      mask = true;
      overgarment = true;
      boots = true;
      gloves = false;
    } else if (input.agentType === "biological_aerosol") {
      mopp = "MOPP 3"; // Respiratory barrier priority
      mask = true;
      overgarment = true;
      boots = true;
      gloves = false;
    } else {
      mopp = "MOPP 2";
      mask = false;
      overgarment = true;
      boots = true;
      gloves = false;
    }
  } else if (input.distanceZone === "outer_5_10km") {
    if (input.agentType === "volatile_vapor" || input.agentType === "toxic_industrial_gas") {
      mopp = "MOPP 2";
      overgarment = true;
      boots = true;
    } else {
      mopp = "MOPP 1";
      overgarment = true;
    }
  } else {
    // Clear zone
    mopp = "MOPP Ready";
  }

  // If inside certified collective protection, downgrade MOPP
  if (input.isCoveredShelter && mopp !== "MOPP Ready") {
    mopp = "MOPP 0";
    mask = false;
    overgarment = false;
    boots = false;
    gloves = false;
  }

  // 2. Heat Stress & Work/Rest Derivation based on WBGT Flag + MOPP Level
  // In MOPP 4, add +10°F to effective WBGT index
  let workRest = "Continuous work (50 min work / 10 min rest)";
  let maxDuration = 8.0;
  let waterQuarts = 0.5;
  let alert = "Normal hydration requirements.";

  const isFullMopp = mopp === "MOPP 4" || mopp === "MOPP 3";

  if (input.wbgtFlag === "black") {
    if (isFullMopp) {
      workRest = "10 min work / 50 min rest (Severe heat casualty danger)";
      maxDuration = 1.0;
      waterQuarts = 1.25;
      alert = "DANGER: Extreme heat casualty threshold. Limit non-mission-critical physical exertion. Enforce buddy checks for heat stroke.";
    } else {
      workRest = "20 min work / 40 min rest";
      maxDuration = 2.5;
      waterQuarts = 1.0;
      alert = "Heat Flag Black: High thermal risk. Enforce mandatory hydration.";
    }
  } else if (input.wbgtFlag === "red") {
    if (isFullMopp) {
      workRest = "15 min work / 45 min rest";
      maxDuration = 2.0;
      waterQuarts = 1.0;
      alert = "Heat Flag Red in protective gear: High dehydration and exhaustion risk.";
    } else {
      workRest = "30 min work / 30 min rest";
      maxDuration = 4.0;
      waterQuarts = 0.75;
      alert = "Heat Flag Red: Stagger heavy physical work.";
    }
  } else if (input.wbgtFlag === "yellow") {
    if (isFullMopp) {
      workRest = "25 min work / 35 min rest";
      maxDuration = 3.5;
      waterQuarts = 0.75;
      alert = "Heat Flag Yellow: Moderate heat strain in MOPP 4.";
    } else {
      workRest = "40 min work / 20 min rest";
      maxDuration = 5.0;
      waterQuarts = 0.75;
    }
  } else if (input.wbgtFlag === "green") {
    if (isFullMopp) {
      workRest = "35 min work / 25 min rest";
      maxDuration = 5.0;
      waterQuarts = 0.75;
    }
  }

  // Heavy minute volume adjustments
  if (input.workRate === "heavy_45" || input.workRate === "severe_60") {
    maxDuration = Math.round(maxDuration * 0.65 * 10) / 10;
    waterQuarts = Math.min(1.5, Math.round((waterQuarts + 0.25) * 10) / 10);
  }

  let rationale = `Recommended ${mopp} established based on ${input.distanceZone.replace(/_/g, " ")} distance from strike and ${input.agentType.replace(/_/g, " ")} agent volatility.`;
  if (input.isCoveredShelter) {
    rationale += " Downgraded to MOPP 0 due to certified pressurized collective protection.";
  }

  return {
    recommendedMopp: mopp,
    maskRequired: mask,
    overgarmentRequired: overgarment,
    bootsRequired: boots,
    glovesRequired: gloves,
    workRestCycleMin: workRest,
    maxWorkDurationHours: maxDuration,
    waterIntakeQuartsPerHour: waterQuarts,
    heatStrainAlert: alert,
    tacticalRationale: rationale,
  };
}

// =========================================================================
// 5. HOSPITAL & TRIAGE CASUALTY SURGE ESTIMATION
// =========================================================================

export interface CasualtySurgeInput {
  exposedPopulation: number; // e.g. 1,500 personnel
  protectionPosture: "unprotected_mopp0" | "sheltered_cps" | "partial_mopp2" | "full_mopp4";
  agentToxicityClass: "nerve_agent" | "pulmonary_choking" | "biological_pathogen" | "radiological_dirty_bomb";
  distanceToEpicenterKm: number; // e.g. 1.5 km
}

export interface CasualtySurgeResult {
  totalCasualties: number;
  triageImmediateT1: number; // Red
  triageDelayedT2: number; // Yellow
  triageMinimalT3: number; // Green
  triageExpectantT4: number; // Black
  icuVentilatorDemand: number;
  estimatedHospitalStayDaysAvg: number;
  autoinjectorDoses24h: number;
  surgeSurgeTimelineHours: { hour: number; cumulativeCasualties: number }[];
}

export function calculateCasualtySurge(input: CasualtySurgeInput): CasualtySurgeResult {
  const pop = Math.max(10, input.exposedPopulation);
  let casualtyFraction = 0.4;

  // Protection posture reduction
  if (input.protectionPosture === "sheltered_cps") casualtyFraction = 0.04;
  else if (input.protectionPosture === "full_mopp4") casualtyFraction = 0.08;
  else if (input.protectionPosture === "partial_mopp2") casualtyFraction = 0.25;
  else casualtyFraction = 0.65;

  // Distance attenuation
  const distAtten = 1 / Math.max(1, input.distanceToEpicenterKm * 0.8);
  const totalCas = Math.round(pop * casualtyFraction * Math.min(1.0, distAtten));

  // Triage breakdown based on agent
  let t1Fraction = 0.25;
  let t2Fraction = 0.35;
  let t3Fraction = 0.30;
  let t4Fraction = 0.10;
  let ventPctOfT1 = 0.6;
  let avgStay = 4;

  if (input.agentToxicityClass === "nerve_agent") {
    t1Fraction = 0.35;
    t2Fraction = 0.30;
    t3Fraction = 0.20;
    t4Fraction = 0.15;
    ventPctOfT1 = 0.75; // Diaphragm paralysis & central apnea
    avgStay = 6;
  } else if (input.agentToxicityClass === "pulmonary_choking") {
    t1Fraction = 0.30;
    t2Fraction = 0.40;
    t3Fraction = 0.25;
    t4Fraction = 0.05;
    ventPctOfT1 = 0.60; // Pulmonary edema
    avgStay = 8;
  } else if (input.agentToxicityClass === "biological_pathogen") {
    t1Fraction = 0.20;
    t2Fraction = 0.45;
    t3Fraction = 0.30;
    t4Fraction = 0.05;
    ventPctOfT1 = 0.35;
    avgStay = 10;
  } else {
    // Radiological
    t1Fraction = 0.10;
    t2Fraction = 0.30;
    t3Fraction = 0.55;
    t4Fraction = 0.05;
    ventPctOfT1 = 0.15;
    avgStay = 5;
  }

  const t1 = Math.round(totalCas * t1Fraction);
  const t2 = Math.round(totalCas * t2Fraction);
  const t3 = Math.round(totalCas * t3Fraction);
  const t4 = Math.max(0, totalCas - t1 - t2 - t3);

  const icuVents = Math.round(t1 * ventPctOfT1);
  const autoinjectors = input.agentToxicityClass === "nerve_agent" ? t1 * 3 + t2 * 2 + t3 * 1 : 0;

  // Surge arrival timeline (hours 1 through 12)
  const timeline: { hour: number; cumulativeCasualties: number }[] = [];
  const hours = [1, 2, 4, 6, 8, 12, 24];
  hours.forEach((h) => {
    // Sigmoidal surge curve
    const pct = 1 / (1 + Math.exp(-0.4 * (h - 4)));
    timeline.push({ hour: h, cumulativeCasualties: Math.round(totalCas * pct) });
  });

  return {
    totalCasualties: totalCas,
    triageImmediateT1: t1,
    triageDelayedT2: t2,
    triageMinimalT3: t3,
    triageExpectantT4: t4,
    icuVentilatorDemand: icuVents,
    estimatedHospitalStayDaysAvg: avgStay,
    autoinjectorDoses24h: autoinjectors,
    surgeSurgeTimelineHours: timeline,
  };
}

// =========================================================================
// 6. AIRFIELD DAMAGE REPAIR (ADR / RRR) TIMELINE & WEATHERING
// =========================================================================

export interface AdrTimelineInput {
  runwayCratersCount: number; // e.g. 3 craters
  ambientTempF: number; // e.g. 75 F
  windSpeedMph: number; // e.g. 10 mph
  surfaceAgent: "sarin_gb" | "mustard_hd" | "vx" | "rad_fallout";
  moppLevel: "MOPP 4" | "MOPP 2" | "MOPP 0";
  wbgtFlag: WbgtFlagCategory;
}

export interface AdrTimelineResult {
  totalRepairTimeHours: number;
  workerShiftLimitMinutes: number;
  weatheringHalfLifeHours: number;
  safeSortieLaunchWindowHours: number;
  crossContaminationRisk: "Low" | "Moderate" | "High" | "Critical";
  mitigationDirectives: string[];
}

export function calculateAdrRrrTimeline(input: AdrTimelineInput): AdrTimelineResult {
  // Baseline repair: 2.5 hours per crater in normal gear
  const baseTimePerCrater = 2.5;
  let moppMultiplier = 1.0;
  if (input.moppLevel === "MOPP 4") moppMultiplier = 1.85; // Dexterity and thermal penalty
  else if (input.moppLevel === "MOPP 2") moppMultiplier = 1.35;

  const totalHours = Math.round(input.runwayCratersCount * baseTimePerCrater * moppMultiplier * 10) / 10;

  // Worker shift limit based on WBGT + MOPP
  let shiftLimitMin = 120;
  if (input.moppLevel === "MOPP 4") {
    if (input.wbgtFlag === "black") shiftLimitMin = 30;
    else if (input.wbgtFlag === "red") shiftLimitMin = 45;
    else if (input.wbgtFlag === "yellow") shiftLimitMin = 60;
    else shiftLimitMin = 90;
  }

  // Weathering evaporation / decay half-life on concrete:
  // Sarin (GB): volatile, half-life 1-4 hours at 75°F with wind
  // Mustard (HD): persistent vesicant, half-life 24-72 hours
  // VX: non-volatile oily liquid, half-life 100-300+ hours
  // Rad fallout: physical decay according to 7/10 rule
  let halfLife = 2.0;
  let risk: "Low" | "Moderate" | "High" | "Critical" = "Moderate";
  const directives: string[] = [];

  if (input.surfaceAgent === "sarin_gb") {
    halfLife = Math.max(0.5, Math.round((180 / Math.max(1, input.ambientTempF)) * (10 / Math.max(5, input.windSpeedMph)) * 10) / 10);
    risk = "Moderate";
    directives.push("Sarin vapor off-gassing from warm concrete poses respiratory hazard. Aircraft jet blast will accelerate vapor dispersal.");
  } else if (input.surfaceAgent === "mustard_hd") {
    halfLife = Math.round((2400 / Math.max(1, input.ambientTempF)) * 10) / 10;
    risk = "High";
    directives.push("Mustard liquid droplets absorb into porous concrete and re-vaporize over days. Wash concrete with supertropical bleach (STB) slurry before tire contact.");
  } else if (input.surfaceAgent === "vx") {
    halfLife = 168.0; // ~7 days
    risk = "Critical";
    directives.push("CRITICAL CONTACT HAZARD: Aircraft tires rolling over liquid VX will cross-contaminate hangar aprons and ground crew. Mandatory full foam/bleach decontamination of crater margins.");
  } else {
    // Rad fallout
    halfLife = 7.0; // Effective radiological decay window
    risk = "High";
    directives.push("Radiological fallout requires mechanical sweeping and vacuum recovery prior to jet engine intake spool-up to prevent internal turbine contamination.");
  }

  const safeSortieWindow = Math.round((totalHours + halfLife * 0.8) * 10) / 10;

  return {
    totalRepairTimeHours: totalHours,
    workerShiftLimitMinutes: shiftLimitMin,
    weatheringHalfLifeHours: halfLife,
    safeSortieLaunchWindowHours: safeSortieWindow,
    crossContaminationRisk: risk,
    mitigationDirectives: directives,
  };
}
