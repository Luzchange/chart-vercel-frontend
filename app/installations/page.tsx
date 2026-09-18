"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Shield,
  Building,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface InstallationItem {
  id: string;
  name: string;
  branch: "Air Force" | "Army" | "Navy" | "Marine Corps" | "Joint";
  state: string;
  lat: number;
  lng: number;
  nwsOffice: string;
  elevationFt: number;
  publicUrl: string;
}

const INSTALLATIONS_DATA: InstallationItem[] = [
  {
    id: "INST-01",
    name: "Joint Base Andrews",
    branch: "Joint",
    state: "MD",
    lat: 38.8109,
    lng: -76.867,
    nwsOffice: "LWX (Baltimore/Washington)",
    elevationFt: 280,
    publicUrl: "https://www.jba.af.mil/",
  },
  {
    id: "INST-02",
    name: "Fort Liberty",
    branch: "Army",
    state: "NC",
    lat: 35.139,
    lng: -79.006,
    nwsOffice: "RAH (Raleigh, NC)",
    elevationFt: 250,
    publicUrl: "https://home.army.mil/liberty/",
  },
  {
    id: "INST-03",
    name: "Wright-Patterson Air Force Base",
    branch: "Air Force",
    state: "OH",
    lat: 39.8137,
    lng: -84.0494,
    nwsOffice: "ILN (Wilmington, OH)",
    elevationFt: 823,
    publicUrl: "https://www.wpafb.af.mil/",
  },
  {
    id: "INST-04",
    name: "Naval Station Norfolk",
    branch: "Navy",
    state: "VA",
    lat: 36.9458,
    lng: -76.3013,
    nwsOffice: "AKQ (Wakefield, VA)",
    elevationFt: 15,
    publicUrl: "https://cnrma.cnic.navy.mil/Installations/NAVSTA-Norfolk/",
  },
  {
    id: "INST-05",
    name: "Camp Pendleton",
    branch: "Marine Corps",
    state: "CA",
    lat: 33.35,
    lng: -117.43,
    nwsOffice: "SGX (San Diego, CA)",
    elevationFt: 75,
    publicUrl: "https://www.pendleton.marines.mil/",
  },
  {
    id: "INST-06",
    name: "Fort Cavazos",
    branch: "Army",
    state: "TX",
    lat: 31.135,
    lng: -97.776,
    nwsOffice: "FWD (Fort Worth, TX)",
    elevationFt: 920,
    publicUrl: "https://home.army.mil/cavazos/",
  },
];

export default function InstallationsPage() {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [activeBaseId, setActiveBaseId] = useState("INST-01");

  const filtered = INSTALLATIONS_DATA.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.state.toLowerCase().includes(search.toLowerCase());
    const matchBranch = selectedBranch === "all" || item.branch === selectedBranch;
    return matchSearch && matchBranch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Public Installation Directory
            </h1>
            <StatusBadge type="authoritative" label="Official DoD Public Ref" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Curated directory of public military installations for localized weather grids, NWS alerts, and environmental context.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search base by name or state code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs sm:text-sm font-semibold"
        >
          <option value="all">All Service Branches</option>
          <option value="Joint">Joint Base</option>
          <option value="Air Force">Air Force</option>
          <option value="Army">Army</option>
          <option value="Navy">Navy</option>
          <option value="Marine Corps">Marine Corps</option>
        </select>
      </div>

      {/* Base Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((base) => {
          const isActive = base.id === activeBaseId;

          return (
            <div
              key={base.id}
              className={`p-5 rounded-xl border bg-card shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                isActive ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">
                    {base.branch} • {base.state}
                  </span>
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active Context
                    </span>
                  ) : null}
                </div>

                <h3 className="font-bold text-foreground text-base">
                  {base.name}
                </h3>

                <div className="space-y-1 font-mono text-xs text-muted-foreground pt-1">
                  <div className="flex justify-between">
                    <span>Coordinates:</span>
                    <span className="text-foreground">
                      {base.lat.toFixed(4)}° N, {Math.abs(base.lng).toFixed(4)}° W
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>NWS Grid Office:</span>
                    <span className="text-foreground">{base.nwsOffice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elevation:</span>
                    <span className="text-foreground">{base.elevationFt} ft MSL</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <a
                  href={base.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
                >
                  Public Website <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveBaseId(base.id)}
                  disabled={isActive}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/20 text-primary cursor-default"
                      : "bg-secondary hover:bg-muted text-foreground border border-border"
                  }`}
                >
                  {isActive ? "Selected" : "Set as Active Base"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
