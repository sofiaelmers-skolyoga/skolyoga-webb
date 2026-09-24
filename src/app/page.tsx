"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2, Play, Users, BookOpen, ShieldCheck, Heart, Clock, Smartphone, Star, Check } from "lucide-react";
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
      <section className="relative pt-10 md:pt-16 lg:pt-20 overflow-hidden">
        
        {/* Soft background ambient gradient with graphic profile colors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] pointer-events-none opacity-50">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-dustyPink/25 rounded-full blur-3xl" />
          <div className="absolute top-16 right-1/4 w-96 h-96 bg-brand-dustyTurquoise/25 rounded-full blur-3xl" />
          <div className="absolute top-36 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-warmYellow/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Pill Badge with emblem */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E3DFC9] text-brand-dark text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <div className="w-4 h-4 relative shrink-0">
              <Image
                src="/images/emblem_turquoise.png"
                alt="Emblem"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>Evidensbaserad metod för klassrummet</span>
          </div>

          {/* Heading in Cardo Serif font */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-cardo tracking-tight text-brand-dark max-w-4xl mx-auto leading-[1.18]">
            Ge eleverna verktyg för <span className="text-brand-dustyPurple underline decoration-brand-dustyPink decoration-2 underline-offset-4">självreglering</span>, fokus och studiero.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-brand-darkGrey max-w-2xl mx-auto leading-relaxed">
            Korta, kroppsbaserade övningar (1–5 minuter) som hjälper elever och skolpersonal att 
            reglera stress och hitta lugn mitt i skoldagen. Ingen tidigare erfarenhet eller ombyte krävs.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kunskapsbiblioteket"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-dustyPurple text-white font-semibold text-base shadow-lg shadow-brand-dustyPurple/20 hover:bg-[#781b61] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Utforska 125 övningar</span>
            </Link>

            <Link
              href="/utbildningar"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-base hover:bg-stone-50 hover:border-brand-darkGrey transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Utbildning för er skola</span>
              <ArrowRight className="w-4 h-4 text-brand-dustyPurple" />
            </Link>
          </div>

          {/* Key Value Stats - Linjer och färgblock */}
          <div className="mt-16 pt-10 border-t border-[#E3DFC9] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/70 border border-[#EBE8DC]">
              <div className="text-3xl font-bold font-cardo text-brand-dark">125+</div>
              <div className="text-xs text-brand-darkGrey font-medium mt-1">Digitala klassrumsövningar</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-[#EBE8DC]">
              <div className="text-3xl font-bold font-cardo text-brand-dustyTurquoise">1–5 min</div>
              <div className="text-xs text-brand-darkGrey font-medium mt-1">Korta pauser i lektionen</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-[#EBE8DC]">
              <div className="text-3xl font-bold font-cardo text-brand-dustyPink">F–9 & Gy</div>
              <div className="text-xs text-brand-darkGrey font-medium mt-1">Anpassat för alla stadier</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-[#EBE8DC]">
              <div className="text-3xl font-bold font-cardo text-brand-dustyPurple">NPF-stöd</div>
              <div className="text-xs text-brand-darkGrey font-medium mt-1">Inkluderande anpassningar</div>
            </div>
          </div>

        </div>
      </section>

      {/* THREE PILLARS (LIVSFÖRMÅGOR) - Tonplattor enl. grafisk profil */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-dustyPurple mb-2">
            Metod & Forskning
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
            Vad är livsförmågor i skolan?
          </h2>
          <p className="mt-4 text-base text-brand-darkGrey leading-relaxed">
            Barn och unga förväntas ofta prestera och sitta still – men de har sällan fått lära sig 
            <em> hur </em> man hanterar stress och reglerar sitt eget nervsystem. Det är där Skolyoga kommer in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 - Dusty Pink tonplatta */}
          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-brand-dustyPink/20 text-brand-dustyPurple flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-brand-dustyPurple" />
            </div>
            <h3 className="text-2xl font-bold font-cardo text-brand-dark mb-3">Självreglering & Lugn</h3>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Enkla andnings- och rörelseövningar som aktiverar kroppens broms (det parasympatiska nervsystemet) 
              och hjälper elever att sänka stressnivån direkt vid bänken.
            </p>
            <div className="mt-6 pt-4 border-t border-[#EBE8DC] flex items-center text-xs font-semibold text-brand-dustyPurple">
              <span>Läs mer om nervsystemet</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Pillar 2 - Dusty Turquoise tonplatta */}
          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-brand-dustyTurquoise/20 text-brand-dustyTurquoise flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-brand-dustyTurquoise" />
            </div>
            <h3 className="text-2xl font-bold font-cardo text-brand-dark mb-3">Fokus & Studieteknik</h3>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              3-minutersövningar som samlar uppmärksamheten efter rast eller lunch, minskar 
              distraktioner och gör hjärnan redo att ta emot ny kunskap.
            </p>
            <div className="mt-6 pt-4 border-t border-[#EBE8DC] flex items-center text-xs font-semibold text-brand-dustyTurquoise">
              <span>Utforska fokusövningar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Pillar 3 - Warm Yellow tonplatta */}
          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-brand-warmYellow/30 text-amber-700 flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold font-cardo text-brand-dark mb-3">Trygghet & Samreglering</h3>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Att göra övningar gemensamt i gruppen skapar en tryggare klassrumsatmosfär, minskar friktion 
              och bygger en gemensam grund för både elever och pedagoger.
            </p>
            <div className="mt-6 pt-4 border-t border-[#EBE8DC] flex items-center text-xs font-semibold text-amber-700">
              <span>Se trygghetsövningar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>
      </section>

      {/* MOBILE APP SHOWCASE - INTEGRATION WITH SKOLYOGA-APP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 md:p-14 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dustyTurquoise/15 text-brand-dark text-xs font-semibold">
                <Smartphone className="w-4 h-4 text-brand-dustyTurquoise" />
                <span>Gemensamt ekosystem: Webb & Mobil</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark leading-tight">
                Skolyoga-appen i mobilen och på klassrummets storskärm
              </h2>
              <p className="text-base text-brand-darkGrey leading-relaxed">
                Logga in med samma konto på datorn och i appen. Dina sparade favoritövningar, 
                anpassade spellistor för klassen och genomförda veckor synkroniseras automatiskt i realtid.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <div className="w-5 h-5 rounded-full bg-brand-dustyTurquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-brand-dustyTurquoise" />
                  </div>
                  <span><strong>Ett enda konto:</strong> Registrera dig här eller i appen och ha allt samlat.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <div className="w-5 h-5 rounded-full bg-brand-dustyTurquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-brand-dustyTurquoise" />
                  </div>
                  <span><strong>Snabbstart i klassrummet:</strong> Kör 1–5 minutersövningar direkt på projektor.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <div className="w-5 h-5 rounded-full bg-brand-dustyTurquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-brand-dustyTurquoise" />
                  </div>
                  <span><strong>Progression & Veckans övning:</strong> Följ terminens tema steg för steg.</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/logga-in"
                  className="px-6 py-3 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm hover:bg-[#781b61] transition-all shadow-sm"
                >
                  Logga in på ditt konto
                </Link>
                <Link
                  href="/kunskapsbiblioteket"
                  className="px-6 py-3 rounded-full bg-brand-sand border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-[#EBE8DC] transition-all"
                >
                  Öppna övningsbanken
                </Link>
              </div>
            </div>

            {/* App Screenshots Mockup */}
            <div className="lg:col-span-5 flex justify-center items-center gap-4">
              <div className="relative w-48 sm:w-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2A2A2A] transform -rotate-2 hover:rotate-0 transition-transform">
                <Image
                  src="/images/screenshot_1_home.jpg"
                  alt="Skolyoga app hemskärm"
                  width={300}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="relative w-44 sm:w-52 rounded-3xl overflow-hidden shadow-xl border-4 border-[#2A2A2A] transform rotate-3 hover:rotate-0 transition-transform hidden sm:block">
                <Image
                  src="/images/screenshot_2_exercise.jpg"
                  alt="Skolyoga app övning"
                  width={300}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR EXERCISES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-dustyPurple mb-2">
              Direkt från kunskapsbiblioteket
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">Populära övningar att testa</h2>
            <p className="text-sm text-brand-darkGrey mt-2">
              Klicka på en övning för att starta direkt med din klass på storskärm.
            </p>
          </div>

          <Link
            href="/kunskapsbiblioteket"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dustyPurple hover:underline transition-colors"
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
        <div className="rounded-3xl bg-white border border-[#E3DFC9] p-8 md:p-14 overflow-hidden relative shadow-sm">
          <div className="max-w-2xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-dustyPink/25 text-brand-dustyPurple text-xs font-bold">
              Skolyoga Konsult & Utbildningar
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark leading-tight">
              Vill du fördjupa dig och bli Skolyogakonsult?
            </h2>
            <p className="text-brand-darkGrey leading-relaxed text-base">
              Vår <strong>100h-utbildning</strong> vänder sig till dig som arbetar i skola, elevhälsa, fritidshem 
              eller som yogalärare och vill få verktyg att leda och implementera livsförmågor 
              i hela skolverksamheten.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/utbildningar"
                className="px-6 py-3 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm hover:bg-[#781b61] transition-colors shadow-sm"
              >
                Läs om 100h-utbildningen
              </Link>
              <Link
                href="/om-skolyoga"
                className="px-6 py-3 rounded-full bg-brand-sand text-brand-dark border border-[#D5D0BE] font-semibold text-sm hover:bg-[#EBE8DC] transition-colors"
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
