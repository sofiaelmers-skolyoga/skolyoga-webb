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

  // Category badge colors from official visual manual
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Stresshantering":
        return "bg-brand-dustyPink/25 text-brand-dustyPurple border-brand-dustyPink/50";
      case "Fokus":
        return "bg-brand-warmYellow/35 text-[#735100] border-brand-warmYellow/70";
      case "Studieteknik":
        return "bg-brand-dustyTurquoise/25 text-[#1B6465] border-brand-dustyTurquoise/50";
      case "Trygghet":
        return "bg-brand-dustyPink/20 text-[#8C2272] border-brand-dustyPink/40";
      default:
        return "bg-stone-100 text-stone-700 border-stone-200";
    }
  };

  const isLocked = exercise.is_protected && !user;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E3DFC9] shadow-sm hover:shadow-md transition-all duration-200">
      
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
          <div className="w-full h-full flex items-center justify-center bg-brand-sand text-brand-darkGrey">
            <Play className="w-12 h-12 opacity-40 text-brand-dustyPurple" />
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 flex items-center justify-center transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/95 text-brand-dustyPurple flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
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
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-brand-dustyPurple text-white text-xs font-medium flex items-center gap-1 shadow">
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
              favorited ? "fill-brand-dustyPink text-brand-dustyPink" : "text-gray-500 hover:text-brand-dustyPink"
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
                className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-brand-sand text-stone-700 border border-[#E3DFC9]"
              >
                {tweak}
              </span>
            ))}
          </div>

          {/* Title in Cardo */}
          <h3 
            onClick={() => onSelect(exercise)}
            className="text-lg font-bold font-cardo text-brand-dark group-hover:text-brand-dustyPurple transition-colors cursor-pointer line-clamp-1"
          >
            {exercise.title}
          </h3>

          {/* Description snippet */}
          {exercise.description && (
            <p className="text-xs text-brand-darkGrey mt-1.5 line-clamp-2 leading-relaxed">
              {exercise.description}
            </p>
          )}
        </div>

        {/* Levels / Grades Footer */}
        <div className="mt-4 pt-3 border-t border-[#EBE8DC] flex items-center justify-between text-[11px] text-stone-500">
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
