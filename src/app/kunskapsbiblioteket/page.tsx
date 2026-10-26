"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { allExercises } from "@/lib/exercises";
import {
  subscribeToFirestoreExercises,
} from "@/lib/firebaseExercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { Exercise } from "@/types";
import { BookOpen, Download, FileText, ExternalLink, Sparkles, Lock, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useAuth } from "@/context/AuthContext";
import { LoginFormCard } from "@/components/auth/LoginFormCard";

function KunskapsbibliotekContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const getParamCategory = () => searchParams.get("kategori") || searchParams.get("category") || "Alla kategorier";
  const getParamTweak = () => searchParams.get("anpassning") || searchParams.get("tag") || "Alla anpassningar";

  const [exercises, setExercises] = useState<Exercise[]>(allExercises);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(getParamCategory());
  const [selectedDuration, setSelectedDuration] = useState("Alla längder");
  const [selectedGrade, setSelectedGrade] = useState("Alla årskurser");
  const [selectedTweak, setSelectedTweak] = useState(getParamTweak());
  const [selectedIntervention, setSelectedIntervention] = useState("Alla interventioner");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Sync state if search params change
  useEffect(() => {
    const cat = searchParams.get("kategori") || searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const tweak = searchParams.get("anpassning") || searchParams.get("tag");
    if (tweak) setSelectedTweak(tweak);
    const inv = searchParams.get("intervention");
    if (inv) {
      setSelectedCategory("6-veckorsinterventioner");
      setSelectedIntervention(inv);
    }
  }, [searchParams]);

  // Connect to Firebase Firestore for real-time updates of all exercises
  useEffect(() => {
    const unsubscribe = subscribeToFirestoreExercises(
      (items, count) => {
        if (count > 0) {
          setExercises(items);
        }
      },
      (error) => {
        console.warn("Firestore subscription note:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  // Filter exercises logic using dynamic state from Firebase
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      // Search text match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ex.title.toLowerCase().includes(q);
        const matchesDesc = ex.description.toLowerCase().includes(q);
        const matchesCat = ex.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      // Category match (supports both string and array of categories, plus 6-veckorsinterventioner)
      if (selectedCategory === "6-veckorsinterventioner") {
        const titleLower = ex.title.toLowerCase();
        const slugLower = ex.slug.toLowerCase();

        const stressItems = [
          "kroppsräkning", "kroppsrakning",
          "fysiologiska sucken",
          "korsande avspänning", "korsande-avspanning",
          "korsrytm",
          "gemensam storm", "storm",
          "dunsa",
          "biandning",
          "paussucken", "suckar",
          "växelvisandning", "vaxelvisandning"
        ];
        const studieItems = [
          "nama",
          "pilbågen", "pilbagen",
          "nama med ramsa",
          "nama med svep",
          "regndroppar",
          "omstart",
          "trädet", "tradet",
          "sinnet", "sinnesträning", "sinnestraning",
          "andas i en fyrkant", "kvadrat"
        ];
        const tryggItems = [
          "tumme möter tumme", "tumme-moter-tumme",
          "korsklapp",
          "fysiologiska sucken",
          "pennan",
          "pennan med kompis",
          "tumme möter tumme med kompis",
          "roboten",
          "gemensamma andetag"
        ];

        const isStressEx = stressItems.some((term) => titleLower.includes(term) || slugLower.includes(term));
        const isStudieEx = studieItems.some((term) => titleLower.includes(term) || slugLower.includes(term));
        const isTryggEx = tryggItems.some((term) => titleLower.includes(term) || slugLower.includes(term));

        if (selectedIntervention === "Trygghet") {
          if (!isTryggEx) return false;
        } else if (selectedIntervention === "Stresshantering") {
          if (!isStressEx) return false;
        } else if (selectedIntervention === "Studieteknik") {
          if (!isStudieEx) return false;
        } else {
          if (!isStressEx && !isStudieEx && !isTryggEx) {
            return false;
          }
        }
      } else if (selectedCategory !== "Alla kategorier") {
        const cats = ex.categories && ex.categories.length > 0 ? ex.categories : [ex.category];
        if (!cats.some((c) => c.toLowerCase() === selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Duration match
      if (selectedDuration !== "Alla längder") {
        if (!ex.duration_tag.toLowerCase().includes(selectedDuration.toLowerCase())) {
          return false;
        }
      }

      // Grade match (supports both 'Förskolan' and 'Förskola')
      if (selectedGrade !== "Alla årskurser") {
        const matchesGrade = ex.level_tags.some((lvl) => {
          if (lvl.toLowerCase() === selectedGrade.toLowerCase()) return true;
          if (selectedGrade === "Förskolan" && (lvl === "Förskola" || lvl === "Förskolan")) return true;
          return false;
        });
        if (!matchesGrade) return false;
      }

      // Tweak match (supports both 'Stress och oro' and 'Oro och ångest')
      if (selectedTweak !== "Alla anpassningar") {
        const matchesTweak = ex.tweak_tags.some((t) => {
          if (t.toLowerCase() === selectedTweak.toLowerCase()) return true;
          if (selectedTweak === "Stress och oro" && (t === "Oro och ångest" || t === "Stress och oro")) return true;
          return false;
        });
        if (!matchesTweak) return false;
      }

      return true;
    });
  }, [exercises, searchQuery, selectedCategory, selectedDuration, selectedGrade, selectedTweak, selectedIntervention]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("Alla kategorier");
    setSelectedDuration("Alla längder");
    setSelectedGrade("Alla årskurser");
    setSelectedTweak("Alla anpassningar");
    setSelectedIntervention("Alla interventioner");
  };

  // GATED VIEW WHEN NOT LOGGED IN
  if (!user) {
    return (
      <div className="space-y-12 pb-20">
        <PageHero
          badge="Kostnadsfritt för skolpersonal"
          badgeIcon={<Lock className="w-3.5 h-3.5" />}
          title="Skapa ett gratis konto för att öppna Kunskapsbiblioteket"
          description="Som lärare, förskollärare, elevhälsa eller skolledare får du kostnadsfri tillgång till över 125 filmade övningar, mikropauser och lärarhandledningar."
          bgImage="/images/heroes/classroom_stretching.jpg"
          bgAlt="Elever i klassrummet som stretchar och gör yoga"
          align="center"
          objectPosition="object-[center_22%]"
        />

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left column: What you get */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-turquoise/15 text-brand-dark text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-turquoise" />
                <span>Allt detta ingår gratis</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                Fungerar direkt i klassrummet och förskolan
              </h2>
              <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
                Övningarna kräver varken förkunskaper, ombyte eller yogamattor. Starta en film på 1–5 minuter direkt på projektorn eller i samlingen.
              </p>

              <ul className="space-y-3.5 pt-2">
                {[
                  "Över 125 instruktionsfilmer för förskola, grundskola och gymnasium",
                  "Filtrera på syfte: Studieteknik, Stresshantering och Trygghet",
                  "Anpassat material med bildstöd, NPF-anpassningar och anpassad skola",
                  "Nedladdningsbara PDF-handledningar för lärare och elevhälsa",
                  "Spara dina favoritövningar och synka med Skolyoga-appen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-dark">
                    <CheckCircle2 className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                  Vill ni ha hjälp med implementering?
                </div>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  Utöver vårt kostnadsfria bibliotek erbjuder vi vår populära <strong>100h-utbildning</strong> och praktiska workshops för hela personalgruppen.
                </p>
                <Link
                  href="/utbildningar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:underline pt-1"
                >
                  <span>Läs mer om våra utbildningar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right column: Registration / Login Card */}
            <div className="lg:col-span-7">
              <LoginFormCard initialTab="register" />
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      
      {/* Full-bleed Edge-to-Edge Hero Banner with Authentic Classroom Stretching Photo */}
      <PageHero
        badge={`${exercises.length} digitala övningar för skolan`}
        badgeIcon={<BookOpen className="w-3.5 h-3.5" />}
        title="Skolyogas Kunskapsbibliotek"
        description="Här hittar du vårt digitala material. Du kan snabbt och enkelt hitta en övning som passar dig och dina elevers behov."
        bgImage="/images/heroes/classroom_stretching.jpg"
        bgAlt="Elever i klassrummet som stretchar och gör yoga"
        align="center"
        objectPosition="object-[center_22%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">

      {/* Filters */}
      <ExerciseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        selectedTweak={selectedTweak}
        onTweakChange={setSelectedTweak}
        selectedIntervention={selectedIntervention}
        onInterventionChange={setSelectedIntervention}
        onReset={handleReset}
        totalCount={exercises.length}
        filteredCount={filteredExercises.length}
      />

      {/* 6-veckorsinterventioner spotlight banner */}
      {selectedCategory === "6-veckorsinterventioner" && (
        <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl border border-[#E3DFC9] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm animate-in fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/15 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>6-veckorsinterventioner för skolan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-cardo text-brand-dark">
              {selectedIntervention === "Alla interventioner"
                ? "Interventioner: Trygghet, Stresshantering & Studieteknik"
                : `6-veckorsintervention: ${selectedIntervention}`}
            </h3>
            <p className="text-sm text-brand-darkGrey max-w-2xl leading-relaxed">
              Strukturerade program med handledning och anpassade övningar vecka för vecka. Här visas övningarna kopplade till interventionen. Du kan också öppna hela programmet med lektionsplanering.
            </p>
          </div>
          <Link
            href="/program"
            className="px-6 py-3 rounded-full bg-brand-purple text-white font-semibold text-xs sm:text-sm hover:bg-[#781b61] transition-all shrink-0 shadow-sm flex items-center gap-2"
          >
            <span>Öppna hela programmet</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Exercises Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={(ex) => setSelectedExercise(ex)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E3DFC9] p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-brand-sand text-brand-darkGrey flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-cardo text-brand-dark mb-2">Inga övningar matchade dina filter</h3>
          <p className="text-sm text-brand-darkGrey max-w-md mx-auto mb-6">
            Prova att justera sökord eller nollställa något av filtren för att hitta vad du söker.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-brand-dustyPurple text-white text-sm font-semibold hover:bg-[#781b61] transition-colors shadow-sm"
          >
            Återställ alla filter
          </button>
        </div>
      )}

      {/* UPSELL BANNER FOR LOGGED-IN SCHOOL STAFF: 100h Training & Implementation */}
      <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl border-2 border-brand-purple/25 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/25 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Nästa steg för dig och din skola</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cardo text-brand-dark">
              Vill du ha mer och få hjälp att implementera övningarna?
            </h2>
            <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed max-w-2xl">
              När du har börjat använda övningarna i vardagen kan du fördjupa din kunskap genom vår <strong>100h-utbildning till Skolyogakonsult</strong> eller boka en <strong>praktisk workshop</strong> för ditt arbetslag. Då får ni verktygen för att implementera studiero, trygghet och proaktivt hälsoarbete i hela skolan eller förskolan.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <Link
              href="/utbildningar"
              className="px-6 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-all shadow-sm text-center flex items-center justify-center gap-2"
            >
              <span>Läs om 100h-utbildningen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/kontakt"
              className="px-6 py-3.5 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all text-center"
            >
              Få hjälp med implementering
            </Link>
          </div>
        </div>
      </div>

      {/* ANALOGT MATERIAL & HANDLEDNINGAR (PDF) */}
      <div id="analogt-material" className="mt-16 pt-12 border-t border-[#E3DFC9] space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyTurquoise/20 text-[#1B6465] text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Analogt material & Dokument</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              Nedladdningsbara handledningar & PDF:er
            </h2>
            <p className="text-sm text-brand-darkGrey mt-1 max-w-2xl">
              Skriv ut och ta med till klassrummet, arbetslaget eller elevhälsan. Alla handledningar är kostnadsfria att ladda ner för skolor och pedagoger.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Lärarhandledning NPF",
              description: "Metoder, anpassningar och strategier för elever med neuropsykiatriska funktionsnedsättningar.",
              file: "/documents/Lararhandledning-NPF.pdf",
              badge: "NPF-anpassning",
              size: "7.5 MB",
            },
            {
              title: "Lärarhandledning Stress & Oro",
              description: "Konkreta verktyg och övningar för att lugna ett stressat nervsystem och skapa trygghet.",
              file: "/documents/Lararhandledning-stress-och-oro.pdf",
              badge: "Stresshantering",
              size: "7.3 MB",
            },
            {
              title: "Handledning: Anpassad grundskola",
              description: "Pedagogiskt anpassat material i fyra nivåer för elever i anpassad skola och träningsskola.",
              file: "/documents/Anpassat-material-handledning-anpassad-skola.pdf",
              badge: "Anpassad skola",
              size: "3.3 MB",
            },
            {
              title: "Skolyoga – Ett evidensbaserat verktyg",
              description: "Sammanställning av neurovetenskaplig forskning, källor och effekter av skolyoga i skolan.",
              file: "/documents/Skolyoga-ett-evidensbaserat-verktyg.pdf",
              badge: "Forskning & Evidens",
              size: "138 KB",
            },
            {
              title: "Skolyoga Effektrapport",
              description: "Vetenskaplig utvärdering och resultat från klassrumsstudier och skolenkäter.",
              file: "/documents/Skolyoga-Effektrapport-2025.pdf",
              badge: "Utvärdering",
              size: "13.8 MB",
            },
            {
              title: "Hemmayoga för vårdnadshavare & elever",
              description: "Kort informationsblad och enkla övningar att använda hemma vid läxläsning och vila.",
              file: "/documents/Hemmayoga-Kort-info-till-vardnadshavare-och-elever.pdf",
              badge: "Hem & Skola",
              size: "1.4 MB",
            },
          ].map((doc) => (
            <div
              key={doc.title}
              className="bg-white rounded-2xl border border-[#E3DFC9] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-sand text-brand-dark border border-[#E3DFC9]">
                    {doc.badge}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">{doc.size}</span>
                </div>
                <h3 className="font-bold font-cardo text-lg text-brand-dark group-hover:text-brand-dustyPurple transition-colors mb-2">
                  {doc.title}
                </h3>
                <p className="text-xs text-brand-darkGrey leading-relaxed mb-6">
                  {doc.description}
                </p>
              </div>

              <a
                href={doc.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-brand-sand hover:bg-brand-dustyPurple hover:text-white border border-[#D5D0BE] text-brand-dark text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ladda ner PDF</span>
              </a>
            </div>
          ))}
        </div>
      </div>

        {/* Video Modal */}
        <VideoPlayerModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />

      </div>
    </div>
  );
}

export default function KunskapsbiblioteketPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-brand-darkGrey">Laddar kunskapsbiblioteket...</div>}>
      <KunskapsbibliotekContent />
    </Suspense>
  );
}
