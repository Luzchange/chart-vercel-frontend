"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, CheckCircle2, ArrowRight, Play, Award } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COURSES = [
  {
    id: "TRN-101",
    title: "Chemical Agent Toxic Load & Probit Modeling Fundamentals",
    category: "Chemical Defense",
    duration: "45 mins",
    modulesCount: 4,
    description: "Deep dive into Haber's Law exponentiation, concentration-time non-linear toxic load L = C^n * T, and military probit percentile risk brackets.",
    completed: true,
  },
  {
    id: "TRN-102",
    title: "Operational Heat Stress, WBGT Tiers & Hydration Protocols",
    category: "Environmental Health",
    duration: "35 mins",
    modulesCount: 3,
    description: "Distinguishing measured vs model-estimated WBGT, clothing adjustment factors for MOPP gear, and work/rest cycle enforcement.",
    completed: false,
  },
  {
    id: "TRN-103",
    title: "Radiological Inverse Square Law & Allowable Stay-Time Decision Making",
    category: "Radiological Safety",
    duration: "40 mins",
    modulesCount: 4,
    description: "Distance decay calculations, ADM-300 instrumentation principles, and mission-essential stay time formulas under ALARA guidance.",
    completed: false,
  },
  {
    id: "TRN-104",
    title: "Biological Agent Identification & Risk Communication",
    category: "Biological Defense",
    duration: "30 mins",
    modulesCount: 3,
    description: "Survey of 27 CDC/DoD priority biological pathogens, incubation periods, clinical presentations, and respiratory PPE boundaries.",
    completed: false,
  },
];

export default function TrainingStudioPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Training & Education Studio
            </h1>
            <StatusBadge type="authoritative" label="OEH Curriculum" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Structured continuing education modules, interactive case simulations, and formula walkthroughs for certified OEH specialists.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="p-5 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {course.id} • {course.category}
                </span>
                {course.completed ? (
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {course.duration}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-foreground text-base">
                {course.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">
                {course.modulesCount} Interactive Lessons
              </span>

              <button
                type="button"
                onClick={() => alert(`Starting lesson module for ${course.id}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-xs font-semibold text-foreground border border-border transition-colors"
              >
                <Play className="w-3 h-3 text-primary fill-primary" />
                {course.completed ? "Review Module" : "Start Course"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
