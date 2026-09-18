"use client";

import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  Globe2,
  Eye,
  Maximize2,
  Navigation,
  Shield,
  Building2,
} from "lucide-react";
import { GlobalLocationRecord } from "@/lib/data/locations";

interface GoogleBaseMapProps {
  location: GlobalLocationRecord;
  className?: string;
}

export function GoogleBaseMap({ location, className = "" }: GoogleBaseMapProps) {
  // Map mode: 'k' = satellite/aerial, 'm' = roadmap, 'p' = terrain
  const [mapMode, setMapMode] = useState<"k" | "m" | "p">("k");
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [showHud, setShowHud] = useState<boolean>(true);

  // Google Maps embed URL
  const embedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=${zoomLevel}&t=${mapMode}&output=embed`;

  // External URLs
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location.name
  )}+${location.lat},${location.lng}`;
  const googleEarthUrl = `https://earth.google.com/web/search/${location.lat},${location.lng}`;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 19));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 4));

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-border bg-slate-950 shadow-xl ${className}`}
    >
      {/* Top Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Location Header Pill */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-lg">
          {location.type === "military_base" ? (
            <Shield className="w-4 h-4 text-emerald-400" />
          ) : (
            <Building2 className="w-4 h-4 text-blue-400" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                {location.name}
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded border border-slate-700">
                {location.region}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 block">
              {location.stateOrProvince}, {location.country}
            </span>
          </div>
        </div>

        {/* View Mode & Map Type Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1 rounded-xl shadow-lg">
          <button
            type="button"
            onClick={() => setMapMode("k")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              mapMode === "k"
                ? "bg-primary text-primary-foreground shadow"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="High-resolution Satellite Imagery"
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => setMapMode("m")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              mapMode === "m"
                ? "bg-primary text-primary-foreground shadow"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Roadmap & Vector Cartography"
          >
            Roadmap
          </button>
          <button
            type="button"
            onClick={() => setMapMode("p")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              mapMode === "p"
                ? "bg-primary text-primary-foreground shadow"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Topographic Terrain"
          >
            Terrain
          </button>
        </div>
      </div>

      {/* Embedded Google Map Iframe */}
      <div className="relative w-full h-[440px] sm:h-[480px] bg-slate-900">
        <iframe
          key={`${location.id}-${mapMode}-${zoomLevel}`}
          title={`Google Map - ${location.name}`}
          src={embedUrl}
          className="w-full h-full border-0 filter contrast-[1.05]"
          loading="lazy"
          allowFullScreen
        />

        {/* Subtle Target Crosshair in Center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
          <div className="w-12 h-12 rounded-full border border-dashed border-emerald-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
        </div>
      </div>

      {/* Floating Tactical Zoom & Tools Panel (Right Side) */}
      <div className="absolute top-20 right-3 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-lg transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-lg transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setShowHud(!showHud)}
          className={`p-2 rounded-xl border border-slate-700/80 shadow-lg transition-all ${
            showHud ? "bg-primary text-primary-foreground" : "bg-slate-900/90 text-slate-300 hover:bg-slate-800"
          }`}
          title="Toggle Geospatial HUD"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Geospatial HUD Bar */}
      {showHud && (
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-slate-950/90 backdrop-blur-md border border-slate-800/90 p-3 rounded-xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Latitude / Longitude
              </span>
              <span className="font-semibold text-emerald-400">
                {location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° E
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Elevation MSL
              </span>
              <span className="font-semibold text-slate-200">
                {location.elevationFt} ft ({Math.round(location.elevationFt * 0.3048)} m)
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Weather Station
              </span>
              <span className="font-semibold text-slate-200">
                {location.weatherStation}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Security Profile
              </span>
              <span className="font-semibold text-amber-300 truncate max-w-[140px] block">
                {location.securityTier}
              </span>
            </div>
          </div>

          {/* Direct Launch Actions */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <a
              href={googleEarthUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 text-[11px] font-sans font-semibold transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5" />
              Google Earth 3D
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-[11px] font-sans font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              Full Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
