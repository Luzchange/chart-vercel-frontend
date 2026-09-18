import React from "react";
import {
  Gauge,
  Calculator,
  CloudSun,
  ShieldCheck,
  Radio,
  AlertTriangle,
  AlertOctagon,
  Clock,
  History,
} from "lucide-react";
import { clsx } from "clsx";

export type StatusDataType =
  | "measured"
  | "estimated"
  | "forecast"
  | "authoritative"
  | "public_signal"
  | "cached"
  | "expired"
  | "historical"
  | "warning"
  | "danger";

interface StatusBadgeProps {
  type: StatusDataType;
  label?: string;
  timestamp?: string;
  className?: string;
}

const BADGE_CONFIG: Record<
  StatusDataType,
  { defaultLabel: string; icon: React.ElementType; colorClasses: string }
> = {
  measured: {
    defaultLabel: "Measured (On-Site)",
    icon: Gauge,
    colorClasses: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
  estimated: {
    defaultLabel: "Model Estimated",
    icon: Calculator,
    colorClasses: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
  forecast: {
    defaultLabel: "NOAA/NWS Forecast",
    icon: CloudSun,
    colorClasses: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  },
  authoritative: {
    defaultLabel: "Authoritative Primary",
    icon: ShieldCheck,
    colorClasses: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  },
  public_signal: {
    defaultLabel: "Open Source Signal",
    icon: Radio,
    colorClasses: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30",
  },
  cached: {
    defaultLabel: "Cached Offline",
    icon: Clock,
    colorClasses: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  },
  expired: {
    defaultLabel: "Expired Data",
    icon: History,
    colorClasses: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
  },
  historical: {
    defaultLabel: "Legacy Historical",
    icon: History,
    colorClasses: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
  },
  warning: {
    defaultLabel: "Caution Flag",
    icon: AlertTriangle,
    colorClasses: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
  },
  danger: {
    defaultLabel: "Critical Hazard",
    icon: AlertOctagon,
    colorClasses: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30",
  },
};

export function StatusBadge({ type, label, timestamp, className }: StatusBadgeProps) {
  const config = BADGE_CONFIG[type];
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors",
        config.colorClasses,
        className
      )}
      role="status"
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      <span>{displayLabel}</span>
      {timestamp && (
        <span className="text-[10px] opacity-75 ml-1 border-l pl-1 border-current">
          {timestamp}
        </span>
      )}
    </span>
  );
}
