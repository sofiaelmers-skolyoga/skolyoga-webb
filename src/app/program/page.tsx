"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { allPrograms } from "@/data/programs";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, CheckCircle2, Clock, ArrowRight, Smartphone, Lock, Play, Award } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { LoginFormCard } from "@/components/auth/LoginFormCard";

export default function ProgramsPage() {
  const { user, progress } = useAuth();

  if (!user) {
    return (
      <div className="space-y-12 pb-20">
        <PageHero
          badge="Kostnadsfritt med pedagogkonto"
          badgeIcon={<Lock className="w-3.5 h-3.5" />}
          title="Skapa ett gratis konto för att öppna våra program"
          description="Få tillgång till strukturerade 6-veckorsprogram för klassrummet, förskolan och hemmet – helt kostnadsfritt när du skapar ett konto."
          bgImage="/images/heroes/kids_yoga_mats.jpg"
          bgAlt="Elever som utövar skolyoga på mattor"
          align="center"
          objectPosition="object-[center_35%]"
        />

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left column: Program overview */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/40 text-brand-dark text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                <span>Färdiga veckoprogram</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                Steg-för-steg-stöd för skola, elevhälsa och hem
              </h2>
              <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
                Våra program hjälper dig att implementera Skolyoga systematiskt under 6 veckor med färdiga pass, korta veckoövningar och utskrivbart arbetsmaterial.
              </p>

              <ul className="space-y-3.5 pt-2">
                {[
                  "6-veckorsinterventioner för Studieteknik, Stresshantering och Trygghet",
                  "Hemmayoga – kostnadsfritt stöd vid problematisk skolfrånvaro (Folkhälsomyndigheten)",
                  "Tydlig struktur vecka för vecka som fungerar direkt i verksamheten",
                  "Synkroniseras automatiskt mellan webb och Skolyoga-appen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-dark">
                    <CheckCircle2 className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                  Vill du gå på djupet?
                </div>
                <p className="text-xs text-brand-darkGrey leading-relaxed">
                  För dig som vill leda arbetet på skolan eller förskolan finns vår <strong>100h-utbildning till Skolyogakonsult</strong>.
                </p>
                <Link
                  href="/utbildningar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:underline pt-1"
                >
                  <span>Läs mer om 100h-utbildningen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right column: Registration / Login Card */}
            <div className="lg:col-span-7">
              <LoginFormCard initialTab="register" />
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Digitala Program"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        title="Strukturerade program för klassrum och hem"
        description="Flerveckorsprogram för nervsystemsreglering, stresshantering och trygghet. Kör i din egen takt, skriv ut arbetsmaterial och följ framstegen på dator och mobil."
        bgImage="/images/heroes/kids_yoga_mats.jpg"
        bgAlt="Elever som utövar skolyoga på mattor"
        align="center"
        objectPosition="object-[center_35%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">

      {/* Progress Sync Banner if user logged in */}
      <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand border border-[#E3DFC9] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-turquoise/20 text-brand-turquoise flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-brand-turquoise">
              Synkad med Skolyoga-appen
            </div>
            <h2 className="text-xl font-bold font-cardo text-brand-dark">
              Välkommen tillbaka, {user.fullName}!
            </h2>
            <p className="text-sm text-brand-darkGrey">
              Du har genomfört <strong>{progress.completedWeeks.length} veckor</strong> och <strong>{progress.completedExercises.length} övningar</strong> ({progress.totalMinutes} minuter lugn och ro).
            </p>
          </div>
        </div>
        <Link
          href="/profil"
          className="px-6 py-2.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-brand-purple/90 transition-all shrink-0 shadow-sm"
        >
          Öppna Min Profil
        </Link>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {allPrograms.map((program) => {
          const completedCount = program.weeks.filter((w) => progress.completedWeeks.includes(w.id)).length;
          const totalCount = program.weeks.length;
          const percent = Math.round((completedCount / totalCount) * 100);
          const programBadges = (program.badges || [program.badge]).filter(Boolean);

          return (
            <div
              key={program.id}
              className="bg-white rounded-3xl border border-[#E3DFC9] p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Badges & Meta */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {programBadges.map((badgeText) => {
                      const isComingSoon = badgeText.toLowerCase() === "kommande";
                      return (
                        <span
                          key={badgeText}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isComingSoon
                              ? "bg-[#FFE271]/50 text-[#543b00] border border-[#FFE271]"
                              : "bg-brand-sand text-brand-dark border border-brand-grey/15"
                          }`}
                        >
                          {badgeText}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-xs text-brand-darkGrey font-medium flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-brand-grey" />
                    {program.durationWeeks} veckor
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-2xl font-bold font-cardo text-brand-dark group-hover:text-brand-purple transition-colors">
                  {program.title}
                </h2>
                <div className="text-xs font-semibold text-brand-turquoise mt-1 mb-3">
                  {program.subtitle}
                </div>

                <p className="text-sm text-brand-darkGrey leading-relaxed mb-6">
                  {program.description}
                </p>

                {/* Progress bar if logged in and active */}
                {program.isActive && (
                  <div className="mb-6 p-4 rounded-xl bg-brand-sand/60 border border-brand-grey/10">
                    <div className="flex justify-between items-center text-xs font-semibold text-brand-dark mb-1.5">
                      <span>Din utveckling:</span>
                      <span className="text-brand-turquoise">{completedCount} av {totalCount} klara ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-brand-grey/10">
                      <div
                        className="h-full bg-brand-turquoise rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Weeks preview checklist */}
                <div className="space-y-2 border-t border-[#EBE8DC] pt-4 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-grey mb-2">
                    {program.isActive ? "Innehåll i programmet:" : "Kommande innehåll:"}
                  </div>
                  {program.weeks.map((week) => {
                    const isDone = program.isActive && progress.completedWeeks.includes(week.id);
                    return (
                      <div
                        key={week.id}
                        className="flex items-center gap-2.5 text-xs text-brand-dark"
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isDone
                              ? "bg-brand-turquoise text-white"
                              : "bg-brand-sand text-brand-darkGrey border border-brand-grey/20"
                          }`}
                        >
                          {isDone ? "✓" : week.weekNumber}
                        </div>
                        <span className={`line-clamp-1 ${isDone ? "line-through text-brand-darkGrey" : "font-medium"}`}>
                          Vecka {week.weekNumber}: {week.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              {program.isActive ? (
                <Link
                  href={`/program/${program.id}`}
                  className="w-full py-3.5 px-6 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-brand-purple/90 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Starta / Öppna program</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="w-full py-3.5 px-6 rounded-full bg-brand-sand/70 text-brand-darkGrey font-semibold text-sm border border-brand-grey/20 flex items-center justify-center gap-2 cursor-default select-none">
                  <Clock className="w-4 h-4 text-brand-grey" />
                  <span>Kommande program</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* UPSELL BANNER: 100h Training & Implementation Support */}
      <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl border-2 border-brand-purple/25 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/25 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Fördjupning & Implementeringsstöd</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              Vill du leda Skolyoga på din skola eller förskola?
            </h2>
            <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed max-w-2xl">
              Vår <strong>100h-utbildning till Skolyogakonsult</strong> ger dig fördjupad kunskap i neurovetenskap, stressreglering och metodik – samt personlig handledning för att implementera programmen i hela kollegiet.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <Link
              href="/utbildningar"
              className="px-6 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm hover:bg-[#781b61] transition-all shadow-sm text-center flex items-center justify-center gap-2"
            >
              <span>Upptäck 100h-utbildningen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/kontakt"
              className="px-6 py-3.5 rounded-full bg-white border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-stone-50 transition-all text-center"
            >
              Boka workshop för arbetslaget
            </Link>
          </div>
        </div>
      </div>

      {/* App Synergy Section */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-turquoise/15 text-brand-dark text-xs font-bold">
              <Smartphone className="w-3.5 h-3.5 text-brand-turquoise" />
              <span>Skolyoga-appen i iOS & Android</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              Följ dina program direkt i mobilen
            </h2>
            <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
              Programmen är fullt integrerade med Skolyogas mobilapp. När du loggar in med ditt konto ser du dina aktiva program, påminnelser och offline-klasser direkt i fickan.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/se/app/skolyoga/id1548842426"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-brand-dark text-white font-medium text-xs hover:bg-brand-dark/90 transition-all"
              >
                Hämta i App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=se.skolyoga.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-brand-dark text-white font-medium text-xs hover:bg-brand-dark/90 transition-all"
              >
                Hämta på Google Play
              </a>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <Image
              src="/images/app_icon_512.png"
              alt="Skolyoga App Icon"
              width={160}
              height={160}
              className="rounded-3xl shadow-lg border border-brand-grey/10"
            />
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
