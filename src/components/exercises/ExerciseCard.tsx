"use client";

import React from "react";
import Image from "next/image";
import { Play, Heart, Lock, Clock, Sparkles } from "lucide-react";
import { Exercise } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { formatDuration } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onSelect }: ExerciseCardProps) {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const favorited = isFavorite(exercise.id);

  // Category badge colors
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Stresshantering":
        return "bg-[#e29b9d]/30 text-[#8c2272] border-[#e29b9d]/50";
      case "Fokus":
        return "bg-[#ffe271]/40 text-[#92400e] border-[#ffe271]";
      case "Studieteknik":
        return "bg-[#70b9ba]/30 text-[#0f766e] border-[#70b9ba]/50";
      case "Trygghet":
        return "bg-[#e0614f]/20 text-[#b91c1c] border-[#e0614f]/40";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const isLocked = exercise.is_protected && !user;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e9e3d8] shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Thumbnail Container */}
      <div 
        onClick={() => onSelect(exercise)}
        className="relative aspect-video w-full bg-stone-900 cursor-pointer overflow-hidden"
      >
        {exercise.thumbnail_url ? (
          <img
            src={exercise.thumbnail_url}
            alt={exercise.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-sandDark text-brand-muted">
            <Play className="w-12 h-12 opacity-50" />
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 flex items-center justify-center transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/95 text-brand-coral flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1.5 shadow">
          <Clock className="w-3.5 h-3.5 text-white/80" />
          <span>{formatDuration(exercise.duration_tag, exercise.duration_formatted)}</span>
        </div>

        {/* Lock indicator for non-logged in users */}
        {isLocked && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-amber-500/90 text-white text-xs font-medium flex items-center gap-1 shadow">
            <Lock className="w-3 h-3" />
            <span>Konto krävs</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(exercise.id);
          }}
          aria-label="Spara övning som favorit"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow transition-transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorited ? "fill-brand-coral text-brand-coral" : "text-gray-600 hover:text-brand-coral"
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Categories & Tweaks */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${getCategoryColor(exercise.category)}`}>
              {exercise.category}
            </span>
            
            {exercise.tweak_tags.map((tweak) => (
              <span 
                key={tweak} 
                className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[#faf8f5] text-stone-700 border border-stone-200"
              >
                {tweak}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(exercise)}
            className="text-lg font-bold text-brand-dark group-hover:text-brand-coral transition-colors cursor-pointer line-clamp-1"
          >
            {exercise.title}
          </h3>

          {/* Description snippet if any */}
          {exercise.description && (
            <p className="text-xs text-brand-muted mt-1.5 line-clamp-2 leading-relaxed">
              {exercise.description}
            </p>
          )}
        </div>

        {/* Levels / Grades Footer */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex flex-wrap gap-1">
            {exercise.level_tags.length > 0 ? (
              exercise.level_tags.map((lvl) => (
                <span key={lvl} className="text-stone-600 font-medium">
                  {lvl}
                  {exercise.level_tags[exercise.level_tags.length - 1] !== lvl ? " •" : ""}
                </span>
              ))
            ) : (
              <span>Alla åldrar</span>
            )}
          </div>
          {exercise.views_count > 0 && (
            <span className="text-stone-400">{exercise.views_count} visningar</span>
          )}
        </div>

      </div>
    </div>
  );
}
