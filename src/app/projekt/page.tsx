"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, Award, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

interface Project {
  id: string;
  title: string;
  funder: string;
  period: string;
  targetGroup: string;
  summary: string;
  description: string;
  badgeColor: string;
  linkText?: string;
  href?: string;
}

const projects: Project[] = [
  {
    id: "hemmayoga",
    title: "Hemmayoga – Stresshantering vid skolfrånvaro",
    funder: "Folkhälsomyndigheten",
    period: "2026 – Pågående",
    targetGroup: "Elever med problematisk skolfrånvaro och hemmasittare",
    summary:
      "Ett kostnadsfritt, digitalt 6-veckorsprogram utvecklat för att sänka den inre stressen och ge elever och föräldrar konkreta verktyg för återhämtning.",
    description:
      "Tack vare beviljade medel från Folkhälsomyndigheten erbjuder Skolyoga detta program helt kostnadsfritt. Eleverna deltar direkt från sin trygga hemmiljö utan krav på prestation. Programmet kombinerar inspelade yogapass (20–30 min), korta fysiologiska veckoövningar och analogt skrivmaterial.",
    badgeColor: "bg-brand-yellow/30 text-amber-900",
    linkText: "Öppna Hemmayoga i webbläsaren",
    href: "/program/yTk3wFhl1s011CoBYPpY",
  },
  {
    id: "stillin-between",
    title: "stillin’ between – Trygghetsarbete i skolan",
    funder: "Allmänna Arvsfonden",
    period: "2024 – 2027",
    targetGroup: "Mellanstadiet (åk 4–6)",
    summary:
      "Utveckling av metodmaterial och en implementeringsmodell speciellt anpassad för mellanstadiets elever och utmaningar.",
    description:
      "Mellanstadiet är en omvälvande tid i barns utveckling med ökande krav och förändrade relationer. Inom projektet utvecklar Skolyoga nya digitala och fysiska verktyg som stärker tryggheten, motverkar utanförskap och hjälper pedagoger att skapa ett lugnt klassrumsklimat.",
    badgeColor: "bg-brand-pink/25 text-brand-purple",
    linkText: "Läs artikeln om projektet",
    href: "/artiklar/stillin-between-trygghetsarbete-i-skolan",
  },
  {
    id: "sprakinlarning",
    title: "Språkinlärning genom kroppen",
    funder: "MOE-stiftelsen",
    period: "2026 – 2029",
    targetGroup: "Förskola & Förskoleklass",
    summary:
      "Ett treårigt projekt som integrerar bilaterala och finmotoriska övningar som ett stöd i arbetet med språk, läsning och skrivande.",
    description:
      "Genom att förena rörelse och koordination med språklig stimulans ges barn tidiga verktyg i sitt lärande. Metoderna fungerar som ett komplement till ordinarie undervisning och är särskilt värdefulla för barn med språkstörning, NPF eller olika modersmål.",
    badgeColor: "bg-brand-turquoise/20 text-teal-900",
    linkText: "Läs mer om språkinlärning genom kroppen",
    href: "/artiklar/sprakinlarning-genom-kroppen",
  },
  {
    id: "effektmatning",
    title: "Inte bara yoga – Metoder för effektmätning",
    funder: "Svenska Postkodstiftelsen",
    period: "2023",
    targetGroup: "Gymnasiet & Högstadiet",
    summary:
      "Utveckling och vetenskaplig utvärdering av Skolyogas metoder för effektmätning av studieteknik och mående.",
    description:
      "Under projektet undersöktes hur korta mikropauser i klassrummet avlastar elevhälsan, ökar kunskapen om stress och främjar relationen mellan lärare och elever. Elever rapporterade sänkt puls och ökad förmåga att bibehålla koncentration.",
    badgeColor: "bg-brand-sand text-brand-dark border border-brand-grey/20",
    linkText: "Läs projektrapporten",
    href: "/artiklar/inte-bara-yoga",
  },
  {
    id: "stillin-plattform",
    title: "stillin’ – Skolyogas digitala kunskapsplattform",
    funder: "Allmänna Arvsfonden",
    period: "2020 – 2023",
    targetGroup: "Högstadiet & Gymnasiet",
    summary:
      "Grundutvecklingen av Skolyogas digitala övningsbank och metodbibliotek för skolor i hela Sverige.",
    description:
      "Projektet möjliggjorde skapandet av över 125 instruktionsfilmer, pedagogiska manualer och digitala verktyg som idag används dagligen av tusentals pedagoger för att skapa studieteknik och minska skolstress.",
    badgeColor: "bg-brand-purple/15 text-brand-purple",
    linkText: "Utforska Kunskapsbiblioteket",
    href: "/kunskapsbiblioteket",
  },
];

export default function ProjektPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Forskning & Samverkan"
        badgeIcon={<Award className="w-3.5 h-3.5" />}
        title="Skolyogas utvecklingsprojekt"
        description="Tillsammans med stiftelser, myndigheter och skolor utvecklar vi evidensbaserade metoder som gör skillnad för elevers trygghet, mående och studieresultat."
        bgImage="/images/heroes/photoshoot_2023.jpg"
        bgAlt="Skolyogas utvecklingsprojekt bakgrund"
        align="center"
        objectPosition="object-[51%_28%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">

      {/* Projects List */}
      <div className="space-y-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${proj.badgeColor}`}>
                    Finansieras av: {proj.funder}
                  </span>
                  <span className="text-xs text-brand-darkGrey font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-grey" />
                    {proj.period}
                  </span>
                  <span className="text-xs text-brand-dark font-medium">
                    Målgrupp: {proj.targetGroup}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                  {proj.title}
                </h2>

                <p className="text-base text-brand-dark font-medium">
                  {proj.summary}
                </p>

                <p className="text-sm text-brand-darkGrey leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {proj.href && (
                <div className="shrink-0 self-start lg:self-center">
                  <Link
                    href={proj.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple text-white text-xs sm:text-sm font-semibold hover:bg-brand-purple/90 transition-all shadow-sm"
                  >
                    <span>{proj.linkText || "Läs mer"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Collaboration Callout */}
      <div className="rounded-3xl bg-brand-sand border border-[#E3DFC9] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
          Vill ni samverka eller forska med Skolyoga?
        </h3>
        <p className="text-sm sm:text-base text-brand-darkGrey max-w-xl mx-auto leading-relaxed">
          Vi samarbetar regelbundet med universitet, forskare, kommuner och stiftelser för att mäta effekter och utveckla framtidens skola.
        </p>
        <div className="pt-2">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-dark text-white font-semibold text-sm hover:bg-brand-dark/90 transition-all"
          >
            Kontakta vårt utvecklingsteam
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}
