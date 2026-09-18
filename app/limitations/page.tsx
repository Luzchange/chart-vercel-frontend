import React from "react";
import {
  HelpCircle,
  AlertTriangle,
  BookOpen,
  Database,
  ShieldCheck,
  ExternalLink,
  Code2,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function LimitationsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Methodology, Limitations & Authoritative Sources
          </h1>
          <StatusBadge type="authoritative" label="Scientific Provenance" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Full technical disclosure of mathematical formulas, legacy workbook migration notes, non-negotiable safety boundaries, and external data sources.
        </p>
      </div>

      {/* Mandatory Safety Boundaries */}
      <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-900 dark:text-red-200 space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
          Non-Negotiable Safety & Ethical Boundaries
        </h2>
        <p className="text-xs leading-relaxed">
          CHART+ is strictly engineered for <strong>protective, educational, occupational-health, environmental-health, scenario documentation, and public-reference capabilities</strong>. It does NOT provide instructions for synthesizing, acquiring, weaponizing, optimizing, or dispersing chemical, biological, radiological, or nuclear materials. It contains no restricted operational defense information, troop deployment schedules, or classified facility layouts.
        </p>
        <p className="text-xs font-semibold">
          High-Consequence Application Notice: CHART+ provides decision-support and educational information for qualified users. It does not replace official guidance, local safety policy, clinical judgment, emergency procedures, or authorized command direction.
        </p>
      </div>

      {/* Legacy Workbook Migration Provenance */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Legacy Workbook Migration & Parity Verification
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The calculation algorithms in CHART+ were extracted and reverse-engineered directly from <code>CHART_2018 January.xlsm.xlsx</code>. Automated baseline test suites (<code>tests/calculations/baselines.test.ts</code>) continuously verify numerical parity against historical benchmark values:
        </p>

        {/* Legacy Basis Attribution */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-foreground text-xs space-y-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-bold uppercase tracking-wider text-primary">
              Legacy Model Attribution & Historical Basis:
            </span>
          </div>
          <p className="leading-relaxed">
            The original <strong>Chemical Hazard Assessment and Risk Tool (CHART)</strong>, its core toxic load algorithms, and the legacy analytical spreadsheets were conceived, engineered, and validated by <strong>Mike Golf</strong> (validated January 2018). CHART+ preserves full mathematical fidelity with Mike Golf's foundational calculations while modernizing the platform into a secure, responsive, offline-first Progressive Web Application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-secondary/40 p-4 rounded-lg border border-border space-y-2">
            <h3 className="font-bold text-foreground">Chemical Warfare Agent Toxic Load</h3>
            <p className="text-muted-foreground">
              Governing Equation: {"L = C^n * T"}<br />
              Percentile Dosages: {"(C^n T)_XX = (C^n T)_50 * 10^((n * Z) / b)"}<br />
              Probit Slopes: {"b = 12"} for G-series lethality/severe; {"b = 6"} for VX; {"b = 5"} for Mustard inhalation.
            </p>
          </div>

          <div className="bg-secondary/40 p-4 rounded-lg border border-border space-y-2">
            <h3 className="font-bold text-foreground">Radiological Decay & Stay Time</h3>
            <p className="text-muted-foreground">
              Inverse Square: {"I_2 = I_1 * (d_1 / d_2)^2"}<br />
              Stay Time: {"T_stay = (D_allowable / I_avg) * 60"}<br />
              Airborne Rad: {"A = (Net CPM / η) / V_m3"} with 20 dpm/m³ respiratory threshold.
            </p>
          </div>
        </div>

        {/* Known Workbook Anomalies */}
        <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1">
          <span className="font-bold block">Legacy Workbook Anomalies Resolved:</span>
          <p className="text-[11px] leading-relaxed">
            Inspection of the legacy 2018 Excel file revealed broken formulas (<code>#REF!</code> errors in cells C23–C28 of the 'Instruction' sheet) due to unlinked temperature cell references. CHART+ resolves these by implementing strict, strongly-typed physical conversion pipelines with bidirectional verification (°F ↔ °C ↔ K).
          </p>
        </div>
      </div>

      {/* Directory of External Data Sources */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Authoritative Data Source Directory
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-border">
            <thead className="bg-secondary/60 text-muted-foreground uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3 border-b border-border">Source Domain</th>
                <th className="p-3 border-b border-border">Agency / Institution</th>
                <th className="p-3 border-b border-border">Cadence / Freshness</th>
                <th className="p-3 border-b border-border">Offline Fallback</th>
                <th className="p-3 border-b border-border">Licensing / Terms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              <tr>
                <td className="p-3 font-semibold">Meteorology & Alerts</td>
                <td className="p-3">NOAA National Weather Service (api.weather.gov)</td>
                <td className="p-3 font-mono">Real-time (Hourly)</td>
                <td className="p-3 text-muted-foreground">Cached grid + manual override</td>
                <td className="p-3 text-muted-foreground">US Public Domain</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Hazard Toxicology</td>
                <td className="p-3">CDC / NIOSH Pocket Guide & USAMRIID/USAMRICD</td>
                <td className="p-3 font-mono">Quarterly Review</td>
                <td className="p-3 text-muted-foreground">Local JSON library</td>
                <td className="p-3 text-muted-foreground">US Public Domain</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Heat Stress (WBGT)</td>
                <td className="p-3">TB MED 507 / OSHA Heat Guidelines</td>
                <td className="p-3 font-mono">Doctrine Versioned</td>
                <td className="p-3 text-muted-foreground">Deterministic offline engine</td>
                <td className="p-3 text-muted-foreground">Official Guidance</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Geospatial / Context</td>
                <td className="p-3">DoD Public Installation Reference</td>
                <td className="p-3 font-mono">Curated 2026</td>
                <td className="p-3 text-muted-foreground">Full offline bundle</td>
                <td className="p-3 text-muted-foreground">Public Reference</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
