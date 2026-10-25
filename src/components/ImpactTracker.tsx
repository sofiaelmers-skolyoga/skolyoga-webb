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
  RefreshCw,
  Award,
  History
} from "lucide-react";

interface YearStat {
  year: string;
  spread: number;
  participants: number;
  events: number;
  status: string;
  label: string;
  notes: string;
}

interface ImpactData {
  allTimeTotal: number;
  documentedTotal: number;
  historic2012_2024: number;
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
  allTimeTotal: 76202,
  documentedTotal: 31202,
  historic2012_2024: 45000,
  currentYear: "2026",
  currentYearSpread: 22002,
  currentYearParticipants: 512,
  currentYearEvents: 21,
  growthPercent: 139,
  years: [
    {
      year: "2012 – 2024",
      spread: 45000,
      participants: 1200,
      events: 160,
      status: "Konservativ schablon",
      label: "Uppbyggnad & tidiga år",
      notes: "Uppskattad räckvidd under Skolyogas första 12 år",
    },
    {
      year: "2025",
      spread: 9200,
      participants: 280,
      events: 18,
      status: "Slutfört",
      label: "Effektrapport 2025",
      notes: "Fastställt i officiell effektutvärdering",
    },
    {
      year: "2026",
      spread: 22002,
      participants: 512,
      events: 21,
      status: "Pågående",
      label: "Hittills under 2026",
      notes: "Live från evenemangsloggen i Google Sheets",
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
              <span>Vår räckvidd & samhällseffekt</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dustyTurquoise/15 text-[#1B6465] text-xs font-semibold">
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>Live från evenemangsloggen</span>
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
              Totalt sedan 2012
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
              Resan år för år
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "cumulative" ? (
          /* CUMULATIVE VIEW - Clear all-time milestone + documented period distinction */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-cardo text-brand-dark tracking-tight">
                Över <span className="text-brand-dustyPurple">75 000</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-brand-dark">
                barn och unga har nåtts sedan starten 2012
              </h2>
              <p className="text-base sm:text-lg text-brand-darkGrey max-w-3xl mx-auto leading-relaxed">
                Skolyoga har verkat i svenska skolor och förskolor sedan 2012. 
                Under vår systematiska mätperiod (2025–nu) har över <strong>{formatNumber(data.documentedTotal)} barn</strong> registrerats, 
                och uppskattningsvis ytterligare ca 45 000 elever under våra första 12 verksamhetsår.
              </p>
            </div>

            {/* 4 Metric Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4 max-w-5xl mx-auto">
              
              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-1.5">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPurple">
                  Sedan 2012
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  75 000+
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Uppskattad total räckvidd bland barn & unga
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-1.5">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyTurquoise">
                  Verifierad mätperiod
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatNumber(data.documentedTotal)}
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Dokumenterad spridning under 2025–2026
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-1.5">
                <div className="text-xs uppercase font-bold tracking-wider text-amber-700">
                  Pedagoger i år ({data.currentYear})
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatNumber(data.currentYearParticipants)} st
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Utbildade lärare och skolpersonal hittills i år
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs text-center space-y-1.5">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPink">
                  Erfarenhet
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  12+ år
                </div>
                <p className="text-xs text-brand-darkGrey">
                  Evidensbaserad metodik i svenska klassrum
                </p>
              </div>

            </div>
          </div>
        ) : (
          /* YEARLY VIEW - Shows the complete journey transparently */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                Skolyogas spridning över tid
              </h2>
              <p className="text-base text-brand-darkGrey leading-relaxed">
                Varje utbildad pedagog möter i snitt 15–100 elever per termin. Här ser du resan från pionjäråren till dagens storskaliga spridning.
              </p>
            </div>

            {/* 3 Period Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Card 1: 2012 - 2024 */}
              <div className="bg-white rounded-2xl border border-[#E3DFC9] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-cardo text-brand-dark">2012 – 2024</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                      Uppbyggnad
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-cardo text-stone-700">
                      ~45 000
                    </div>
                    <div className="text-xs text-brand-darkGrey mt-1">
                      Konservativ schablon (elever)
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EBE8DC] text-xs text-brand-darkGrey space-y-1">
                  <div>• Skolyoga grundas och etableras</div>
                  <div>• Metodutveckling, stillin' och Arvsfonden</div>
                  <div>• Hundratals workshops över hela landet</div>
                </div>
              </div>

              {/* Card 2: 2025 */}
              <div className="bg-white rounded-2xl border border-[#E3DFC9] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-cardo text-brand-dark">2025</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                      Slutfört år
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-cardo text-brand-dark">
                      9 200
                    </div>
                    <div className="text-xs text-brand-darkGrey mt-1">
                      Verifierade elever i Effektrapport
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EBE8DC] text-xs text-brand-darkGrey space-y-1">
                  <div>✓ Första formella effektrapporten</div>
                  <div>✓ Systematisk datainsamling etableras</div>
                  <div>✓ 10 av 10 pedagoger rekommenderar</div>
                </div>
              </div>

              {/* Card 3: 2026 (Live from Google Sheets) */}
              <div className="bg-white rounded-2xl border-2 border-brand-dustyPurple/30 p-6 sm:p-7 shadow-sm space-y-4 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-cardo text-brand-dark">{data.currentYear}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-dustyPurple text-white">
                      Pågående verksamhetsår
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-cardo text-brand-dustyPurple">
                      {formatNumber(data.currentYearSpread)}
                    </div>
                    <div className="text-xs text-brand-darkGrey mt-1">
                      Uppskattad spridning hittills i år
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EBE8DC] text-xs text-brand-darkGrey space-y-1">
                  <div className="font-semibold text-brand-dark">
                    🌱 +{data.growthPercent}% räckviddsökning jmf med 2025!
                  </div>
                  <div>• <strong>{formatNumber(data.currentYearParticipants)}</strong> pedagoger utbildade</div>
                  <div>• <strong>{data.currentYearEvents}</strong> genomförda insatser hittills</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Transparency & Links */}
        <div className="pt-8 mt-8 border-t border-[#EBE8DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-darkGrey">
          <p className="text-center sm:text-left">
            Spridningen från och med 2025 beräknas enligt Skolyogas schablonmodell (antal utbildade pedagoger × elever) och synkroniseras löpande från evenemangsloggen.
          </p>
          <a
            href="/documents/Skolyoga-Effektrapport-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-dustyPurple hover:underline shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Läs Effektrapport 2025 (PDF)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
