"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  CreditCard,
  FileText
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function UtbildningarPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Kompetensutveckling"
        badgeIcon={<Award className="w-3.5 h-3.5" />}
        title="Vi utbildar pedagoger och skolpersonal i skolyoga"
        description="Upplevelsebaserade utbildningar och workshops för förskola, grundskola, anpassad skola och elevhälsa. Prova själv, upplev effekten och ta med konkreta verktyg direkt in i klassrummet."
        bgImage="/images/heroes/classroom_standing.jpg"
        bgAlt="Klassrumsundervisning och utbildning Skolyoga"
        align="center"
        objectPosition="object-[52%_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">

      {/* 100h Utbildning Feature */}
      <section className="bg-white rounded-3xl border border-[#E3DFC9] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyPurple/10 text-brand-dustyPurple text-xs font-bold">
              100 timmar
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              Skolyogautbildning 100h
            </h2>
            <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
              Skolyogas utbildning är unik i sitt slag då den ger konkreta verktyg och kunskap kring hur du kan integrera yoga i skolan, från förskola till gymnasiet. Skolyogas metod består av korta övningar (1–5 min) som går att göra var för sig som en mikropaus eller sätta ihop till ett längre pass.
            </p>

            <div className="space-y-2 text-xs font-semibold text-brand-dark">
              <div className="text-xs uppercase tracking-wider text-brand-dustyPurple font-bold mb-2">För dig som:</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>Är lärare eller skolpersonal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>Arbetar inom elevhälsa eller skolledning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>Möter barn och unga du vill stötta med verktyg för livet</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/utbildningar/100h/anmalan"
                className="px-7 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Jag vill gå utbildningen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs font-bold text-brand-dark">Pris: 11 900 kr inkl. moms</span>
            </div>
          </div>

          <div className="bg-brand-sand p-8 rounded-2xl border border-[#E3DFC9] space-y-4">
            <h3 className="font-bold font-cardo text-lg text-brand-dark">När och hur?</h3>
            
            <div className="space-y-3.5 text-xs text-brand-darkGrey">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-brand-dustyPurple shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Kurshelger:</strong>
                  Datum för hösten 2027 kommer
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-dustyTurquoise shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Upplägg:</strong>
                  Fysiska kurshelger i Stockholm kombinerat med löpande digitala moduler och webbinarier.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-brand-dustyTurquoise shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Målgrupp:</strong>
                  Lärare, fritidspedagoger, elevhälsa, förskollärare och yogalärare.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-brand-warmYellow shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Intyg & Diplom:</strong>
                  Efter genomförd utbildning är du diplomerad Skolyogakonsult och behörig att handleda kollegor.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EBE8DC]">
              <Link
                href="/utbildningar/100h/anmalan"
                className="text-xs font-bold text-brand-dustyPurple hover:underline inline-flex items-center gap-1.5"
              >
                <span>Öppna anmälningsformulär för 100h</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Skolyogas Workshops */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyPink/20 text-brand-dustyPurple text-xs font-bold uppercase tracking-wider">
            <span>Workshops</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
            Skolyogas workshops och skoldagar
          </h2>
          <p className="text-sm text-brand-darkGrey">
            Upplevelsebaserade workshops för hela skolor, arbetslag eller förskolor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl border border-[#E3DFC9] shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-brand-sand overflow-hidden">
              <Image
                src="/images/photos/photo_12.jpg"
                alt="Skolyoga i förskolan"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-cardo text-brand-dark">Skolyoga i förskolan</h3>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  Små barn är ofta närvarande och lekfulla. Genom yoga kan vi uppmuntra barn till närvaro, träna motorik och avslappning. Som pedagog får du med dig verktyg för både din egen skull och barnen.
                </p>
                <div className="text-xs text-brand-dark space-y-1 pt-2 border-t border-[#EBE8DC]">
                  <div><strong>Tidsåtgång:</strong> 2–3 timmar</div>
                  <div><strong>Målgrupp:</strong> Förskollärare och pedagoger</div>
                  <div><strong>Pris:</strong> 15 900 kr exkl. moms</div>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href={`mailto:hej@skolyoga.se?subject=${encodeURIComponent(
                    "Förfrågan: Workshop Skolyoga i förskolan"
                  )}&body=${encodeURIComponent(
                    "Hej Skolyoga!\n\nVi är intresserade av en workshop i förskolan och vill gärna veta mer om datum, upplägg och bokning.\n\nFörskola / Organisation:\nKontaktperson:\nTelefon:"
                  )}`}
                  className="text-xs font-semibold text-brand-dustyPurple hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Boka för er förskola</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E3DFC9] shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-brand-sand overflow-hidden">
              <Image
                src="/images/heroes/photoshoot_2279.jpg"
                alt="Skolyoga i grundskolan och gymnasiet"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-[center_35%]"
              />
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-cardo text-brand-dark">Skolyoga i grundskolan & gymnasiet</h3>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  Praktiska kroppsbaserade övningar för att träna självledarskap, stresshantering, trygghet och studieteknik i klassrummet. Skapar ett lugnt klassrumsklimat och stärker elevernas fokus.
                </p>
                <div className="text-xs text-brand-dark space-y-1 pt-2 border-t border-[#EBE8DC]">
                  <div><strong>Tidsåtgång:</strong> 2–3 timmar</div>
                  <div><strong>Målgrupp:</strong> Lärare, elevhälsa, skolledare</div>
                  <div><strong>Upplägg:</strong> Anpassat efter skolans behov</div>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href={`mailto:hej@skolyoga.se?subject=${encodeURIComponent(
                    "Förfrågan: Workshop Grundskola & Gymnasium"
                  )}&body=${encodeURIComponent(
                    "Hej Skolyoga!\n\nVi är intresserade av Skolyoga för grundskolan/gymnasiet och vill gärna diskutera ett anpassat upplägg för vår skola.\n\nSkola:\nKontaktperson:\nTelefon:"
                  )}`}
                  className="text-xs font-semibold text-brand-dustyPurple hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Kontakta oss för förslag</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E3DFC9] shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-brand-sand overflow-hidden">
              <Image
                src="/images/heroes/konsult_utbildning_card.jpg"
                alt="Hälsofrämjande event för personal"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-[center_30%]"
              />
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-cardo text-brand-dark">Hälsofrämjande event för personal</h3>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  Skolyoga arrangerar hälsofrämjande personaldagar, studiedagar eller retreats med fokus på återhämtning, stressreglering och gemenskap för lärarlaget.
                </p>
                <div className="text-xs text-brand-dark space-y-1 pt-2 border-t border-[#EBE8DC]">
                  <div><strong>Tidsåtgång:</strong> Flexibelt</div>
                  <div><strong>Målgrupp:</strong> Hela skolans personal</div>
                  <div><strong>Syfte:</strong> Återhämtning och kollegial styrka</div>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href={`mailto:hej@skolyoga.se?subject=${encodeURIComponent(
                    "Förfrågan: Hälsofrämjande personaldag / Temadag"
                  )}&body=${encodeURIComponent(
                    "Hej Skolyoga!\n\nVi vill boka en hälsofrämjande personaldag / temadag med Skolyoga.\n\nSkola / Organisation:\nÖnskat datum/period:\nUngefärligt antal deltagare:\nKontaktperson:\nTelefon:"
                  )}`}
                  className="text-xs font-semibold text-brand-dustyPurple hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Kontakta oss för upplägg</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold font-cardo text-brand-dark">
          10/10 deltagare rekommenderar våra utbildningar till en kollega
        </h3>
        <p className="italic text-sm text-brand-darkGrey max-w-2xl mx-auto">
          ”Handgripliga verktyg att förmedla till eleverna. Ny kunskap. Positiv känsla.”
        </p>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-dustyPurple block">
          Skolkurator
        </span>
      </section>

      </div>
    </div>
  );
}
