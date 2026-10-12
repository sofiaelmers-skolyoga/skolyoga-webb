"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { allPrograms } from "@/data/programs";
import { allExercises } from "@/lib/exercises";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { Exercise } from "@/types";
import { 
  User, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  Flame, 
  Heart, 
  BookOpen, 
  Edit3, 
  LogOut, 
  Smartphone, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Check,
  Save,
  X,
  Plus,
  Trash2,
  ListMusic,
  FolderPlus
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { LoginFormCard } from "@/components/auth/LoginFormCard";

export default function ProfilePage() {
  const { 
    user, 
    progress, 
    favorites, 
    recentlyWatched,
    playlists,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    toggleFavorite, 
    toggleWeekCompleted, 
    isWeekCompleted,
    updateUserProfile, 
    logout 
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || "");
  const [school, setSchool] = useState(user?.schoolName || "");
  const [municipality, setMunicipality] = useState(user?.municipality || "");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  // Playlists UI state
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);

  // Active Program: default to Hemmayoga
  const activeProgram = allPrograms.find((p) => p.id === progress.activeProgramId) || allPrograms[0];
  const completedWeeksCount = activeProgram.weeks.filter((w) => isWeekCompleted(w.id)).length;
  const totalWeeksCount = activeProgram.weeks.length;
  const programPercent = Math.round((completedWeeksCount / totalWeeksCount) * 100);

  // Favorite & Recently Watched exercises
  const favIds = favorites.map(String);
  const favoriteExercises = allExercises.filter((ex) => favIds.includes(String(ex.id)));
  const recentExercises = recentlyWatched
    .map((id) => allExercises.find((ex) => String(ex.id) === String(id)))
    .filter(Boolean) as Exercise[];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      fullName: name,
      schoolName: school,
      municipality: municipality,
    });
    setIsEditing(false);
    setSavedFeedback("Profilen uppdaterades framgångsrikt!");
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  // If user is not logged in: display login form directly here
  if (!user) {
    return (
      <div className="space-y-12 pb-20">
        <PageHero
          badge="Min Profil"
          badgeIcon={<User className="w-3.5 h-3.5" />}
          title="Logga in för att se din personliga profil"
          description="När du är inloggad sparas dina avklarade program, favoritövningar och lektionsspellistor. Allt synkas i realtid med Skolyoga-appen i mobilen."
          bgImage="/images/heroes/photoshoot_2119.jpg"
          bgAlt="Skolyoga profil bakgrund"
          align="center"
          objectPosition="object-[center_30%]"
        />

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 -mt-6 sm:-mt-10 relative z-20">
          <LoginFormCard showTitle={false} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero */}
      <PageHero
        badge="Pedagogkonto"
        badgeIcon={<User className="w-3.5 h-3.5" />}
        title={`Välkommen, ${user.fullName}`}
        description="Följ dina framsteg, hantera sparade favoriter och organisera lektionsspellistor synkade med Skolyoga-appen."
        bgImage="/images/heroes/photoshoot_2119.jpg"
        bgAlt="Skolyoga profil bakgrund"
        align="left"
        objectPosition="object-[center_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
      
      {/* Profile Header & Identity Card */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#EBE8DC]">
          
          {/* Avatar and details */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-turquoise/30 bg-brand-sand flex items-center justify-center shrink-0 shadow-inner">
              {user.avatarUrl && !avatarError ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.fullName}
                  fill
                  unoptimized={user.avatarUrl.startsWith("http")}
                  onError={() => setAvatarError(true)}
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/emblem_turquoise.png"
                  alt="Avatar Mandala"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                  {user.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-turquoise/15 text-brand-dark text-xs font-semibold">
                  {user.role === "school_admin" ? "Skolledare" : "Pedagog"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-brand-darkGrey">
                {user.email} • {user.schoolName || "Ingen skola angiven"} {user.municipality ? `(${user.municipality})` : ""}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-brand-turquoise font-medium mt-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Synkad med Skolyoga-appen (Firebase)</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
            <button
              onClick={() => {
                setName(user.fullName);
                setSchool(user.schoolName || "");
                setMunicipality(user.municipality || "");
                setIsEditing(!isEditing);
              }}
              className="px-4 py-2 rounded-full border border-brand-grey/20 text-xs font-semibold text-brand-dark hover:bg-brand-sand transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Avbryt" : "Redigera profil"}</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-brand-sand text-brand-darkGrey hover:text-red-600 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logga ut</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {savedFeedback && (
          <div className="mt-4 p-3 rounded-xl bg-brand-turquoise/15 text-brand-dark text-xs font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-turquoise" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {/* Edit Form Modal/Dropdown */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 p-6 rounded-2xl bg-brand-sand/60 border border-brand-grey/15 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-dark">Uppdatera profiluppgifter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Ditt namn</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-grey/20 text-sm text-brand-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Skolans namn</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="t.ex. Kronans skola"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-grey/20 text-sm text-brand-dark"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Kommun</label>
                <input
                  type="text"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  placeholder="t.ex. Trollhättan"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-grey/20 text-sm text-brand-dark"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full border border-brand-grey/20 text-xs font-semibold text-brand-dark hover:bg-white"
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-brand-purple/90 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Spara ändringar</span>
              </button>
            </div>
          </form>
        )}

        {/* 4 Stats Cards (Parity with Mobile App) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          
          <div className="p-5 rounded-2xl bg-brand-sand/50 border border-brand-grey/10">
            <div className="flex items-center justify-between text-brand-purple mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-darkGrey">Genomförda veckor</span>
              <Award className="w-5 h-5 text-brand-purple" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              {progress.completedWeeks.length} st
            </div>
            <div className="text-[11px] text-brand-darkGrey mt-1">i dina aktiva program</div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-sand/50 border border-brand-grey/10">
            <div className="flex items-center justify-between text-brand-turquoise mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-darkGrey">Tid i studieteknik</span>
              <Clock className="w-5 h-5 text-brand-turquoise" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              {progress.totalMinutes} min
            </div>
            <div className="text-[11px] text-brand-darkGrey mt-1">kroppsbaserad vila & yoga</div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-sand/50 border border-brand-grey/10">
            <div className="flex items-center justify-between text-amber-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-darkGrey">Streak</span>
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              {progress.streakDays} dagar
            </div>
            <div className="text-[11px] text-brand-darkGrey mt-1">aktiva pauser i rad</div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-sand/50 border border-brand-grey/10">
            <div className="flex items-center justify-between text-brand-pink mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-darkGrey">Sparade favoriter</span>
              <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              {favorites.length} st
            </div>
            <div className="text-[11px] text-brand-darkGrey mt-1">snabbstartade övningar</div>
          </div>

        </div>

      </div>

      {/* Active Program Card (Hemmayoga) - Same as App's LinearPercentIndicator */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-brand-turquoise mb-1">
              Ditt aktiva program
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              {activeProgram.title} – {activeProgram.subtitle}
            </h2>
            <p className="text-sm text-brand-darkGrey mt-1">
              Stöd från Folkhälsomyndigheten • {activeProgram.durationWeeks} veckors guidad nervsystemsreglering
            </p>
          </div>

          <Link
            href={`/program/${activeProgram.id}`}
            className="px-6 py-3 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-brand-purple/90 transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Fortsätt programmet</span>
          </Link>
        </div>

        {/* Progress bar */}
        <div className="space-y-2 bg-brand-sand/60 p-5 rounded-2xl border border-brand-grey/10">
          <div className="flex items-center justify-between text-xs font-bold text-brand-dark">
            <span>{completedWeeksCount} av {totalWeeksCount} veckor genomförda</span>
            <span className="text-brand-purple font-extrabold">{programPercent}%</span>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-brand-grey/10">
            <div
              className="h-full bg-brand-turquoise rounded-full transition-all duration-500"
              style={{ width: `${programPercent}%` }}
            />
          </div>
        </div>

        {/* Weeks Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {activeProgram.weeks.map((week) => {
            const isDone = isWeekCompleted(week.id);

            return (
              <div
                key={week.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDone
                    ? "bg-brand-turquoise/5 border-brand-turquoise/30"
                    : "bg-white border-[#E3DFC9] hover:border-brand-grey/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-turquoise uppercase">
                      Vecka {week.weekNumber}
                    </span>
                    <button
                      onClick={() => toggleWeekCompleted(week.id)}
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-colors cursor-pointer ${
                        isDone
                          ? "bg-brand-turquoise text-white"
                          : "bg-brand-sand text-brand-darkGrey hover:bg-brand-yellow/30"
                      }`}
                    >
                      {isDone ? "Klar ✓" : "Markera klar"}
                    </button>
                  </div>
                  <h3 className="text-base font-bold font-cardo text-brand-dark line-clamp-1">
                    {week.title}
                  </h3>
                  <p className="text-xs text-brand-darkGrey mt-1 line-clamp-2">
                    {week.exerciseName}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-grey/10 flex items-center justify-between text-xs">
                  <span className="text-brand-darkGrey">{week.durationMinutes} minuter</span>
                  <Link
                    href={`/program/${activeProgram.id}`}
                    className="text-brand-purple font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Öppna</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Senast visade filmer (Card 33 / [29]) */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-brand-turquoise mb-1">
              Historik
            </div>
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              Senast visade filmer
            </h2>
            <p className="text-sm text-brand-darkGrey mt-1">
              Här sparas filmerna du och klassen nyligen tittat på så att du snabbt kan repetera dem.
            </p>
          </div>
          <Link
            href="/kunskapsbiblioteket"
            className="text-xs font-semibold text-brand-purple hover:underline flex items-center gap-1"
          >
            <span>Kunskapsbiblioteket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentExercises.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-brand-sand/50 border border-dashed border-brand-grey/20 space-y-3">
            <Play className="w-8 h-8 text-brand-grey mx-auto opacity-50" />
            <p className="text-sm text-brand-darkGrey">Du har inte spelat några filmer nyligen.</p>
            <Link
              href="/kunskapsbiblioteket"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-[#781b61] transition-colors"
            >
              <span>Välj en övning att spela</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentExercises.map((ex) => (
              <div
                key={`recent-${ex.id}`}
                className="p-4 rounded-2xl bg-white border border-[#E3DFC9] flex items-center justify-between hover:shadow-sm transition-shadow group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setSelectedExercise(ex)}
                    className="w-10 h-10 rounded-xl bg-brand-turquoise/15 text-brand-turquoise flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 cursor-pointer"
                    title="Spela övning"
                  >
                    <Play className="w-4 h-4 fill-brand-turquoise" />
                  </button>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold font-cardo text-brand-dark truncate">
                      {ex.title}
                    </h3>
                    <p className="text-[11px] text-brand-darkGrey">
                      {ex.duration_formatted} • {ex.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(ex.id)}
                  className="p-2 text-brand-pink hover:text-red-600 transition-colors shrink-0"
                  title={favorites.includes(ex.id) ? "Sparad i favoriter" : "Spara i favoriter"}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(ex.id) ? "fill-brand-pink text-brand-pink" : "text-stone-300 hover:text-brand-pink"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favorite Exercises Section */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              Mina sparade favoritövningar ({favorites.length})
            </h2>
            <p className="text-sm text-brand-darkGrey mt-1">
              Snabbstarta dina favoriter direkt i klassrummet.
            </p>
          </div>
          <Link
            href="/kunskapsbiblioteket"
            className="text-xs font-semibold text-brand-purple hover:underline flex items-center gap-1"
          >
            <span>Utforska fler</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {favoriteExercises.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-brand-sand/50 border border-dashed border-brand-grey/20 space-y-3">
            <Heart className="w-8 h-8 text-brand-grey mx-auto opacity-50" />
            <p className="text-sm text-brand-darkGrey">Du har inte sparat några favoritövningar än.</p>
            <Link
              href="/kunskapsbiblioteket"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple text-white text-xs font-semibold"
            >
              <span>Gå till Kunskapsbiblioteket</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteExercises.map((ex) => (
              <div
                key={ex.id}
                className="p-4 rounded-2xl bg-white border border-[#E3DFC9] flex items-center justify-between hover:shadow-sm transition-shadow group"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedExercise(ex)}
                    className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-105 transition-transform shrink-0"
                  >
                    <Play className="w-4 h-4 fill-brand-purple" />
                  </button>
                  <div>
                    <h3 className="text-sm font-bold font-cardo text-brand-dark line-clamp-1">
                      {ex.title}
                    </h3>
                    <p className="text-[11px] text-brand-darkGrey">
                      {ex.duration_formatted} • {ex.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(ex.id)}
                  className="p-2 text-brand-pink hover:text-red-600 transition-colors"
                  title="Ta bort från favoriter"
                >
                  <Heart className="w-4 h-4 fill-brand-pink" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PLAYLISTS SECTION - Klassrumsspellistor */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-purple mb-1">
              <ListMusic className="w-4 h-4" />
              <span>Klassrumsspellistor ({playlists.length})</span>
            </div>
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              Mina egna spellistor
            </h2>
            <p className="text-sm text-brand-darkGrey mt-1">
              Sätt ihop färdiga serier av favoritövningar för morgonsamling, efter rasten eller innan prov.
            </p>
          </div>

          <button
            onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-dustyPurple hover:bg-[#781b61] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Skapa ny spellista</span>
          </button>
        </div>

        {/* Create playlist form */}
        {isCreatingPlaylist && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newPlaylistTitle.trim()) return;
              createPlaylist(newPlaylistTitle.trim(), newPlaylistDesc.trim());
              setNewPlaylistTitle("");
              setNewPlaylistDesc("");
              setIsCreatingPlaylist(false);
            }}
            className="p-5 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-4"
          >
            <h3 className="text-sm font-bold text-brand-dark font-cardo">Ny spellista</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Titel på spellistan *</label>
                <input
                  type="text"
                  required
                  placeholder="T.ex. Lugn start efter lunch"
                  value={newPlaylistTitle}
                  onChange={(e) => setNewPlaylistTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">Kort beskrivning</label>
                <input
                  type="text"
                  placeholder="T.ex. För klass 4B vid behov av lugn och fokus"
                  value={newPlaylistDesc}
                  onChange={(e) => setNewPlaylistDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsCreatingPlaylist(false)}
                className="px-4 py-2 text-xs font-semibold text-brand-darkGrey hover:text-brand-dark cursor-pointer"
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-brand-dustyPurple text-white text-xs font-semibold shadow hover:bg-[#781b61] cursor-pointer"
              >
                Spara spellista
              </button>
            </div>
          </form>
        )}

        {/* Playlists grid */}
        {playlists.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-brand-sand/50 border border-dashed border-brand-grey/20 space-y-3">
            <ListMusic className="w-8 h-8 text-brand-grey mx-auto opacity-50" />
            <p className="text-sm text-brand-darkGrey">Du har inga spellistor än.</p>
            <button
              onClick={() => setIsCreatingPlaylist(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple text-white text-xs font-semibold"
            >
              <span>Skapa din första spellista</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {playlists.map((pl) => {
              const playlistExercises = pl.exerciseIds
                .map((id) => allExercises.find((ex) => String(ex.id) === String(id)))
                .filter(Boolean) as Exercise[];

              const isExpanded = activePlaylistId === pl.id;

              return (
                <div
                  key={pl.id}
                  className="rounded-2xl border border-[#E3DFC9] bg-white overflow-hidden shadow-xs hover:border-brand-purple/40 transition-colors"
                >
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-brand-sand/40 to-transparent">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold font-cardo text-lg text-brand-dark">{pl.title}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-brand-sand border border-[#E3DFC9] text-[11px] font-semibold text-stone-600">
                          {pl.exerciseIds.length} övningar
                        </span>
                      </div>
                      {pl.description && (
                        <p className="text-xs text-brand-darkGrey">{pl.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                      <button
                        onClick={() => setActivePlaylistId(isExpanded ? null : pl.id)}
                        className="px-4 py-2 rounded-full bg-brand-sand hover:bg-[#EBE8DC] border border-[#D5D0BE] text-brand-dark text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {isExpanded ? "Dölj övningar" : `Visa övningar (${pl.exerciseIds.length})`}
                      </button>

                      {playlistExercises.length > 0 && (
                        <button
                          onClick={() => setSelectedExercise(playlistExercises[0])}
                          className="px-4 py-2 rounded-full bg-brand-dustyPurple hover:bg-[#781b61] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          title="Starta spellistan från början"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Spela alla</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Vill du ta bort spellistan "${pl.title}"?`)) {
                            deletePlaylist(pl.id);
                          }
                        }}
                        className="p-2 text-stone-400 hover:text-red-500 transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
                        title="Ta bort spellista"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded exercises list */}
                  {isExpanded && (
                    <div className="p-5 border-t border-[#EBE8DC] bg-white space-y-3">
                      {playlistExercises.length === 0 ? (
                        <div className="text-center py-6 text-xs text-brand-darkGrey">
                          Spellistan är tom. Lägg till övningar från Kunskapsbiblioteket eller från dina favoriter nedan.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {playlistExercises.map((ex, index) => (
                            <div
                              key={`${pl.id}-${ex.id}-${index}`}
                              className="p-3 rounded-xl bg-brand-sand/30 border border-[#E3DFC9] flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <button
                                  onClick={() => setSelectedExercise(ex)}
                                  className="w-8 h-8 rounded-lg bg-brand-purple/15 text-brand-purple flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer"
                                  title="Spela övning"
                                >
                                  <Play className="w-3.5 h-3.5 fill-brand-purple" />
                                </button>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-brand-dark truncate">{ex.title}</div>
                                  <div className="text-[10px] text-stone-500">{ex.duration_formatted}</div>
                                </div>
                              </div>

                              <button
                                onClick={() => removeFromPlaylist(pl.id, ex.id)}
                                className="text-stone-400 hover:text-red-500 p-1 shrink-0 transition-colors cursor-pointer"
                                title="Ta bort från spellista"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal if playing */}
      <VideoPlayerModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

      </div>
    </div>
  );
}
