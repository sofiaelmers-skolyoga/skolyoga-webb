import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, Calendar, Clock, MapPin, Award, Users, BookOpen } from "lucide-react";

export const metadata = {
  title: "Utbildningar i Skolyoga - 100h & Workshops",
  description: "Utbilda dig i Skolyogas evidensbaserade metod. 100h-utbildning för att bli Skolyogakonsult eller halvdagsworkshops för skolpersonal.",
};

export default function UtbildningarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dustyPink/25 border border-brand-dustyPink/40 text-brand-dustyPurple text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
          <Award className="w-3.5 h-3.5 text-brand-dustyPurple" />
          <span>Professionell kompetensutveckling</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-cardo text-brand-dark tracking-tight leading-tight">
          Utbildningar för ett mer hållbart skolklimat
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-darkGrey leading-relaxed">
          Vi ger lärare, kuratorer, elevhälsa och skolledare praktiska och evidensbaserade verktyg 
          för att möta stress, bygga trygghet och öka studieron i vardagen.
        </p>
      </div>

      {/* 100h Utbildning Feature */}
      <section className="bg-white rounded-3xl border border-[#E3DFC9] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyPurple/10 text-brand-dustyPurple text-xs font-bold">
              Certifiering
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
              100h Skolyoga-utbildning
            </h2>
            <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
              Vår mest omfattande utbildning. Du lär dig metoden på djupet – från nervsystemets 
              fysiologi och stressreglering till konkreta klassrumsövningar och hur du handleder kollegor 
              som Skolyogakonsult på din skola.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-dark">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>Nervsystemet & stressreglering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>NPF- och anpassade skolan-stöd</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>Evidensbaserad forskningskoppling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>Full tillgång till övningsbank & app</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hej@skolyoga.se?subject=Intresseanmälan 100h Utbildning"
                className="px-6 py-3 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-colors"
              >
                Anmäl intresse via e-post
              </a>
              <span className="text-xs text-brand-darkGrey">Kommande kursstart: Hösten</span>
            </div>
          </div>

          <div className="bg-brand-sand p-8 rounded-2xl border border-[#E3DFC9] space-y-4">
            <h3 className="font-bold font-cardo text-lg text-brand-dark">Praktisk information</h3>
            
            <div className="space-y-3.5 text-xs text-brand-darkGrey">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-brand-dustyPurple shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Format:</strong>
                  Flexibelt upplägg med digitala moduler kombinerat med fysiska helgträffar.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-brand-dustyTurquoise shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Målgrupp:</strong>
                  Lärare, elevhälsa, förskollärare, fritidspedagoger och yogalärare.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-brand-warmYellow shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Certifiering:</strong>
                  Diplomerad Skolyogaledare / Skolyogakonsult.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Halvdagsworkshops */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
            Workshops & Skoldagar
          </h2>
          <p className="mt-2 text-sm text-brand-darkGrey">
            Korta, intensiva inspirationsdagar för hela arbetslag eller elevhälsoteam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-7 rounded-2xl border border-[#E3DFC9] shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-cardo text-brand-dark">Halvdag: Trygghet i skolan</h3>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              En halvdags workshop för kuratorer, lärare och skolpersonal. Vi provar konkreta 
              övningar för självreglering och samreglering som kan tas direkt in i klassrummen.
            </p>
            <div className="pt-2">
              <a
                href="mailto:hej@skolyoga.se?subject=Workshop Trygghet i skolan"
                className="text-xs font-semibold text-brand-dustyPurple hover:underline"
              >
                Boka för er skola &rarr;
              </a>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E3DFC9] shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-cardo text-brand-dark">Hel skolsatsning (6-veckorsprogram)</h3>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Utbilda all personal på skolan – från förskoleklass till årskurs 9. Skapar en gemensam 
              begreppsapparat och ett sammanhållet arbetssätt över hela skoldagen.
            </p>
            <div className="pt-2">
              <a
                href="mailto:hej@skolyoga.se?subject=Hel skolsatsning"
                className="text-xs font-semibold text-brand-dustyPurple hover:underline"
              >
                Läs mer om kommun- och skolsatsningar &rarr;
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
