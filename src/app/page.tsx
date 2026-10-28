"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Play,
  Heart,
  CheckCircle2,
  BookOpen,
  Award,
  Brain,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  Lock,
  GraduationCap,
  FileText,
  UserPlus,
} from "lucide-react";
import { getFeaturedExercises } from "@/lib/exercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { ImpactTracker } from "@/components/ImpactTracker";
import { Exercise } from "@/types";
import { useAuth } from "@/context/AuthContext";

type AudienceType = "skola" | "finansiar";
type SchoolRoleType = "larare" | "skolledare" | "elevhalsa";
type FunderTabType = "foretag" | "projekt" | "effekt";

function HomePageContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const featured = getFeaturedExercises();

  const [audience, setAudience] = useState<AudienceType>("skola");
  const [schoolRole, setSchoolRole] = useState<SchoolRoleType>("larare");
  const [funderTab, setFunderTab] = useState<FunderTabType>("foretag");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const param = searchParams.get("malgrupp");
    if (param === "finansiar") {
      setAudience("finansiar");
    } else if (param === "skola") {
      setAudience("skola");
    }
  }, [searchParams]);

  const roleContent: Record<
    SchoolRoleType,
    {
      label: string;
      badge: string;
      headline: string;
      description: string;
      bullets: string[];
      highlightBox: { title: string; text: string };
    }
  > = {
    larare: {
      label: "Lärare & Förskollärare",
      badge: "För klassrummet & förskolan",
      headline: "Skapa förutsättningar för lärande, trygghet och goda relationer",
      description:
        "Skolyoga fungerar direkt i klassrummet, skolmiljön eller på förskolan – helt utan förkunskaper, ombyte eller yogamattor. Med korta, ledda övningar på 1–5 minuter får du ett konkret verktyg som samlar gruppen och hjälper barnen att hitta fokus.",
      bullets: [
        "Skapar lugn och optimala förutsättningar för lärande före eller under lektion.",
        "Bygger trygghet i barngruppen och stärker relationen mellan dig och eleverna.",
        "Färdiga filmer och bildstöd att starta direkt på storskärm eller i samlingen.",
        "Praktiskt stöd för hur du enkelt implementerar övningarna som en naturlig rutin.",
      ],
      highlightBox: {
        title: "Kom igång direkt på måndag – helt gratis",
        text: "Skapa ett kostnadsfritt konto för att låsa upp över 125 övningar i Kunskapsbiblioteket och våra färdiga 6-veckorsprogram.",
      },
    },
    skolledare: {
      label: "Skolledare & Rektor",
      badge: "För skolledning & verksamhetsutveckling",
      headline: "Öka studieron, stärk prestationen och minska sjukskrivningar",
      description:
        "När elever och personal får kroppsliga verktyg för stressreglering och återhämtning under skoldagen påverkas hela skolans arbetsmiljö. Vi hjälper er att implementera en hållbar, evidensbaserad struktur som ger mätbara resultat.",
      bullets: [
        "Ökar studieron i klassrummen och skapar bättre förutsättningar för måluppfyllelse och prestation.",
        "Minskar stressrelaterad ohälsa och sjukskrivningar hos både lärare och elever.",
        "Ger hela kollegiet ett gemensamt språk och enkla rutiner som tar 1–5 minuter av lektionstiden.",
        "Vi stöttar er genom hela implementeringen – från gratis digitalt material till 100h-utbildning och workshops.",
      ],
      highlightBox: {
        title: "10 av 10 pedagoger rekommenderar Skolyogas utbildning",
        text: "Låt nyckelpersoner gå vår 100h-utbildning till Skolyogakonsult eller boka en kick-off/workshop för hela arbetslaget.",
      },
    },
    elevhalsa: {
      label: "Elevhälsa (EHT)",
      badge: "För kurator, skolsköterska, psykolog & specialpedagog",
      headline: "Ett hälsofrämjande och proaktivt arbete genom hela skolan och förskolan",
      description:
        "Istället för att enbart släcka bränder ger Skolyoga er en proaktiv metod som kan användas systematiskt i alla årskurser – från förskola till gymnasium, anpassad skola och i enskilda elevsamtal.",
      bullets: [
        "Hälsofrämjande och förebyggande arbete som integreras naturligt i hela skolan och förskolan.",
        "Avlastar elevhälsans åtgärdande arbete genom daglig nervsystemsreglering i klassrummen.",
        "Anpassat material för NPF, stress & oro samt kostnadsfritt 6-veckorsprogram vid problematisk skolfrånvaro (Hemmayoga).",
        "Vetenskapligt förankrade övningar som tränar självreglering, känslohantering och återhämtning.",
      ],
      highlightBox: {
        title: "Verktyg för både helklass och enskilda samtal",
        text: "Med ett gratis konto får hela elevhälsan tillgång till Kunskapsbiblioteket, utskrivbara PDF-handledningar och våra interventionsprogram.",
      },
    },
  };

  const activeRole = roleContent[schoolRole];

  return (
    <div className="space-y-20 pb-20">
      
      {/* =====================================================================
          1. HERO SECTION - Väcker intresse hos alla + Tydligt vägval
         ===================================================================== */}
      <section className="relative pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-24 overflow-hidden border-b border-[#2C2724]/40 bg-[#181614] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/heroes/classroom_standing.jpg"
            alt="Skolyoga elever i klassrummet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%] grayscale brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
        </div>

        <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 text-center z-10 space-y-8">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#FFE271] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <div className="w-4 h-4 relative shrink-0">
              <Image
                src="/images/emblem_turquoise.png"
                alt="Mandala emblem"
                width={16}
                height={16}
                className="w-full h-full object-contain brightness-200"
              />
            </div>
            <span>Evidensbaserad metod för skola och förskola sedan 2012</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-cardo tracking-tight text-white max-w-4xl mx-auto leading-[1.12] drop-shadow-md">
            Förutsättningar för{" "}
            <span className="text-[#FFE271] underline decoration-[#FFE271] decoration-2 underline-offset-4">
              lärande
            </span>{" "}
            börjar i{" "}
            <span className="text-[#FFE271] underline decoration-[#FFE271] decoration-2 underline-offset-4">
              kroppen
            </span>
          </h1>

          {/* Concise Subtitle that sparks curiosity */}
          <p className="text-lg sm:text-xl text-stone-100 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
            Skolyoga är en ideell organisation som ger barn, unga och skolpersonal konkreta verktyg för studiero, stresshantering och trygghet – direkt i vardagen.
          </p>

          {/* Audience Switcher Cards right in Hero */}
          <div id="malgrupp" className="pt-4 max-w-3xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-[#FFE271] mb-4">
              Välj vem du är för att se rätt information:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              
              {/* Option 1: Skolpersonal */}
              <button
                type="button"
                onClick={() => setAudience("skola")}
                className={`p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  audience === "skola"
                    ? "bg-white text-brand-dark border-[#FFE271] shadow-xl scale-[1.01]"
                    : "bg-black/45 backdrop-blur-md text-white border-white/25 hover:bg-black/60 hover:border-white/50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    audience === "skola"
                      ? "bg-brand-purple text-white"
                      : "bg-white/15 text-[#FFE271]"
                  }`}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-cardo text-lg sm:text-xl">
                      Jag arbetar i skola / förskola
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      audience === "skola" ? "text-brand-darkGrey" : "text-stone-300"
                    }`}
                  >
                    Lärare, förskollärare, elevhälsa & skolledare – se hur metoden fungerar i er vardag.
                  </p>
                </div>
              </button>

              {/* Option 2: Finansiärer & Företag */}
              <button
                type="button"
                onClick={() => setAudience("finansiar")}
                className={`p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  audience === "finansiar"
                    ? "bg-white text-brand-dark border-[#FFE271] shadow-xl scale-[1.01]"
                    : "bg-black/45 backdrop-blur-md text-white border-white/25 hover:bg-black/60 hover:border-white/50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    audience === "finansiar"
                      ? "bg-brand-turquoise text-white"
                      : "bg-white/15 text-[#FFE271]"
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-cardo text-lg sm:text-xl">
                      Jag är finansiär / företag
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      audience === "finansiar" ? "text-brand-darkGrey" : "text-stone-300"
                    }`}
                  >
                    Stiftelser, bidragsgivare, företag & filantroper – se vår effekt, projekt och partnerskap.
                  </p>
                </div>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          2A. VY FÖR SKOLPERSONAL (Lärare, Förskollärare, Skolledare, Elevhälsa)
         ===================================================================== */}
      {audience === "skola" && (
        <div className="space-y-16 animate-in fade-in duration-300">
          
          {/* If user IS logged in: Quick access to Kunskapsbiblioteket, Program & Popular exercises */}
          {user && (
            <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
              <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl border-2 border-brand-turquoise/40 p-8 sm:p-10 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E3DFC9] pb-6">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-turquoise/20 text-[#1B6465] text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inloggat pedagogläge</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                      Välkommen in, {user.fullName}! Vad vill du köra idag?
                    </h2>
                    <p className="text-sm text-brand-darkGrey">
                      Du har nu fri tillgång till hela Kunskapsbiblioteket och alla program.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 shrink-0">
                    <Link
                      href="/kunskapsbiblioteket"
                      className="px-6 py-3 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-all shadow-sm flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Öppna Kunskapsbiblioteket</span>
                    </Link>
                    <Link
                      href="/program"
                      className="px-6 py-3 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 text-brand-purple" />
                      <span>Öppna Program</span>
                    </Link>
                  </div>
                </div>

                {/* 4 quick-start exercises for logged-in teachers */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold font-cardo text-brand-dark">
                      Starta en snabb mikropaus direkt på storskärmen:
                    </h3>
                    <Link
                      href="/kunskapsbiblioteket"
                      className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-1"
                    >
                      <span>Se alla 125+ övningar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featured.slice(0, 4).map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        showPopularBadge={true}
                        onSelect={(ex) => setSelectedExercise(ex)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Role-specific portioned information */}
          <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                Anpassat för din yrkesroll
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                Hur Skolyoga hjälper dig i din vardag
              </h2>
              <p className="text-base text-brand-darkGrey">
                Välj din roll nedan för att se hur metoden skapar värde för just dig och din verksamhet:
              </p>
            </div>

            {/* Role Selector Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {(
                [
                  { id: "larare", label: "Lärare & Förskollärare" },
                  { id: "skolledare", label: "Skolledare & Rektor" },
                  { id: "elevhalsa", label: "Elevhälsa (EHT)" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSchoolRole(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                    schoolRole === tab.id
                      ? "bg-brand-purple text-white shadow-md"
                      : "bg-white text-brand-dark border border-[#D5D0BE] hover:bg-brand-sand"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Role Card */}
            <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-turquoise/15 text-brand-dark text-xs font-bold uppercase tracking-wider">
                    <span>{activeRole.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-brand-dark leading-tight">
                    {activeRole.headline}
                  </h3>
                  <p className="text-base text-brand-darkGrey leading-relaxed">
                    {activeRole.description}
                  </p>

                  <ul className="space-y-3 pt-1">
                    {activeRole.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base text-brand-dark">
                        <CheckCircle2 className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right highlight & action box */}
                <div className="lg:col-span-5">
                  <div className="bg-brand-sand rounded-2xl border border-[#E3DFC9] p-6 sm:p-8 space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#E3DFC9] flex items-center justify-center text-brand-purple">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-cardo text-brand-dark">
                      {activeRole.highlightBox.title}
                    </h4>
                    <p className="text-sm text-brand-darkGrey leading-relaxed">
                      {activeRole.highlightBox.text}
                    </p>

                    <div className="space-y-3 pt-2">
                      {!user ? (
                        <Link
                          href="/logga-in?tab=register"
                          className="w-full py-3.5 px-6 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all flex items-center justify-center gap-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Skapa gratis konto (Lås upp allt material)</span>
                        </Link>
                      ) : (
                        <Link
                          href="/kunskapsbiblioteket"
                          className="w-full py-3.5 px-6 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all flex items-center justify-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Gå till Kunskapsbiblioteket</span>
                        </Link>
                      )}
                      <Link
                        href="/utbildningar"
                        className="w-full py-3 px-6 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Läs om 100h-utbildning & workshops</span>
                        <ArrowRight className="w-4 h-4 text-brand-purple" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3-Step Ladder for School Staff: Free Account -> Classroom Implementation -> 100h Training */}
          <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="bg-gradient-to-b from-brand-sand via-white to-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                  Steg för steg
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                  Så kommer ni igång – och växer med Skolyoga
                </h2>
                <p className="text-sm sm:text-base text-brand-darkGrey">
                  Börja helt kostnadsfritt på egen hand och bygg på med utbildning och implementeringsstöd när ni vill ha mer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1: Gratis konto */}
                <div className="bg-white rounded-2xl border border-[#E3DFC9] p-7 flex flex-col justify-between space-y-6 relative">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-brand-turquoise/20 text-[#1B6465] text-xs font-bold uppercase">
                        Steg 1 • Gratis
                      </span>
                      <Lock className="w-4 h-4 text-brand-turquoise" />
                    </div>
                    <h3 className="text-xl font-bold font-cardo text-brand-dark">
                      1. Skapa ett gratis konto
                    </h3>
                    <p className="text-sm text-brand-darkGrey leading-relaxed">
                      Kunskapsbiblioteket och våra program är exklusiva för inloggade medlemmar – men kontot är <strong>helt kostnadsfritt</strong> för all skol- och förskolepersonal.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#EBE8DC]">
                    {!user ? (
                      <Link
                        href="/logga-in?tab=register"
                        className="text-xs font-bold text-brand-purple flex items-center gap-1.5 hover:underline"
                      >
                        <span>Skapa ditt gratis konto här</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href="/kunskapsbiblioteket"
                        className="text-xs font-bold text-[#1B6465] flex items-center gap-1.5 hover:underline"
                      >
                        <span>✓ Du är inloggad – Öppna biblioteket</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Step 2: Testa i klassrummet */}
                <div className="bg-white rounded-2xl border border-[#E3DFC9] p-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-brand-yellow/40 text-amber-900 text-xs font-bold uppercase">
                        Steg 2 • I vardagen
                      </span>
                      <Play className="w-4 h-4 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-bold font-cardo text-brand-dark">
                      2. Använd direkt i klassrummet
                    </h3>
                    <p className="text-sm text-brand-darkGrey leading-relaxed">
                      Starta en 3-minuters mikropaus på projektorn, använd våra PDF-handledningar eller följ ett färdigt 6-veckorsprogram för studiero, trygghet eller stresshantering.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#EBE8DC]">
                    <Link
                      href={user ? "/program" : "/testa-en-yogaklass"}
                      className="text-xs font-bold text-brand-dark flex items-center gap-1.5 hover:underline"
                    >
                      <span>{user ? "Utforska alla 6-veckorsprogram" : "Smygkika på en testövning"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Step 3: 100h-utbildning & Implementering */}
                <div className="bg-white rounded-2xl border-2 border-brand-purple/35 p-7 flex flex-col justify-between space-y-6 shadow-xs">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-bold uppercase">
                        Steg 3 • Fördjupning
                      </span>
                      <Award className="w-4 h-4 text-brand-purple" />
                    </div>
                    <h3 className="text-xl font-bold font-cardo text-brand-dark">
                      3. Vill ni ha mer? Gå 100h-utbildningen
                    </h3>
                    <p className="text-sm text-brand-darkGrey leading-relaxed">
                      Få personlig handledning och djupgående verktyg för att implementera Skolyoga i hela skolan eller förskolan genom vår <strong>100h-utbildning</strong> eller en skräddarsydd workshop.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#EBE8DC]">
                    <Link
                      href="/utbildningar"
                      className="text-xs font-bold text-brand-purple flex items-center gap-1.5 hover:underline"
                    >
                      <span>Läs om 100h-utbildningen & anmälan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Dedicated 100h-utbildning Section for School Staff */}
          <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/25 text-brand-purple text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>Kompetensutveckling • 100 timmar</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark leading-tight">
                    Skolyogautbildning 100h – Bli diplomerad Skolyogakonsult
                  </h2>
                  <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
                    För dig som vill ha mer än det kostnadsfria materialet och få djupgående verktyg för att implementera Skolyoga i hela skolan eller förskolan. Utbildningen kombinerar fysiska kurshelger med digitala moduler, neurovetenskap och praktisk metodik (1–5 minuters mikropauser och längre pass).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-1">
                      <div className="font-bold font-cardo text-sm text-brand-dark">
                        För lärare, förskola & EHT
                      </div>
                      <p className="text-xs text-brand-darkGrey leading-relaxed">
                        Anpassad för pedagoger, elevhälsa och skolledare från förskola till gymnasium.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-1">
                      <div className="font-bold font-cardo text-sm text-brand-dark">
                        Handledning & Implementering
                      </div>
                      <p className="text-xs text-brand-darkGrey leading-relaxed">
                        Efter utbildningen är du behörig att leda arbetet och handleda kollegor på din skola.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href="/utbildningar"
                      className="px-7 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>Läs allt om 100h-utbildningen</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/utbildningar/100h/anmalan"
                      className="px-6 py-3.5 rounded-full bg-brand-sand text-brand-dark border border-[#D5D0BE] font-semibold text-sm hover:bg-[#EBE8DC] transition-colors"
                    >
                      Anmäl intresse / Boka plats
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-md h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#E3DFC9]">
                    <Image
                      src="/images/heroes/konsult_utbildning_card.jpg"
                      alt="Skolyoga 100h konsult- och lärarutbildning"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-[center_35%] grayscale brightness-[1.06] contrast-[1.05]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      )}

      {/* =====================================================================
          2B. VY FÖR FINANSIÄRER & FÖRETAG (Stiftelser, Bidragsgivare, Företag, Filantroper)
         ===================================================================== */}
      {audience === "finansiar" && (
        <div className="space-y-16 animate-in fade-in duration-300">
          
          <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-turquoise">
                För stiftelser, bidragsgivare, företag & filantroper
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
                Skapa stor och mätbar effekt för barn och unga
              </h2>
              <p className="text-base text-brand-darkGrey">
                Välj vad du vill titta närmare på nedan – vi portionerar ut informationen utifrån ert fokus:
              </p>
            </div>

            {/* Funder Sub-navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {(
                [
                  { id: "foretag", label: "Stor effekt & Hållbarhetsmål (CSR)" },
                  { id: "projekt", label: "Tidigare projekt & uppdrag" },
                  { id: "effekt", label: "Spridning, effekt & resultat" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFunderTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                    funderTab === tab.id
                      ? "bg-brand-purple text-white shadow-md"
                      : "bg-white text-brand-dark border border-[#D5D0BE] hover:bg-brand-sand"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Företag, Filantroper, Små medel -> Stor effekt & Hållbarhetsmål */}
            {funderTab === "foretag" && (
              <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm space-y-10 animate-in fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow/40 text-brand-dark text-xs font-bold uppercase tracking-wider">
                      <TrendingUp className="w-3.5 h-3.5 text-brand-purple" />
                      <span>Hög utväxling per investerad krona</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-brand-dark leading-tight">
                      Relativt små medel ger en enorm effekt för barn och unga
                    </h3>
                    <p className="text-base text-brand-darkGrey leading-relaxed">
                      Eftersom Skolyoga utbildar och utrustar lärare, förskollärare och elevhälsa skapas en unik hävstångseffekt: <strong>varje utbildad pedagog möter 15–100 elever per termin, år efter år.</strong> Det innebär att även en begränsad insats från ert företag, er stiftelse eller dig som filantrop ger hundratals barn dagliga verktyg för psykisk hälsa och studiero.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-1.5">
                        <div className="font-bold font-cardo text-lg text-brand-dark">
                          Nå era hållbarhetsmål (ESG / CSR)
                        </div>
                        <p className="text-xs text-brand-darkGrey leading-relaxed">
                          Vi hjälper ert företag att konkretisera och uppnå era mål inom social hållbarhet och Agenda 2030 (Mål 3: <em>God hälsa och välbefinnande</em> & Mål 4: <em>God utbildning</em>).
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-1.5">
                        <div className="font-bold font-cardo text-lg text-brand-dark">
                          Mätbar återkoppling
                        </div>
                        <p className="text-xs text-brand-darkGrey leading-relaxed">
                          Ni får tydlig dokumentation på hur många skolor, pedagoger och elever ert stöd har nått – redo att användas i er hållbarhetsredovisning.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Examples of concrete support levels */}
                  <div className="lg:col-span-5">
                    <div className="bg-brand-sand rounded-2xl border border-[#E3DFC9] p-6 sm:p-8 space-y-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                        Exempel på hur ni kan bidra
                      </div>
                      <h4 className="text-xl font-bold font-cardo text-brand-dark">
                        Från riktad skolinsats till strategiskt partnerskap
                      </h4>
                      <ul className="space-y-3 text-sm text-brand-dark">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                          <span>
                            <strong>Sponsra en skola (från 15 900 kr):</strong> Möjliggör en praktisk workshop för ett helt kollegium och hundratals elever.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                          <span>
                            <strong>Utbildningsstipendium:</strong> Finansiera 100h-utbildningsplatser för skolor i socioekonomiskt utsatta områden.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                          <span>
                            <strong>Projektfinansiering & Stiftelsestöd:</strong> Samverka kring riktade utvecklingsprojekt för målgrupper med särskilda behov.
                          </span>
                        </li>
                      </ul>

                      <div className="pt-3 flex flex-col gap-3">
                        <Link
                          href="/stod-oss"
                          className="w-full py-3.5 px-6 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all flex items-center justify-center gap-2"
                        >
                          <span>Se våra stödformer & bli partner</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/kontakt"
                          className="w-full py-3 px-6 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all text-center"
                        >
                          Boka ett kort introduktionssamtal
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Tidigare projekt & uppdrag */}
            {funderTab === "projekt" && (
              <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm space-y-8 animate-in fade-in">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE8DC] pb-6">
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                      Beprövad projektägare
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                      Tidigare och pågående projekt & uppdrag
                    </h3>
                    <p className="text-sm sm:text-base text-brand-darkGrey max-w-2xl">
                      Skolyoga har gedigen erfarenhet av att driva framgångsrika, utvärderade projekt i samarbete med myndigheter, fonder och stiftelser.
                    </p>
                  </div>
                  <Link
                    href="/projekt"
                    className="px-6 py-3 rounded-full bg-brand-purple text-white font-semibold text-xs sm:text-sm hover:bg-[#781b61] transition-all shrink-0 flex items-center gap-2 self-start md:self-auto"
                  >
                    <span>Läs om alla våra projekt</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      funder: "Folkhälsomyndigheten (2026 – Pågående)",
                      title: "Hemmayoga – Stöd vid problematisk skolfrånvaro",
                      desc: "Digitalt 6-veckorsprogram som ger elever med hög skolfrånvaro och deras familjer kravlösa verktyg för nervsystemsreglering och återhämtning i hemmiljö.",
                    },
                    {
                      funder: "Allmänna Arvsfonden (2024 – 2027)",
                      title: "stillin’ between – Trygghetsarbete på mellanstadiet",
                      desc: "Utveckling av metodmaterial och implementeringsmodell för årskurs 4–6 som stärker tryggheten, motverkar utanförskap och skapar studiero.",
                    },
                    {
                      funder: "MOE-stiftelsen (2026 – 2029)",
                      title: "Språkinlärning genom kroppen (Förskola & Förskoleklass)",
                      desc: "Treårigt projekt som integrerar bilaterala och finmotoriska rörelseövningar som ett direkt stöd i barns språkutveckling, läsning och skrivande.",
                    },
                    {
                      funder: "Svenska Postkodstiftelsen (2023)",
                      title: "Inte bara yoga – Metoder för effektmätning",
                      desc: "Vetenskaplig utvärdering på högstadiet och gymnasiet som visade hur korta mikropauser sänker elevernas stress, ökar koncentrationen och avlastar elevhälsan.",
                    },
                  ].map((proj) => (
                    <div
                      key={proj.title}
                      className="p-6 rounded-2xl bg-brand-sand/60 border border-[#E3DFC9] space-y-2.5"
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                        {proj.funder}
                      </div>
                      <h4 className="text-lg font-bold font-cardo text-brand-dark">
                        {proj.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Spridning, effekt & resultat */}
            {funderTab === "effekt" && (
              <div className="space-y-8 animate-in fade-in">
                <ImpactTracker />
              </div>
            )}

          </section>

        </div>
      )}

      {/* =====================================================================
          3. KORT BEVIS & RÖSTER FRÅN SKOLAN (Kompakt & förtroendeskapande för alla)
         ===================================================================== */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE8DC] pb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-purple mb-1">
                Dokumenterad effekt i praktiken
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                75 000+ nådda barn och unga • 10 av 10 pedagoger rekommenderar
              </h2>
            </div>
            <Link
              href="/metoden"
              className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-1.5 shrink-0"
            >
              <span>Läs mer om forskningen & metoden</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-3 flex flex-col justify-between">
              <p className="italic text-sm sm:text-base text-brand-dark leading-relaxed">
                ”Eleverna blir lugnare och mer avslappnade, det blir lugnare stämning i klassrummet.”
              </p>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                Lärare, grundskola
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-3 flex flex-col justify-between">
              <p className="italic text-sm sm:text-base text-brand-dark leading-relaxed">
                ”Jag tar med mig praktiska verktyg som eleven kan göra när hen är stressad. Ett proaktivt stöd som hela skolan har glädje av.”
              </p>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-turquoise">
                Kurator / Elevhälsa
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-3 flex flex-col justify-between">
              <p className="italic text-sm sm:text-base text-brand-dark leading-relaxed">
                ”Man blir mer koncentrerad, och ibland är det skönt att bara stänga ögonen och göra något lugnt.”
              </p>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Mellanstadieelev
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. AVSLUTANDE CALL-TO-ACTION (Anpassad efter vald målgrupp)
         ===================================================================== */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {audience === "skola" ? (
          <div className="rounded-3xl bg-[#2D2D2C] text-white p-8 sm:p-12 lg:p-14 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFE271] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>För dig i skola och förskola</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-white">
                  {user
                    ? "Ta nästa steg – utbilda dig eller boka en workshop för din skola"
                    : "Börja med ett gratis konto – och väck lusten för mer"}
                </h2>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                  {user
                    ? "Vill ni få hjälp att implementera Skolyoga i hela arbetslaget? Upptäck vår 100h-utbildning till Skolyogakonsult eller boka en inspirerande workshop."
                    : "Skapa ditt kostnadsfria pedagogkonto på 30 sekunder för att låsa upp Kunskapsbiblioteket och alla program. När ni vill fördjupa arbetet finns vår 100h-utbildning och våra workshops redo."}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                {!user ? (
                  <Link
                    href="/logga-in?tab=register"
                    className="px-7 py-4 rounded-full bg-[#FFE271] text-brand-dark font-bold text-sm hover:bg-[#ffd942] transition-all text-center flex items-center justify-center gap-2 shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Skapa gratis konto</span>
                  </Link>
                ) : (
                  <Link
                    href="/kunskapsbiblioteket"
                    className="px-7 py-4 rounded-full bg-[#FFE271] text-brand-dark font-bold text-sm hover:bg-[#ffd942] transition-all text-center flex items-center justify-center gap-2 shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Öppna Kunskapsbiblioteket</span>
                  </Link>
                )}
                <Link
                  href="/utbildningar"
                  className="px-7 py-3.5 rounded-full bg-white/10 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all text-center"
                >
                  Läs om 100h-utbildningen
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#2D2D2C] text-white p-8 sm:p-12 lg:p-14 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFE271] text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5" />
                  <span>För finansiärer, stiftelser & företag</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-white">
                  Vill ni vara med och ge fler barn verktyg för livet?
                </h2>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                  Oavsett om ni vill göra en riktad insats med mindre medel, nå era hållbarhetsmål eller finansiera ett större skolprojekt skräddarsyr vi ett upplägg med tydlig effektmätning.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link
                  href="/stod-oss"
                  className="px-7 py-4 rounded-full bg-[#FFE271] text-brand-dark font-bold text-sm hover:bg-[#ffd942] transition-all text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Stötta oss / Bli partner</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projekt"
                  className="px-7 py-3.5 rounded-full bg-white/10 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all text-center"
                >
                  Se våra projekt & resultat
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Video Modal if clicked in logged-in quick panel */}
      <VideoPlayerModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-brand-darkGrey">Laddar startsidan...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
