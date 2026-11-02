"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Star,
  ClipboardCheck,
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

interface SurveyTabSummary {
  gid: string;
  name: string;
  date: string;
  cleanTitle: string;
  responses: number;
  recommendAvg: number;
  confidentAvg: number;
  relevantAvg: number | null;
}

interface SurveyTakeaway {
  label: string;
  count: number;
  percent: number;
}

interface SurveyKpiData {
  totalResponses: number;
  totalSurveys: number;
  recommendAvg: number;
  recommendPositivePercent: number;
  confidentAvg: number;
  confidentPositivePercent: number;
  relevantAvg: number;
  relevantPositivePercent: number;
  practicalExercisesPercent: number;
  takeaways: SurveyTakeaway[];
  surveys: SurveyTabSummary[];
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
  surveyKpi: SurveyKpiData;
  updatedAt: string;
  fallback?: boolean;
}

const DEFAULT_SURVEY_KPI: SurveyKpiData = {
  totalResponses: 71,
  totalSurveys: 5,
  recommendAvg: 4.5,
  recommendPositivePercent: 92,
  confidentAvg: 4.2,
  confidentPositivePercent: 82,
  relevantAvg: 4.6,
  relevantPositivePercent: 91,
  practicalExercisesPercent: 97,
  takeaways: [
    { label: "Övningar att använda i verksamheten", count: 69, percent: 97 },
    { label: "Lekar och övningar för att stärka relationer", count: 57, percent: 80 },
    { label: "Kunskap och fakta", count: 56, percent: 79 },
    { label: "Motivation för att arbeta med välmående", count: 54, percent: 76 },
    { label: "Övningar att använda för mig själv som ledare", count: 44, percent: 62 },
    { label: "En återhämtande utbildning för min egen skull", count: 40, percent: 56 },
  ],
  surveys: [
    {
      gid: "1777229245",
      name: "2026-09-10 Nacka Kommun Kuratorer Studieteknik",
      date: "2026-09-10",
      cleanTitle: "Nacka Kommun – Kuratorer (Studieteknik)",
      responses: 15,
      recommendAvg: 4.5,
      confidentAvg: 4.1,
      relevantAvg: 4.7,
    },
    {
      gid: "1985451094",
      name: "2026-08-12 Bällstabergsskolan/ICAKvantumVtuna",
      date: "2026-08-12",
      cleanTitle: "Bällstabergsskolan / ICA Kvantum Vallentuna",
      responses: 6,
      recommendAvg: 4.8,
      confidentAvg: 4.7,
      relevantAvg: null,
    },
    {
      gid: "98467603",
      name: "2026-06-16 Nacka Kommun Kuratorer Trygghet",
      date: "2026-06-16",
      cleanTitle: "Nacka Kommun – Kuratorer (Trygghet)",
      responses: 19,
      recommendAvg: 4.4,
      confidentAvg: 4.1,
      relevantAvg: 4.4,
    },
    {
      gid: "1485779901",
      name: "2026-04-01Stiftelsen Hjärtligt Värmdö Munkmoraskol",
      date: "2026-04-01",
      cleanTitle: "Stiftelsen Hjärtligt Värmdö – Munkmoraskolan",
      responses: 15,
      recommendAvg: 4.9,
      confidentAvg: 4.7,
      relevantAvg: 4.9,
    },
    {
      gid: "1678072903",
      name: "2026-03-26 Nacka Kommun kuratorer Stresshantering",
      date: "2026-03-26",
      cleanTitle: "Nacka Kommun – Kuratorer (Stresshantering)",
      responses: 16,
      recommendAvg: 4.3,
      confidentAvg: 4.0,
      relevantAvg: 4.6,
    },
  ],
};

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
  surveyKpi: DEFAULT_SURVEY_KPI,
  updatedAt: new Date().toISOString(),
};

export function ImpactTracker({
  defaultTab = "cumulative",
}: {
  defaultTab?: "cumulative" | "yearly" | "surveys";
}) {
  const [data, setData] = useState<ImpactData>(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState<"cumulative" | "yearly" | "surveys">(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadImpact() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/impact");
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setData({
              ...DEFAULT_DATA,
              ...json,
              surveyKpi: json.surveyKpi || DEFAULT_SURVEY_KPI,
            });
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

  const formatDecimal = (num: number) => {
    return num.toFixed(1).replace(".", ",");
  };

  const kpi = data.surveyKpi || DEFAULT_SURVEY_KPI;

  return (
    <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="bg-gradient-to-b from-brand-sand via-white to-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden">
        
        {/* Top Badges & Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBE8DC]">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-dustyPurple/10 text-brand-dustyPurple text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vår räckvidd, KPI & samhällseffekt</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dustyTurquoise/15 text-[#1B6465] text-xs font-semibold">
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>Synkroniserat live med Google Sheets</span>
            </div>
          </div>

          {/* Toggle between cumulative milestone, yearly comparison, and live survey KPIs */}
          <div className="inline-flex flex-wrap p-1 bg-brand-sand border border-[#E3DFC9] rounded-2xl sm:rounded-full self-start lg:self-auto gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("cumulative")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
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
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === "yearly"
                  ? "bg-brand-dustyPurple text-white shadow-xs"
                  : "text-brand-darkGrey hover:text-brand-dark"
              }`}
            >
              Resan år för år
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("surveys")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "surveys"
                  ? "bg-brand-dustyPurple text-white shadow-xs"
                  : "text-brand-darkGrey hover:text-brand-dark"
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Kundundersökningar ({kpi.totalResponses} svar)</span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "cumulative" && (
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

              <button
                type="button"
                onClick={() => setActiveTab("surveys")}
                className="bg-white p-6 rounded-2xl border border-[#E3DFC9] hover:border-brand-dustyPurple/50 shadow-xs text-center space-y-1.5 transition-all cursor-pointer group"
              >
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPink flex items-center justify-center gap-1">
                  <span>Kundnöjdhet (Live KPI)</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark group-hover:text-brand-dustyPurple transition-colors">
                  {formatDecimal(kpi.recommendAvg)} / 5
                </div>
                <p className="text-xs text-brand-darkGrey">
                  {kpi.recommendPositivePercent}% rekommenderar ({kpi.totalResponses} svar) →
                </p>
              </button>

            </div>
          </div>
        )}

        {activeTab === "yearly" && (
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
                  <div>• Metodutveckling, stillin&apos; och Arvsfonden</div>
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

        {activeTab === "surveys" && (
          /* LIVE CUSTOMER SURVEY KPI VIEW */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dustyPurple/10 text-brand-dustyPurple text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-brand-dustyPurple" />
                <span>Baserat på {kpi.totalResponses} svar från {kpi.totalSurveys} utvärderade uppdrag</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                Live-KPI från våra kundundersökningar
              </h2>
              <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
                Efter varje avslutat konsultuppdrag och utbildning utvärderar deltagarna insatsen på en 5-gradig skala. Siffrorna nedan hämtas automatiskt från våra utvärderingar i Google Sheets.
              </p>
            </div>

            {/* 4 Key Survey KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPurple">
                  Rekommendationsgrad
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatDecimal(kpi.recommendAvg)} <span className="text-xl text-brand-darkGrey font-normal">/ 5</span>
                </div>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  <strong>{kpi.recommendPositivePercent}%</strong> ger betyg 4 eller 5 på hur troligt det är att de rekommenderar utbildningen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-[#1B6465]">
                  Långsiktig relevans
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatDecimal(kpi.relevantAvg)} <span className="text-xl text-brand-darkGrey font-normal">/ 5</span>
                </div>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  <strong>{kpi.relevantPositivePercent}%</strong> instämmer att insatsen är relevant för skolans & kommunens arbete med psykisk hälsa.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-amber-800">
                  Praktiska verktyg direkt
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {kpi.practicalExercisesPercent}%
                </div>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  Uppger att de fått med sig konkreta övningar att använda direkt i sin verksamhet.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-xs space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPink">
                  Trygghet att leda
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  {formatDecimal(kpi.confidentAvg)} <span className="text-xl text-brand-darkGrey font-normal">/ 5</span>
                </div>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  <strong>{kpi.confidentPositivePercent}%</strong> känner sig trygga i att direkt börja arbeta med verktygen i sin elev- eller barngrupp.
                </p>
              </div>
            </div>

            {/* Two-column breakdown: Takeaways + Evaluated Assignments */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto pt-2">
              
              {/* Left: Vad fick du med dig från utbildningen? */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E3DFC9] p-6 sm:p-7 shadow-xs space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-dustyPurple">
                    Enkätfråga (flera val möjliga)
                  </div>
                  <h3 className="text-xl font-bold font-cardo text-brand-dark">
                    Vad fick du med dig från utbildningen?
                  </h3>
                </div>

                <div className="space-y-3.5 pt-1">
                  {kpi.takeaways.map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-brand-dark">{item.label}</span>
                        <span className="font-bold text-brand-dustyPurple">{item.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-brand-sand rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-dustyPurple rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, item.percent)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Utvärderade uppdrag (automatiskt från flikarna i Google Sheets) */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E3DFC9] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#1B6465]">
                      Kontinuerlig uppföljning
                    </div>
                    <h3 className="text-xl font-bold font-cardo text-brand-dark">
                      Senaste utvärderade uppdragen ({kpi.totalSurveys} st)
                    </h3>
                  </div>

                  <div className="divide-y divide-[#EBE8DC]">
                    {kpi.surveys.map((survey) => (
                      <div key={survey.gid} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-brand-dark truncate">
                            {survey.cleanTitle}
                          </div>
                          <div className="text-[11px] text-brand-darkGrey flex items-center gap-2">
                            {survey.date && <span>{survey.date}</span>}
                            <span>•</span>
                            <span>{survey.responses} svar</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-brand-sand border border-[#E3DFC9] text-xs font-bold text-brand-dark">
                            ★ {formatDecimal(survey.recommendAvg)} / 5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EBE8DC] text-[11px] text-brand-darkGrey flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1B6465] shrink-0" />
                  <span>Nya flikar i Google-kalkylarket för kundundersökningar läses in automatiskt.</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Transparency & Links */}
        <div className="pt-8 mt-8 border-t border-[#EBE8DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-darkGrey">
          <p className="text-center sm:text-left">
            Spridning och kundundersöknings-KPI synkroniseras löpande från Skolyogas evenemangslogg och utvärderingsenkäter i Google Sheets.
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
