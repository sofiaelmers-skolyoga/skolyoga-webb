"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function VillkorPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Villkor & Avtal"
        badgeIcon={<ShieldCheck className="w-3.5 h-3.5" />}
        title="Allmänna villkor för Skolyoga"
        description="Gäller för användning av Skolyogas webbplats, Kunskapsbibliotek, digitala program och mobilapplikation."
        bgImage="/images/heroes/photoshoot_2279.jpg"
        bgAlt="Allmänna villkor bakgrund"
        align="center"
        objectPosition="object-[60%_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-darkGrey hover:text-brand-purple transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tillbaka till startsidan</span>
            </Link>
          </div>

      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm space-y-8 text-sm sm:text-base text-brand-darkGrey leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">1. Om Skolyoga</h2>
          <p>
            Skolyoga Sverige driver digitala plattformar, utbildningar och metodmaterial för att främja hälsa, 
            lugn och studieteknik i svenska skolor. Våra tjänster omfattar Kunskapsbiblioteket, digitala 
            program (såsom Hemmayoga) samt Skolyoga-appen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">2. Användarkonto och synkronisering</h2>
          <p>
            För att spara favoritövningar, skapa spellistor och följa din progression i programmen registrerar 
            du ett användarkonto. Samma inloggningsuppgifter gäller på hemsidan och i Skolyoga-appen. Du ansvarar 
            för att hålla dina inloggningsuppgifter skyddade.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">3. Rättigheter och upphovsrätt</h2>
          <p>
            Allt innehåll på webbplatsen och i appen – inklusive videor, texter, grafik, illustrationer 
            och mandala-symboler – är skyddat enligt svensk och internationell upphovsrättslagstiftning. 
            Materialet får användas fritt i undervisningssyfte av licensierade skolor och pedagoger, men får 
            inte kopieras, vidareförsäljas eller distribueras kommersiellt utan skriftligt godkännande från Skolyoga.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">4. Hälsofriskrivning</h2>
          <p>
            Skolyogas övningar och program är hälsofrämjande och förebyggande pedagogiska verktyg och 
            utgör inte medicinsk eller psykoterapeutisk behandling. Vid allvarlig psykisk eller fysisk 
            ohälsa ska legitimerad hälso- och sjukvård alltid kontaktas.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">5. Behandling av personuppgifter (GDPR)</h2>
          <p>
            Vi värnar om din personliga integritet och hanterar alla personuppgifter i enlighet med 
            Dataskyddsförordningen (GDPR). Läs mer i vår fullständiga{" "}
            <Link href="/integritetspolicy" className="text-brand-purple underline font-semibold">
              Integritetspolicy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">6. Kontakt</h2>
          <p>
            Har du frågor kring våra villkor? Välkommen att kontakta oss på{" "}
            <a href="mailto:hej@skolyoga.se" className="text-brand-purple underline">hej@skolyoga.se</a>.
          </p>
        </section>

      </div>

        </div>
      </div>
    </div>
  );
}
