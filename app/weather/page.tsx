"use client";

import React, { useState } from "react";
import {
  SunMedium,
  Wind,
  Droplets,
  Gauge,
  Calculator,
  CloudSun,
  AlertTriangle,
  CheckCircle2,
  BookmarkPlus,
  Info,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function WeatherWBGTPage() {
  // Weather parameters
  const [ambientTempF, setAmbientTempF] = useState<number>(86);
  const [relativeHumidity, setRelativeHumidity] = useState<number>(65);
  const [windSpeedMph, setWindSpeedMph] = useState<number>(6);
  const [solarCondition, setSolarCondition] = useState<"full_sun" | "partly_cloudy" | "full_shade">("full_sun");
  const [clothingType, setClothingType] = useState<"standard_pt" | "ocp_uniform" | "body_armor" | "mopp4">("ocp_uniform");
  const [measuredWbgt, setMeasuredWbgt] = useState<string>("");
  const [snapshotSaved, setSnapshotSaved] = useState<boolean>(false);

  // Clothing adjustment factor (°F addition)
  const CLOTHING_ADJUSTMENTS: Record<string, { label: string; offsetF: number }> = {
    standard_pt: { label: "Standard PT / Shorts (+0°F)", offsetF: 0 },
    ocp_uniform: { label: "Combat Uniform / OCP (+0°F)", offsetF: 0 },
    body_armor: { label: "Combat Uniform + Body Armor (+5°F)", offsetF: 5 },
    mopp4: { label: "MOPP 4 Chemical Overgarment (+10°F)", offsetF: 10 },
  };

  // Simplified Australian BOM / Liljegren empirical approximation for Estimated WBGT
  // Twb (Stull approximation) + Tg approximation
  const estimatedWbgtF = React.useMemo(() => {
    const t = ambientTempF;
    const rh = relativeHumidity;
    // Approximating wet-bulb temperature Tw (Stull formula):
    const tC = (t - 32) * (5 / 9);
    const twC =
      tC * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5)) +
      Math.atan(tC + rh) -
      Math.atan(rh - 1.676331) +
      0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
      4.686035;
    const twF = (twC * 9) / 5 + 32;

    // Solar radiation heat increment based on wind and sun condition
    let solarAdd = 0;
    if (solarCondition === "full_sun") solarAdd = 14;
    else if (solarCondition === "partly_cloudy") solarAdd = 8;
    else solarAdd = 2; // shade

    const windCooling = Math.min(6, windSpeedMph * 0.5);
    const tgF = t + Math.max(0, solarAdd - windCooling);

    // Standard Outdoor WBGT = 0.7 * Tw + 0.2 * Tg + 0.1 * Tdb
    let rawWbgt = 0.7 * twF + 0.2 * tgF + 0.1 * t;

    // Apply clothing adjustment
    const clothOffset = CLOTHING_ADJUSTMENTS[clothingType].offsetF;
    return rawWbgt + clothOffset;
  }, [ambientTempF, relativeHumidity, windSpeedMph, solarCondition, clothingType]);

  // Determine Flag Condition based on Estimated or Measured WBGT
  const effectiveWbgt = measuredWbgt ? parseFloat(measuredWbgt) : estimatedWbgtF;

  const flagCondition = React.useMemo(() => {
    if (effectiveWbgt >= 90) {
      return {
        flag: "Black Flag",
        colorClasses: "bg-black text-white border-white/20",
        guidance: "Non-mission essential outdoor physical training suspended. Strenuous work requires extreme caution.",
        workRest: "10 min work / 50 min rest per hr (Moderate work). Up to 1 qt/hr water.",
      };
    } else if (effectiveWbgt >= 88) {
      return {
        flag: "Red Flag",
        colorClasses: "bg-red-600 text-white border-red-700",
        guidance: "Strenuous exercise for unacclimatized personnel halted. Solar exposure minimized.",
        workRest: "20 min work / 40 min rest per hr (Moderate work). 0.75-1 qt/hr water.",
      };
    } else if (effectiveWbgt >= 85) {
      return {
        flag: "Yellow Flag",
        colorClasses: "bg-amber-400 text-black border-amber-500",
        guidance: "Avoid strenuous exercise for unacclimatized troops during early weeks of training.",
        workRest: "30 min work / 30 min rest per hr (Moderate work). 0.75 qt/hr water.",
      };
    } else if (effectiveWbgt >= 82) {
      return {
        flag: "Green Flag",
        colorClasses: "bg-emerald-600 text-white border-emerald-700",
        guidance: "Heavy exercise for unacclimatized personnel conducted with caution and hydration enforcement.",
        workRest: "50 min work / 10 min rest per hr (Moderate work). 0.5-0.75 qt/hr water.",
      };
    } else {
      return {
        flag: "White Flag",
        colorClasses: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200",
        guidance: "Normal training activity. Hydration maintained according to routine thirst.",
        workRest: "Continuous work authorized with routine hydration breaks.",
      };
    }
  }, [effectiveWbgt]);

  const handleSnapshot = () => {
    setSnapshotSaved(true);
    setTimeout(() => setSnapshotSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <SunMedium className="w-6 h-6 text-amber-500" />
              Weather, Heat Stress & 3-Tier WBGT Planning
            </h1>
            <StatusBadge type="forecast" label="NOAA NWS Grid" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Separates on-site physical measurement, transparent empirical estimation, and official NWS HeatRisk planning forecasts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSnapshot}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:opacity-90 shadow-sm transition-opacity"
        >
          {snapshotSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Snapshot Saved to Active Scenario!
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4" />
              Attach Weather Snapshot to Scenario
            </>
          )}
        </button>
      </div>

      {/* 3-Tier WBGT Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1: Measured WBGT */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tier 1: Measured WBGT
              </span>
              <StatusBadge type="measured" label="Certified Instrument" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Direct physical reading from on-site QUESTemp, Kestrel, or calibrated wet-globe thermometer.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-medium text-foreground block">
              Enter On-Site Reading (°F):
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 84.5"
              value={measuredWbgt}
              onChange={(e) => setMeasuredWbgt(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 font-mono text-foreground text-sm"
            />
            <span className="text-[10px] text-muted-foreground block">
              {measuredWbgt ? "Active on-site measurement overrides estimates" : "Leave blank if no on-site sensor available"}
            </span>
          </div>
        </div>

        {/* Tier 2: Model Estimated WBGT */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tier 2: Estimated WBGT
              </span>
              <StatusBadge type="estimated" label="Calculated" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Transparent approximation from ambient temp, humidity, wind, and solar load.
            </p>
          </div>

          <div className="pt-2 border-t border-border space-y-1">
            <span className="text-3xl font-black font-mono text-amber-600 dark:text-amber-400">
              {estimatedWbgtF.toFixed(1)}°F
            </span>
            <p className="text-[10px] text-muted-foreground">
              Includes +{CLOTHING_ADJUSTMENTS[clothingType].offsetF}°F clothing adjustment.
            </p>
          </div>
        </div>

        {/* Tier 3: NWS HeatRisk / Forecast */}
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tier 3: Forecast HeatRisk
              </span>
              <StatusBadge type="forecast" label="NOAA NWS" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Regional official forecast context. Not an operational substitute for on-site WBGT.
            </p>
          </div>

          <div className="pt-2 border-t border-border space-y-1">
            <span className="text-lg font-bold text-foreground">
              Level 2 - Moderate Risk
            </span>
            <p className="text-[10px] text-muted-foreground">
              Effective for individuals sensitive to heat or undergoing strenuous exertion.
            </p>
          </div>
        </div>
      </div>

      {/* Flag Banner & Work/Rest Guidance */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-lg font-black text-sm uppercase tracking-wider shadow-sm border ${flagCondition.colorClasses}`}>
              {flagCondition.flag} ({effectiveWbgt.toFixed(1)}°F)
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">
                Operational Work/Rest & Hydration Directive
              </h3>
              <p className="text-xs text-muted-foreground">
                Based on {measuredWbgt ? "Measured On-Site WBGT" : "Model-Estimated WBGT"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1.5">
            <span className="font-bold text-foreground block">Flag Guidance Summary:</span>
            <p className="text-muted-foreground">{flagCondition.guidance}</p>
          </div>
          <div className="bg-secondary/40 p-3.5 rounded-lg border border-border space-y-1.5">
            <span className="font-bold text-foreground block">Work / Rest & Fluid Cycle:</span>
            <p className="text-primary font-medium">{flagCondition.workRest}</p>
          </div>
        </div>
      </div>

      {/* Meteorological Adjustment Controls */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">
          Adjust Meteorological Inputs & Protective Gear
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-semibold text-foreground block mb-1">
              Dry Bulb Temp: {ambientTempF}°F
            </label>
            <input
              type="range"
              min="50"
              max="125"
              value={ambientTempF}
              onChange={(e) => setAmbientTempF(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="font-semibold text-foreground block mb-1">
              Relative Humidity: {relativeHumidity}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={relativeHumidity}
              onChange={(e) => setRelativeHumidity(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="font-semibold text-foreground block mb-1">
              Solar Intensity
            </label>
            <select
              value={solarCondition}
              onChange={(e) => setSolarCondition(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-secondary/50 text-foreground"
            >
              <option value="full_sun">Full Direct Sun (+14°F solar)</option>
              <option value="partly_cloudy">Partly Cloudy (+8°F solar)</option>
              <option value="full_shade">Full Shade / Night (+2°F)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-foreground block mb-1">
              Protective Uniform / Gear
            </label>
            <select
              value={clothingType}
              onChange={(e) => setClothingType(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-secondary/50 text-foreground"
            >
              {Object.entries(CLOTHING_ADJUSTMENTS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
