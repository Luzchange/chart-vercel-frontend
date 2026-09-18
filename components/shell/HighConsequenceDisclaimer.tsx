import React from "react";
import { AlertCircle } from "lucide-react";

export function HighConsequenceDisclaimer() {
  return (
    <aside
      aria-label="High-Consequence Application Disclaimer"
      className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-900 dark:text-amber-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <p className="font-medium">
            <span className="font-semibold uppercase tracking-wider text-[11px] mr-1.5 px-1 py-0.5 rounded bg-amber-500/20">
              Notice
            </span>
            CHART+ provides decision-support and educational information for qualified users. It does not replace official guidance, local safety policy, clinical judgment, emergency procedures, or authorized command direction.
          </p>
        </div>
        <span className="hidden md:inline-block text-[11px] opacity-75 font-mono">
          Ref: DoD / NIOSH / OSHA OEH Standards
        </span>
      </div>
    </aside>
  );
}
