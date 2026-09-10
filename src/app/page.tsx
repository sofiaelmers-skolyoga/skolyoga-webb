"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Play, Users, BookOpen, ShieldCheck, Heart, Clock } from "lucide-react";
import { getFeaturedExercises } from "@/lib/exercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { Exercise } from "@/types";

export default function HomePage() {
  const featured = getFeaturedExercises();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 overflow-hidden">
        
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-60">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-rose/30 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-yellow/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-rose/25 border border-brand-rose/40 text-brand-plum text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>Evidensbaserad metod för klassrummet</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-dark max-w-4xl mx-auto leading-[1.15]">
            Ge eleverna verktyg för <span className="text-brand-coral underline decoration-brand-rose/40 decoration-wavy">fokus</span>, trygghet och studiero.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Korta, kroppsbaserade övningar (1–5 minuter) som hjälper elever och skolpersonal att 
            reglera stress och hitta lugn mitt i skoldagen. Ingen erfarenhet eller ombyte krävs.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kunskapsbiblioteket"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-coral text-white font-semibold text-base shadow-lg shadow-brand-coral/25 hover:bg-[#cf4f3d] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Utforska 125 övningar</span>
            </Link>

            <Link
              href="/utbildningar"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-stone-300 text-brand-dark font-semibold text-base hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center justify-center gap-2"
            >
              <span>Utbildning för er skola</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Value Stats */}
          <div className="mt-16 pt-10 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-extrabold text-brand-dark">125+</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Digitala klassrumsövningar</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-teal">1–5 min</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Korta pauser i lektionen</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-coral">F–9 & Gy</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Anpassat för alla stadier</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-plum">NPF-stöd</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Inkluderande anpassningar</div>
            </div>
          </div>

        </div>
      </section>

      {/* THREE PILLARS (LIVSFÖRMÅGOR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Vad är livsförmågor i skolan?
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            Barn och unga förväntas ofta prestera och sitta still – men de har sällan fått lära sig 
            *hur* man hanterar stress och reglerar sitt eget nervsystem. Det är där Skolyoga kommer in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-3xl border border-[#e9e3d8] shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-14 h-14 rounded-2xl bg-brand-rose/25 text-brand-plum flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Självreglering & Lugn</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Enkla andnings- och rörelseövningar som aktiverar kroppens broms (det parasympatiska nervsystemet) 
              och hjälper elever att sänka stressnivån.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-3xl border border-[#e9e3d8] shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/25 text-teal-800 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-teal-700" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Fokus & Studieteknik</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              3-minutersövningar som samlar uppmärksamheten efter rast eller lunch, minskar 
              distraktioner och gör hjärnan redo att ta emot ny kunskap.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-3xl border border-[#e9e3d8] shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-14 h-14 rounded-2xl bg-brand-yellow/30 text-amber-900 flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Trygghet & Samreglering</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Att göra övningar gemensamt i gruppen skapar en tryggare atmosfär, minskar friktion 
              och bygger en stark grund för både elever och pedagoger.
            </p>
          </div>

        </div>
      </section>

      {/* POPULAR EXERCISES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-coral mb-2">
              Direkt från kunskapsbiblioteket
            </div>
            <h2 className="text-3xl font-bold text-brand-dark">Populära övningar att testa</h2>
            <p className="text-sm text-stone-600 mt-2">
              Klicka på en övning för att starta direkt med din klass på storskärm.
            </p>
          </div>

          <Link
            href="/kunskapsbiblioteket"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-coral hover:text-[#cf4f3d] transition-colors"
          >
            <span>Se alla 125 övningar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={(ex) => setSelectedExercise(ex)}
            />
          ))}
        </div>
      </section>

      {/* TRAINING & WORKSHOPS CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#f6ebe9] via-[#faf8f5] to-[#e8f3f3] border border-[#e9e3d8] p-8 md:p-14 overflow-hidden relative shadow-sm">
          <div className="max-w-2xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral text-white text-xs font-semibold">
              Skolyoga Konsult & Utbildningar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
              Vill du fördjupa dig och bli Skolyogakonsult?
            </h2>
            <p className="text-stone-600 leading-relaxed text-base">
              Vår **100h-utbildning** vänder sig till dig som arbetar i skola, elevhälsa, fritidshem 
              eller som yogalärare och vill få verktyg att leda och implementera livsförmågor 
              i hela skolverksamheten.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/utbildningar"
                className="px-6 py-3 rounded-full bg-brand-dark text-white font-semibold text-sm hover:bg-stone-800 transition-colors"
              >
                Läs om utbildningen
              </Link>
              <Link
                href="/om-skolyoga"
                className="px-6 py-3 rounded-full bg-white text-stone-800 border border-stone-300 font-semibold text-sm hover:bg-stone-50 transition-colors"
              >
                Kontakta oss för workshops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal if clicked */}
      <VideoPlayerModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

    </div>
  );
}
