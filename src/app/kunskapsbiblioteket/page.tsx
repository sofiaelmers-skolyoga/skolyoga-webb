"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { allExercises } from "@/lib/exercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { Exercise } from "@/types";
import { Sparkles, BookOpen } from "lucide-react";

function KunskapsbibliotekContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "Alla kategorier";
  const initialTweak = searchParams.get("anpassning") || "Alla anpassningar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDuration, setSelectedDuration] = useState("Alla längder");
  const [selectedGrade, setSelectedGrade] = useState("Alla årskurser");
  const [selectedTweak, setSelectedTweak] = useState(initialTweak);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Filter exercises logic
  const filteredExercises = useMemo(() => {
    return allExercises.filter((ex) => {
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

      // Category match
      if (selectedCategory !== "Alla kategorier") {
        if (ex.category !== selectedCategory) return false;
      }

      // Duration match
      if (selectedDuration !== "Alla längder") {
        // e.g. "3 min"
        if (!ex.duration_tag.toLowerCase().includes(selectedDuration.toLowerCase())) {
          return false;
        }
      }

      // Grade match
      if (selectedGrade !== "Alla årskurser") {
        if (!ex.level_tags.includes(selectedGrade)) return false;
      }

      // Tweak match
      if (selectedTweak !== "Alla anpassningar") {
        if (!ex.tweak_tags.includes(selectedTweak)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDuration, selectedGrade, selectedTweak]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("Alla kategorier");
    setSelectedDuration("Alla längder");
    setSelectedGrade("Alla årskurser");
    setSelectedTweak("Alla anpassningar");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/20 text-teal-900 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5 text-brand-teal" />
          <span>125 digitala övningar för skolan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight">
          Kunskapsbiblioteket
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
          Här hittar du korta, evidensbaserade övningar anpassade för att köras direkt i klassrummet. 
          Filtrera på årskurs, önskad längd eller anpassning för att hitta rätt övning för stunden.
        </p>
      </div>

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
        totalCount={allExercises.length}
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
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-2">Inga övningar matchade dina filter</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
            Prova att justera sökord eller nollställa något av filtren för att hitta vad du söker.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-brand-coral text-white text-sm font-semibold hover:bg-[#cf4f3d] transition-colors"
          >
            Återställ alla filter
          </button>
        </div>
      )}

      {/* Video Modal */}
      <VideoPlayerModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

    </div>
  );
}

export default function KunskapsbiblioteketPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Laddar kunskapsbiblioteket...</div>}>
      <KunskapsbibliotekContent />
    </Suspense>
  );
}
