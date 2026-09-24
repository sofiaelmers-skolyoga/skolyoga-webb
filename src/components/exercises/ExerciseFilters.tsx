"use client";

import React from "react";
import { Search, X, Filter, RotateCcw } from "lucide-react";

interface ExerciseFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDuration: string;
  onDurationChange: (dur: string) => void;
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
  selectedTweak: string;
  onTweakChange: (tweak: string) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export function ExerciseFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDuration,
  onDurationChange,
  selectedGrade,
  onGradeChange,
  selectedTweak,
  onTweakChange,
  onReset,
  totalCount,
  filteredCount,
}: ExerciseFiltersProps) {
  const categories = ["Alla kategorier", "Stresshantering", "Studieteknik", "Trygghet", "Fokus", "För skolpersonal"];
  const durations = ["Alla längder", "1 min", "3 min", "5 min", "10 min"];
  const grades = ["Alla årskurser", "Förskolan", "Lågstadiet", "Mellanstadiet", "Högstadiet", "Gymnasiet"];
  const tweaks = ["Alla anpassningar", "Sittande", "NPF", "Anpassad skola", "Stress och oro"];

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "Alla kategorier" ||
    selectedDuration !== "Alla längder" ||
    selectedGrade !== "Alla årskurser" ||
    selectedTweak !== "Alla anpassningar";

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E3DFC9] shadow-sm mb-8 space-y-6">
      
      {/* Top row: Search Bar and Active Filter Summary */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-darkGrey" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Sök bland övningar (t.ex. 'Flygplanet', 'Andning', 'Fokus')..."
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-brand-sand border border-[#E3DFC9] text-brand-dark placeholder-brand-darkGrey/60 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple/30 focus:border-brand-dustyPurple"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-darkGrey hover:text-brand-dark"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center gap-3 self-end md:self-auto text-sm">
          <span className="text-brand-darkGrey">
            Visar <strong className="text-brand-dark">{filteredCount}</strong> av {totalCount} övningar
          </span>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-dustyPurple hover:bg-brand-dustyPink/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nollställ filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[#EBE8DC]">
        
        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-darkGrey uppercase tracking-wide">
            Kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-darkGrey uppercase tracking-wide">
            Längd
          </label>
          <select
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple/30"
          >
            {durations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-darkGrey uppercase tracking-wide">
            Årskurs
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => onGradeChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple/30"
          >
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Tweaks */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-darkGrey uppercase tracking-wide">
            Anpassning
          </label>
          <select
            value={selectedTweak}
            onChange={(e) => onTweakChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple/30"
          >
            {tweaks.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Quick category chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs no-scrollbar">
        <span className="text-brand-darkGrey font-medium whitespace-nowrap">Snabbval:</span>
        {["Fokus", "Stresshantering", "Trygghet", "NPF", "Sittande", "1 min", "3 min"].map((quick) => {
          const isCat = categories.includes(quick);
          const isDur = durations.includes(quick);
          const isTweak = tweaks.includes(quick);

          const isSelected =
            (isCat && selectedCategory === quick) ||
            (isDur && selectedDuration === quick) ||
            (isTweak && selectedTweak === quick);

          return (
            <button
              key={quick}
              onClick={() => {
                if (isCat) onCategoryChange(selectedCategory === quick ? "Alla kategorier" : quick);
                if (isDur) onDurationChange(selectedDuration === quick ? "Alla längder" : quick);
                if (isTweak) onTweakChange(selectedTweak === quick ? "Alla anpassningar" : quick);
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors border font-medium ${
                isSelected
                  ? "bg-brand-dustyPurple text-white border-brand-dustyPurple shadow-sm"
                  : "bg-brand-sand text-stone-700 border-[#E3DFC9] hover:border-brand-dustyPurple/40"
              }`}
            >
              {quick}
            </button>
          );
        })}
      </div>
    </div>
  );
}
