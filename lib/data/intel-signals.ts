export type IntelCategory =
  | "open_humint"
  | "open_sigint_rf"
  | "open_geoint"
  | "open_osint";

export type SignalConfidence = "verified" | "corroborated" | "unconfirmed";
export type ThreatLevel = "low" | "elevated" | "high" | "critical";

export interface IntelSignal {
  id: string;
  category: IntelCategory;
  categoryLabel: string;
  title: string;
  source: string;
  targetLocationId: string; // matches id in locations.ts or "ALL"
  confidence: SignalConfidence;
  threatLevel: ThreatLevel;
  timestamp: string;
  details: string;
  recommendedAction: string;
  indicators: string[];
}

export const OPEN_INTEL_SIGNALS: IntelSignal[] = [
  // --- Open HUMINT (Public Eyewitness & Spotter Networks) ---
  {
    id: "SIG-HUM-01",
    category: "open_humint",
    categoryLabel: "Open HUMINT / Ground Truth",
    title: "Civilian Industrial Odor & Eye Irritation Cluster",
    source: "County Public Health Spotter Network & Local 911 Triage Log",
    targetLocationId: "BASE-01", // Joint Base Andrews
    confidence: "corroborated",
    threatLevel: "elevated",
    timestamp: "18m ago",
    details: "Multiple independent civilian calls reporting persistent bitter-almond / burning sulfur vapor smell and sudden conjunctival lacrimation 3.2 km upwind of facility western gate.",
    recommendedAction: "Initiate localized perimeter air monitoring; verify prevailing wind vector and alert gate sentries.",
    indicators: ["Multiple independent callers", "Consistent symptom clustering (lacrimation)", "Upwind geographic line"],
  },
  {
    id: "SIG-HUM-02",
    category: "open_humint",
    categoryLabel: "Open HUMINT / Ground Truth",
    title: "Regional Municipal Boil Water Advisory",
    source: "Regional Water Authority Public Health Bulletin",
    targetLocationId: "BASE-11", // Nellis AFB
    confidence: "verified",
    threatLevel: "high",
    timestamp: "42m ago",
    details: "Municipal main line pressure drop followed by turbidity spike in off-installation civilian supply feeder. Potential coliform backflow.",
    recommendedAction: "Switch base primary drinking water to bottled emergency reserves; initiate Bioenvironmental Engineering grab-sampling.",
    indicators: ["Official utility alert", "Pressure drop telemetric confirmation"],
  },
  {
    id: "SIG-HUM-03",
    category: "open_humint",
    categoryLabel: "Open HUMINT / Ground Truth",
    title: "Local Clinic Respiratory Surge Notice",
    source: "Public Health Ministry Open Outbreak Tracker",
    targetLocationId: "POST-05", // U.S. Embassy Nairobi
    confidence: "corroborated",
    threatLevel: "elevated",
    timestamp: "1h 10m ago",
    details: "District hospital admitting 40+ acute febrile pediatric cases with atypical pulmonary infiltrates within 15 km of embassy compound.",
    recommendedAction: "Alert Regional Medical Officer (RMO); enforce enhanced respiratory hand-hygiene and voluntary N95 wear.",
    indicators: ["Syndromic surveillance cluster", "Spatial clustering near diplomatic quarter"],
  },

  // --- Open SIGINT / Civil RF & Spectrum Telemetry ---
  {
    id: "SIG-RF-01",
    category: "open_sigint_rf",
    categoryLabel: "Open SIGINT / Civil RF Spectrum",
    title: "Civil ADS-B Squawk 7700 & Unscheduled Hazmat Divert",
    source: "OpenSky Network / FlightAware ADS-B Receiver Feed",
    targetLocationId: "BASE-03", // Wright-Patterson AFB
    confidence: "verified",
    threatLevel: "high",
    timestamp: "8m ago",
    details: "Civil cargo carrier en route declared general in-flight emergency (Squawk 7700), reported cockpit vapor indicator, and requested priority vector to Wright-Patterson runway 05L.",
    recommendedAction: "Deploy base crash fire rescue and hazardous materials bioenvironmental response team to taxiway alpha staging.",
    indicators: ["Mode S / ADS-B transponder squawk 7700", "Altitude descent rate > 3,500 fpm", "Emergency cockpit vapor callout"],
  },
  {
    id: "SIG-RF-02",
    category: "open_sigint_rf",
    categoryLabel: "Open SIGINT / Civil RF Spectrum",
    title: "EPA RadNet Sensor Gamma Micro-Spike Alert",
    source: "EPA RadNet Public Real-Time Radiation Sensor Network",
    targetLocationId: "BASE-28", // Fleet Activities Yokosuka
    confidence: "corroborated",
    threatLevel: "elevated",
    timestamp: "25m ago",
    details: "Public ambient gamma monitor recorded brief elevation from baseline 0.08 µSv/h to 0.42 µSv/h for 12 minutes during heavy rain squall.",
    recommendedAction: "Correlate with local radon washout / precip wash; deploy portable ADM-300 survey meter to check pier-side background.",
    indicators: ["Gamma photon count deviation > 3 sigma", "Coincident precipitation squall"],
  },
  {
    id: "SIG-RF-03",
    category: "open_sigint_rf",
    categoryLabel: "Open SIGINT / Civil RF Spectrum",
    title: "NOAA Weather Radio EAS Severe Microburst & WBGT Warning",
    source: "NOAA All-Hazards Radio (WXL-70 Broadcast / SAME Code)",
    targetLocationId: "BASE-06", // Fort Cavazos
    confidence: "verified",
    threatLevel: "critical",
    timestamp: "4m ago",
    details: "Rapid frontal boundary passage generating 55 kt gusts, sudden temperature drop followed by ambient humidity spike to 92%, driving estimated WBGT into Black Flag (>90°F).",
    recommendedAction: "Immediately suspend all non-essential outdoor physical training and heavy work details; enforce hydration schedule.",
    indicators: ["SAME tone burst received", "Radar reflectivity > 60 dBZ", "Rapid dewpoint rise"],
  },

  // --- Open GEOINT / Earth Observation & Thermal Sensors ---
  {
    id: "SIG-GEO-01",
    category: "open_geoint",
    categoryLabel: "Open GEOINT / Satellite Telemetry",
    title: "NASA FIRMS Thermal Anomaly Near Ammunition Storage",
    source: "NASA VIIRS / MODIS Active Fire Satellite Sensor (375m)",
    targetLocationId: "BASE-12", // Minot AFB
    confidence: "verified",
    threatLevel: "high",
    timestamp: "32m ago",
    details: "Satellite pass detected high-confidence 42 MW thermal hotspot 1.8 km northwest of perimeter boundary in prairie grassland. Fire spread direction oriented toward perimeter fence.",
    recommendedAction: "Dispatch wildland fire response units; establish upwind firebreak along perimeter road.",
    indicators: ["VIIRS 375m infrared I-band brightness > 365K", "FRP (Fire Radiative Power) 42.4 MW"],
  },
  {
    id: "SIG-GEO-02",
    category: "open_geoint",
    categoryLabel: "Open GEOINT / Satellite Telemetry",
    title: "Sentinel-2 Multi-Spectral Industrial Plume Signature",
    source: "Copernicus Sentinel-2 Optical / Short-Wave Infrared Pass",
    targetLocationId: "BASE-22", // Ramstein Air Base
    confidence: "corroborated",
    threatLevel: "elevated",
    timestamp: "1h 45m ago",
    details: "SWIR band differential highlights dense smoke/particulate plume extending 6 km downwind from civilian chemical manufacturing park along highway A6.",
    recommendedAction: "Model downwind vapor dispersion vector; review facility ventilation intakes.",
    indicators: ["Band 12 (2190 nm) reflectance spike", "Aerosol Optical Depth (AOD) > 0.8"],
  },

  // --- Open OSINT / Open Information Exploitation ---
  {
    id: "SIG-OSI-01",
    category: "open_osint",
    categoryLabel: "Open OSINT / Public Data Feeds",
    title: "Civilian Hazmat Transportation Spill Report",
    source: "DOT PHMSA Hazardous Materials Incident Log & Traffic Alert",
    targetLocationId: "BASE-04", // Naval Station Norfolk
    confidence: "verified",
    threatLevel: "high",
    timestamp: "14m ago",
    details: "Commercial tanker carrying 5,000 gal anhydrous ammonia overturned on Interstate 564 connector 800 meters from gate 3.",
    recommendedAction: "Close Gate 3 immediately; shelter-in-place nearby administrative buildings; verify toxic inhalation hazard (TIH) evacuation distance (minimum 1.6 km downwind).",
    indicators: ["State Police SIGALERT", "PHMSA hazard placard 1005 (Ammonia, Anhydrous)"],
  },
  {
    id: "SIG-OSI-02",
    category: "open_osint",
    categoryLabel: "Open OSINT / Public Data Feeds",
    title: "Civil Defense Radiation Drill Announcement",
    source: "Host Nation Civil Protection Public Press Release",
    targetLocationId: "BASE-24", // Kadena Air Base
    confidence: "verified",
    threatLevel: "low",
    timestamp: "2h ago",
    details: "Prefectural government announced annual unannounced civil emergency drill involving smoke canisters and siren testing between 14:00-16:00.",
    recommendedAction: "Brief base security and dispatchers to avoid false alarm escalation while maintaining standard vigilant posture.",
    indicators: ["Prefectural government official gazette notice"],
  },
];

export function getSignalsForLocation(locationId: string): IntelSignal[] {
  return OPEN_INTEL_SIGNALS.filter(
    (s) => s.targetLocationId === locationId || s.targetLocationId === "ALL"
  );
}

export interface LocationThreatSummary {
  locationId: string;
  maxThreatLevel: ThreatLevel;
  totalSignals: number;
  highestConfidence: SignalConfidence;
  recommendedCommanderMopp: "MOPP 0" | "MOPP 1" | "MOPP 2" | "MOPP 3" | "MOPP 4";
  recommendedFpcon: "NORMAL" | "ALPHA" | "BRAVO" | "CHARLIE" | "DELTA";
  primaryThreatSummary: string;
}

export function evaluateThreatMetrics(locationId: string): LocationThreatSummary {
  const signals = getSignalsForLocation(locationId);

  if (signals.length === 0) {
    return {
      locationId,
      maxThreatLevel: "low",
      totalSignals: 0,
      highestConfidence: "unconfirmed",
      recommendedCommanderMopp: "MOPP 0",
      recommendedFpcon: "NORMAL",
      primaryThreatSummary: "No anomalous open-source signals detected in proximity. Maintain standard baseline occupational vigilance.",
    };
  }

  const hasCritical = signals.some((s) => s.threatLevel === "critical");
  const hasHigh = signals.some((s) => s.threatLevel === "high");
  const hasElevated = signals.some((s) => s.threatLevel === "elevated");

  let maxThreat: ThreatLevel = "low";
  let mopp: "MOPP 0" | "MOPP 1" | "MOPP 2" | "MOPP 3" | "MOPP 4" = "MOPP 0";
  let fpcon: "NORMAL" | "ALPHA" | "BRAVO" | "CHARLIE" | "DELTA" = "NORMAL";

  if (hasCritical) {
    maxThreat = "critical";
    mopp = "MOPP 3";
    fpcon = "CHARLIE";
  } else if (hasHigh) {
    maxThreat = "high";
    mopp = "MOPP 2";
    fpcon = "BRAVO";
  } else if (hasElevated) {
    maxThreat = "elevated";
    mopp = "MOPP 1";
    fpcon = "ALPHA";
  }

  const highestConfidence: SignalConfidence = signals.some((s) => s.confidence === "verified")
    ? "verified"
    : signals.some((s) => s.confidence === "corroborated")
    ? "corroborated"
    : "unconfirmed";

  return {
    locationId,
    maxThreatLevel: maxThreat,
    totalSignals: signals.length,
    highestConfidence,
    recommendedCommanderMopp: mopp,
    recommendedFpcon: fpcon,
    primaryThreatSummary: signals[0].details,
  };
}
