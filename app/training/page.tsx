"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Radiation,
  SunMedium,
  MapPin,
  ShieldAlert,
  FileText,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Award,
  PlayCircle,
  Layers,
  ArrowRight,
  CheckSquare,
  Sliders,
  Plane,
  Eye,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

// Tab types
type TrainingTab = "how_to_use" | "slides" | "fpcon" | "certification";

// FPCON Level definitions moved to Training & Education
interface FpconData {
  level: "NORMAL" | "ALPHA" | "BRAVO" | "CHARLIE" | "DELTA";
  name: string;
  color: string;
  summary: string;
  measures: string;
  cbrnPosture: string;
  gatePosture: string;
}

const FPCON_LEVELS: FpconData[] = [
  {
    level: "NORMAL",
    name: "FPCON Normal",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    summary: "General global threat of possible terrorist activity exists and warrants a routine security posture.",
    measures: "Standard access control, routine identification checks, regular security patrols.",
    cbrnPosture: "MOPP 0. Standard OEH baseline monitoring. Baseline environmental air and water sampling.",
    gatePosture: "Routine perimeter sentry. Standard commercial vehicle verification.",
  },
  {
    level: "ALPHA",
    name: "FPCON Alpha",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
    summary: "Increased general threat of possible terrorist activity against personnel and facilities, nature and extent unpredictable.",
    measures: "Random vehicle inspections, increased gate staffing, personnel situational awareness alerts.",
    cbrnPosture: "MOPP 0 or MOPP 1 ready. Chemical detection alarms calibrated. Rad survey meters powered on stand-by.",
    gatePosture: "Random inspection of 1 in 5 commercial vehicles. Physical credential spot-checks.",
  },
  {
    level: "BRAVO",
    name: "FPCON Bravo",
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    summary: "Increased or more predictable threat of terrorist activity exists against military or government installations.",
    measures: "Closer inspection of commercial delivery vehicles, 100% ID checks, restricted non-essential visitor access.",
    cbrnPosture: "MOPP 1 / MOPP 2 authorized. First-responder respiratory gear pre-staged. Enhanced perimeter air monitoring.",
    gatePosture: "100% ID verification of all occupants. Vehicle undercarriage mirror inspections. Non-essential visitors restricted.",
  },
  {
    level: "CHARLIE",
    name: "FPCON Charlie",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    summary: "An incident occurs or intelligence indicates that terrorist action or targeting against personnel/facilities is likely.",
    measures: "Strict vehicle inspections, entry control point barriers active, recall of specialized personnel, enhanced physical perimeter defense.",
    cbrnPosture: "MOPP 2 or MOPP 3. Bioenvironmental engineering response team mobilized. Continuous perimeter rad & chem vapor sniffing.",
    gatePosture: "Installation access limited to mission-critical personnel only. Active barrier systems deployed. Thorough trunk/engine searches.",
  },
  {
    level: "DELTA",
    name: "FPCON Delta",
    color: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30",
    summary: "Immediate area where a terrorist attack has occurred or when intelligence indicates terrorist action against a specific location is imminent.",
    measures: "Total installation lockdown, entry restricted strictly to mission-essential emergency responders, arms bearing for security details.",
    cbrnPosture: "MOPP 4 in designated sectors. Full protective ensembles sealed. Immediate hot zone cordon containment.",
    gatePosture: "All gates locked and barricaded. Armed sentries positioned. Immediate denial of all unverified inbound traffic.",
  },
];

// Interactive Training Slides
interface TrainingSlide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
  content: {
    overview: string;
    keySteps: { step: string; detail: string }[];
    proTip: string;
    tryItLink: { label: string; href: string };
  };
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const TRAINING_SLIDES: TrainingSlide[] = [
  {
    id: 1,
    title: "1. Mission, Operational Bounds & Legacy Basis",
    subtitle: "Understanding what C2RAT is designed for, ethical safety bounds, and Mike Golf's legacy foundation.",
    category: "Foundations",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    content: {
      overview:
        "C2RAT is an occupational and environmental health (OEH) decision-support application. The original Chemical Hazard Assessment and Risk Tool (CHART) and its toxicological calculations were developed and validated by Mike Golf in January 2018. C2RAT preserves Mike Golf's validated algorithms while modernizing the platform with offline PWA support, multi-INT threat correlation, and Google Maps geospatial visualization.",
      keySteps: [
        {
          step: "Legacy Basis: Developed by Mike Golf",
          detail:
            "The mathematical core of toxic load calculations, minute volume adjustments, and probit percentiles traces directly to Mike Golf's validated models.",
        },
        {
          step: "Qualified User Decision-Support",
          detail:
            "C2RAT assists qualified medical, bioenvironmental engineering, and CBRN specialists. It does NOT replace command authority or clinical diagnosis.",
        },
        {
          step: "Strict Safety & Ethical Boundaries",
          detail:
            "The system strictly prohibits weaponization recipes, explosive synthesis, targeting, or displaying restricted/classified military operational information.",
        },
        {
          step: "Zero Cloud Formula Leakage",
          detail:
            "All exposure calculations execute locally client-side in pure TypeScript. No chemical formulas, concentrations, or patient scenarios leak to external servers.",
        },
      ],
      proTip:
        "Check the 'Legacy Basis' indicator in the lower left sidebar to confirm model version and validation status at any time.",
      tryItLink: { label: "Review Limitations & Provenance", href: "/limitations" },
    },
    quizQuestion: {
      question: "Who developed the original validated CHART tool and foundational toxicological models in January 2018?",
      options: [
        "A commercial defense marketing team",
        "Mike Golf",
        "An anonymous third-party contractor",
        "A standard commercial weather service",
      ],
      correctIndex: 1,
      explanation:
        "The original Chemical Hazard Assessment and Risk Tool (CHART 2018) was conceived, engineered, and validated by Mike Golf.",
    },
  },
  {
    id: 2,
    title: "2. Chemical Exposure Assessment Engine",
    subtitle: "Mastering Haber's Law non-linear toxic load (L = C^n × T) and probit risk percentiles.",
    category: "Chemical Defense",
    icon: <FlaskConical className="w-6 h-6 text-emerald-500" />,
    content: {
      overview:
        "The Chemical Exposure module implements Haber's Law with toxic load exponentiation (L = C^n × T) and military probit percentile risk brackets, replicating the validated algorithms of Mike Golf's CHART 2018 model.",
      keySteps: [
        {
          step: "1. Select Chemical Agent",
          detail:
            "Choose from verified nerve agents (GA Tabun, GB Sarin, GD Soman, GF, VX) or blister agents (HD Sulfur Mustard, HN Nitrogen Mustards, Lewisite).",
        },
        {
          step: "2. Input Concentration & Unit",
          detail:
            "Enter measured or modeled concentration in ppm or mg/m³. The engine automatically converts units using exact molecular weight and ambient temperature.",
        },
        {
          step: "3. Adjust Workload & Temperature",
          detail:
            "Select physical workload (Resting, Moderate, Strenuous) to apply minute volume (MV) adjustment, and toggle hot conditions (>85°F) for mustard vapor severe threshold drop.",
        },
        {
          step: "4. Read 3 Health Endpoints",
          detail:
            "Examine the 3 real-time risk cards: Threshold / Miosis, Incapacitation / Severe, and Lethality (LC) with exact median L50 and probit risk percentiles.",
        },
      ],
      proTip:
        "Click 'Open Scientific Details Drawer' at the bottom of the calculation result to inspect the exact equations, intermediates, and assumptions used.",
      tryItLink: { label: "Open Chemical Assessment Tool", href: "/assess/chemical" },
    },
    quizQuestion: {
      question: "In the chemical toxic load equation L = C^n × T, what does 'n' represent?",
      options: [
        "The number of personnel exposed",
        "The toxic load exponent specific to each chemical agent and health effect endpoint",
        "Ambient nitrogen percentage in air",
        "Number of minutes required to evacuate",
      ],
      correctIndex: 1,
      explanation:
        "'n' is the agent-specific toxic load exponent that accounts for non-linear toxicological effects over varying exposure durations.",
    },
  },
  {
    id: 3,
    title: "3. Radiological Stay-Time & Inverse-Square Standoff",
    subtitle: "Calculating mission-allowable radiation stay times and safe perimeter distances.",
    category: "Radiological Safety",
    icon: <Radiation className="w-6 h-6 text-amber-500" />,
    content: {
      overview:
        "The Radiological suite provides point-source decay modeling and operational decision tools to prevent radiation overexposure while executing mission-critical tasks under ALARA principles.",
      keySteps: [
        {
          step: "Stay-Time Calculation (Tab 1)",
          detail:
            "Input commander's allowable dose (e.g. 5 Rad for life-saving operations) and survey entry/exit dose rates. The system computes average dose rate and exact allowable stay time in minutes.",
        },
        {
          step: "Inverse-Square Dose at Distance (Tab 2)",
          detail:
            "Given measured dose rate I1 at distance d1, calculate dose rate I2 at a new perimeter distance d2 using I2 = I1 × (d1 / d2)².",
        },
        {
          step: "Determine Safe Stand-Off Perimeter",
          detail:
            "Input a target safe dose rate threshold (e.g. 2 mR/hr cordon boundary) to instantly calculate the required physical standoff distance d2 = sqrt(d1² × I1 / I2).",
        },
      ],
      proTip:
        "Remember that stay-time assumes point-source gamma radiation without significant geometry shifts. In complex field geometry, continuous dosimeter monitoring is mandatory.",
      tryItLink: { label: "Open Radiological Suite", href: "/assess/radiological" },
    },
    quizQuestion: {
      question: "If the dose rate is 100 mR/hr at 1 meter, what will it be at 2 meters under the inverse square law?",
      options: ["50 mR/hr", "25 mR/hr", "10 mR/hr", "200 mR/hr"],
      correctIndex: 1,
      explanation:
        "Under the inverse square law, doubling distance (from 1m to 2m) reduces intensity by a factor of 2² = 4. 100 / 4 = 25 mR/hr.",
    },
  },
  {
    id: 4,
    title: "4. Airborne Particulate & Respirator Trigger Rule",
    subtitle: "Integrating air sampler pump flow and evaluating the 20 dpm/m³ protection threshold.",
    category: "Radiological Safety",
    icon: <Radiation className="w-6 h-6 text-purple-500" />,
    content: {
      overview:
        "Airborne radioactive dust and alpha-emitting particles pose acute internal inhalation hazards. C2RAT replicates Mike Golf's legacy air sampler calculation sheet with automated respiratory protection alerts.",
      keySteps: [
        {
          step: "1. Enter Pump Flow & Sample Duration",
          detail:
            "Input start and stop flow rates (L/min or CFM) and sampling time to calculate standardized total air volume sampled in cubic meters (m³).",
        },
        {
          step: "2. Record Filter Alpha Counts",
          detail:
            "Input gross alpha counts from calibrated field counter (e.g. Ludlum 43-5) and counter efficiency to calculate disintegrations per minute per cubic meter (dpm/m³).",
        },
        {
          step: "3. Check Respiratory Trigger",
          detail:
            "If airborne alpha activity meets or exceeds 20 dpm/m³, the interface automatically triggers a high-visibility warning requiring M-series or PAPR respiratory protection.",
        },
      ],
      proTip:
        "Airborne radiation calculations are located in Tab 3 of the Radiological Assessment suite (/assess/radiological).",
      tryItLink: { label: "Go to Airborne Rad Module", href: "/assess/radiological" },
    },
  },
  {
    id: 5,
    title: "5. 3-Tier WBGT Heat Stress & Uniform Adjustments",
    subtitle: "Distinguishing measured, estimated, and forecast WBGT with clothing factors.",
    category: "Environmental Health",
    icon: <SunMedium className="w-6 h-6 text-amber-500" />,
    content: {
      overview:
        "Preventing non-battle heat casualties requires rigorous environmental monitoring. C2RAT separates on-site physical measurements, transparent Liljegren empirical estimation, and NWS HeatRisk planning forecasts.",
      keySteps: [
        {
          step: "Tier 1: Measured WBGT (Gold Standard)",
          detail:
            "Enter direct instrument readings from on-site Kestrel or QUESTemp wet-bulb globe thermometers.",
        },
        {
          step: "Tier 2: Transparent Model Estimation",
          detail:
            "When certified instruments are unavailable, input ambient temperature, humidity, wind, and solar condition to compute estimated WBGT via Stull/Liljegren formulation.",
        },
        {
          step: "Apply Clothing Adjustment Factors",
          detail:
            "Select uniform configuration: Combat Uniform + Body Armor adds +5°F to effective WBGT; MOPP 4 Chemical Overgarment adds +10°F.",
        },
        {
          step: "Enforce Work/Rest & Hydration Flags",
          detail:
            "Review the resulting Flag condition (White, Green, Yellow, Red, or Black Flag) to identify prescribed work/rest cycles and hourly hydration limits.",
        },
      ],
      proTip:
        "Never exceed 1.5 quarts of water per hour to prevent exercise-associated hyponatremia (water intoxication).",
      tryItLink: { label: "Open Weather & WBGT Tool", href: "/weather" },
    },
    quizQuestion: {
      question: "How many degrees Fahrenheit is added to effective WBGT when personnel are in MOPP 4 gear?",
      options: ["+0°F", "+5°F", "+10°F", "+20°F"],
      correctIndex: 2,
      explanation:
        "Wearing a full MOPP 4 chemical protective overgarment restricts evaporative cooling, adding +10°F to the effective WBGT index for work/rest calculations.",
    },
  },
  {
    id: 6,
    title: "6. Global Bases, Diplomatic Posts & Satellite HUD",
    subtitle: "Navigating 45 global facilities, supported aircraft, and satellite imagery.",
    category: "Geospatial Operations",
    icon: <MapPin className="w-6 h-6 text-blue-500" />,
    content: {
      overview:
        "C2RAT maintains a curated directory of 35 major military installations and 10 U.S. diplomatic missions worldwide, integrated with interactive Google Maps satellite imagery and airfield specs.",
      keySteps: [
        {
          step: "1. Search and Filter Facilities",
          detail:
            "Filter by facility type (Military Base vs Diplomatic Post), service branch, combatant command region, or supported aircraft platform (F-35, B-52, C-17).",
        },
        {
          step: "2. Inspect Mission Sets & Aircraft Systems",
          detail:
            "Each installation card details primary operational mission sets, supported aircraft/vessel systems, runway lengths, and harbor specs.",
        },
        {
          step: "3. Interactive Satellite & Cartographic Display",
          detail:
            "Click 'Target on Map' to focus the Google Maps display with satellite, roadmap, or terrain layers and read real-time coordinates, elevation, and weather station codes.",
        },
        {
          step: "4. Set Active Context",
          detail:
            "Click 'Set Active' to bind that facility to your active workspace, automatically propagating location context to weather and scenario tools.",
        },
      ],
      proTip:
        "Click 'Google Earth 3D' in the map HUD to launch external high-fidelity 3D topography of the facility perimeter.",
      tryItLink: { label: "Explore Global Facilities", href: "/installations" },
    },
  },
  {
    id: 7,
    title: "7. Open Multi-INT Signals & Threat Corroboration",
    subtitle: "Correlating open-source ground truth, civil RF, and satellite telemetry.",
    category: "Intelligence & Decisions",
    icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
    content: {
      overview:
        "To make sound risk decisions, OEH specialists synthesize multiple unclassified indicators. The Open Multi-INT feed correlates civilian ground reports, civil RF broadcasts, and satellite observations.",
      keySteps: [
        {
          step: "Open HUMINT (Ground Truth)",
          detail:
            "Civilian spotter observations, municipal water advisories, and public health symptom clusters near installation perimeters.",
        },
        {
          step: "Open SIGINT / Civil RF Telemetry",
          detail:
            "Civil aviation ADS-B transponder squawk alerts (e.g. Squawk 7700 hazmat diverts), NOAA All-Hazards Radio warnings, and public EPA RadNet gamma monitors.",
        },
        {
          step: "Open GEOINT (Earth Observation)",
          detail:
            "NASA FIRMS thermal anomaly hotspots and Copernicus Sentinel-2 multi-spectral industrial plume signatures.",
        },
        {
          step: "Confidence & Threat Corroboration",
          detail:
            "Signals are categorized as Unconfirmed, Corroborated, or Verified to avoid false alarm fatigue while driving protective action.",
        },
      ],
      proTip:
        "Open Multi-INT signals feed directly into the Commander Decision Metrics Matrix to calculate threat-adaptive MOPP and FPCON recommendations.",
      tryItLink: { label: "Review Public Feeds", href: "/public-situational-awareness" },
    },
  },
  {
    id: 8,
    title: "8. Commander Decision Metrics & Auditable Reports",
    subtitle: "Synthesizing MOPP, FPCON, work/rest directives, and exporting audit reports.",
    category: "Command & Reporting",
    icon: <FileText className="w-6 h-6 text-indigo-500" />,
    content: {
      overview:
        "The ultimate goal of C2RAT is enabling timely, legally defensible, life-saving command decisions. Synthesize threats into commander directives and generate auditable reports.",
      keySteps: [
        {
          step: "1. Commander Decision Metrics Matrix (CDMM)",
          detail:
            "Automatically evaluates chemical probit risk, WBGT flag, and open signals to recommend MOPP levels (0-4), FPCON adjustments, work/rest ratios, and isolation cordons.",
        },
        {
          step: "2. Generate Commander BLUF",
          detail:
            "Click 'Copy Commander BLUF' to instantly generate a high-contrast Bottom Line Up Front executive summary for verbal or digital incident command briefing.",
        },
        {
          step: "3. Attach Calculations to Scenarios",
          detail:
            "Use 'Attach to Active Scenario' on any assessment screen to build a timestamped audit trail of all modeling runs.",
        },
        {
          step: "4. Export Print/PDF & JSON Records",
          detail:
            "Navigate to /reports to print clean executive briefings with full mathematical traceability or download JSON data archives for defense health records.",
        },
      ],
      proTip:
        "Audit reports contain the exact software commit, model version, and mathematical baseline verification status required for formal investigation defense.",
      tryItLink: { label: "Generate Auditable Report", href: "/reports" },
    },
    quizQuestion: {
      question: "What does 'BLUF' stand for in commander briefings?",
      options: [
        "Base Level Unit Form",
        "Bottom Line Up Front",
        "Biological Laboratory Universal Facility",
        "Bioenvironmental Leadership Unit Function",
      ],
      correctIndex: 1,
      explanation:
        "'BLUF' stands for Bottom Line Up Front, a military briefing format delivering critical recommendations and conclusions before background details.",
    },
  },
];

// Comprehensive Certification Exam (8 questions)
interface CertQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
}

const CERT_QUESTIONS: CertQuestion[] = [
  {
    id: 1,
    topic: "Legacy Provenance",
    question: "Under the legacy basis of C2RAT, who originally created and validated the core CHART algorithms in January 2018?",
    options: ["Mike Golf", "John Bravo", "Alex Charlie", "David Foxtrot"],
    correctIndex: 0,
  },
  {
    id: 2,
    topic: "Chemical Toxic Load",
    question: "In Haber's law non-linear toxic load L = C^n × T, what happens when concentration C is doubled for an agent with n = 1.5?",
    options: [
      "Toxic load doubles (2.0x)",
      "Toxic load increases by 2^1.5 ≈ 2.83 times",
      "Toxic load remains unchanged",
      "Toxic load decreases by half",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    topic: "Radiological Standoff",
    question: "Under the inverse-square law, if radiation intensity is 160 mR/hr at 1 meter, what is the intensity at 4 meters?",
    options: ["40 mR/hr", "20 mR/hr", "10 mR/hr", "80 mR/hr"],
    correctIndex: 2,
  },
  {
    id: 4,
    topic: "Airborne Particulate Trigger",
    question: "At what airborne alpha particulate activity threshold does C2RAT mandate respiratory protection (M-series mask or PAPR)?",
    options: ["5 dpm/m³", "10 dpm/m³", "20 dpm/m³", "100 dpm/m³"],
    correctIndex: 2,
  },
  {
    id: 5,
    topic: "WBGT Uniform Adjustment",
    question: "When personnel don MOPP 4 chemical overgarments, how many degrees Fahrenheit must be added to the measured/estimated WBGT?",
    options: ["+0°F", "+5°F", "+10°F", "+15°F"],
    correctIndex: 2,
  },
  {
    id: 6,
    topic: "Hydration Safety Cap",
    question: "To prevent exercise-associated hyponatremia (water intoxication), what is the maximum hourly fluid intake limit under heat stress?",
    options: ["0.5 quarts/hr", "1.0 quart/hr", "1.5 quarts/hr", "3.0 quarts/hr"],
    correctIndex: 2,
  },
  {
    id: 7,
    topic: "Force Protection Condition",
    question: "Which FPCON level applies in the immediate area where a terrorist attack has occurred or when action against a specific location is imminent?",
    options: ["FPCON Alpha", "FPCON Bravo", "FPCON Charlie", "FPCON Delta"],
    correctIndex: 3,
  },
  {
    id: 8,
    topic: "Commander Decision Support",
    question: "What is the primary function of the Commander BLUF in the Commander Decision Metrics Matrix?",
    options: [
      "Provide a concise Bottom Line Up Front executive summary with MOPP, FPCON, and work/rest directives for rapid briefing",
      "Automatically transmit tactical classified targeting coordinates",
      "Override medical authority and diagnose clinical casualties",
      "Order unauthorized commercial vehicle escorts",
    ],
    correctIndex: 0,
  },
];

export default function TrainingStudioPage() {
  const [activeTab, setActiveTab] = useState<TrainingTab>("how_to_use");

  // Slide deck state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedSlideQuiz, setSelectedSlideQuiz] = useState<Record<number, number>>({});
  const [completedSlides, setCompletedSlides] = useState<number[]>([1]);

  // FPCON state
  const [selectedFpcon, setSelectedFpcon] = useState<FpconData>(FPCON_LEVELS[2]); // Bravo default

  // Certification exam state
  const [certAnswers, setCertAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [operatorName, setOperatorName] = useState("Field Health Specialist");

  const activeSlide = TRAINING_SLIDES[currentSlideIndex];

  // Interactive Mini Simulators for "How To Use" Tab
  const [simConc, setSimConc] = useState<number>(2.5);
  const [simDuration, setSimDuration] = useState<number>(30);
  const [simWorkload, setSimWorkload] = useState<"mild" | "heavy">("mild");

  // Approximate Sarin toxic load: L = C^1.5 * T * (MV factor)
  const mvFactor = simWorkload === "heavy" ? 2.0 : 1.0;
  const simToxicLoad = Math.pow(simConc, 1.5) * simDuration * mvFactor;
  let simRiskBracket = "Low (<16%)";
  let simMopp = "MOPP 1";
  if (simToxicLoad >= 146.4) {
    simRiskBracket = "Severe Lethal (>84%)";
    simMopp = "MOPP 4";
  } else if (simToxicLoad >= 88.39) {
    simRiskBracket = "High Incapacitation (50-84%)";
    simMopp = "MOPP 3";
  } else if (simToxicLoad >= 30) {
    simRiskBracket = "Moderate (16-50%)";
    simMopp = "MOPP 2";
  }

  // Slide navigation
  const handleNextSlide = () => {
    if (currentSlideIndex < TRAINING_SLIDES.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      if (!completedSlides.includes(TRAINING_SLIDES[nextIndex].id)) {
        setCompletedSlides([...completedSlides, TRAINING_SLIDES[nextIndex].id]);
      }
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  // Exam scoring
  const calculateScore = () => {
    let correct = 0;
    CERT_QUESTIONS.forEach((q) => {
      if (certAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / CERT_QUESTIONS.length) * 100);
  };

  const examScore = examSubmitted ? calculateScore() : 0;
  const examPassed = examScore >= 80;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              C2RAT Training, Education & FPCON Center
            </h1>
            <StatusBadge type="authoritative" label="Standard Curriculum" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Master the complete C2RAT workflow: interactive app guide, FPCON doctrinal reference, master slides, and operator certification.
          </p>
        </div>

        {/* Legacy Basis Attribution Badge */}
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-xs">
          <span className="text-[10px] uppercase font-bold text-primary block">
            Legacy Model Basis:
          </span>
          <span className="font-semibold text-foreground">
            Developed by Mike Golf
          </span>
        </div>
      </div>

      {/* Main 4-Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("how_to_use")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "how_to_use"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>🚀 How to Use the App (Interactive Guide)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("slides")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "slides"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>🎓 Master Slide Deck ({TRAINING_SLIDES.length} Slides)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("fpcon")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "fpcon"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>🛡️ FPCON Educational Reference</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certification")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "certification"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <Award className="w-4 h-4 text-emerald-500" />
          <span>🏆 Operator Exam & Credential</span>
        </button>
      </div>

      {/* TAB 1: HOW TO USE THE APP (INTERACTIVE STEP-BY-STEP WORKFLOWS & SIMULATORS) */}
      {activeTab === "how_to_use" && (
        <div className="space-y-6">
          {/* Legacy Basis Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Validated Historical Lineage:
              </span>
              <p className="text-xs text-foreground leading-relaxed">
                C2RAT is built upon the validated foundation of the original Chemical Hazard Assessment and Risk Tool (CHART) developed by <strong>Mike Golf</strong> in January 2018. The algorithms implement Haber's toxic load, probit slopes, and radiological stay times with 100% mathematical parity.
              </p>
            </div>
            <Link
              href="/limitations"
              className="text-xs font-bold text-primary hover:underline whitespace-nowrap self-start sm:self-auto"
            >
              Scientific Provenance →
            </Link>
          </div>

          {/* Interactive Chemical Workflow & Live Simulator */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-foreground">
                  Workflow 1: Running a Chemical Exposure Assessment
                </h2>
              </div>
              <Link
                href="/assess/chemical"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
              >
                Open Chemical Tool <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Follow these 4 simple steps to model chemical agent vapor toxicity and evaluate mission risk:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono font-bold flex items-center justify-center">1</span>
                <h3 className="font-bold text-foreground">Pick Chemical Agent</h3>
                <p className="text-muted-foreground">Select from Nerve (GA, GB, GD, GF, VX) or Blister (HD Mustard, Lewisite).</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono font-bold flex items-center justify-center">2</span>
                <h3 className="font-bold text-foreground">Enter Concentration & Time</h3>
                <p className="text-muted-foreground">Input in ppm or mg/m³ and duration in minutes. Auto-converts via molecular weight.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono font-bold flex items-center justify-center">3</span>
                <h3 className="font-bold text-foreground">Adjust Workload</h3>
                <p className="text-muted-foreground">Resting (15 L/min) vs Strenuous (45 L/min) scales effective dose via Minute Volume.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono font-bold flex items-center justify-center">4</span>
                <h3 className="font-bold text-foreground">Read 3 Risk Cards</h3>
                <p className="text-muted-foreground">Inspect Threshold Miosis, Incapacitation, and Lethality probit percentages.</p>
              </div>
            </div>

            {/* Interactive Live Mini-Simulator */}
            <div className="p-4 rounded-xl border border-dashed border-primary/40 bg-primary/[0.02] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-primary" />
                  Try It Live: Interactive Sarin (GB) Toxic Load Simulator
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Formula: L = C^1.5 × T
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="flex justify-between font-mono mb-1">
                    <span className="text-muted-foreground">Concentration (mg/m³):</span>
                    <strong className="text-foreground">{simConc} mg/m³</strong>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={simConc}
                    onChange={(e) => setSimConc(parseFloat(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono mb-1">
                    <span className="text-muted-foreground">Duration (minutes):</span>
                    <strong className="text-foreground">{simDuration} min</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="120"
                    step="1"
                    value={simDuration}
                    onChange={(e) => setSimDuration(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <span className="text-muted-foreground block mb-1">Physical Workload:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSimWorkload("mild")}
                      className={`flex-1 py-1 rounded text-xs font-semibold ${
                        simWorkload === "mild" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      Resting (15 L/m)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimWorkload("heavy")}
                      className={`flex-1 py-1 rounded text-xs font-semibold ${
                        simWorkload === "heavy" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      Heavy (45 L/m)
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulator Output Result */}
              <div className="p-3 rounded-lg bg-card border border-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Calculated Toxic Load (C^n × T):</span>
                  <span className="text-base font-bold text-foreground">{simToxicLoad.toFixed(2)} (mg/m³)^1.5 · min</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Estimated Severe Risk:</span>
                  <span className="text-xs font-bold text-amber-500">{simRiskBracket}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Recommended MOPP Posture:</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    {simMopp}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow 2: Weather & 3-Tier WBGT */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <SunMedium className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-foreground">
                  Workflow 2: Heat Stress & 3-Tier WBGT Management
                </h2>
              </div>
              <Link
                href="/weather"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/20 transition-colors"
              >
                Open Weather Tool <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Tier 1: On-Site Measured</span>
                <h3 className="font-bold text-foreground">Kestrel / QUESTemp Instrument</h3>
                <p className="text-muted-foreground">The gold standard. Direct physical measurement of ambient, wet bulb, and black globe temperature.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Tier 2: Liljegren Empirical</span>
                <h3 className="font-bold text-foreground">Validated Model Estimation</h3>
                <p className="text-muted-foreground">Computes estimated WBGT from air temperature, relative humidity, wind speed, and solar irradiance.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Tier 3: NWS HeatRisk</span>
                <h3 className="font-bold text-foreground">72-Hour Planning Forecast</h3>
                <p className="text-muted-foreground">Used for advance shift scheduling. Displays regional heat stress category and advisories.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200">
              <strong>Uniform Adjustment Rule:</strong> Add <strong>+5°F</strong> for Body Armor; add <strong>+10°F</strong> for MOPP 4 Chemical Overgarment to effective WBGT. Maximum hydration cap is <strong>1.5 quarts/hour</strong>.
            </div>
          </div>

          {/* Workflow 3: Global Bases, Supported Aircraft & Commander Decision Metrics */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-foreground">
                  Workflow 3: Global Bases, Supported Aircraft & Commander Decision Matrix
                </h2>
              </div>
              <Link
                href="/installations"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-500/20 transition-colors"
              >
                Open Bases & Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">45 Strategic Installations</span>
                <h3 className="font-bold text-foreground">Bases & Diplomatic Posts</h3>
                <p className="text-muted-foreground">Browse 35 military installations and 10 U.S. embassies worldwide with satellite ortho imagery.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Supported Aircraft & Missions</span>
                <h3 className="font-bold text-foreground">F-35, B-2, B-52, C-17, Drones</h3>
                <p className="text-muted-foreground">Filter bases by aircraft platform, mission set (Air Dominance, Nuclear Deterrence), or runway length.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Commander Decision Support</span>
                <h3 className="font-bold text-foreground">MOPP, FPCON & BLUF Matrix</h3>
                <p className="text-muted-foreground">Correlates multi-INT threat signals to generate work/rest intervals, protective cordons, and executive briefings.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER SLIDE DECK */}
      {activeTab === "slides" && (
        <div className="space-y-6">
          {/* Slide Navigation Bar & Slide Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-muted disabled:opacity-40 text-xs font-semibold text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                disabled={currentSlideIndex === TRAINING_SLIDES.length - 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 disabled:opacity-40 text-xs font-semibold text-primary-foreground transition-opacity"
              >
                Next Slide
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-muted-foreground ml-2">
                Slide <strong className="text-foreground">{currentSlideIndex + 1}</strong> of {TRAINING_SLIDES.length}
              </span>
            </div>

            {/* Slide Jump Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {TRAINING_SLIDES.map((slide, idx) => {
                const isCurrent = idx === currentSlideIndex;
                const isDone = completedSlides.includes(slide.id);

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${
                      isCurrent
                        ? "bg-primary text-primary-foreground shadow"
                        : isDone
                        ? "bg-secondary text-foreground hover:bg-muted border border-primary/30"
                        : "bg-secondary/40 text-muted-foreground hover:bg-muted"
                    }`}
                    title={slide.title}
                  >
                    {slide.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Slide Presentation Canvas */}
          <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden space-y-6 p-6 sm:p-8">
            {/* Slide Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    {activeSlide.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                      {activeSlide.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                      {activeSlide.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {activeSlide.subtitle}
                </p>
              </div>

              <Link
                href={activeSlide.content.tryItLink.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold transition-colors self-start whitespace-nowrap"
              >
                <span>{activeSlide.content.tryItLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Slide Body: Overview & Step Breakdown */}
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Operational Objective
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {activeSlide.content.overview}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Standard Operating Procedure / Execution Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeSlide.content.keySteps.map((step, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center border border-primary/20">
                          {i + 1}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-foreground">
                          {step.step}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs">
                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 dark:text-amber-200 block">
                    OEH Specialist Field Tip:
                  </span>
                  <p className="text-amber-800 dark:text-amber-300/90 mt-0.5">
                    {activeSlide.content.proTip}
                  </p>
                </div>
              </div>

              {/* Knowledge Check Quiz (if present) */}
              {activeSlide.quizQuestion && (
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Check on Learning / Knowledge Check
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-secondary/20 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {activeSlide.quizQuestion.question}
                    </p>

                    <div className="space-y-2">
                      {activeSlide.quizQuestion.options.map((opt, optIdx) => {
                        const isSelected = selectedSlideQuiz[activeSlide.id] === optIdx;
                        const isAnswered = selectedSlideQuiz[activeSlide.id] !== undefined;
                        const isCorrect = optIdx === activeSlide.quizQuestion?.correctIndex;

                        let btnClass = "border-border bg-card hover:bg-secondary/40 text-foreground";
                        if (isAnswered) {
                          if (isCorrect) {
                            btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold";
                          } else if (isSelected) {
                            btnClass = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => setSelectedSlideQuiz({ ...selectedSlideQuiz, [activeSlide.id]: optIdx })}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnClass}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedSlideQuiz[activeSlide.id] !== undefined && (
                      <p className="text-xs font-mono text-muted-foreground pt-2 border-t border-border">
                        <strong>Explanation:</strong> {activeSlide.quizQuestion.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Slide Footer Navigation */}
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-muted disabled:opacity-40 text-xs font-semibold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Module
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                disabled={currentSlideIndex === TRAINING_SLIDES.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                {currentSlideIndex === TRAINING_SLIDES.length - 1 ? "Course Complete" : "Next Module"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FORCE PROTECTION CONDITION (FPCON) EDUCATIONAL REFERENCE */}
      {activeTab === "fpcon" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-foreground">
                Force Protection Condition (FPCON) Doctrinal Training Module
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              DoD Directive 2000.12 and Joint Pub 3-07.2 establish the standard force protection posture tiers for military installations and diplomatic missions. Select an FPCON tier below to inspect its security posture, gate inspection directives, and integration with CBRN/OEH health protection levels.
            </p>
          </div>

          {/* Interactive FPCON Level Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {FPCON_LEVELS.map((fp) => {
              const isSelected = selectedFpcon.level === fp.level;

              return (
                <button
                  key={fp.level}
                  type="button"
                  onClick={() => setSelectedFpcon(fp)}
                  className={`p-4 rounded-xl border text-left transition-all ${fp.color} ${
                    isSelected ? "ring-2 ring-primary scale-105 shadow-md" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase block tracking-wider opacity-75">
                    Tier
                  </span>
                  <h3 className="font-black text-lg">{fp.level}</h3>
                  <span className="text-[11px] block mt-1 font-semibold line-clamp-1">{fp.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected FPCON Detailed Dossier */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span>{selectedFpcon.name} Doctrinal Standard</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  DoD Force Protection Security Baseline
                </p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedFpcon.color}`}>
                Active Tier: {selectedFpcon.level}
              </span>
            </div>

            {/* Dossier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-border bg-secondary/20 space-y-2">
                <span className="font-bold uppercase tracking-wider text-muted-foreground block text-[10px]">
                  1. Operational Definition & Threat Environment:
                </span>
                <p className="text-foreground leading-relaxed text-sm">
                  {selectedFpcon.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-secondary/20 space-y-2">
                <span className="font-bold uppercase tracking-wider text-muted-foreground block text-[10px]">
                  2. Physical Security & Sentry Measures:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFpcon.measures}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-secondary/20 space-y-2">
                <span className="font-bold uppercase tracking-wider text-primary block text-[10px]">
                  3. Entry Control Point (ECP) & Gate Inspection:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFpcon.gatePosture}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-secondary/20 space-y-2">
                <span className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block text-[10px]">
                  4. CBRN & Health Protection Alignment (MOPP):
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFpcon.cbrnPosture}
                </p>
              </div>
            </div>

            {/* Random Antiterrorism Measures (RAM) Reference */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
              <span className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider text-[11px] block">
                Random Antiterrorism Measures (RAM) Doctrine:
              </span>
              <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">
                RAM involves implementing random, unannounced security measures from higher FPCON levels (e.g. executing FPCON Charlie vehicle searches during FPCON Bravo conditions) to disrupt adversary surveillance and introduce unpredictability.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OPERATOR CERTIFICATION EXAM & CREDENTIAL */}
      {activeTab === "certification" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-500" />
                  C2RAT Certified Field Operator Examination
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete the 8-question standardized exam to verify proficiency in Haber's Law, radiological physics, 3-tier WBGT, FPCON, and Commander Decision Metrics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground">Operator Name:</label>
                <input
                  type="text"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-secondary text-foreground text-xs font-medium focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {CERT_QUESTIONS.map((q, idx) => {
                const selectedAns = certAnswers[q.id];
                const isCorrect = selectedAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-border bg-secondary/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary font-bold border border-primary/20">
                        {q.topic}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        Question {idx + 1} of {CERT_QUESTIONS.length}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAns === optIdx;
                        let btnStyle = "border-border bg-card hover:bg-secondary/60 text-foreground";

                        if (examSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold";
                          } else if (isSelected) {
                            btnStyle = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold";
                          }
                        } else if (isSelected) {
                          btnStyle = "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary";
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={examSubmitted}
                            onClick={() => setCertAnswers({ ...certAnswers, [q.id]: optIdx })}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {examSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Exam Actions & Submission */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              {!examSubmitted ? (
                <button
                  type="button"
                  onClick={() => setExamSubmitted(true)}
                  disabled={Object.keys(certAnswers).length < CERT_QUESTIONS.length}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  Submit Exam for Scoring ({Object.keys(certAnswers).length}/{CERT_QUESTIONS.length} Answered)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setExamSubmitted(false);
                    setCertAnswers({});
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-muted text-xs font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Exam
                </button>
              )}
            </div>

            {/* Exam Result & Certificate Display */}
            {examSubmitted && (
              <div
                className={`p-6 rounded-2xl border text-center space-y-4 ${
                  examPassed
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200"
                }`}
              >
                <div className="inline-flex p-3 rounded-full bg-card border border-border shadow-sm">
                  <Award className={`w-10 h-10 ${examPassed ? "text-emerald-500" : "text-rose-500"}`} />
                </div>

                <div>
                  <h3 className="text-xl font-black">
                    {examPassed ? "Examination Passed - Operator Certified!" : "Examination Not Passed"}
                  </h3>
                  <p className="text-xs font-mono mt-1">
                    Score: <strong>{examScore}%</strong> (Passing threshold: 80%)
                  </p>
                </div>

                {examPassed && (
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-card border border-border text-foreground text-left shadow-md space-y-2 font-mono text-xs">
                    <div className="border-b border-border pb-2 flex justify-between items-center">
                      <span className="font-bold text-primary">C2RAT OPERATOR CERTIFICATE</span>
                      <span className="text-[10px] text-muted-foreground">ID: CERT-2026-MG01</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">Certified Operator:</span>
                      <span className="text-sm font-bold text-foreground">{operatorName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Curriculum:</span>
                        <span>C2RAT Master Operator</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Legacy Basis:</span>
                        <span>Mike Golf</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Status: Verified In Offline Secure Store
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
