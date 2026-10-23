"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Heart, 
  Smartphone, 
  Check, 
  BookOpen,
  Award,
  Brain,
  TreeDeciduous,
  Headphones,
  ExternalLink,
  FileText
} from "lucide-react";
import { getFeaturedExercises } from "@/lib/exercises";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { VideoPlayerModal } from "@/components/exercises/VideoPlayerModal";
import { InstagramFeed } from "@/components/InstagramFeed";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Exercise } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const featured = getFeaturedExercises();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { user } = useAuth();

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION - With authentic background photo from Bilder clearly visible */}
      <section className="relative pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-24 lg:pb-28 overflow-hidden border-b border-[#2C2724]/40 bg-[#181614] text-white">
        
        {/* Background photo behind hero - Classroom standing boys */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/heroes/classroom_standing.jpg"
            alt="Skolyoga elever i klassrummet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%] grayscale brightness-[1.10] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />
        </div>

        <div className="relative w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 text-center z-10">
          
          {/* Pill Badge with emblem */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#FFE271] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <div className="w-4 h-4 relative shrink-0">
              <Image
                src="/images/emblem_turquoise.png"
                alt="Mandala emblem"
                width={16}
                height={16}
                className="w-full h-full object-contain brightness-200"
              />
            </div>
            <span>Evidensbaserad metod för skola och förskola</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-cardo tracking-tight text-white max-w-5xl mx-auto leading-[1.12] drop-shadow-md">
            Förutsättningar för{" "}
            <span className="text-[#FFE271] underline decoration-[#FFE271] decoration-2 underline-offset-4">
              lärande
            </span>{" "}
            börjar i{" "}
            <span className="text-[#FFE271] underline decoration-[#FFE271] decoration-2 underline-offset-4">
              kroppen
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-2xl text-stone-100 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-sm">
            Skolyoga är en ideell organisation som ger barn och unga verktyg för stresshantering, studieteknik och trygghet genom kroppsliga övningar anpassade till skolmiljö.
          </p>

        </div>
      </section>

      {/* HEMMAYOGA SECTION */}
      {/* HEMMAYOGA SECTION - Wide & Streamlined */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/40 text-brand-dark text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                <span>Folkhälsomyndigheten</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cardo text-brand-dark">
                Hemmayoga – kostnadsfritt stöd vid skolfrånvaro
              </h2>
              <p className="text-base sm:text-lg text-brand-darkGrey leading-relaxed max-w-2xl">
                Ett digitalt 6-veckorsprogram skapat för elever och familjer som behöver sänka stressen och bygga trygghet hemifrån.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/80 border border-[#EBE8DC]">
                  <div className="font-bold text-sm text-brand-dark font-cardo">Kravlöst</div>
                  <div className="text-xs text-brand-darkGrey mt-1">Deltagande på egna villkor i trygg hemmiljö.</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 border border-[#EBE8DC]">
                  <div className="font-bold text-sm text-brand-dark font-cardo">Nervsystemsreglering</div>
                  <div className="text-xs text-brand-darkGrey mt-1">Pass på 20–30 min och enkla vardagsövningar.</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 border border-[#EBE8DC]">
                  <div className="font-bold text-sm text-brand-dark font-cardo">Helt kostnadsfritt</div>
                  <div className="text-xs text-brand-darkGrey mt-1">Öppet för alla tack vare statligt utvecklingsstöd.</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/program/yTk3wFhl1s011CoBYPpY"
                  className="px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Starta Hemmayoga</span>
                </Link>
                <Link
                  href="/testa-en-yogaklass"
                  className="px-6 py-3.5 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-brand-purple" />
                  <span>Testa en yogaklass</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-56 sm:w-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/photos/photo_2.jpg"
                  alt="Hemmayoga övning"
                  width={320}
                  height={520}
                  className="w-full h-auto object-cover grayscale brightness-[1.05] contrast-[1.05]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS & IMPACT SECTION - Wide */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-14 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3DFC9] text-xs font-bold text-brand-purple uppercase tracking-wider">
            <span>Vår Räckvidd</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-cardo text-brand-dark max-w-4xl mx-auto">
            Över 9 200 barn och unga har fått ta del av Skolyoga under 2025
          </h2>
          <p className="text-base sm:text-lg text-brand-darkGrey max-w-2xl mx-auto leading-relaxed">
            Läs vår effektrapport för att se hur evidensbaserade mikropauser sänker stress och stärker klassrumsklimatet i skolor över hela Sverige.
          </p>
          <div className="pt-2">
            <a
              href="/documents/Skolyoga-Effektrapport-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Läs Effektrapport 2025 (PDF)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* THREE MODULES: STUDIETEKNIK, STRESSHANTERING, TRYGGHET */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-purple">
            Evidensbaserad metod
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cardo text-brand-dark">
            Tre pelare för återhämtning och kunskap
          </h2>
          <p className="text-base sm:text-lg text-brand-darkGrey leading-relaxed">
            Skolyoga skapar optimala förutsättningar för kunskap och stärker elevernas lärande. Praktiska verktyg som reglerar nervsystemet, ger återhämtning och bygger studiero och trygghet i klassrummet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Module 1: Studieteknik (Hjärnan - Skolyogas turkos) */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E3DFC9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-sand border border-[#E3DFC9] flex items-center justify-center p-3">
                <Brain className="w-8 h-8 text-[#70B9BA]" strokeWidth={2.2} />
              </div>
              <h3 className="text-2xl font-bold font-cardo text-brand-dark">Studieteknik</h3>
              <p className="text-sm text-brand-darkGrey leading-relaxed">
                Träna hjärnans förmåga att rikta, behålla och skifta fokus med enkla uppmärksamhetsövningar.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#70B9BA] shrink-0" />
                  <span>Flow & djupfokus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#70B9BA] shrink-0" />
                  <span>Riktad uppmärksamhet</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#70B9BA] shrink-0" />
                  <span>Mental uthållighet</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#EBE8DC]">
              <Link href="/metoden#studieteknik" className="text-xs font-semibold text-[#2A6E70] flex items-center gap-1.5 hover:underline">
                <span>Läs mer om studieteknik</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 2: Stresshantering (Hjärtat - Skolyogas gul) */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E3DFC9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-sand border border-[#E3DFC9] flex items-center justify-center p-3">
                <Heart className="w-8 h-8 text-[#E5A800]" strokeWidth={2.2} />
              </div>
              <h3 className="text-2xl font-bold font-cardo text-brand-dark">Stresshantering</h3>
              <p className="text-sm text-brand-darkGrey leading-relaxed">
                Reglera kroppens stressystem i realtid med medveten andning och återhämtande rörelser.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A800] shrink-0" />
                  <span>Snabb återhämtning</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A800] shrink-0" />
                  <span>Medveten närvaro i kroppen</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A800] shrink-0" />
                  <span>Nervsystemsreglering</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#EBE8DC]">
              <Link href="/metoden#nervsystemet" className="text-xs font-semibold text-[#9A7200] flex items-center gap-1.5 hover:underline">
                <span>Läs mer om stresshantering</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Module 3: Trygghet (Trädet - Skolyogas rosa) */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E3DFC9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-sand border border-[#E3DFC9] flex items-center justify-center p-3">
                <TreeDeciduous className="w-8 h-8 text-[#E29B9D]" strokeWidth={2.2} />
              </div>
              <h3 className="text-2xl font-bold font-cardo text-brand-dark">Trygghet</h3>
              <p className="text-sm text-brand-darkGrey leading-relaxed">
                Bygg trygga relationer, stärkt självmedkänsla och ett tillitsfullt klassrumsklimat.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E29B9D] shrink-0" />
                  <span>Känslohantering & självinsikt</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E29B9D] shrink-0" />
                  <span>Växande tankesätt</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E29B9D] shrink-0" />
                  <span>Medkänsla & gemenskap</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#EBE8DC]">
              <Link href="/metoden#trygghet" className="text-xs font-semibold text-[#B56769] flex items-center gap-1.5 hover:underline">
                <span>Läs mer om trygghet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SPECIALANPASSAT MATERIAL */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-turquoise/15 text-brand-dark text-xs font-bold uppercase tracking-wider">
                <span>Tillgänglighet för alla</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cardo text-brand-dark">
                Anpassat material för varje elevs förutsättningar
              </h2>
              <p className="text-base sm:text-lg text-brand-darkGrey leading-relaxed">
                Alla övningar finns i nivåanpassade format med visuellt bildstöd, tydlig struktur och anpassat tempo för att fungera i alla undervisningsmiljöer.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <Link
                  href="/kunskapsbiblioteket?tag=Anpassad+skola"
                  className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] hover:border-brand-purple transition-all text-sm font-semibold text-brand-dark flex items-center justify-between group"
                >
                  <span>Anpassad grundskola</span>
                  <ArrowRight className="w-4 h-4 text-brand-purple group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/kunskapsbiblioteket?tag=NPF"
                  className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] hover:border-brand-purple transition-all text-sm font-semibold text-brand-dark flex items-center justify-between group"
                >
                  <span>NPF-anpassningar</span>
                  <ArrowRight className="w-4 h-4 text-brand-purple group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/kunskapsbiblioteket?tag=Stress+och+oro"
                  className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] hover:border-brand-purple transition-all text-sm font-semibold text-brand-dark flex items-center justify-between group"
                >
                  <span>Stress & oro</span>
                  <ArrowRight className="w-4 h-4 text-brand-purple group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-lg h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-[#E3DFC9]">
                <Image
                  src="/images/heroes/anpassat_material_card.jpg"
                  alt="Anpassat material och övningar för varje elevs förutsättningar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_35%] grayscale brightness-[1.06] contrast-[1.05] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PODCAST SECTION */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/25 text-brand-purple text-xs font-bold uppercase tracking-wider">
                <Headphones className="w-3.5 h-3.5" />
                <span>Podcast</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cardo text-brand-dark">
                Skolyogapodden
              </h2>
              <p className="text-base sm:text-lg text-brand-darkGrey leading-relaxed">
                Möt skolledare, lärare och kuratorer som delar konkreta erfarenheter av hur yoga och medveten närvaro skapar arbetsro och minskar frånvaro.
              </p>
              
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://open.spotify.com/show/2Bv09fJ70lXWj034M3cK1u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1DB954] text-white text-xs font-semibold shadow hover:opacity-90 transition-opacity"
                >
                  <span>Lyssna på Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://podcasts.apple.com/se/podcast/skolyogapodden/id1531234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-semibold shadow hover:opacity-90 transition-opacity"
                >
                  <span>Apple Podcasts</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 sm:w-56 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/skolyoga_podden_cover.jpg"
                  alt="Skolyogapodden"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-purple">
            Röster från skolan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
            Vad pedagoger och elevhälsa säger
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-dark font-bold text-xs uppercase tracking-wider">
            <span>10 / 10 rekommenderar utbildningen till kollegor</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-xs space-y-4">
            <p className="italic text-base sm:text-lg text-brand-dark leading-relaxed">
              ”Eleverna blir lugnare och mer avslappnade, det blir lugnare stämning i klassrummet.”
            </p>
            <div className="pt-4 border-t border-[#EBE8DC] text-xs font-bold uppercase tracking-wider text-brand-purple">
              Lärare
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-xs space-y-4">
            <p className="italic text-base sm:text-lg text-brand-dark leading-relaxed">
              ”Man blir mer koncentrerad, och ibland är det skönt att bara stänga ögonen och göra något lugnt.”
            </p>
            <div className="pt-4 border-t border-[#EBE8DC] text-xs font-bold uppercase tracking-wider text-brand-turquoise">
              Mellanstadieelev
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-xs space-y-4">
            <p className="italic text-base sm:text-lg text-brand-dark leading-relaxed">
              ”Jag tar med mig praktiska verktyg som eleven kan göra när hen är stressad. Jag tror verkligen på att detta är något bra som många människor skulle ha glädje av.”
            </p>
            <div className="pt-4 border-t border-[#EBE8DC] text-xs font-bold uppercase tracking-wider text-brand-dustyPink">
              Kurator, grundskola
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-xs space-y-4">
            <p className="italic text-base sm:text-lg text-brand-dark leading-relaxed">
              ”Handgripliga verktyg att förmedla till eleverna direkt i klassrummet. Ny kunskap, trygghet och en fantastiskt positiv känsla.”
            </p>
            <div className="pt-4 border-t border-[#EBE8DC] text-xs font-bold uppercase tracking-wider text-amber-700">
              Specialpedagog & kurator
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP SHOWCASE */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 md:p-14 lg:p-16 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-turquoise/15 text-brand-dark text-xs font-semibold">
                <Smartphone className="w-4 h-4 text-brand-turquoise" />
                <span>Webb & Mobilapp</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cardo text-brand-dark leading-tight">
                Allt synkat mellan storskärm och mobil
              </h2>
              <p className="text-base sm:text-lg text-brand-darkGrey leading-relaxed">
                Använd webben på klassrummets projektor eller appen i fickan. Dina favoritövningar och elevprogram synkroniseras sömlöst i realtid.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-brand-sand/60 border border-[#E3DFC9]">
                  <div className="font-bold text-sm text-brand-dark font-cardo">Ett konto</div>
                  <div className="text-xs text-brand-darkGrey mt-1">Samma inloggning på dator och telefon.</div>
                </div>
                <div className="p-4 rounded-2xl bg-brand-sand/60 border border-[#E3DFC9]">
                  <div className="font-bold text-sm text-brand-dark font-cardo">Följ framsteg</div>
                  <div className="text-xs text-brand-darkGrey mt-1">Se minuter av lugn och avklarade pass.</div>
                </div>
                <div className="p-4 rounded-2xl bg-brand-sand/60 border border-[#E3DFC9]">
                  <div className="font-bold text-sm text-brand-dark font-cardo">Kör på tavlan</div>
                  <div className="text-xs text-brand-darkGrey mt-1">1–5 minuters mikropauser i helskärm.</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                {user ? (
                  <Link
                    href="/profil"
                    className="px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-all shadow-sm"
                  >
                    Gå till Min Profil
                  </Link>
                ) : (
                  <Link
                    href="/logga-in"
                    className="px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-all shadow-sm"
                  >
                    Skapa gratis konto
                  </Link>
                )}
                <Link
                  href="/kunskapsbiblioteket"
                  className="px-6 py-3.5 rounded-full bg-brand-sand border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-[#EBE8DC] transition-all"
                >
                  Öppna Kunskapsbiblioteket
                </Link>
              </div>
            </div>

            {/* App Screenshots Mockup */}
            <div className="lg:col-span-5 flex justify-center items-center gap-4">
              <div className="relative w-48 sm:w-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2A2A2A] transform -rotate-2 hover:rotate-0 transition-transform">
                <Image
                  src="/images/app_screenshot_1.png"
                  alt="Skolyoga app hemskärm"
                  width={300}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="relative w-44 sm:w-52 rounded-3xl overflow-hidden shadow-xl border-4 border-[#2A2A2A] transform rotate-3 hover:rotate-0 transition-transform hidden sm:block">
                <Image
                  src="/images/app_screenshot_2.png"
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
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-purple mb-2">
              Kunskapsbiblioteket
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">Populära mikropauser</h2>
            <p className="text-sm text-brand-darkGrey mt-1">
              Starta direkt med klassen på storskärm utan förberedelser.
            </p>
          </div>

          <Link
            href="/kunskapsbiblioteket"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline transition-colors shrink-0"
          >
            <span>Se alla övningar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.slice(0, 4).map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              showPopularBadge={true}
              onSelect={(ex) => setSelectedExercise(ex)}
            />
          ))}
        </div>
      </section>

      {/* TRAINING & WORKSHOPS CALLOUT */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="rounded-3xl bg-white border border-[#E3DFC9] p-8 md:p-12 lg:p-16 overflow-hidden relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/25 text-brand-purple text-xs font-bold">
                Skolyoga Konsult & Utbildning
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cardo text-brand-dark leading-tight">
                Vill du bli Skolyogakonsult?
              </h2>
              <p className="text-brand-darkGrey leading-relaxed text-base sm:text-lg">
                Vår <strong>100h-utbildning</strong> ger pedagoger, elevhälsa och yogalärare verktyg för att implementera självledarskap, stresshantering och studieteknik i hela skolan.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/utbildningar"
                  className="px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-colors shadow-sm"
                >
                  Läs om 100h-utbildningen
                </Link>
                <Link
                  href="/om-skolyoga"
                  className="px-6 py-3.5 rounded-full bg-brand-sand text-brand-dark border border-[#D5D0BE] font-semibold text-sm hover:bg-[#EBE8DC] transition-colors"
                >
                  Boka workshop
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-lg h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-[#E3DFC9]">
                <Image
                  src="/images/heroes/konsult_utbildning_card.jpg"
                  alt="Skolyoga konsult- och lärarutbildning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_35%] grayscale brightness-[1.06] contrast-[1.05] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION SECTION */}
      <NewsletterSection />

      {/* INSTAGRAM FEED SECTION */}
      <InstagramFeed />

      {/* Video Modal if clicked */}
      <VideoPlayerModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

    </div>
  );
}
