"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "I klassrummet",
    q: "Behöver eleverna byta om eller använda yogamattor?",
    a: "Nej, absolut inte! Hela Skolyogas metod är framtagen för att fungera direkt i det vanliga klassrummet. Övningarna tar 1–5 minuter, görs sittande eller stående vid skolbänken, och kräver varken ombyte, mattor eller att möblera om i rummet."
  },
  {
    category: "I klassrummet",
    q: "Måste läraren själv kunna yoga för att leda övningarna?",
    a: "Inte alls. I Kunskapsbiblioteket finns över 125 färdiga videofilmer där Sofia och Skolyogas instruktörer guidar övningarna. Du som pedagog trycker bara på play på klassrummets storskärm eller projektor och deltar själv i pausen tillsammans med dina elever."
  },
  {
    category: "Motivation & Bemötande",
    q: "Hur gör jag om eleverna gör motstånd mot övningarna?",
    a: "Utifrån vår erfarenhet är de flesta elever positivt inställda till övningarna. Men om du möter motstånd är det viktigt att kommunicera *varför* ni gör övningarna och *hur* de påverkar kroppen och hjärnan. Genom tydlig förklaring ökar motivationen. Börja med de övningar du själv tycker bäst om och gör alltid övningen tillsammans med eleverna. Du kan även titta på korta filmer om hur hjärnan och nervsystemet fungerar för att avdramatisera."
  },
  {
    category: "Forskning & Skolverket",
    q: "Är yoga i skolan religiöst och vad säger Skolinspektionen?",
    a: "Skolyogas övningar är rent hälsofrämjande och helt fria från religiösa inslag. Skolinspektionen granskade Skolyoga redan 2012 efter en anmälan och beslutade att verksamheten syftar till att främja barns hälsa och att den är helt i linje med skollagen och icke-konfessionell undervisning."
  },
  {
    category: "Forskning & Evidens",
    q: "Finns det forskning bakom Skolyogas metoder?",
    a: "Ja, vår metod vilar på modern neurofysiologi och stressbiologi. Vi har samlat forskning inom fokus, stresshantering och trygghet som visar hur mikropauser och vagusstimulerande andning sänker kortisolnivåer, främjar exekutiva funktioner och förbättrar studieteknik och inlärning."
  },
  {
    category: "Anpassning & NPF",
    q: "Hur fungerar Skolyoga för elever med NPF eller i anpassad skola?",
    a: "Våra övningar ska vara tillgängliga för alla! Vi har därför specialanpassat vårt material för anpassad skola, elever med NPF-diagnoser (ADHD, ADD, autism) samt elever med stress och oro. Övningarna är tydliga, förutsägbara, utan fysisk kontakt och helt befriade från prestationskrav."
  },
  {
    category: "Material & Åldrar",
    q: "Vilket material finns för olika åldrar?",
    a: "Till yngre åldrar har vi yogakort och yogasagor i både tryckt format och ljudbok. Till äldre barn och unga i högstadiet och gymnasiet har vi digitala övningar i Kunskapsbiblioteket, framtagna tillsammans med lärare och elever. I Kunskapsbiblioteket kan du enkelt filtrera på årskurs, längd och syfte."
  },
  {
    category: "Organisation & Medlemskap",
    q: "Hur är Skolyoga organiserat och hur blir man medlem?",
    a: "Skolyoga är en ideell organisation som verkar för barn och ungas välmående. Du kan stötta vår verksamhet genom att bli medlem (300 kr/år till bankgiro 743-9789). Som medlem får du inbjudan till evenemang, rösträtt vid årsstämma, rabatt på utbildningar samt möjlighet att engagera dig som skolkonsult."
  },
  {
    category: "Appen & Webbplatsen",
    q: "Hur hänger hemsidan och Skolyoga-appen ihop?",
    a: "De delar samma inloggning och databas (Firebase). När du skapar ett konto eller sparar övningar på datorn syns de omedelbart i appen på din mobil, och veckor du markerar som genomförda i programmen (t.ex. Hemmayoga) synkas automatiskt mellan datorn och telefonen."
  },
  {
    category: "Program & Hemmayoga",
    q: "Vad är Hemmayoga och är det verkligen kostnadsfritt?",
    a: "Ja! Tack vare beviljade utvecklingsmedel från Folkhälsomyndigheten är det digitala 6-veckorsprogrammet Hemmayoga helt kostnadsfritt för elever, familjer och skolor. Det är särskilt framtaget för elever med problematisk skolfrånvaro och hög inre stress."
  },
  {
    category: "Utbildning",
    q: "Vad innebär utbildningen till Skolyogakonsult (100h)?",
    a: "Vår 100-timmarsutbildning vänder sig till skolpersonal, elevhälsa och yogalärare som vill fördjupa sig i nervsystemsreglering, stresshantering, trygghet och studieteknik i skolan. Efter genomförd utbildning är du certifierad att utbilda kollegor och leda Skolyoga-arbetet på din skola eller i din kommun."
  }
];

export default function VanligaFragorPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Frågor och svar"
        badgeIcon={<HelpCircle className="w-3.5 h-3.5" />}
        title="Vanliga frågor om Skolyoga"
        description="Svar på de vanligaste frågorna från pedagoger, rektorer, elevhälsa och vårdnadshavare om metoden, klassrummet och forskningen."
        bgImage="/images/heroes/skolyoga_chairs.jpg"
        bgAlt="Skolyoga vanliga frågor bakgrund"
        align="center"
        objectPosition="object-[center_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-10">

      {/* Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E3DFC9] overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-brand-sand/30 transition-colors"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-turquoise block mb-1">
                    {faq.category}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold font-cardo text-brand-dark">
                    {faq.q}
                  </h2>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center shrink-0 text-brand-dark">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-brand-darkGrey leading-relaxed border-t border-[#EBE8DC]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still got questions banner */}
      <div className="rounded-3xl bg-brand-sand border border-[#E3DFC9] p-8 text-center space-y-4">
        <h3 className="text-xl font-bold font-cardo text-brand-dark">
          Hittar du inte svaret på din fråga?
        </h3>
        <p className="text-sm text-brand-darkGrey max-w-md mx-auto">
          Tveka inte att höra av dig till oss så hjälper vi dig gärna vidare.
        </p>
        <div className="pt-2">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-brand-purple/90 transition-all"
          >
            <span>Kontakta oss på hej@skolyoga.se</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

        </div>
      </div>
    </div>
  );
}
