export type IntelCategory =
  | "open_humint"
  | "open_sigint_rf"
  | "open_geoint"
  | "open_osint";

export type SignalConfidence = "verified" | "corroborated" | "unconfirmed";
export type ThreatLevel = "low" | "elevated" | "high" | "critical";

export type SourceCategory =
  | "official_sensor"
  | "regulatory_bulletin"
  | "verified_news_wire"
  | "regional_news"
  | "state_affiliated_media"
  | "crowdsourced_spotter"
  | "unverified_social_media";

export type BiasRating =
  | "least_biased"
  | "neutral_scientific"
  | "center"
  | "state_aligned"
  | "sensationalist"
  | "unverified_crowd";

export type FactualReporting = "very_high" | "high" | "mixed" | "low" | "unverified";

export interface SourceReliability {
  sourceType: SourceCategory;
  biasRating: BiasRating;
  biasLabel: string;
  factualReporting: FactualReporting;
  credibilityScore: number; // 0 - 100%
  verificationStatus: "sensor_verified" | "cross_corroborated" | "unvetted_caution" | "disinformation_risk";
  biasAnalysis: string; // Detailed analytical breakdown of bias and false report pitfalls
  falseReportRisk: "minimal" | "low" | "moderate" | "high";
}

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
  reliability: SourceReliability;
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
    reliability: {
      sourceType: "crowdsourced_spotter",
      biasRating: "least_biased",
      biasLabel: "Least Biased (Civilian Emergency Dispatch)",
      factualReporting: "high",
      credibilityScore: 82,
      verificationStatus: "cross_corroborated",
      biasAnalysis: "Direct emergency telephony dispatch log. High factual recording of eyewitness reports with minimal editorial bias; requires technical sensor corroboration to rule out psychosomatic odor clustering.",
      falseReportRisk: "low",
    },
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
    reliability: {
      sourceType: "regulatory_bulletin",
      biasRating: "neutral_scientific",
      biasLabel: "Neutral Scientific / Statutory Authority",
      factualReporting: "very_high",
      credibilityScore: 98,
      verificationStatus: "sensor_verified",
      biasAnalysis: "Legally binding regulatory health order issued pursuant to Safe Drinking Water Act compliance; automated chlorine residual and turbidity telemetry confirms distribution anomaly.",
      falseReportRisk: "minimal",
    },
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
    reliability: {
      sourceType: "regulatory_bulletin",
      biasRating: "neutral_scientific",
      biasLabel: "Neutral Epidemiological",
      factualReporting: "high",
      credibilityScore: 90,
      verificationStatus: "cross_corroborated",
      biasAnalysis: "Hospital admission registry data reported via WHO syndromic surveillance protocol. Minimal reporting bias; potential localized clinical diagnostic lag.",
      falseReportRisk: "low",
    },
  },
  {
    id: "SIG-HUM-04",
    category: "open_humint",
    categoryLabel: "Open HUMINT / Social Panic Filter",
    title: "Viral Video Claim of 'Toxic Gas Leak' Near Air Base Perimeter",
    source: "Unverified Social Media Stream & Sensationalist Local Clickbait Blog",
    targetLocationId: "BASE-01", // Joint Base Andrews
    confidence: "unconfirmed",
    threatLevel: "low",
    timestamp: "12m ago",
    details: "Viral 15-second phone video circulating online claiming a 'mysterious yellow chemical cloud' drifted over perimeter fencing. Sensor ground-truth confirmed cloud was inert pyrotechnic smoke from an off-base municipal firefighter drill.",
    recommendedAction: "DISREGARD FALSE ALARM: Base Bioenvironmental Engineering PID/FID air monitors show 0.0 ppm VOCs. Alert public affairs officer to counter civilian viral disinformation.",
    indicators: ["Unverified single video source", "No medical triage surge", "On-site air sensors show 0.0 ppm baseline"],
    reliability: {
      sourceType: "unverified_social_media",
      biasRating: "sensationalist",
      biasLabel: "Sensationalist / Click-Driven Social Media",
      factualReporting: "low",
      credibilityScore: 19,
      verificationStatus: "disinformation_risk",
      biasAnalysis: "EXTREME FALSE REPORT RISK: Highly emotionalized captioning intended to drive social virality and alarm. No technical or atmospheric sensor corroboration. Demonstrates the critical necessity of validating open-source social claims against calibrated physical instrumentation.",
      falseReportRisk: "high",
    },
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
    reliability: {
      sourceType: "official_sensor",
      biasRating: "neutral_scientific",
      biasLabel: "Neutral Scientific / Pure Telemetry",
      factualReporting: "very_high",
      credibilityScore: 99,
      verificationStatus: "sensor_verified",
      biasAnalysis: "Cryptographically demodulated 1090 MHz Mode S transponder telemetry received across multiple distributed civil RTL-SDR ground stations. 0% editorial bias.",
      falseReportRisk: "minimal",
    },
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
    reliability: {
      sourceType: "official_sensor",
      biasRating: "neutral_scientific",
      biasLabel: "Neutral Scientific / EPA Environmental Sensor",
      factualReporting: "very_high",
      credibilityScore: 100,
      verificationStatus: "sensor_verified",
      biasAnalysis: "Continuous sodium iodide (NaI) scintillation detector calibrated pursuant to ANSI N42.17A. Direct telemetric feed to federal environmental portal; zero editorial interference.",
      falseReportRisk: "minimal",
    },
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
    reliability: {
      sourceType: "official_sensor",
      biasRating: "neutral_scientific",
      biasLabel: "Authoritative Meteorological",
      factualReporting: "very_high",
      credibilityScore: 100,
      verificationStatus: "sensor_verified",
      biasAnalysis: "National Weather Service Doppler radar (WSR-88D) and automated surface observing system (ASOS) telemetric data. Official statutory warning.",
      falseReportRisk: "minimal",
    },
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
    reliability: {
      sourceType: "official_sensor",
      biasRating: "neutral_scientific",
      biasLabel: "Neutral Scientific / Satellite Orbital Telemetry",
      factualReporting: "very_high",
      credibilityScore: 99,
      verificationStatus: "sensor_verified",
      biasAnalysis: "Suomi NPP / JPSS polar-orbiting satellite thermal infrared sensor. Objective radiometer measurements computed via automated radiative transfer models; zero human narrative bias.",
      falseReportRisk: "minimal",
    },
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
    reliability: {
      sourceType: "official_sensor",
      biasRating: "neutral_scientific",
      biasLabel: "European Space Agency Earth Observation",
      factualReporting: "very_high",
      credibilityScore: 98,
      verificationStatus: "sensor_verified",
      biasAnalysis: "European Space Agency multispectral instrument (MSI) Level-2A surface reflectance data. Calibrated spectral bands with documented radiometric accuracy.",
      falseReportRisk: "minimal",
    },
  },

  // --- Open OSINT / Open Information Exploitation & News Sources ---
  {
    id: "SIG-OSI-01",
    category: "open_osint",
    categoryLabel: "Open OSINT / Regulatory Logistics",
    title: "Civilian Hazmat Transportation Spill Report",
    source: "DOT PHMSA Hazardous Materials Incident Log & Traffic Alert",
    targetLocationId: "BASE-04", // Naval Station Norfolk
    confidence: "verified",
    threatLevel: "high",
    timestamp: "14m ago",
    details: "Commercial tanker carrying 5,000 gal anhydrous ammonia overturned on Interstate 564 connector 800 meters from gate 3.",
    recommendedAction: "Close Gate 3 immediately; shelter-in-place nearby administrative buildings; verify toxic inhalation hazard (TIH) evacuation distance (minimum 1.6 km downwind).",
    indicators: ["State Police SIGALERT", "PHMSA hazard placard 1005 (Ammonia, Anhydrous)"],
    reliability: {
      sourceType: "regulatory_bulletin",
      biasRating: "neutral_scientific",
      biasLabel: "Neutral Regulatory / Emergency Dispatch",
      factualReporting: "very_high",
      credibilityScore: 97,
      verificationStatus: "sensor_verified",
      biasAnalysis: "Federal DOT statutory incident reporting feed combined with Virginia State Police on-scene incident commander logs. Highly factual, verified cargo manifests.",
      falseReportRisk: "minimal",
    },
  },
  {
    id: "SIG-OSI-02",
    category: "open_osint",
    categoryLabel: "Open OSINT / News Wire Service",
    title: "Commercial Petrochemical Storage Tank Fire & Evacuation Order",
    source: "Associated Press / Reuters Global Industrial News Wire",
    targetLocationId: "BASE-28", // Fleet Activities Yokosuka
    confidence: "verified",
    threatLevel: "elevated",
    timestamp: "38m ago",
    details: "International wire reporters confirmed large commercial hydrocarbon tank fire in adjacent industrial port zone; municipal authorities initiated 1-mile shelter-in-place order for dense smoke particulate.",
    recommendedAction: "Verify air intake filtration on waterfront barracks; review wind shear vectors across docking berths.",
    indicators: ["Dual-sourced news wire dispatch", "Municipal fire department press conference confirmed", "Coincident atmospheric particulate spike"],
    reliability: {
      sourceType: "verified_news_wire",
      biasRating: "center",
      biasLabel: "Least Biased / Major International Wire Service",
      factualReporting: "very_high",
      credibilityScore: 94,
      verificationStatus: "cross_corroborated",
      biasAnalysis: "AP/Reuters strict editorial policy requires multiple on-the-record sources and direct confirmation from municipal emergency services before transmission. Low bias risk; high factual baseline.",
      falseReportRisk: "low",
    },
  },
  {
    id: "SIG-OSI-03",
    category: "open_osint",
    categoryLabel: "Open OSINT / State-Affiliated Media Warning",
    title: "Foreign State Broadcaster Claims 'Allied Chemical Depot Contamination Leak'",
    source: "State-Controlled Foreign International News Channel (Foreign Media Network)",
    targetLocationId: "BASE-22", // Ramstein Air Base
    confidence: "unconfirmed",
    threatLevel: "low",
    timestamp: "55m ago",
    details: "Foreign state-funded broadcaster transmitted alarmist report alleging 'toxic nerve agent runoff' into local river basin from air base operations, citing an anonymous unverified Telegram channel.",
    recommendedAction: "FALSE ALARM & DISINFORMATION ALERT: Host nation water testing authority and base bioenvironmental health teams confirmed zero contaminant levels. Do NOT change force protection posture based on state-sponsored information operations.",
    indicators: ["State-controlled media outlet with documented hybrid warfare history", "No scientific water telemetry corroboration", "German regional environmental agency confirms water is 100% normal"],
    reliability: {
      sourceType: "state_affiliated_media",
      biasRating: "state_aligned",
      biasLabel: "State-Controlled Media (Strategic Narrative Agenda)",
      factualReporting: "mixed",
      credibilityScore: 34,
      verificationStatus: "disinformation_risk",
      biasAnalysis: "HIGH DISINFORMATION & FALSE REPORT RISK: State-funded foreign broadcaster under direct governmental editorial control. Known history of fabricating environmental contamination claims to generate local anti-basing protests. Commanders must never rely on hostile or state-controlled news sources without independent sensor verification.",
      falseReportRisk: "high",
    },
  },
  {
    id: "SIG-OSI-04",
    category: "open_osint",
    categoryLabel: "Open OSINT / Host Nation Civil Defense",
    title: "Civil Defense Radiation Drill Announcement",
    source: "Host Nation Civil Protection Public Press Release",
    targetLocationId: "BASE-24", // Kadena Air Base
    confidence: "verified",
    threatLevel: "low",
    timestamp: "2h ago",
    details: "Prefectural government announced annual unannounced civil emergency drill involving smoke canisters and siren testing between 14:00-16:00.",
    recommendedAction: "Brief base security and dispatchers to avoid false alarm escalation while maintaining standard vigilant posture.",
    indicators: ["Prefectural government official gazette notice"],
    reliability: {
      sourceType: "regulatory_bulletin",
      biasRating: "center",
      biasLabel: "Official Civil Defense Gazette",
      factualReporting: "high",
      credibilityScore: 92,
      verificationStatus: "sensor_verified",
      biasAnalysis: "Official gazetted public safety announcement from municipal authorities. High factual accuracy; non-sensational announcement of controlled exercise.",
      falseReportRisk: "minimal",
    },
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

  // Filter out high false report risk disinformation to avoid false commander escalations!
  const credibleSignals = signals.filter((s) => s.reliability.falseReportRisk !== "high");
  const evalSignals = credibleSignals.length > 0 ? credibleSignals : signals;

  const hasCritical = evalSignals.some((s) => s.threatLevel === "critical");
  const hasHigh = evalSignals.some((s) => s.threatLevel === "high");
  const hasElevated = evalSignals.some((s) => s.threatLevel === "elevated");

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

  const highestConfidence: SignalConfidence = evalSignals.some((s) => s.confidence === "verified")
    ? "verified"
    : evalSignals.some((s) => s.confidence === "corroborated")
    ? "corroborated"
    : "unconfirmed";

  return {
    locationId,
    maxThreatLevel: maxThreat,
    totalSignals: signals.length,
    highestConfidence,
    recommendedCommanderMopp: mopp,
    recommendedFpcon: fpcon,
    primaryThreatSummary: evalSignals[0].details,
  };
}
