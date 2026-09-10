"use client";

import React, { useEffect } from "react";
import { X, Heart, Lock, Clock, Sparkles, UserPlus, CheckCircle2 } from "lucide-react";
import { Exercise } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { formatDuration } from "@/lib/utils";
import Link from "next/link";

interface VideoPlayerModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export function VideoPlayerModal({ exercise, onClose }: VideoPlayerModalProps) {
  const { user, isFavorite, toggleFavorite, loginDemo } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!exercise) return null;

  const favorited = isFavorite(exercise.id);
  const isLocked = exercise.is_protected && !user;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-coral/10 text-brand-coral">
              {exercise.category}
            </span>
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(exercise.duration_tag, exercise.duration_formatted)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(exercise.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-stone-200 hover:border-brand-coral transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorited ? "fill-brand-coral text-brand-coral" : "text-stone-500"
                }`}
              />
              <span>{favorited ? "Sparad i favoriter" : "Spara favorit"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
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
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Denna övning kräver inloggning</h3>
              <p className="text-sm text-stone-300 max-w-md mb-6 leading-relaxed">
                Skapa ett kostnadsfritt konto eller logga in med din skolas licens för att få 
                obegränsad tillgång till alla 125 övningar i klassrummet.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/logga-in"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-brand-coral text-white font-medium text-sm shadow-md hover:bg-[#cf4f3d] transition-colors"
                >
                  Logga in / Skapa konto
                </Link>
                <button
                  onClick={() => loginDemo("teacher")}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  Testa med demo-konto direkt
                </button>
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
            <h2 className="text-2xl font-bold text-brand-dark">{exercise.title}</h2>
            
            <div className="flex flex-wrap items-center gap-1.5">
              {exercise.level_tags.map((lvl) => (
                <span
                  key={lvl}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 text-stone-700"
                >
                  {lvl}
                </span>
              ))}
              {exercise.tweak_tags.map((twk) => (
                <span
                  key={twk}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-teal-50 text-teal-800 border border-teal-200"
                >
                  {twk}
                </span>
              ))}
            </div>
          </div>

          {exercise.description && (
            <div className="text-sm text-stone-600 leading-relaxed bg-[#faf8f5] p-4 rounded-xl border border-stone-100">
              <h4 className="font-semibold text-brand-dark mb-1">Om övningen:</h4>
              <p>{exercise.description}</p>
            </div>
          )}

          {/* Teacher Guide Box */}
          <div className="border border-brand-teal/30 bg-teal-50/40 rounded-xl p-4 text-xs text-stone-700 space-y-2">
            <div className="font-bold text-teal-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-brand-teal" />
              <span>Att tänka på i klassrummet</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-stone-600">
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
