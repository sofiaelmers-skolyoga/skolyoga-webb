"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Plus, ListMusic, Play, Trash2, BookOpen, Clock, Lock, Smartphone, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { allExercises } from "@/lib/exercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { Exercise } from "@/types";

export default function MinaFavoriterPage() {
  const { user, favorites, playlists, createPlaylist, loginDemo } = useAuth();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const favoriteExercises = allExercises.filter((ex) => favorites.includes(ex.id));

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createPlaylist(newTitle.trim(), newDesc.trim());
    setNewTitle("");
    setNewDesc("");
    setIsCreatingPlaylist(false);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-dustyPink/20 text-brand-dustyPurple flex items-center justify-center mx-auto mb-4 border border-brand-dustyPink/40">
          <Heart className="w-8 h-8 fill-brand-dustyPink text-brand-dustyPink" />
        </div>
        <h1 className="text-3xl font-bold font-cardo text-brand-dark mb-3">Mina Sparade Favoriter</h1>
        <p className="text-brand-darkGrey max-w-md mx-auto mb-8 leading-relaxed text-sm">
          Logga in eller skapa ett lärarkonto för att spara dina favoritövningar och 
          bygga egna spellistor för dina lektioner. Samma konto fungerar i Skolyoga-appen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/logga-in"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all"
          >
            Logga in på ditt konto
          </Link>
          <button
            onClick={() => loginDemo("teacher")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-brand-dark border border-[#E3DFC9] font-semibold text-sm hover:bg-stone-50 transition-colors shadow-sm"
          >
            Testa direkt som inloggad lärare (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* User Header & App Sync Status */}
      <div className="bg-white rounded-3xl p-8 border border-[#E3DFC9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-dustyTurquoise text-white flex items-center justify-center text-2xl font-bold font-cardo shadow-sm">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">{user.fullName}</h1>
            <p className="text-xs text-brand-darkGrey mt-1 flex items-center gap-2">
              <span>{user.schoolName || "Lärare / Pedagog"}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium text-[11px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Synkad med Skolyoga-appen
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreatingPlaylist(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-xs sm:text-sm hover:bg-[#781b61] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Skapa ny spellista</span>
          </button>
        </div>
      </div>

      {/* Playlist Creation Modal */}
      {isCreatingPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E3DFC9] shadow-2xl space-y-4">
            <h3 className="text-xl font-bold font-cardo text-brand-dark">Skapa spellista för klassrummet</h3>
            <p className="text-xs text-brand-darkGrey">
              Kombinera övningar som passar din klass (t.ex. morgonsamling, efter rasten eller lugnande mikropaus).
            </p>

            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Namn på spellistan</label>
                <input
                  type="text"
                  required
                  placeholder="t.ex. Morgonfokus Klass 4B"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Beskrivning (valfritt)</label>
                <textarea
                  placeholder="Kort notering om passet..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPlaylist(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-dustyPurple text-white hover:bg-[#781b61]"
                >
                  Spara spellista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Playlists Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ListMusic className="w-5 h-5 text-brand-dustyPurple" />
          <h2 className="text-xl font-bold font-cardo text-brand-dark">Mina klassrums-spellistor</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold font-cardo text-lg text-brand-dark">{playlist.title}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-sand text-brand-dark font-medium border border-[#E3DFC9]">
                    {playlist.exerciseIds.length} övningar
                  </span>
                </div>
                {playlist.description && (
                  <p className="text-xs text-brand-darkGrey leading-relaxed">{playlist.description}</p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#EBE8DC] flex items-center justify-between text-xs">
                <span className="text-stone-400">Skapad</span>
                <Link
                  href="/kunskapsbiblioteket"
                  className="text-brand-dustyPurple hover:underline font-semibold"
                >
                  + Lägg till fler övningar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-brand-dustyPink text-brand-dustyPink" />
            <h2 className="text-xl font-bold font-cardo text-brand-dark">
              Mina sparade övningar ({favoriteExercises.length})
            </h2>
          </div>
          <Link
            href="/kunskapsbiblioteket"
            className="text-xs font-semibold text-brand-dustyPurple hover:underline"
          >
            Hitta fler övningar i biblioteket &rarr;
          </Link>
        </div>

        {favoriteExercises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onSelect={(ex) => setSelectedExercise(ex)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E3DFC9] shadow-sm">
            <Heart className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-cardo text-brand-dark mb-1">Inga sparade favoriter än</h3>
            <p className="text-xs text-brand-darkGrey max-w-sm mx-auto mb-6">
              Klicka på hjärt-ikonen på valfri övning i Kunskapsbiblioteket så sparas den här för snabb åtkomst i klassrummet och i appen.
            </p>
            <Link
              href="/kunskapsbiblioteket"
              className="px-6 py-2.5 rounded-full bg-brand-dustyPurple text-white text-xs font-semibold hover:bg-[#781b61]"
            >
              Till Kunskapsbiblioteket
            </Link>
          </div>
        )}
      </section>

      {/* Video Modal */}
      <VideoPlayerModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

    </div>
  );
}
