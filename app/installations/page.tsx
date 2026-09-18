"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Shield,
  Building2,
  Globe2,
  Compass,
  SunMedium,
  Radiation,
  FlaskConical,
  Eye,
  Plane,
  Target,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  GLOBAL_LOCATIONS,
  GlobalLocationRecord,
  LocationType,
  ServiceBranch,
  GeographicRegion,
} from "@/lib/data/locations";
import { GoogleBaseMap } from "@/components/maps/GoogleBaseMap";
import { CommanderDecisionMatrix } from "@/components/command/CommanderDecisionMatrix";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function InstallationsPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | LocationType>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeLocationId, setActiveLocationId] = useState<string>("BASE-01");
  const [activeBaseFeedback, setActiveBaseFeedback] = useState<string | null>(null);
  const [showCommanderMatrix, setShowCommanderMatrix] = useState<boolean>(true);

  // Active location record
  const activeLocation = useMemo(() => {
    return (
      GLOBAL_LOCATIONS.find((loc) => loc.id === activeLocationId) ||
      GLOBAL_LOCATIONS[0]
    );
  }, [activeLocationId]);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return GLOBAL_LOCATIONS.filter((item) => {
      const searchLower = search.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.country.toLowerCase().includes(searchLower) ||
        item.stateOrProvince.toLowerCase().includes(searchLower) ||
        item.weatherStation.toLowerCase().includes(searchLower) ||
        item.primaryMissionSets.some((m) => m.toLowerCase().includes(searchLower)) ||
        item.supportedAircraftSystems.some((a) => a.toLowerCase().includes(searchLower));

      const matchType = selectedType === "all" || item.type === selectedType;
      const matchBranch = selectedBranch === "all" || item.branch === selectedBranch;
      const matchRegion = selectedRegion === "all" || item.region === selectedRegion;

      return matchSearch && matchType && matchBranch && matchRegion;
    });
  }, [search, selectedType, selectedBranch, selectedRegion]);

  const handleSelectAsActive = (loc: GlobalLocationRecord) => {
    setActiveLocationId(loc.id);
    setActiveBaseFeedback(`Active Context Set to ${loc.name}`);
    setTimeout(() => setActiveBaseFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Global Bases & Diplomatic Posts Gazetteer
            </h1>
            <StatusBadge type="authoritative" label="Google Maps Integrated" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Directory of {GLOBAL_LOCATIONS.length} strategic military installations and diplomatic posts worldwide with supported aircraft platforms, mission sets, and threat-adaptive commander decision metrics.
          </p>
        </div>

        {activeBaseFeedback && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            {activeBaseFeedback}
          </div>
        )}
      </div>

      {/* Visual Google Maps Showcase Banner */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Interactive Satellite & Cartographic Display
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Target: <strong className="text-foreground">{activeLocation.name}</strong> ({activeLocation.lat.toFixed(4)}°, {activeLocation.lng.toFixed(4)}°)
          </span>
        </div>

        <GoogleBaseMap location={activeLocation} />
      </div>

      {/* Commander Decision Metrics Matrix (CDMM) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Commander Decision Support Engine
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowCommanderMatrix(!showCommanderMatrix)}
            className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            {showCommanderMatrix ? "Collapse Decision Matrix" : "Expand Decision Matrix"}
            {showCommanderMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showCommanderMatrix && (
          <CommanderDecisionMatrix
            location={activeLocation}
            chemicalThreatRisk="Low (<16%)"
            wbgtFlag="Yellow"
          />
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Text Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by base, aircraft (F-35, B-52, C-17), mission, host nation, or ICAO station code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-secondary/40 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Type Toggle: All / Military Bases / Diplomatic Posts */}
          <div className="flex rounded-lg border border-border bg-secondary/50 p-0.5">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({GLOBAL_LOCATIONS.length})
            </button>
            <button
              onClick={() => setSelectedType("military_base")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                selectedType === "military_base"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Bases (35)
            </button>
            <button
              onClick={() => setSelectedType("diplomatic_post")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                selectedType === "diplomatic_post"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Embassies (10)
            </button>
          </div>
        </div>

        {/* Secondary Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border text-xs">
          <div className="flex items-center gap-2">
            <label className="text-muted-foreground font-semibold whitespace-nowrap">
              Service / Agency:
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-foreground text-xs font-medium"
            >
              <option value="all">All Services & Agencies</option>
              <option value="Department of State">Department of State (Embassies)</option>
              <option value="Joint">Joint Bases / Combatant Commands</option>
              <option value="Air Force">U.S. Air Force</option>
              <option value="Army">U.S. Army</option>
              <option value="Navy">U.S. Navy</option>
              <option value="Marine Corps">U.S. Marine Corps</option>
              <option value="Space Force">U.S. Space Force</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-muted-foreground font-semibold whitespace-nowrap">
              Combatant Command Region:
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-foreground text-xs font-medium"
            >
              <option value="all">All Geographic Regions</option>
              <option value="CONUS">CONUS (Continental United States)</option>
              <option value="EUCOM">EUCOM (European Command)</option>
              <option value="INDOPACOM">INDOPACOM (Indo-Pacific Command)</option>
              <option value="CENTCOM">CENTCOM (Central Command)</option>
              <option value="AFRICOM">AFRICOM (Africa Command)</option>
              <option value="SOUTHCOM">SOUTHCOM (Southern Command)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((facility) => {
          const isTargeted = facility.id === activeLocationId;

          return (
            <div
              key={facility.id}
              onClick={() => setActiveLocationId(facility.id)}
              className={`p-5 rounded-2xl border bg-card shadow-sm flex flex-col justify-between space-y-4 transition-all cursor-pointer group ${
                isTargeted
                  ? "border-primary ring-2 ring-primary/20 shadow-md bg-primary/[0.02]"
                  : "border-border hover:border-primary/50 hover:bg-secondary/20"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {facility.type === "military_base" ? (
                      <Shield className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Building2 className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="text-xs font-mono font-semibold text-muted-foreground uppercase">
                      {facility.branch}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase font-bold border border-border">
                    {facility.region}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                    <span>
                      {facility.stateOrProvince}, {facility.country}
                    </span>
                  </p>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {facility.description}
                </p>

                {/* Mission Sets */}
                {facility.primaryMissionSets && facility.primaryMissionSets.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Primary Mission Sets:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {facility.primaryMissionSets.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium border border-border"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supported Aircraft / Systems */}
                {facility.supportedAircraftSystems && facility.supportedAircraftSystems.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Plane className="w-3 h-3 text-primary" />
                      Supported Aircraft & Platforms:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {facility.supportedAircraftSystems.map((ac, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-semibold border border-primary/20"
                        >
                          {ac}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Runway / Harbor Specs */}
                {facility.runwayOrPortSpecs && (
                  <div className="text-[11px] font-mono text-muted-foreground bg-secondary/30 p-2 rounded-lg border border-border">
                    <span className="opacity-75 block text-[10px]">Airfield / Harbor:</span>
                    <span className="text-foreground font-medium">{facility.runwayOrPortSpecs}</span>
                  </div>
                )}

                {/* Geospatial Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border font-mono text-[11px] text-muted-foreground">
                  <div>
                    <span className="text-[10px] block opacity-75">Coordinates:</span>
                    <span className="text-foreground font-semibold">
                      {facility.lat.toFixed(2)}° N, {facility.lng.toFixed(2)}°
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] block opacity-75">Weather Station:</span>
                    <span className="text-foreground font-semibold">
                      {facility.weatherStation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLocationId(facility.id);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Target on Map & Matrix
                  </button>

                  <a
                    href={facility.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
                  >
                    Official Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAsActive(facility);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                      isTargeted
                        ? "bg-primary text-primary-foreground shadow"
                        : "bg-secondary hover:bg-muted text-foreground border border-border"
                    }`}
                  >
                    {isTargeted ? "Active Selection" : "Set Active"}
                  </button>

                  <Link
                    href="/weather"
                    onClick={(e) => e.stopPropagation()}
                    title="Check Local WBGT & Weather"
                    className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SunMedium className="w-4 h-4 text-amber-500" />
                  </Link>

                  <Link
                    href="/assess/chemical"
                    onClick={(e) => e.stopPropagation()}
                    title="Launch Exposure Assessment"
                    className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FlaskConical className="w-4 h-4 text-emerald-500" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
