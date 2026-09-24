import React from "react";
import Image from "next/image";
import { Mail, ShieldCheck, Heart, Sparkles, Award, Users, BookOpen } from "lucide-react";

export const metadata = {
  title: "Om Skolyoga - Vision, Metod & Team",
  description: "Lär känna Skolyoga. Vi arbetar för en mer harmonisk, trygg och fokuserad lärmiljö för både elever och pedagoger genom livsförmågor i skolan.",
};

export default function OmSkolyogaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dustyPink/25 border border-brand-dustyPink/40 text-brand-dustyPurple text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
          <span>Vision & Metod</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-cardo text-brand-dark tracking-tight leading-tight">
          Om Skolyoga
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-darkGrey leading-relaxed">
          Vi vill ge alla barn och unga tillgång till livsförmågor – förmågan att förstå sin kropp, 
          reglera stress och bygga trygghet i sig själva och i mötet med andra.
        </p>
      </div>

      {/* Vision & "Barn gör rätt om de kan" */}
      <div className="bg-white rounded-3xl p-8 md:p-14 border border-[#E3DFC9] shadow-sm space-y-8 text-brand-dark leading-relaxed text-base">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark mb-4">
            Barn gör rätt om de kan
          </h2>
          <p className="text-brand-darkGrey text-base sm:text-lg leading-relaxed mb-4">
            En enkel mening – men en avgörande påminnelse när vi möter elever som har svårt att sitta still, 
            fokusera eller hantera starka känslor. När elever hamnar i stress kan hjärnans förmåga att 
            ta in information, planera och samarbeta tillfälligt blockeras.
          </p>
          <p className="text-brand-darkGrey text-base leading-relaxed">
            Genom korta, kroppsbaserade mikropauser på 1–5 minuter hjälper vi eleverna att reglera sitt 
            nervsystem och komma ner i varv så att de återigen kan nå sitt lugn, sin fokusförmåga och sin fulla potential.
          </p>
        </div>

        {/* 3 Core Pillars in Tonplattor */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#EBE8DC]">
          <div className="p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
            <h4 className="font-bold font-cardo text-brand-dustyPurple text-lg">Inga förkunskaper</h4>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Alla övningar är utformade för att vem som helst bland personalen ska kunna leda dem direkt vid katedern.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
            <h4 className="font-bold font-cardo text-brand-dustyTurquoise text-lg">Klassrumsanpassat</h4>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Övningarna görs sittande på stolen eller stående vid bänken i vanliga kläder utan ombyte eller mattor.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
            <h4 className="font-bold font-cardo text-[#B87678] text-lg">Evidensbaserat</h4>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Grundat i aktuell forskning om hjärnan, stressfysiologi, neurobiologi och självreglering.
            </p>
          </div>
        </div>
      </div>

      {/* VI PÅ SKOLYOGA - TEAMET */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-cardo text-brand-dark">
            Vi på Skolyoga
          </h2>
          <p className="mt-2 text-sm text-brand-darkGrey">
            Skolyoga drivs som en organisation av engagerade pedagoger, skolkonsulter och utbildare.
          </p>
        </div>

        {/* Sofia Elmers Featured */}
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-[#E3DFC9] shadow-md">
                <Image
                  src="/images/profil_bild.jpg"
                  alt="Sofia Elmers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-dustyPurple">
                  Operativ ledare och skolkonsult
                </span>
                <h3 className="text-2xl font-bold font-cardo text-brand-dark">Sofia Elmers</h3>
              </div>

              <p className="text-sm text-brand-darkGrey leading-relaxed">
                Sofia är legitimerad lärare och har under sina år i skolan sett hur elever tampas med stressproblematik 
                och bristande fokus. Sofias önskan är att elever ska få konkreta verktyg för att själva ta makten över sin 
                hälsa och må bra i skolan.
              </p>

              <blockquote className="border-l-4 border-brand-dustyPink pl-4 text-xs italic text-stone-600 font-serif leading-relaxed">
                &rdquo;Världen ser annorlunda ut än när jag var barn. Med allt fler distraktioner och yttre stressfaktorer 
                är det extra viktigt att ge barn och ungdomar utrymme för återhämtning och verktyg för stresshantering 
                och självledarskap.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dustyTurquoise">
              Styrelseordförande
            </span>
            <h4 className="text-lg font-bold font-cardo text-brand-dark">Kristina Hermelin Johnson</h4>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Utbildad inom statsvetenskap med en MSc i internationella relationer från University of Edinburgh och lång erfarenhet inom ideell sektor. Brinner för att skapa möjligheter för barn och unga att få tillgång till verktyg för livet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dustyPurple">
              Styrelseledamot & Verksamhetsledare
            </span>
            <h4 className="text-lg font-bold font-cardo text-brand-dark">Annika Westerberg</h4>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Civilekonom från Handelshögskolan i Stockholm och utbildad yogalärare för barn och vuxna sedan 2015. Vill sprida yoga dit framtidens ledare skapas: i skolor och förskolor runt om i Sverige.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E3DFC9] shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Styrelseledamot & Skolkonsult
            </span>
            <h4 className="text-lg font-bold font-cardo text-brand-dark">Filippa Odevall</h4>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Kandidatexamen i Internationell rättsvetenskap med inriktning på mänskliga rättigheter. Har arbetat dedikerat sedan 2002 med yoga och hälsofrämjande metoder för barn och unga.
            </p>
          </div>
        </div>
      </section>

      {/* Contact box */}
      <div className="bg-brand-sand border border-[#E3DFC9] rounded-3xl p-8 md:p-12 text-center space-y-4 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">Vill du komma i kontakt med oss?</h3>
        <p className="text-sm text-brand-darkGrey max-w-lg mx-auto">
          Oavsett om du vill boka en föreläsning, starta en skolsatsning i er kommun eller har frågor 
          om Kunskapsbiblioteket och appen är du varmt välkommen att höra av dig.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hej@skolyoga.se"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Skicka ett mejl till hej@skolyoga.se</span>
          </a>
        </div>
      </div>

    </div>
  );
}
