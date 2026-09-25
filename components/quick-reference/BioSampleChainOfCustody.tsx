"use client";

import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  Shield,
  Layers,
  ThermometerSnowflake,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

interface BioSample {
  sampleId: string;
  type: "Bio-Aerosol Filter" | "Surface Swab" | "Soil / Substrate" | "Liquid Water";
  locationMgrs: string;
  collectionTime: string;
  suspectedPathogen: string;
  storageTempC: number;
  custodian: string;
}

export function BioSampleChainOfCustody() {
  const [samples, setSamples] = useState<BioSample[]>([
    {
      sampleId: "BIO-2026-0924-001",
      type: "Bio-Aerosol Filter",
      locationMgrs: "38S LC 8492 1038 (Hangar 4 Roof)",
      collectionTime: "242200Z SEP 2026",
      suspectedPathogen: "Bacillus anthracis (Anthrax)",
      storageTempC: 4,
      custodian: "Capt J. Miller, Bioenvironmental Engineering",
    },
    {
      sampleId: "BIO-2026-0924-002",
      type: "Surface Swab",
      locationMgrs: "38S LC 8490 1035 (HVAC Air Intake)",
      collectionTime: "242230Z SEP 2026",
      suspectedPathogen: "Francisella tularensis (Tularemia)",
      storageTempC: -20,
      custodian: "MSgt R. Vance, CBRN Recon Team",
    },
  ]);

  // Form states for adding new sample
  const [newId, setNewId] = useState<string>(`BIO-${Date.now().toString().slice(-6)}`);
  const [newType, setNewType] = useState<"Bio-Aerosol Filter" | "Surface Swab" | "Soil / Substrate" | "Liquid Water">("Bio-Aerosol Filter");
  const [newLoc, setNewLoc] = useState<string>("38S LC 8495 1040");
  const [newPathogen, setNewPathogen] = useState<string>("Suspected Biological Aerosol");
  const [newTemp, setNewTemp] = useState<number>(4);
  const [newCustodian, setNewCustodian] = useState<string>("SSgt E. Davis, Sampling Tech");

  const [copied, setCopied] = useState<boolean>(false);

  const addSample = () => {
    setSamples([
      ...samples,
      {
        sampleId: newId,
        type: newType,
        locationMgrs: newLoc,
        collectionTime: new Date().toISOString().replace(/[-:T.]/g, "").slice(2, 10) + "Z",
        suspectedPathogen: newPathogen,
        storageTempC: newTemp,
        custodian: newCustodian,
      },
    ]);
    setNewId(`BIO-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const removeSample = (id: string) => {
    setSamples(samples.filter((s) => s.sampleId !== id));
  };

  const generateDd1911Text = () => {
    let out = `================================================================================
DEPARTMENT OF DEFENSE FORM DD-1911 / DA FORM 4137
MILITARY CHAIN OF CUSTODY & MATERIEL COURIER RECEIPT (CBRN SAMPLING)
================================================================================
TRANSFERRING COMMAND: 379th Expeditionary Medical Group / Bioenvironmental Engineering
RECEIVING COMMAND: USAMRIID / Reference Laboratory (Fort Detrick, MD)
SHIPPING CLASSIFICATION: UN 2814, Infectious Substance, Category A, 6.2
DATE GENERATED: ${new Date().toUTCString()}
--------------------------------------------------------------------------------
CHAIN OF CUSTODY SAMPLE LOG:
`;
    samples.forEach((s, idx) => {
      out += `\nITEM ${idx + 1}: [${s.sampleId}] - ${s.type}
  Location / MGRS: ${s.locationMgrs}
  Collection DTG: ${s.collectionTime}
  Suspected Agent: ${s.suspectedPathogen}
  Preservation Temperature: ${s.storageTempC}°C (Cold Chain Required)
  Current Custodian: ${s.custodian}
  Integrity Seal Status: INTACT (Tamper-evident security tape verified)
`;
    });

    out += `\n--------------------------------------------------------------------------------
COURIER SIGNATURE / RECEIPT STATEMENT:
I certify that I have received the listed Category A biological samples in good condition,
sealed with tamper-evident security tape, packed in accordance with IATA Packing Instruction 620,
and maintained under required cold chain conditions.

Transferor Signature: _______________________ Date/Time: _______________
Transferee Signature: _______________________ Date/Time: _______________
================================================================================`;
    return out;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDd1911Text());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateDd1911Text();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DD1911_Bio_Chain_of_Custody_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Biological Sample Collection & Chain-of-Custody (DD Form 1911 / DA 4137)
            </h2>
            <p className="text-xs text-muted-foreground">
              Aerosol Filter, Surface Swab, & Environmental Substrate Sampling Protocols with UN 2814 Category A Triple Packaging Logging
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied Form!" : "Copy DD Form 1911"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-xs font-semibold text-foreground hover:bg-secondary"
          >
            <Download className="w-3.5 h-3.5" /> Export Custody Log
          </button>
        </div>
      </div>

      {/* Field Sampling Protocol Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bio-Aerosol Protocol */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-teal-400 font-bold">
            <Layers className="w-4 h-4" />
            <h4>Bio-Aerosol Particulate Protocol</h4>
          </div>
          <ul className="space-y-1.5 text-[11px] text-muted-foreground">
            <li>• Use dry 47mm polyester/PTFE filter cassette or liquid impinger at 12–20 L/min flow.</li>
            <li>• Minimum sampling duration: 15–30 minutes for low-titer biological plumes.</li>
            <li>• Remove filter using sterile forceps; place into sterile Falcon tube with 5 mL PBS buffer.</li>
            <li>• Maintain at 2°C to 8°C during transit (wet ice packs; avoid freezing live bacteria).</li>
          </ul>
        </div>

        {/* Surface Swab Protocol */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Shield className="w-4 h-4" />
            <h4>Surface Swab Protocol</h4>
          </div>
          <ul className="space-y-1.5 text-[11px] text-muted-foreground">
            <li>• Moisten sterile Dacron or polyester swab in sterile viral transport media (VTM) or PBS.</li>
            <li>• Swab 100 cm² surface using overlapping 'S' pattern while rotating swab shaft.</li>
            <li>• Snap swab shaft into transport vial; do not use calcium alginate or cotton swabs.</li>
            <li>• Seal vial cap with Parafilm and apply tamper-evident chain of custody barcode.</li>
          </ul>
        </div>

        {/* Triple Packaging UN 2814 */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <PackageCheck className="w-4 h-4" />
            <h4>UN 2814 Triple Packaging Standards</h4>
          </div>
          <ul className="space-y-1.5 text-[11px] text-muted-foreground">
            <li>• <strong>Primary Receptacle:</strong> Leakproof vial with screw-cap sealed by Parafilm.</li>
            <li>• <strong>Secondary Packaging:</strong> Certified leakproof envelope with absorbent material sufficient to absorb entire liquid volume.</li>
            <li>• <strong>Outer Packaging:</strong> Rigid insulated container labeled with UN 2814 Infectious Substance diamond and dry ice quantity (UN 1845) if applicable.</li>
          </ul>
        </div>
      </div>

      {/* Interactive Custody Roster Table */}
      <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Active Biological Sample Chain of Custody Log</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-muted-foreground">
            {samples.length} Samples Registered
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground text-[10px] uppercase">
                <th className="py-2 px-3">Sample ID</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Location / MGRS</th>
                <th className="py-2 px-3">DTG</th>
                <th className="py-2 px-3">Suspected Agent</th>
                <th className="py-2 px-3">Temp</th>
                <th className="py-2 px-3">Current Custodian</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {samples.map((s) => (
                <tr key={s.sampleId} className="hover:bg-muted/30">
                  <td className="py-2.5 px-3 font-bold text-primary">{s.sampleId}</td>
                  <td className="py-2.5 px-3 text-foreground">{s.type}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{s.locationMgrs}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{s.collectionTime}</td>
                  <td className="py-2.5 px-3 text-amber-400">{s.suspectedPathogen}</td>
                  <td className="py-2.5 px-3 font-bold">{s.storageTempC}°C</td>
                  <td className="py-2.5 px-3 text-muted-foreground truncate max-w-[180px]">{s.custodian}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => removeSample(s.sampleId)}
                      className="p-1 text-muted-foreground hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Sample Bar */}
        <div className="p-4 rounded-xl border border-border/60 bg-background/50 space-y-3">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-primary" /> Register New Biological Field Sample
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-muted-foreground">Sample ID</label>
              <input
                type="text"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Sample Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-foreground text-xs"
              >
                <option value="Bio-Aerosol Filter">Bio-Aerosol Filter</option>
                <option value="Surface Swab">Surface Swab</option>
                <option value="Soil / Substrate">Soil / Substrate</option>
                <option value="Liquid Water">Liquid Water</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Location (MGRS)</label>
              <input
                type="text"
                value={newLoc}
                onChange={(e) => setNewLoc(e.target.value)}
                className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Suspected Agent</label>
              <input
                type="text"
                value={newPathogen}
                onChange={(e) => setNewPathogen(e.target.value)}
                className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-foreground text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Storage Temp (°C)</label>
              <input
                type="number"
                value={newTemp}
                onChange={(e) => setNewTemp(parseInt(e.target.value) || 0)}
                className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-foreground font-mono text-xs"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addSample}
                className="w-full px-3 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Sample
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
