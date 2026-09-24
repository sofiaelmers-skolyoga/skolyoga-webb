import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react";

export const metadata = {
  title: "Integritetspolicy - Skolyoga",
  description: "Skolyogas integritetspolicy för webbplats och mobilapplikation. Vi skyddar dina personuppgifter enligt GDPR.",
};

export default function IntegritetspolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dustyPurple hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Tillbaka till startsidan</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 md:p-14 border border-[#E3DFC9] shadow-sm space-y-8">
        
        <div className="space-y-3 border-b border-[#EBE8DC] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyTurquoise/15 text-[#1B6465] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>GDPR & Säkerhet</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark">
            Integritetspolicy & Cookies
          </h1>
          <p className="text-xs text-brand-darkGrey">
            Gäller för Skolyogas webbplats och Skolyoga-appen (iOS & Android).
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-6 text-sm text-brand-darkGrey leading-relaxed">
          <h2 className="text-xl font-bold font-cardo text-brand-dark">1. Personuppgifter</h2>
          <p>
            Skolyoga värnar om din personliga integritet och strävar efter att alltid skydda dina personuppgifter på bästa sätt. Det är Skolyogas målsättning att följa alla gällande lagar och regler för personuppgiftsskydd (GDPR). Denna policy hjälper dig att förstå vilken slags information Skolyoga samlar in och hur den används.
          </p>

          <h2 className="text-xl font-bold font-cardo text-brand-dark">2. Ansvarig för personuppgifter</h2>
          <p>
            Skolyoga Ekonomisk Förening (org.nr 769635-4927 / Skolyoga i Sverige ideell förening org.nr 802537-3823), c/o Westerberg, Gröndalsvägen 159, 117 69 Stockholm är personuppgiftsansvarig för behandlingen av personuppgifter.
          </p>

          <h2 className="text-xl font-bold font-cardo text-brand-dark">3. Insamling och behandling</h2>
          <p>
            Skolyoga samlar endast in den data som användare själva lämnar ifrån sig vid kontakt, skapande av användarkonto på hemsidan eller i Skolyoga-appen (t.ex. namn, e-postadress, eventuell skoltillhörighet). Vi sparar även dina valda favoritövningar för att du enkelt ska kunna återuppta dem på olika enheter.
          </p>

          <h2 className="text-xl font-bold font-cardo text-brand-dark">4. Ändamål och lagring</h2>
          <p>
            Uppgifterna används uteslutande för att:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tillhandahålla och administrera ditt konto och inloggning till övningsbanken.</li>
            <li>Synkronisera sparade övningar och progression mellan webb och mobilapp.</li>
            <li>Hantera kursanmälningar till 100h-utbildningen och studiedagar.</li>
            <li>Kommunicera information och nyheter gällande Skolyogas verksamhet.</li>
          </ul>

          <h2 className="text-xl font-bold font-cardo text-brand-dark">5. Dina rättigheter</h2>
          <p>
            Du har rätt att när som helst begära ett registerutdrag över vilka personuppgifter vi behandlar om dig, samt begära rättelse eller radering av ditt konto och alla tillhörande uppgifter.
          </p>

          <div className="p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2 mt-8">
            <h3 className="font-bold font-cardo text-base text-brand-dark">Frågor om integritetspolicy?</h3>
            <p className="text-xs text-brand-darkGrey">
              Kontakta oss gärna direkt på <a href="mailto:hej@skolyoga.se" className="text-brand-dustyPurple underline font-semibold">hej@skolyoga.se</a>.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
