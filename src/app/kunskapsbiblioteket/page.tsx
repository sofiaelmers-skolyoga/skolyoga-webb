"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { allExercises } from "@/lib/exercises";
import {
  subscribeToFirestoreExercises,
  seedExercisesToFirestore,
} from "@/lib/firebaseExercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { Exercise } from "@/types";
import { BookOpen, Download, FileText, ExternalLink, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

function KunskapsbibliotekContent() {
  const searchParams = useSearchParams();
  const getParamCategory = () => searchParams.get("kategori") || searchParams.get("category") || "Alla kategorier";
  const getParamTweak = () => searchParams.get("anpassning") || searchParams.get("tag") || "Alla anpassningar";

  const [exercises, setExercises] = useState<Exercise[]>(allExercises);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(getParamCategory());
  const [selectedDuration, setSelectedDuration] = useState("Alla längder");
  const [selectedGrade, setSelectedGrade] = useState("Alla årskurser");
  const [selectedTweak, setSelectedTweak] = useState(getParamTweak());
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Sync state if search params change
  useEffect(() => {
    const cat = searchParams.get("kategori") || searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const tweak = searchParams.get("anpassning") || searchParams.get("tag");
    if (tweak) setSelectedTweak(tweak);
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

      // Category match (supports both string and array of categories)
      if (selectedCategory !== "Alla kategorier") {
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
  }, [exercises, searchQuery, selectedCategory, selectedDuration, selectedGrade, selectedTweak]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("Alla kategorier");
    setSelectedDuration("Alla längder");
    setSelectedGrade("Alla årskurser");
    setSelectedTweak("Alla anpassningar");
  };

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
        onReset={handleReset}
        totalCount={exercises.length}
        filteredCount={filteredExercises.length}
      />

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

      {/* ANALOGT MATERIAL & HANDLEDNINGAR (PDF) */}
      <div id="analogt-material" className="mt-20 pt-16 border-t border-[#E3DFC9] space-y-8">
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
