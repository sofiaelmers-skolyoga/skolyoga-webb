"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Brain, 
  Compass, 
  Heart, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  ChevronDown,
  Layers,
  Smile
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  color: string;
  content: string[];
  keyPoints: string[];
}

const sections: Section[] = [
  {
    id: "fokus-studieteknik",
    title: "Fokus & Studieteknik",
    subtitle: "Rikta och upprätthålla uppmärksamhet i en värld full av distraktioner",
    badge: "Studieteknik",
    icon: Brain,
    color: "brand-purple",
    content: [
      "Ungdomars vardag innehåller ständiga digitala distraktioner och högt tempo. Att rikta uppmärksamheten utåt gör det svårt att behålla sammanhållet fokus vid skolbänken.",
      "Under fokusmodulen tränar vi på att medvetet styra och hålla kvar uppmärksamheten – en förutsättning för djupinlärning, stressreglering och goda studieresultat.",
      "Med enkla 1–3 minutersövningar vid bänken lär sig eleverna att snabbt hitta tillbaka till arbetsro efter avbrott."
    ],
    keyPoints: [
      "Förstå skillnaden mellan inre och yttre distraktion",
      "Tekniker för flow och djupfokus under lektionen",
      "Konkreta verktyg för att rikta och behålla fokus"
    ]
  },
  {
    id: "stresshantering",
    title: "Stresshantering & Nervsystemet",
    subtitle: "Förstå kroppens signaler och aktivera lugn-och-ro-systemet",
    badge: "Fysiologi",
    icon: Activity,
    color: "brand-pink",
    content: [
      "Stresshantering handlar om att förstå kroppens alarmsystem och ge eleven konkreta verktyg för att självreglera nervsystemet vid oro eller prestationsångest.",
      "När det sympatiska nervsystemet (kamp/flykt) är överaktivt blockeras logiskt tänkande och minneslagring. Genom förlängda utandningar och enkla rörelser skiftar kroppen snabbt till vila och återhämtning.",
      "Övningarna görs direkt på stolen utan ombyte eller utrustning, vilket sänker tröskeln till noll."
    ],
    keyPoints: [
      "Känna igen fysiologiska varningssignaler på stress",
      "Medveten andning som sänker puls och oro på 60 sekunder",
      "Verktyg för återhämtning, fokus och sömn"
    ]
  },
  {
    id: "trygghet",
    title: "Trygghet & Självmedkänsla",
    subtitle: "Känslor, relationer och ett växande tankesätt",
    badge: "Trygghet",
    icon: ShieldCheck,
    color: "brand-turquoise",
    content: [
      "Trygghet är grunden för allt lärande. Vi ger eleverna redskap att förstå och möta starka känslor utan att döma sig själva.",
      "Genom att öva självmedkänsla, grit och ett växande tankesätt stärks den mentala motståndskraften och klassrumsgemenskapen.",
      "Resultatet blir minskad konfliktnivå, större empati och en skolmiljö där fler vågar delta."
    ],
    keyPoints: [
      "Förstå känslor och impulser utan dömande",
      "Självmedkänsla och ett tillåtande, växande tankesätt",
      "Konfliktreducering och stärkt sammanhållning"
    ]
  },
  {
    id: "upplevelsebaserat",
    title: "Upplevelsebaserat lärande",
    subtitle: "Att förstå och integrera kunskap genom kroppen",
    badge: "Pedagogik",
    icon: Compass,
    color: "brand-yellow",
    content: [
      "Våra övningar är alltid upplevelsebaserade: eleven får testa, känna efter och reflektera i egen kropp istället för att enbart lyssna på instruktioner.",
      "När pulsen sjunker och kroppen slappnar av skapas djupa minnesspår som eleven kan plocka fram vid prov eller stressiga situationer.",
      "Eleven blir forskaren i sin egen kropp, vilket bygger äkta självledarskap och inre trygghet."
    ],
    keyPoints: [
      "Testa, uppleva och reflektera i egen kropp",
      "Gör abstrakta begrepp som 'lugn' konkreta och kännbara",
      "Kroppen som verktyg för studiero och hälsa"
    ]
  },
  {
    id: "anpassat-material",
    title: "Anpassat material – NPF & Anpassad skola",
    subtitle: "Övningar utformade för att fungera för alla",
    badge: "Inkludering",
    icon: Heart,
    color: "brand-sand",
    content: [
      "Skolyoga ska vara tillgängligt för alla elever oavsett funktionsvariation eller stödbehov.",
      "Vi har tagit fram nivåanpassat material för anpassad grundskola, elever med ADHD/autism samt elever med hög skolfrånvaro och oro.",
      "Tydlig bildstruktur, korta moment och kravlöst deltagande skapar trygghet och förutsägbarhet."
    ],
    keyPoints: [
      "Bildstöd och handledning för anpassad skola",
      "Sensoriskt anpassade övningar för NPF-elever",
      "Kravlöst metodstöd vid stress och oro"
    ]
  }
];

export default function MetodenPage() {
  const [activeTab, setActiveTab] = useState("fokus-studieteknik");
  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Forskning & Förhållningssätt"
        badgeIcon={<Brain className="w-3.5 h-3.5" />}
        title="Varför självledarskap, stresshantering och studieteknik i skolan?"
        description="Praktiska, evidensbaserade verktyg som stärker nervsystemet, ökar studieron och bygger trygghet och motståndskraft i klassrummet."
        bgImage="/images/heroes/skolyoga_focus.jpg"
        bgAlt="Elever som övar fokus och metoden i klassrummet"
        align="center"
        objectPosition="object-[center_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E3DFC9] pb-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = section.id === activeTab;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-purple text-white shadow-md"
                  : "bg-white text-brand-darkGrey hover:text-brand-dark hover:bg-brand-sand border border-[#E3DFC9]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Detail Card */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EBE8DC]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sand text-brand-dark text-xs font-semibold mb-2">
              <span>{activeSection.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              {activeSection.title}
            </h2>
            <p className="text-sm sm:text-base text-brand-turquoise font-medium mt-1">
              {activeSection.subtitle}
            </p>
          </div>

          <Link
            href={
              activeSection.id === "fokus-studieteknik"
                ? "/kunskapsbiblioteket?kategori=Studieteknik"
                : activeSection.id === "stresshantering"
                ? "/kunskapsbiblioteket?kategori=Stresshantering"
                : activeSection.id === "trygghet"
                ? "/kunskapsbiblioteket?kategori=Trygghet"
                : activeSection.id === "anpassat-material"
                ? "/kunskapsbiblioteket?anpassning=Anpassad+skola"
                : "/kunskapsbiblioteket"
            }
            className="px-6 py-3 rounded-full bg-brand-sand border border-[#D5D0BE] text-brand-dark font-semibold text-xs hover:bg-[#EBE8DC] transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Se relaterade övningar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-4">
            {activeSection.content.map((p, i) => (
              <p key={i} className="text-base text-brand-darkGrey leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Key points box */}
          <div className="lg:col-span-4 bg-brand-sand/70 p-6 rounded-2xl border border-brand-grey/10 space-y-4 self-start">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
              Nycklar i korthet:
            </h3>
            <div className="space-y-3">
              {activeSection.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-brand-dark leading-relaxed font-medium">
                  <CheckCircle className="w-4 h-4 text-brand-turquoise shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Quote Banner - Självledarskap & Egenmakt */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-sand via-white to-brand-sand border border-[#E3DFC9] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-sm">
        <div className="w-12 h-12 mx-auto rounded-full bg-brand-dustyTurquoise/20 flex items-center justify-center text-[#2B7A78]">
          <Smile className="w-6 h-6" />
        </div>
        <blockquote className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark italic leading-snug">
          ”När vi lär oss att reglera kroppen, lär vi oss också att leda våra tankar och känslor. Det ger eleverna självledarskap och egenmakt för hela livet.”
        </blockquote>
      </div>

      </div>
    </div>
  );
}
