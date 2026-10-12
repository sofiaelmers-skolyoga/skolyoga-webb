"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Sparkles, Check, ArrowRight, FileText, ArrowLeft, Heart, ShieldCheck, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function TestaYogaklassPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Week 2 Yoga Class details
  const yogaClass = {
    title: "Sympatiska spänningskedjan",
    weekNumber: 2,
    programTitle: "Hemmayoga (Vecka 2)",
    exerciseName: "Krona",
    duration: "22 minuter",
    videoUrl: "https://www.youtube.com/embed/8eI_y8YiInM?autoplay=1",
    pdfUrl: "/documents/Vecka-2-Spanningar-i-kroppen.pdf",
    description:
      "Vid stress och spänning aktiveras vissa delar av kroppen extra mycket, t.ex. nacke, axlar, höfter och käken. När vi känner oss stressade drar kroppen automatiskt upp axlarna mot öronen för att skydda oss. Genom att medvetet röra på och mjuka upp nacke och axlar ”lurar” vi hjärnan att förstå att faran är över, vilket minskar stressen i hela kroppen.",
    instructions: [
      "Genomför passet i en bekväm sittande eller liggande ställning i lugn hemmiljö.",
      "Gör rörelserna kravlöst i din egen takt och pausa när du vill.",
      "Notera var spänningar sätter sig och mjuka upp axlar, nacke och käke medvetet.",
    ],
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Hemmayoga • Gratis yogaklass"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        title={yogaClass.title}
        description="Ett 22-minuters guidat yogapass för nervsystemsreglering och att släppa djupt sittande spänningar i nacke, axlar och rygg. Helt kravlöst att testa direkt."
        bgImage="/images/heroes/namaste_hands.jpg"
        bgAlt="Yogaklass bakgrund"
        align="center"
        objectPosition="object-[center_35%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Back button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-darkGrey hover:text-brand-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tillbaka till startsidan</span>
          </Link>
        </div>

      {/* Video Player Box */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-4 sm:p-6 shadow-sm overflow-hidden">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-brand-dark shadow-inner">
          {isPlaying ? (
            <iframe
              src={yogaClass.videoUrl}
              title={yogaClass.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-brand-dustyPurple/90 to-[#2A2A2A]">
              <Image
                src="/images/photos/photo_2.jpg"
                alt="Yogaklass förhandsvisning"
                fill
                className="object-cover opacity-60"
              />
              <div className="relative z-10 text-center space-y-4 p-6">
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-brand-warmYellow text-brand-dark flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform group cursor-pointer"
                  aria-label="Starta yogaklassen"
                >
                  <Play className="w-8 h-8 fill-brand-dark translate-x-0.5 group-hover:scale-105 transition-transform" />
                </button>
                <div className="text-white space-y-1 drop-shadow-md">
                  <p className="font-bold font-cardo text-xl sm:text-2xl">Starta klassen (22 min)</p>
                  <p className="text-xs text-white/90">Klicka för att spela upp direkt</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EBE8DC]">
          <div className="flex items-center gap-3">
            <a
              href={yogaClass.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-sand border border-[#E3DFC9] hover:border-brand-dustyPurple text-xs font-semibold text-brand-dark transition-all"
            >
              <FileText className="w-4 h-4 text-brand-dustyPurple" />
              <span>Ladda ner arbetsmaterial (PDF)</span>
            </a>
          </div>

          <Link
            href="/program/yTk3wFhl1s011CoBYPpY"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-dustyPurple hover:underline"
          >
            <span>Se hela Hemmayoga-programmet (6 veckor) &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Class Description & Background */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-8 rounded-3xl border border-[#E3DFC9] shadow-sm space-y-4">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">
            Om det här passet
          </h2>
          <p className="text-sm text-brand-darkGrey leading-relaxed">
            {yogaClass.description}
          </p>
        </div>

        <div className="bg-brand-sand p-8 rounded-3xl border border-[#E3DFC9] shadow-sm space-y-4">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">
            Gör så här
          </h2>
          <ul className="space-y-3 text-sm text-brand-dark">
            {yogaClass.instructions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-brand-dustyTurquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-brand-dustyTurquoise" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next steps CTA */}
      <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand p-8 sm:p-12 rounded-3xl border border-[#E3DFC9] text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
          Vill du ha fler klasser och dagliga mikropauser?
        </h3>
        <p className="text-sm text-brand-darkGrey max-w-xl mx-auto leading-relaxed">
          I Skolyogas digitala program och Kunskapsbibliotek hittar du över 120 övningar, kompletta 6-veckorsprogram och klassrumsanpassade verktyg.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/program/yTk3wFhl1s011CoBYPpY"
            className="px-6 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all"
          >
            Gå till Hemmayoga-programmet
          </Link>
          <Link
            href="/kunskapsbiblioteket"
            className="px-6 py-3.5 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all"
          >
            Utforska Kunskapsbiblioteket
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}
