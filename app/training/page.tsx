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
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

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
    title: "1. Mission, Operational Bounds & Safety Rules",
    subtitle: "Understanding what CHART+ is designed for and non-negotiable boundaries.",
    category: "Foundations",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    content: {
      overview:
        "CHART+ is an occupational and environmental health (OEH) decision-support application. It provides qualified medical, bioenvironmental engineering, and CBRN specialists with mathematically verified exposure calculations, environmental planning, and auditable reporting.",
      keySteps: [
        {
          step: "Qualified User Support",
          detail:
            "CHART+ assists trained specialists—it does NOT replace official doctrine, command authority, local SOPs, or clinical judgment.",
        },
        {
          step: "Strict Safety Boundaries",
          detail:
            "The system strictly prohibits weaponization instructions, explosive synthesis, targeting, individual tracking, or displaying classified military operational data.",
        },
        {
          step: "Zero Cloud Formula Leakage",
          detail:
            "All toxic load, inverse square, and probit calculations execute deterministically client-side in pure TypeScript, remaining fully operational even without internet connectivity.",
        },
      ],
      proTip:
        "Look for the persistent high-consequence disclaimer banner at the top of every screen. It provides quick access to formal methodology and limitations.",
      tryItLink: { label: "Review Limitations & Disclaimers", href: "/limitations" },
    },
    quizQuestion: {
      question: "Which of the following describes the operational scope of CHART+?",
      options: [
        "Automated command software that supersedes local commanders and medical officers",
        "Decision-support and educational tool for qualified occupational and environmental health specialists",
        "Public chat assistant for synthesizing chemical formulations",
        "Restricted weapons delivery targeting suite",
      ],
      correctIndex: 1,
      explanation:
        "CHART+ is strictly a decision-support and educational tool for qualified personnel, operating within defensive and health protection boundaries.",
    },
  },
  {
    id: 2,
    title: "2. Running Chemical Exposure & Toxic Load Assessments",
    subtitle: "Mastering Haber's Law non-linear toxic load and probit risk percentiles.",
    category: "Chemical Defense",
    icon: <FlaskConical className="w-6 h-6 text-emerald-500" />,
    content: {
      overview:
        "The Chemical Exposure module implements Haber's Law with toxic load exponentiation (L = C^n × T) and military probit percentile risk brackets, replicating the validated algorithms of the legacy CHART 2018 model.",
      keySteps: [
        {
          step: "1. Select Chemical Agent",
          detail:
            "Choose from verified nerve agents (GA, GB, GD, GF, VX) or blister agents (HD Sulfur Mustard, HN Nitrogen Mustards, Lewisite).",
        },
        {
          step: "2. Input Concentration & Unit",
          detail:
            "Enter measured or modeled concentration in ppm or mg/m³. The engine automatically converts between units using exact molecular weight and ambient temperature.",
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
        "Airborne radioactive dust and alpha-emitting particles pose acute internal inhalation hazards. CHART+ replicates the legacy air sampler calculation sheet with automated respiratory protection alerts.",
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
        "Preventing non-battle heat casualties requires rigorous environmental monitoring. CHART+ separates on-site physical measurements, transparent Liljegren empirical estimation, and NWS HeatRisk planning forecasts.",
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
        "CHART+ maintains a curated directory of 35 major military installations and 10 U.S. diplomatic missions worldwide, integrated with interactive Google Maps satellite imagery and airfield specs.",
      keySteps: [
        {
          step: "1. Search and Filter Facilities",
          detail:
            "Filter by facility type (Military Base vs Diplomatic Post), service branch (Air Force, Navy, Army, Marines, Space Force, State Dept), or combatant command region.",
        },
        {
          step: "2. Inspect Mission Sets & Aircraft Systems",
          detail:
            "Each installation card details primary operational mission sets, supported aircraft/vessel systems (e.g. F-35, B-52, C-17), runway lengths, and harbor specs.",
        },
        {
          step: "3. Interactive Satellite & Cartographic Display",
          detail:
            "Click 'View on Map' to focus the Google Maps display with satellite, roadmap, or terrain layers and read real-time coordinates, elevation, and weather station codes.",
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
        "The ultimate goal of CHART+ is enabling timely, legally defensible, life-saving command decisions. Synthesize threats into commander directives and generate auditable reports.",
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

export default function TrainingStudioPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [completedSlides, setCompletedSlides] = useState<number[]>([1]);

  const activeSlide = TRAINING_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < TRAINING_SLIDES.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      if (!completedSlides.includes(TRAINING_SLIDES[nextIndex].id)) {
        setCompletedSlides([...completedSlides, TRAINING_SLIDES[nextIndex].id]);
      }
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleSelectQuiz = (optionIndex: number) => {
    setSelectedQuizAnswers({
      ...selectedQuizAnswers,
      [activeSlide.id]: optionIndex,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              CHART+ Master Operator Training Course
            </h1>
            <StatusBadge type="authoritative" label="Standard Curriculum" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Interactive, step-by-step operator training slide deck on how to use every capability of the CHART+ application.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 bg-secondary/50 border border-border px-4 py-2 rounded-xl text-xs font-mono">
          <span className="text-muted-foreground">Progress:</span>
          <span className="font-bold text-foreground">
            {completedSlides.length} / {TRAINING_SLIDES.length} Modules ({Math.round((completedSlides.length / TRAINING_SLIDES.length) * 100)}%)
          </span>
          <div className="w-20 bg-secondary rounded-full h-2 overflow-hidden border border-border">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(completedSlides.length / TRAINING_SLIDES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Slide Navigation Bar & Slide Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSlideIndex === 0}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-muted disabled:opacity-40 text-xs font-semibold text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
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
                    const isSelected = selectedQuizAnswers[activeSlide.id] === optIdx;
                    const isAnswered = selectedQuizAnswers[activeSlide.id] !== undefined;
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
                        onClick={() => handleSelectQuiz(optIdx)}
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

                {selectedQuizAnswers[activeSlide.id] !== undefined && (
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
            onClick={handlePrevious}
            disabled={currentSlideIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-muted disabled:opacity-40 text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Module
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentSlideIndex === TRAINING_SLIDES.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {currentSlideIndex === TRAINING_SLIDES.length - 1 ? "Course Complete" : "Next Module"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
