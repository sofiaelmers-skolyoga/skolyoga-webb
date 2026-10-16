"use client";

import React, { useEffect } from "react";
import { X, Heart, Lock, Clock, Sparkles, UserPlus, CheckCircle2 } from "lucide-react";
import { Exercise } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { formatDuration } from "@/lib/utils";
import { trackVideoPlay } from "@/lib/analytics";
import Link from "next/link";

interface VideoPlayerModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export function VideoPlayerModal({ exercise, onClose }: VideoPlayerModalProps) {
  const { user, isFavorite, toggleFavorite, addRecentlyWatched } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (exercise && (!exercise.is_protected || user)) {
      addRecentlyWatched(exercise.id);
      trackVideoPlay(exercise.id, exercise.title, exercise.category);
    }
  }, [exercise, user, addRecentlyWatched]);

  if (!exercise) return null;

  const favorited = isFavorite(exercise.id);
  const isLocked = exercise.is_protected && !user;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Stresshantering":
      case "Stress":
        return "bg-brand-warmYellow/35 text-[#855B00] border-brand-warmYellow/60";
      case "Fokus":
      case "Studieteknik":
        return "bg-brand-dustyTurquoise/20 text-[#1B6465] border-brand-dustyTurquoise/40";
      case "Trygghet":
        return "bg-brand-dustyPink/25 text-[#9D2866] border-brand-dustyPink/50";
      default:
        return "bg-brand-sand text-brand-dark border-[#D5D0BE]";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E3DFC9] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE8DC] bg-brand-sand">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(exercise.category)}`}>
              {exercise.category}
            </span>
            <span className="text-xs text-brand-darkGrey font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(exercise.duration_tag, exercise.duration_formatted)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(exercise.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#E3DFC9] hover:border-brand-dustyPurple transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorited ? "fill-brand-dustyPink text-brand-dustyPink" : "text-brand-darkGrey"
                }`}
              />
              <span>{favorited ? "Sparad i favoriter" : "Spara favorit"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
              aria-label="Stäng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video w-full bg-black">
          {isLocked ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-900 text-white">
              <div className="w-16 h-16 rounded-full bg-brand-warmYellow/20 text-brand-warmYellow flex items-center justify-center mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-cardo mb-2">Denna övning kräver inloggning</h3>
              <p className="text-sm text-stone-300 max-w-md mb-6 leading-relaxed">
                Skapa ett kostnadsfritt pedagogkonto eller logga in för att få 
                obegränsad tillgång till alla övningar i klassrummet. Samma inlogg fungerar i appen!
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/logga-in"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-brand-dustyPurple text-white font-medium text-sm shadow-md hover:bg-[#781b61] transition-colors"
                >
                  Logga in eller skapa konto
                </Link>
              </div>
            </div>
          ) : exercise.youtube_id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${exercise.youtube_id}?autoplay=1&rel=0&modestbranding=1`}
              title={exercise.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Video kunde inte laddas.
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">{exercise.title}</h2>
            
            <div className="flex flex-wrap items-center gap-1.5">
              {exercise.level_tags.map((lvl) => (
                <span
                  key={lvl}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-brand-sand text-stone-700 border border-[#E3DFC9]"
                >
                  {lvl}
                </span>
              ))}
              {exercise.tweak_tags.map((twk) => (
                <span
                  key={twk}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-brand-dustyTurquoise/15 text-[#1B6465] border border-brand-dustyTurquoise/30"
                >
                  {twk}
                </span>
              ))}
            </div>
          </div>

          {exercise.description && (
            <div className="text-sm text-brand-darkGrey leading-relaxed bg-brand-sand p-4 rounded-xl border border-[#E3DFC9]">
              <h4 className="font-semibold text-brand-dark mb-1">Om övningen:</h4>
              <p>{exercise.description}</p>
            </div>
          )}

          {/* Teacher Guide Box */}
          <div className="border border-brand-dustyTurquoise/40 bg-brand-dustyTurquoise/10 rounded-xl p-4 text-xs text-stone-700 space-y-2">
            <div className="font-bold text-teal-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-brand-dustyTurquoise" />
              <span>Att tänka på i klassrummet</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-brand-darkGrey">
              <li>Låt eleverna ställa sig bakom stolen eller sitta bekvämt med fötterna i golvet.</li>
              <li>Övningen är utformad för att kunna göras i vanliga skolkläder utan förberedelser.</li>
              <li>Gör övningen tillsammans med klassen för att spegla lugn och samreglering.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
