"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProgramById } from "@/data/programs";
import { useAuth } from "@/context/AuthContext";
import { 
  ArrowLeft, 
  CheckCircle, 
  Play, 
  FileText, 
  Download, 
  Check, 
  Clock, 
  Sparkles, 
  Lock,
  Smartphone,
  ExternalLink
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { HemmayogaSurveyModal } from "@/components/programs/HemmayogaSurveyModal";

export default function ProgramDetailPage() {
  const params = useParams();
  const programId = params.id as string;
  const program = getProgramById(programId);
  const { user, progress, toggleWeekCompleted, isWeekCompleted } = useAuth();

  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeVideoType, setActiveVideoType] = useState<"exercise" | "class">("exercise");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  if (!program) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-bold font-cardo text-brand-dark">Programmet hittades inte</h1>
        <p className="text-brand-darkGrey">Det efterfrågade programmet kunde inte hittas.</p>
        <Link
          href="/program"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tillbaka till alla program</span>
        </Link>
      </div>
    );
  }

  // Auth Protection: Program is only accessible when logged in (Card 28)
  if (!user && program.isActive) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-dustyPurple/15 text-brand-dustyPurple flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-dustyPurple">
            Inloggning krävs
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
            Logga in för att öppna {program.title}
          </h1>
          <p className="text-base text-brand-darkGrey max-w-xl mx-auto leading-relaxed">
            Detta program ingår kostnadsfritt. Skapa ett gratis pedagogkonto eller logga in för att få full tillgång till programmets alla 6 veckor, yogaklasser, arbetsmaterial och synka dina framsteg med Skolyoga-appen.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/logga-in"
            className="px-8 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all cursor-pointer"
          >
            Logga in eller skapa konto
          </Link>
          <Link
            href="/program"
            className="px-6 py-3.5 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all"
          >
            Tillbaka till program
          </Link>
        </div>
      </div>
    );
  }

  const activeWeek = program.weeks[activeWeekIndex] || program.weeks[0];
  const isDone = isWeekCompleted(activeWeek.id);
  const completedCount = program.weeks.filter((w) => isWeekCompleted(w.id)).length;
  const totalWeeks = program.weeks.length;
  const percent = Math.round((completedCount / totalWeeks) * 100);

  const isHemmayoga = program.id === "yTk3wFhl1s011CoBYPpY" || program.title.toLowerCase().includes("hemmayoga");

  React.useEffect(() => {
    if (!isHemmayoga) return;
    if (activeWeek.weekNumber >= 3 || completedCount >= 2) {
      const dismissed = typeof window !== "undefined" ? localStorage.getItem("skolyoga_survey_dismissed_w3") : null;
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShowSurveyModal(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [activeWeek.weekNumber, completedCount, isHemmayoga]);

  const handleToggle = async () => {
    await toggleWeekCompleted(activeWeek.id);
    const nowDone = !isDone;
    setFeedbackMessage(
      nowDone
        ? `Vecka ${activeWeek.weekNumber} är markerad som klar! Synkad med appen 🎉`
        : `Vecka ${activeWeek.weekNumber} avmarkerades.`
    );
    if (isHemmayoga && activeWeek.weekNumber === 3 && nowDone) {
      const dismissed = typeof window !== "undefined" ? localStorage.getItem("skolyoga_survey_dismissed_w3") : null;
      if (!dismissed) {
        setShowSurveyModal(true);
      }
    }
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  // Helper to extract YouTube embed URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    if (url.includes("embed/")) return url;
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?rel=0`;
    }
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}?rel=0`;
    }
    return url;
  };

  const currentVideoSrc = activeVideoType === "class" 
    ? getEmbedUrl(activeWeek.classUrl || activeWeek.videoUrl) 
    : getEmbedUrl(activeWeek.videoUrl);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge={program.badges?.[0] || program.badge || "Digitalt Program"}
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        title={program.title}
        description={program.description}
        bgImage="/images/heroes/kids_yoga_mats.jpg"
        bgAlt="Elever som utövar skolyoga på mattor"
        align="left"
        objectPosition="object-[center_35%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
      
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/program"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-darkGrey hover:text-brand-purple transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tillbaka till alla program</span>
        </Link>

        {/* Program Header */}
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {(program.badges || [program.badge]).filter(Boolean).map((badgeText) => {
                  const isComingSoon = badgeText.toLowerCase() === "kommande";
                  return (
                    <span
                      key={badgeText}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isComingSoon
                          ? "bg-[#FFE271]/50 text-[#543b00] border border-[#FFE271]"
                          : "bg-brand-sand text-brand-dark border border-brand-grey/15"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                      <span>{badgeText}</span>
                    </span>
                  );
                })}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                {program.title}
              </h1>
              <p className="text-sm sm:text-base text-brand-turquoise font-medium">
                {program.subtitle}
              </p>
              <p className="text-sm text-brand-darkGrey leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Overall Progress Card */}
            <div className="w-full lg:w-72 bg-brand-sand/80 rounded-2xl p-6 border border-brand-grey/10 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold text-brand-dark">
                <span>Din progression:</span>
                <span className="text-brand-purple">{percent}%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-brand-grey/10">
                <div
                  className="h-full bg-brand-turquoise rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="text-xs text-brand-darkGrey flex items-center justify-between">
                <span>{completedCount} av {totalWeeks} veckor klara</span>
                {user && <span className="text-brand-turquoise font-semibold">Synkad ✓</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!program.isActive && (
        <div className="bg-[#FFE271]/25 border border-[#FFE271] rounded-2xl p-5 flex items-center gap-3 text-brand-dark">
          <Clock className="w-5 h-5 text-amber-700 shrink-0" />
          <p className="text-sm">
            <strong>Kommande program:</strong> Detta program är under produktion och kommer snart att lanseras här på webben och i Skolyoga-appen. Nedan ser du en förhandsvisning av det planerade innehållet.
          </p>
        </div>
      )}

      {/* Main Content Layout: Weeks selector + Active week details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Weeks Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-darkGrey px-2">
            Välj vecka:
          </div>
          {program.weeks.map((week, idx) => {
            const weekDone = isWeekCompleted(week.id);
            const isSelected = idx === activeWeekIndex;

            return (
              <button
                key={week.id}
                onClick={() => {
                  setActiveWeekIndex(idx);
                  setActiveVideoType("exercise");
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-white border-brand-purple shadow-md ring-2 ring-brand-purple/20"
                    : "bg-white/70 border-brand-grey/15 hover:bg-white hover:border-brand-grey/30"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      weekDone
                        ? "bg-brand-turquoise text-white"
                        : isSelected
                        ? "bg-brand-purple text-white"
                        : "bg-brand-sand text-brand-dark"
                    }`}
                  >
                    {weekDone ? <Check className="w-4 h-4" /> : `V.${week.weekNumber}`}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-brand-dark truncate">
                      {week.title}
                    </div>
                    <div className="text-[11px] text-brand-darkGrey truncate">
                      Övning: {week.exerciseName}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-brand-darkGrey shrink-0 ml-2">
                  {week.durationMinutes} min
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Week Details */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E3DFC9] p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Week Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE8DC]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/20 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
                <span>Vecka {activeWeek.weekNumber} av {totalWeeks}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                {activeWeek.title}
              </h2>
              <p className="text-xs text-brand-darkGrey mt-1">
                Övning: <strong>{activeWeek.exerciseName}</strong> • Yogaklass: <strong>{activeWeek.classTitle}</strong>
              </p>
            </div>

            {/* Complete / Uncomplete button */}
            <button
              onClick={handleToggle}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                isDone
                  ? "bg-brand-turquoise/20 text-brand-turquoise border border-brand-turquoise/30 hover:bg-brand-turquoise/30"
                  : "bg-brand-purple text-white hover:bg-brand-purple/90"
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isDone ? "fill-brand-turquoise text-white" : ""}`} />
              <span>{isDone ? "Klar! Markera som ogjord" : "Markera vecka som klar"}</span>
            </button>
          </div>

          {feedbackMessage && (
            <div className="p-3 rounded-xl bg-brand-turquoise/15 text-brand-dark text-xs font-medium border border-brand-turquoise/30 animate-fade-in">
              {feedbackMessage}
            </div>
          )}

          {/* Hemmayoga 3-Week Survey Banner */}
          {isHemmayoga && activeWeek.weekNumber >= 3 && (
            <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand border border-[#FFE271] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-warmYellow/30 text-[#735100] flex items-center justify-center shrink-0 border border-brand-warmYellow/50">
                  <Sparkles className="w-5 h-5 text-brand-dustyPurple" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-dustyPurple">
                    Enkät: 3 veckor in i Hemmayoga
                  </div>
                  <p className="text-xs text-brand-dark font-medium">
                    Hur upplever du övningarna hittills? Dela dina tankar i vår korta utvärdering (2 min).
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSurveyModal(true)}
                className="px-4 py-2 rounded-full bg-brand-dustyPurple text-white text-xs font-semibold hover:bg-[#781b61] transition-all shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Öppna enkät</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Video Player Selection Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b border-[#EBE8DC] pb-2">
              <button
                type="button"
                onClick={() => setActiveVideoType("exercise")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeVideoType === "exercise"
                    ? "bg-brand-dustyPurple text-white shadow-sm"
                    : "text-brand-dark hover:bg-brand-sand"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Veckans övning ({activeWeek.exerciseName})</span>
              </button>

              {activeWeek.classUrl && (
                <button
                  type="button"
                  onClick={() => setActiveVideoType("class")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeVideoType === "class"
                      ? "bg-brand-dustyPurple text-white shadow-sm"
                      : "text-brand-dark hover:bg-brand-sand"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Veckans yogaklass ({activeWeek.classTitle})</span>
                </button>
              )}
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md bg-stone-900 border border-brand-grey/15">
              <iframe
                src={currentVideoSrc}
                title={activeVideoType === "class" ? activeWeek.classTitle : activeWeek.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Description & Overview */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-cardo text-brand-dark">
              Om veckans tema
            </h3>
            <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
              {activeWeek.description}
            </p>
          </div>

          {/* Step by Step Instructions */}
          <div className="space-y-4 bg-brand-sand/60 rounded-2xl p-6 border border-brand-grey/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
              Instruktioner för veckan:
            </h3>
            <div className="space-y-3">
              {activeWeek.instructions.map((inst, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-brand-dark">
                  <div className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="leading-relaxed">{inst}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Resources & Class pass - Linked without 'Ingår' text (Cards 7, 25, 26) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
              Arbetsmaterial och pass:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Resource 1: PDF */}
              <div className="p-4 rounded-xl bg-white border border-[#E3DFC9] flex items-center justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-pink/20 text-brand-purple flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">Arbetsmaterial</div>
                    <div className="text-[11px] text-brand-darkGrey">Utskriftsvänlig PDF</div>
                  </div>
                </div>
                <a
                  href={activeWeek.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dustyPink/20 text-brand-dustyPurple text-xs font-semibold hover:bg-brand-dustyPink/30 transition-colors"
                  title="Ladda ner material"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ladda ner</span>
                </a>
              </div>

              {/* Resource 2: Class pass - Interactive link, removed 'Ingår' (Card 26 & Card 7) */}
              <div className="p-4 rounded-xl bg-white border border-[#E3DFC9] flex items-center justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-turquoise/20 text-brand-turquoise flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">Veckans yogaklass</div>
                    <div className="text-[11px] text-brand-darkGrey">{activeWeek.classTitle}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoType("class")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-dustyTurquoise/20 text-[#1B6465] text-xs font-semibold hover:bg-brand-dustyTurquoise/30 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Spela klass</span>
                </button>
              </div>

            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="pt-6 border-t border-[#EBE8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-brand-darkGrey flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-brand-turquoise" />
              <span>Framsteg sparas och delas i realtid med Skolyoga-appen.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {activeWeekIndex > 0 && (
                <button
                  onClick={() => {
                    setActiveWeekIndex((prev) => prev - 1);
                    setActiveVideoType("exercise");
                  }}
                  className="px-4 py-2 rounded-full border border-brand-grey/20 text-xs font-semibold text-brand-dark hover:bg-brand-sand transition-colors cursor-pointer"
                >
                  Föregående vecka
                </button>
              )}
              {activeWeekIndex < totalWeeks - 1 && (
                <button
                  onClick={() => {
                    setActiveWeekIndex((prev) => prev + 1);
                    setActiveVideoType("exercise");
                  }}
                  className="px-5 py-2 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-brand-purple/90 transition-colors cursor-pointer"
                >
                  Nästa vecka →
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      </div>

      {/* Hemmayoga Week 3 Survey Pop-up Modal */}
      <HemmayogaSurveyModal
        isOpen={showSurveyModal}
        onClose={() => {
          setShowSurveyModal(false);
          try {
            localStorage.setItem("skolyoga_survey_dismissed_w3", "true");
          } catch (e) {}
        }}
        programTitle={program.title}
      />
    </div>
  );
}
