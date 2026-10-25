"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  CheckCircle2,
  RefreshCw
} from "lucide-react";

interface YearStat {
  year: string;
  spread: number;
  participants: number;
  events: number;
  status: string;
  label: string;
}

interface ImpactData {
  cumulativeTotal: number;
  currentYear: string;
  currentYearSpread: number;
  currentYearParticipants: number;
  currentYearEvents: number;
  growthPercent: number;
  years: YearStat[];
  updatedAt: string;
  fallback?: boolean;
}

const DEFAULT_DATA: ImpactData = {
  cumulativeTotal: 31202,
  currentYear: "2026",
  currentYearSpread: 22002,
  currentYearParticipants: 512,
  currentYearEvents: 21,
  growthPercent: 139,
  years: [
    {
      year: "2025",
      spread: 9200,
      participants: 280,
      events: 18,
      status: "Slutfört",
      label: "Effektrapport 2025",
    },
    {
      year: "2026",
      spread: 22002,
      participants: 512,
      events: 21,
      status: "Pågående",
      label: "Hittills under 2026",
    },
  ],
  updatedAt: new Date().toISOString(),
};

export function ImpactTracker() {
  const [data, setData] = useState<ImpactData>(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState<"cumulative" | "yearly">("cumulative");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadImpact() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/impact");
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setData(json);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic impact data, using fallback:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadImpact();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("sv-SE").format(num);
  };

  return (
    <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="bg-gradient-to-b from-brand-sand via-white to-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden">
        
        {/* Top Badges & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBE8DC]">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-dustyPurple/10 text-brand-dustyPurple text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vår räckvidd & effekt</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dustyTurquoise/15 text-[#1B6465] text-xs font-semibold">
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>Synkad med evenemangslogg</span>
            </div>
          </div>

          {/* Toggle between cumulative milestone and yearly comparison */}
          <div className="inline-flex p-1 bg-brand-sand border border-[#E3DFC9] rounded-full self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("cumulative")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "cumulative"
                  ? "bg-brand-dustyPurple text-white shadow-xs"
                  : "text-brand-darkGrey hover:text-brand-dark"
              }`}
            >
              Totalt sedan start
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "yearly"
                  ? "bg-brand-dustyPurple text-white shadow-xs"
                  : "text-brand-darkGrey hover:text-brand-dark"
              }`}
            >
              År för år
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "cumulative" ? (
          /* CUMULATIVE VIEW - Shows continuous all-time milestone that NEVER decreases */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-cardo text-brand-dark tracking-tight">
                Över <span className="text-brand-dustyPurple">{formatNumber(data.cumulativeTotal)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-brand-dark">
                barn och unga har fått ta del av Skolyoga
              </h2>
              <p className="text-base sm:text-lg text-brand-darkGrey max-w-2xl mx-auto leading-relaxed">
                Varje utbildad pedagog tar med sig verktygen direkt till sina klasser och barngrupper. 
                Tack vare det sprids evidensbaserade mikropauser och lugn som ringar på vattnet.
              </p>
            </div>

            {/* 3 Metric Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyTurquoise">
                  Spridning i år ({data.currentYear})
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatNumber(data.currentYearSpread)}
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Uppskattad spridning till elever hittills i år
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-amber-700">
                  Utbildade pedagoger
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatNumber(data.currentYearParticipants)} st
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Lärare och skolpersonal under {data.currentYear}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPink">
                  Genomförda insatser
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {data.currentYearEvents} st
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Workshops, webinarier och fortbildningar
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* YEARLY VIEW - Shows progression year-over-year so user sees growth and transparent year progression */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                Skolyogas spridning år för år
              </h2>
              <p className="text-base text-brand-darkGrey leading-relaxed">
                När vi utbildar pedagoger mäts spridningen genom en etablerad schablonberäkning: varje utbildad pedagog möter i snitt 15–100 barn och unga per läsår.
              </p>
            </div>

            {/* Year Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Year 2025 Card */}
              <div className="bg-white rounded-2xl border border-[#E3DFC9] p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-cardo text-brand-dark">2025</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                    Slutfört kalenderår
                  </span>
                </div>
                <div>
                  <div className="text-4xl font-bold font-cardo text-brand-dark">
                    9 200
                  </div>
                  <div className="text-xs text-brand-darkGrey mt-1">
                    Barn och unga som nåddes av Skolyoga
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EBE8DC] text-xs text-brand-darkGrey space-y-1">
                  <div>✓ Fastställt i officiell Effektrapport 2025</div>
                  <div>✓ Insatser genomförda i skolor och förskolor</div>
                </div>
              </div>

              {/* Year 2026 Card (Live from Google Sheets) */}
              <div className="bg-white rounded-2xl border-2 border-brand-dustyPurple/30 p-7 shadow-sm space-y-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-cardo text-brand-dark">{data.currentYear}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-dustyPurple text-white">
                    Pågående verksamhetsår
                  </span>
                </div>
                <div>
                  <div className="text-4xl font-bold font-cardo text-brand-dustyPurple">
                    {formatNumber(data.currentYearSpread)}
                  </div>
                  <div className="text-xs text-brand-darkGrey mt-1">
                    Uppskattad spridning till barn och unga hittills
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EBE8DC] text-xs text-brand-darkGrey space-y-1">
                  <div className="font-semibold text-brand-dark">
                    🌱 +{data.growthPercent}% räckviddsökning jämfört med 2025!
                  </div>
                  <div>
                    • <strong>{formatNumber(data.currentYearParticipants)}</strong> pedagoger & lärare utbildade
                  </div>
                  <div>
                    • <strong>{data.currentYearEvents}</strong> genomförda workshops, mässor & webinarier
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="pt-8 mt-8 border-t border-[#EBE8DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-darkGrey">
          <p className="text-center sm:text-left">
            Spridningssiffrorna beräknas enligt Skolyogas schablonmodell och uppdateras löpande från genomförda workshops.
          </p>
          <a
            href="/documents/Skolyoga-Effektrapport-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-dustyPurple hover:underline shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Läs Effektrapporten (PDF)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
