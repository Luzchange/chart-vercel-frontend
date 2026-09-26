"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  ShieldAlert,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ReportsPage() {
  const [reportConfig, setReportConfig] = useState({
    includeExecutiveSummary: true,
    includeLocationContext: true,
    includeCalculations: true,
    includeWeather: true,
    includeRecommendations: true,
    includeAuditTrail: true,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const reportData = {
      reportId: "RPT-2026-0301-001",
      scenarioId: "SCN-2026-0042",
      title: "OEH Operational Decision Assessment & Heat Stress Report",
      generatedAt: new Date().toISOString(),
      appVersion: "C2RAT v1.0",
      calculationModelVersion: "C2RAT-VALIDATED-v1.0",
      location: "Joint Base Andrews (MD)",
      disclaimer:
        "C2RAT provides decision-support and educational information for qualified users. It does not replace official guidance, local safety policy, clinical judgment, emergency procedures, or authorized command direction.",
      summary:
        "Amber Flag conditions prevail. Outdoor physical exertion should follow a 40 min work / 20 min rest cycle with 0.75 qt/hr hydration. Airborne alpha particulate sampling remains within standard guidelines.",
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CHART_Plus_Report_${reportData.reportId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Hidden on print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Auditable Report Generator
            </h1>
            <StatusBadge type="authoritative" label="Print & PDF Ready" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Export compliant, audit-ready operational health dossiers with mathematical provenance and executive summaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary text-foreground text-xs sm:text-sm font-semibold hover:bg-muted border border-border"
          >
            <Download className="w-4 h-4 text-muted-foreground" />
            Export JSON
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Report Canvas / Document Preview */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 border border-slate-200 shadow-md rounded-xl p-8 sm:p-12 space-y-6 font-sans print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                C2RAT
              </span>
              <span className="text-xs uppercase font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                Official Report
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              CBRN Cell Health Risk Assessment Report
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Scenario: SCN-2026-0042 • Report ID: RPT-2026-0301-001
            </p>
          </div>

          <div className="text-right text-xs font-mono text-slate-600 space-y-0.5">
            <div>
              <span className="font-semibold">Generated:</span> 2026-03-01 10:30 UTC
            </div>
            <div>
              <span className="font-semibold">Engine Version:</span> C2RAT v1.0
            </div>
            <div>
              <span className="font-semibold">Model Provenance:</span> Validated Core (Original tool developed by Mike Golf)
            </div>
          </div>
        </div>

        {/* Mandatory Application Disclaimer */}
        <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-lg text-amber-900 text-xs space-y-1">
          <span className="font-bold block uppercase tracking-wider text-[11px]">
            Notice & Decision-Support Disclaimer:
          </span>
          <p className="text-[11px] leading-relaxed">
            C2RAT provides decision-support and educational information for qualified users. It does not replace official guidance, local safety policy, clinical judgment, emergency procedures, or authorized command direction.
          </p>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            1. Executive Plain-Language Summary
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Environmental conditions at Joint Base Andrews currently indicate an <strong>Amber Flag condition (WBGT 85.1°F)</strong>. Under moderate operational workloads, personnel must observe a mandatory <strong>40-minute work / 20-minute rest cycle</strong> per hour and maintain hydration at 0.75 quarts per hour. Concurrently evaluated perimeter alpha particulate air sampling (673.27 dpm/m³) necessitates <strong>Level C respiratory protection</strong> (M-series mask or HEPA respirator) for all personnel operating within the sampling perimeter.
          </p>
        </div>

        {/* Location & Meteorological Context */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            2. Installation Context & Meteorology
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Installation:</span>
              <span className="font-bold text-slate-900">Joint Base Andrews</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Ambient Temp:</span>
              <span className="font-bold text-slate-900">86°F (30.0°C)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Estimated WBGT:</span>
              <span className="font-bold text-amber-700">85.1°F (Amber Flag)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Wind / Humidity:</span>
              <span className="font-bold text-slate-900">7 mph / 65% RH</span>
            </div>
          </div>
        </div>

        {/* Validated Calculation Audits */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            3. Validated Mathematical Assessments
          </h3>
          <table className="w-full text-xs border border-slate-200 text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-2 border-b">Assessment Domain</th>
                <th className="p-2 border-b">Evaluated Hazard</th>
                <th className="p-2 border-b">Inputs & Units</th>
                <th className="p-2 border-b">Mathematical Output</th>
                <th className="p-2 border-b">Risk Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
              <tr>
                <td className="p-2 font-semibold">Airborne Radiological</td>
                <td className="p-2">Alpha Particulate</td>
                <td className="p-2">123 cfm, 8 min, 1325 cpm</td>
                <td className="p-2">673.27 dpm/m³</td>
                <td className="p-2 text-red-700 font-bold">&gt;20 dpm (Mask Req)</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Radiological Stay Time</td>
                <td className="p-2">Gamma Field</td>
                <td className="p-2">0.050 Rad OEG, 700/60 mR/hr</td>
                <td className="p-2">7.89 minutes (8 min)</td>
                <td className="p-2 text-emerald-700 font-bold">ALARA Compliant</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Operational Directives */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            4. Command & Safety Directives
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700">
            <li>Enforce mandatory work/rest cycle of 40 min work / 20 min rest per hour under OCP uniform.</li>
            <li>Mandatory hydration logs: 0.75 qt per person per hour; do not exceed 1.5 qt/hr.</li>
            <li>Establish exclusion perimeter where alpha activity exceeds 20 dpm/m³. Full-face respirators required.</li>
            <li>Maintain continuous communications with local bioenvironmental engineering / radiation safety officer.</li>
          </ul>
        </div>

        {/* Sign-off Block */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs font-mono">
          <div>
            <div className="border-b border-slate-400 pb-1 mb-1 text-slate-400">
              Evaluated By (Signature / Digital ID)
            </div>
            <span className="text-slate-600">Qualified OEH Specialist / Decision Officer</span>
          </div>
          <div>
            <div className="border-b border-slate-400 pb-1 mb-1 text-slate-400">
              Command Review (Signature / Digital ID)
            </div>
            <span className="text-slate-600">Incident Commander / Safety Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
}
