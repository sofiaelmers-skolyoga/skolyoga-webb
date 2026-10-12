import { 
  Accessibility, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Eye, 
  Keyboard, 
  Monitor, 
  FileText 
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = {
  title: "Tillgänglighetsredogörelse - Skolyoga",
  description:
    "Skolyogas tillgänglighetsredogörelse enligt WCAG 2.1 nivå AA, EU:s tillgänglighetsdirektiv och lagen om tillgänglighet till digital service.",
};

export default function TillganglighetPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Tillgänglighet & Standarder"
        badgeIcon={<Accessibility className="w-3.5 h-3.5" />}
        title="Tillgänglighetsredogörelse för Skolyoga"
        description="Skolyoga strävar efter att webbplatsen skolyoga.se ska vara tillgänglig och inkluderande för alla användare enligt WCAG 2.1 nivå AA och DOS-lagen."
        bgImage="/images/heroes/classroom_stretching.jpg"
        bgAlt="Tillgänglighet bakgrund"
        align="center"
        objectPosition="object-[center_22%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-10">

        {/* Status card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E3DFC9] shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-cardo text-brand-dark">
              Status för efterlevnad
            </h2>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Webbplatsen är <strong>helt förenlig</strong> med kraven enligt <strong>WCAG 2.1 nivå AA</strong>. Vi arbetar kontinuerligt med att säkerställa att ny funktionalitet, text och övningsmaterial uppfyller riktlinjerna.
            </p>
          </div>
        </div>

        {/* Genomförda åtgärder */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E3DFC9] shadow-sm space-y-6">
          <h2 className="text-2xl font-bold font-cardo text-brand-dark">
            Hur webbplatsen är tillgänglighetsanpassad
          </h2>
          <p className="text-sm text-brand-darkGrey leading-relaxed">
            Följande konkreta tekniska och pedagogiska anpassningar är implementerade på hela webbplatsen:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-5 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <Keyboard className="w-4 h-4 text-brand-dustyPurple" />
                <span>Tangentbordsnavigering</span>
              </div>
              <p className="text-xs text-brand-darkGrey leading-relaxed">
                Hela webbplatsen kan navigeras med tangentbord (Tab, Shift+Tab, Enter, Mellanslag och Escape). Tydliga visuella fokusringar markerar var i sidan du befinner dig.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <Monitor className="w-4 h-4 text-brand-dustyPurple" />
                <span>Snabbhopp (Skip to content)</span>
              </div>
              <p className="text-xs text-brand-darkGrey leading-relaxed">
                Högst upp på varje sida finns en osynlig snabbknapp som blir synlig vid tangentbordsfokus och låter användaren hoppa direkt till huvudinnehållet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <Eye className="w-4 h-4 text-brand-dustyPurple" />
                <span>Kontrast & Färg</span>
              </div>
              <p className="text-xs text-brand-darkGrey leading-relaxed">
                Färgkontraster för all text överstiger WCAG:s krav på 4.5:1 mot bakgrunden. Färg används aldrig som den enda informationsbäraren.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <Accessibility className="w-4 h-4 text-brand-dustyPurple" />
                <span>Eget tillgänglighetsverktyg</span>
              </div>
              <p className="text-xs text-brand-darkGrey leading-relaxed">
                Via knappen ”Tillgänglighet” kan användare själva aktivera textförstoring, högkontrastläge, lättläst typsnitt för dyslexi samt pausa animationer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <FileText className="w-4 h-4 text-brand-dustyPurple" />
                <span>Semantisk HTML & ARIA</span>
              </div>
              <p className="text-xs text-brand-darkGrey leading-relaxed">
                Korrekt struktur med landmärken (`header`, `nav`, `main`, `footer`), logisk rubrikhierarki (H1 till H3) samt ARIA-stöd för menyer och modaler.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <ShieldCheck className="w-4 h-4 text-brand-dustyPurple" />
                <span>Beskrivande textalternativ</span>
              </div>
              <p className="text-xs text-brand-darkGrey leading-relaxed">
                Alla meningsbärande bilder har beskrivande alt-texter. Ikoner har tillgängliga etiketter (`aria-label`) för skärmläsare.
              </p>
            </div>

          </div>
        </section>

        {/* Kända brister */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E3DFC9] shadow-sm space-y-4">
          <h2 className="text-2xl font-bold font-cardo text-brand-dark">
            Kända begränsningar och undantag
          </h2>
          <p className="text-sm text-brand-darkGrey leading-relaxed">
            Vi strävar efter 100 % tillgänglighet, men känner till följande områden där vi löpande förbättrar innehållet:
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-brand-darkGrey list-disc pl-5">
            <li>
              <strong>Videoövningar:</strong> Vissa äldre videoklasser saknar för närvarande syntolkning och automatisk textning. Varje övning kompletteras dock med utförlig skriftlig steg-för-steg-instruktion i Kunskapsbiblioteket.
            </li>
            <li>
              <strong>Äldre PDF-dokument:</strong> Ett fåtal historiska dokument eller rapporter som producerats av externa samarbetspartners innan 2024 är inte fullt taggade enligt PDF/UA-standarden.
            </li>
          </ul>
        </section>

        {/* Rapportera brist & Kontakt */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E3DFC9] shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              Återkoppling och kontaktinformation
            </h2>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Om du upptäcker brister i tillgängligheten på skolyoga.se eller om du behöver ta del av innehåll som inte är tillgängligt för dig, vill vi gärna att du hör av dig så att vi kan åtgärda problemet.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-brand-dark">Kontakta Skolyogas tillgänglighetsansvariga</div>
              <div className="text-xs text-brand-darkGrey">Vi svarar normalt inom två arbetsdagar.</div>
            </div>
            <a
              href="mailto:hej@skolyoga.se?subject=Synpunkt%20g%C3%A4llande%20tillg%C3%A4nglighet%20p%C3%A5%20skolyoga.se"
              className="px-6 py-2.5 rounded-full bg-brand-dustyPurple text-white text-xs font-semibold hover:bg-[#781b61] transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mejla hej@skolyoga.se</span>
            </a>
          </div>
        </section>

        {/* Tillsyn / DIGG */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E3DFC9] shadow-sm space-y-4">
          <h2 className="text-2xl font-bold font-cardo text-brand-dark">
            Tillsyn och överklagan
          </h2>
          <p className="text-sm text-brand-darkGrey leading-relaxed">
            <strong>Myndigheten för digital förvaltning (DIGG)</strong> har ansvaret för tillsyn över lagen om tillgänglighet till digital offentlig service och relaterad lagstiftning i Sverige.
          </p>
          <p className="text-sm text-brand-darkGrey leading-relaxed">
            Om du inte är nöjd med hur vi hanterar dina synpunkter kan du vända dig till DIGG för att anmäla bristande tillgänglighet.
          </p>
          <div className="pt-2">
            <a
              href="https://www.digg.se/tdos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-dustyPurple hover:underline inline-flex items-center gap-1.5"
            >
              <span>Läs mer eller anmäl brist hos DIGG (Myndigheten för digital förvaltning)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Granskningsmetod */}
        <div className="text-xs text-brand-darkGrey space-y-1 text-center pt-4">
          <p>Redogörelsen upprättades och uppdaterades senast den <strong>8 oktober 2026</strong>.</p>
          <p>Bedömningen har genomförts genom intern självskattning och teknisk kodgranskning.</p>
        </div>

        </div>
      </div>
    </div>
  );
}
