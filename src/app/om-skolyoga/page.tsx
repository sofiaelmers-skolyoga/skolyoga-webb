import React from "react";
import { Mail, ShieldCheck, Heart, Sparkles, Award } from "lucide-react";

export const metadata = {
  title: "Om Skolyoga - Vision, Metod & Kontakt",
  description: "Lär känna Skolyoga Ekonomisk förening. Vi arbetar för en mer harmonisk, trygg och fokuserad lärmiljö för både elever och pedagoger.",
};

export default function OmSkolyogaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
          Om Skolyoga
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
          Vi vill ge alla barn och unga tillgång till livsförmågor – förmågan att förstå sin kropp, 
          reglera stress och bygga trygghet i sig själva och i mötet med andra.
        </p>
      </div>

      {/* Vision text */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#e9e3d8] shadow-sm space-y-6 text-stone-700 leading-relaxed text-base">
        <h2 className="text-2xl font-bold text-brand-dark">Barn gör rätt om de kan</h2>
        <p>
          En enkel mening – men en avgörande påminnelse när vi möter elever som har svårt att sitta still, 
          fokusera eller hantera starka känslor. När elever är i stress kan hjärnans förmåga att 
          ta in information, planera och samarbeta tillfälligt blockeras.
        </p>
        <p>
          Genom korta, kroppsbaserade mikropauser på 1–5 minuter hjälper vi eleverna att reglera sitt 
          nervsystem och komma ner i varv så att de återigen kan nå sitt lugn och sin fulla potential.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100">
          <div className="space-y-2">
            <h4 className="font-bold text-brand-coral text-sm">Inga förkunskaper</h4>
            <p className="text-xs text-stone-500">
              Alla övningar är utformade för att vem som helst ska kunna leda dem direkt.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-brand-teal text-sm">Klassrumsanpassat</h4>
            <p className="text-xs text-stone-500">
              Övningarna görs sittande på stolen eller stående vid bänken i vanliga kläder.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-brand-plum text-sm">Evidensbaserat</h4>
            <p className="text-xs text-stone-500">
              Grundat i aktuell forskning om hjärnan, stressfysiologi och neurovetenskap.
            </p>
          </div>
        </div>
      </div>

      {/* Contact box */}
      <div className="bg-[#faf8f5] border border-stone-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-brand-dark">Vill du komma i kontakt med oss?</h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Oavsett om du vill boka en föreläsning, starta en skolsatsning i er kommun eller har frågor 
          om Kunskapsbiblioteket är du varmt välkommen att höra av dig.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hej@skolyoga.se"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-coral text-white font-semibold text-sm shadow hover:bg-[#cf4f3d] transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Skicka ett mail till hej@skolyoga.se</span>
          </a>
        </div>
      </div>

    </div>
  );
}
