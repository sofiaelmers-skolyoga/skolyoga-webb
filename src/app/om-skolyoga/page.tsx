import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Sparkles, BookOpen, Compass, ShieldCheck, Heart, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = {
  title: "Om Skolyoga - Vision, Självledarskap & Team",
  description:
    "Lär känna Skolyoga. Vi arbetar för en mer harmonisk, trygg och fokuserad lärmiljö för både elever och pedagoger genom självledarskap, stresshantering och nervsystemsreglering.",
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  quote?: string;
  badgeColor?: string;
}

const featuredTeam: TeamMember[] = [
  {
    name: "Sofia Elmers",
    role: "Operativ ledare",
    image: "/images/team/sofia_elmers.png",
    bio: "Sofia är legitimerad lärare och har under sina år i skolan sett hur elever tampas med stressproblematik och bristande fokus. Sofias önskan är att elever ska få konkreta verktyg för att själva ta makten över sin hälsa och må bra i skolan. Hittade till yogan i sena tonåren och relationen till yogan fördjupades i samband med egna barn.",
    quote: "Världen ser annorlunda ut än när jag var barn. Med allt fler distraktioner och yttre stressfaktorer är det extra viktigt att ge barn och ungdomar utrymme för återhämtning och verktyg för stresshantering och självledarskap.",
    badgeColor: "text-brand-dustyPurple",
  },
  {
    name: "Annika Westerberg",
    role: "Verksamhetsledare",
    image: "/images/team/annika.jpg",
    bio: "Civilekonom från Handelshögskolan i Stockholm. Utbildade sig till yogalärare för vuxna och barn 2015/16. Annika driver Skolyogas operativa utveckling och arbetar dedikerat för att integrera kroppsbaserade övningar i klassrum och förskolor runtom i Sverige.",
    quote: "Jag tror att vi alla – unga som gamla – mår bättre av att praktisera yoga. Jag brinner för att få in yoga i alla sammanhang där det blir lättillgängligt och en naturlig del av vardagen. Genom Skolyoga vill jag bidra till att sprida yoga till det ställe där framtidens ledare skapas; alla fantastiska skolor och förskolor runt om i Sverige.",
    badgeColor: "text-brand-dustyTurquoise",
  },
  {
    name: "Lena Malmsäter",
    role: "Koordinator",
    image: "/images/team/lena_malmsater.jpeg",
    bio: "Lena är diplomerad avspännings- och stresspedagog med mångårig erfarenhet från näringslivet. Hon är även certifierad rosenterapeut och önskar att alla ska få leva mer i närvaro och kunna vara sitt sanna autentiska jag.",
    quote: "Tänk om alla kunde få lära sig hur vi kan använda våra kroppar som instrument för stresshantering och ett bättre mående. Yoga och andra kroppsliga övningar är kraftfulla men skonsamma verktyg vi alla har med oss vart vi än går, bara kroppen behövs.",
    badgeColor: "text-brand-dustyPurple",
  },
  {
    name: "Malin Stengårds",
    role: "Verksamhetsutvecklare",
    image: "/images/team/malin.png",
    bio: "Malin har en kandidat i psykologi och är utbildad neurobaserad mental tränare, LFA-facilitator och yogalärare med bakgrund inom HR, ledarskapsutveckling och social hållbarhet. Brinner för att stärka barns och ungas välmående, självkännedom och inre hållbarhet som grund för både lärande och framtidstro.",
    quote: "När barn och unga får verktyg att lyssna på kroppen och förstå sig själva, skapas trygghet, fokus och mod. För mig är skolyoga ett sätt att ge dem tillgång till sina egna resurser – här och nu, och för livet.",
    badgeColor: "text-[#B87678]",
  },
  {
    name: "Emma Hedö",
    role: "Kommunikatör",
    image: "/images/team/emma_hedo.jpg",
    bio: "Emma har en kandidat inom marknadsföring och en bakgrund inom varumärkesbyggande, innehåll och sociala medier. Hon är även utbildad yogalärare och breathwork-facilitator samt entreprenör inom hälsa med en stor passion för ceremoniell cacao. Brinner för att göra kunskap om självreglering, återhämtning och välmående tillgänglig för fler.",
    quote: "Många av de verktyg jag själv hittade som vuxen önskar jag att jag hade haft tillgång till tidigare i livet. För mig handlar skolyoga om att ge barn och unga verktyg för att förstå kroppens signaler, hantera stress och bygga en stark grund av trygghet och självkännedom.",
    badgeColor: "text-brand-dustyPurple",
  },
];

interface BoardMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  badgeColor: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Kristina Hermelin Johnson",
    role: "Styrelseordförande",
    image: "/images/team/kristina.jpg",
    bio: "Utbildad inom statsvetenskap med en MSc i internationella relationer från University of Edinburgh och lång erfarenhet inom arbete i ideell sektor både på organisationssidan och givarsidan. Introducerades till yoga för mer än 20 år sedan och brinner för att skapa möjligheter för barn och unga att få tillgång till verktyg för livet.",
    badgeColor: "text-brand-dustyTurquoise",
  },
  {
    name: "Filippa Odevall",
    role: "Styrelseledamot",
    image: "/images/team/filippa.jpg",
    bio: "Kandidatexamen i Internationell rättsvetenskap med inriktning på mänskliga rättigheter. Började praktisera yoga 2002 och har arbetat med ledarskap sedan 2006. Brinner för att skapa hållbara förändringsprocesser för en bättre värld.",
    badgeColor: "text-amber-700",
  },
  {
    name: "Jenny Westring",
    role: "Styrelseledamot",
    image: "/images/team/jenny_westring.jpeg",
    bio: "Civilekonom från Handelshögskolan i Stockholm och utbildad psykolog vid Karolinska Institutet. Utbildad yogalärare samt rådgivare inom ledarskap och organisationspsykologi. Brinner för personlig utveckling, resiliens, stresshantering och självledarskap.",
    badgeColor: "text-brand-dustyTurquoise",
  },
  {
    name: "Emma Hertin",
    role: "Styrelseledamot",
    image: "/images/team/emma_hertin.jpg",
    bio: "Civilingenjör från Linköpings universitet med mångårig erfarenhet av ledarskap och styrelsearbete inom ideella föreningar. Brinner för att ge barn och unga viktiga verktyg för avslappning och närvaro redan i skolan för att växa utifrån sina egna förutsättningar.",
    badgeColor: "text-brand-dustyPurple",
  },
  {
    name: "Louise Hellbom",
    role: "Styrelseledamot",
    image: "/images/team/louise_hellbom.jpg",
    bio: "Yogaterapeut och socialantropolog med mångårig erfarenhet av kommunikation och ledarskap. Projektledare för Skolyogas projekt stillin' som utvecklat material för ungdomar i skolan. Brinner för att ge barn och unga tillgång till sina inre resurser och verktyg för livet.",
    badgeColor: "text-[#B87678]",
  },
  {
    name: "Fredrik Lundgren",
    role: "Styrelseledamot",
    image: "/images/team/fredrik_lundgren.jpeg",
    bio: "Styrelseledamot med bred erfarenhet inom ledarskap, strategi och verksamhetsstyrning. Engagerad i att stötta Skolyogas tillväxt och långsiktiga arbete för en hållbar skolmiljö i hela landet.",
    badgeColor: "text-amber-700",
  },
];

export default function OmSkolyogaPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Vision & Förhållningssätt"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        title="Om Skolyoga"
        description="Vi ger barn och unga tillgång till självledarskap och egenmakt – förmågan att förstå kroppen, reglera stress och bygga trygghet i sig själva och i klassrummet."
        bgImage="/images/heroes/hero_satanama.jpg"
        bgAlt="Elever utomhus som utövar skolyoga och mudras"
        align="center"
        objectPosition="object-[center_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">

      {/* Vision & "Kroppen som verktyg - Självledarskap och egenmakt" */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 border border-[#E3DFC9] shadow-sm space-y-6 sm:space-y-8 text-brand-dark leading-relaxed text-sm sm:text-base overflow-hidden">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyTurquoise/20 text-[#2B7A78] text-xs font-bold uppercase tracking-wider">
            <span>Självledarskap & Egenmakt</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-cardo text-brand-dark break-words">
            Kroppen som verktyg – inte bara rörelse
          </h2>
          <p className="text-brand-darkGrey text-sm sm:text-base md:text-lg leading-relaxed break-words">
            I en föränderlig skolvardag är förmågan att förstå och förändra sitt inre tillstånd en av de 
            viktigaste nycklarna till trygghet och lärande. Istället för att se utmaningar som statiska hinder, 
            ser vi på Skolyoga dem som fysiologiska processer som går att träna.
          </p>
          <p className="text-brand-darkGrey text-sm sm:text-base leading-relaxed break-words">
            Genom att förstå hur kroppen fungerar kan vi ge barn och unga verktyg för att själva medvetet 
            skifta sinnesstämning och stärka sin resiliens. När vi lär oss att reglera kroppen, lär vi oss 
            också att reglera våra tankar och känslor. Det skapar en genuin känsla av egenmakt: barn och 
            unga går från att vara utlämnade till sina impulser till att aktivt kunna styra sitt fokus, sitt lugn och sin energi.
          </p>
        </div>

        {/* 3 Core Pillars in Tonplattor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#EBE8DC]">
          <div className="p-5 sm:p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2 min-w-0">
            <h4 className="font-bold font-cardo text-brand-dustyPurple text-base sm:text-lg break-words">Helhetsperspektiv</h4>
            <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed break-words">
              Vi jobbar med hela människan. Kropp och sinne hör ihop. Närvaro, trygghet och rörelse blir naturliga delar av undervisningen där alla kan vara med.
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2 min-w-0">
            <h4 className="font-bold font-cardo text-brand-dustyTurquoise text-base sm:text-lg break-words">Självledarskap</h4>
            <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed break-words">
              Vi ger barn, unga och skolpersonal verktyg för att leda sig själva med mod, nyfikenhet och ansvar. Det stärker förmågan att hantera motgångar och stress.
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2 min-w-0 sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold font-cardo text-[#B87678] text-base sm:text-lg break-words">Evidensbaserat</h4>
            <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed break-words">
              Vår metodik vilar på en stabil grund av modern forskning inom neurofysiologi, stressbiologi och beprövad erfarenhet i klassrummet.
            </p>
          </div>
        </div>

        {/* Vision & Mission - Exact copy from Skolyoga.se */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#EBE8DC]">
          <div className="p-6 rounded-2xl bg-white border border-[#E3DFC9] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-dustyPurple">Vår Vision</span>
            <h3 className="text-xl sm:text-2xl font-bold font-cardo text-brand-dark">Alla barn ska få ta del av skolyoga.</h3>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E3DFC9] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-dustyTurquoise">Vår Mission</span>
            <p className="text-sm sm:text-base text-brand-dark leading-relaxed">
              Vi stärker lärande och välmående i skolan och förskolan genom övningar som tränar självledarskap, stresshantering, trygghet och studieteknik.
            </p>
          </div>
        </div>
      </div>

      {/* VI PÅ SKOLYOGA - OPERATIVT TEAM & LEDNING */}
      <section className="space-y-8 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyPink/20 text-brand-dustyPurple text-xs font-bold uppercase tracking-wider">
            <span>Operativt team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cardo text-brand-dark break-words">
            Vi på Skolyoga
          </h2>
          <p className="text-xs sm:text-sm text-brand-darkGrey break-words">
            Skolyoga drivs som en ideell organisation av engagerade pedagoger, utbildare och skolkonsulter.
          </p>
        </div>

        {/* Featured Large Team Cards - Fluid flex layout that adapts cleanly when zooming */}
        <div className="space-y-6 sm:space-y-8">
          {featuredTeam.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#E3DFC9] p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm transition-all hover:shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-6 sm:gap-8 md:gap-10">
                {/* Profile Image with responsive sizing */}
                <div className="shrink-0 flex justify-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#E3DFC9] shadow-md bg-stone-100 aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                    />
                  </div>
                </div>

                {/* Content details */}
                <div className="flex-1 min-w-0 space-y-3 sm:space-y-4 text-center md:text-left">
                  <div>
                    <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider block ${member.badgeColor || "text-brand-dustyPurple"}`}>
                      {member.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-cardo text-brand-dark mt-1 break-words">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed break-words">
                    {member.bio}
                  </p>

                  {member.quote && (
                    <blockquote className="border-l-4 border-brand-dustyPink pl-3 sm:pl-4 py-0.5 text-xs sm:text-sm italic text-stone-600 font-serif leading-relaxed text-left break-words bg-brand-sand/40 rounded-r-xl">
                      &rdquo;{member.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STYRELSEN (BOARD MEMBERS) */}
      <section className="space-y-8 sm:space-y-10 pt-6 border-t border-[#E3DFC9]">
        <div className="text-center max-w-2xl mx-auto space-y-2 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyTurquoise/20 text-[#2B7A78] text-xs font-bold uppercase tracking-wider">
            <span>Styrning & Strategi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark break-words">
            Styrelsen
          </h2>
          <p className="text-xs sm:text-sm text-brand-darkGrey break-words">
            Skolyoga i Sveriges styrelse leder den strategiska utvecklingen och säkerställer verksamhetens långsiktiga hållbarhet.
          </p>
        </div>

        {/* Board Cards in Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {boardMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E3DFC9] shadow-sm space-y-3 sm:space-y-4 flex flex-col justify-between transition-all hover:shadow-md min-w-0"
            >
              <div className="space-y-3 min-w-0">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[#E3DFC9] shrink-0 bg-stone-100 shadow-xs aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block truncate ${member.badgeColor}`}>
                      {member.role}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold font-cardo text-brand-dark leading-tight mt-0.5 break-words">
                      {member.name}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-brand-darkGrey leading-relaxed break-words">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKOLYOGAS SKOLKONSULTER & SAMARBETEN */}
      <section className="space-y-8 pt-6 border-t border-[#E3DFC9]">
        <div className="bg-white border border-[#E3DFC9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm space-y-6 sm:space-y-8 overflow-hidden">
          <div className="max-w-3xl space-y-3 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sand text-brand-darkGrey border border-[#E3DFC9] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-brand-dustyPurple shrink-0" />
              <span>Rikstäckande nätverk</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-cardo text-brand-dark break-words">
              Skolyogas Skolkonsulter
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-brand-darkGrey leading-relaxed break-words">
              Våra skolkonsulter finns representerade över hela Sverige. De är legitimerade lärare, förskollärare, specialpedagoger, 
              avspänningspedagoger och certifierade barnyogalärare som har gedigen erfarenhet av skolans vardag och 
              brinner för att stötta elever och pedagoger på plats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-sand/70 border border-[#E3DFC9] space-y-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-dustyPink/30 flex items-center justify-center text-brand-dustyPurple shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold font-cardo text-brand-dark text-sm sm:text-base break-words">Workshops & Inspiration</h4>
              <p className="text-xs text-brand-darkGrey leading-relaxed break-words">
                Fortbildning och prova-på-dagar för hela arbetslag, elevhälsoteam eller förskolepedagoger direkt på skolan.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-sand/70 border border-[#E3DFC9] space-y-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-dustyTurquoise/30 flex items-center justify-center text-[#2B7A78] shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold font-cardo text-brand-dark text-sm sm:text-base break-words">Klassrumsimplementering</h4>
              <p className="text-xs text-brand-darkGrey leading-relaxed break-words">
                Praktiskt stöd och lektionsbesök för att förankra mikropauser, fokus och självreglering i ordinarie schema.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-sand/70 border border-[#E3DFC9] space-y-2.5 min-w-0 sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold font-cardo text-brand-dark text-sm sm:text-base break-words">Specialanpassade insatser</h4>
              <p className="text-xs text-brand-darkGrey leading-relaxed break-words">
                Insatser särskilt anpassade för anpassad grundskola, NPF, elever med hög frånvaro samt gymnasiet.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-brand-sand border border-[#E3DFC9] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden">
            <div className="space-y-1 max-w-xl min-w-0">
              <h4 className="font-bold font-cardo text-brand-dark text-base sm:text-lg break-words">
                Vill du komma i kontakt med en skolkonsult?
              </h4>
              <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed break-words">
                Eftersom våra skolkonsulter verkar lokalt och har olika spetskompetenser hjälper vi er gärna att matcha rätt person utifrån era behov och er region.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="mailto:hej@skolyoga.se?subject=Förfrågan%20om%20Skolkonsult"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-dustyPurple text-white font-semibold text-xs sm:text-sm shadow hover:bg-[#781b61] transition-all text-center"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Boka skolkonsult</span>
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-brand-dark border border-[#D5D0BE] font-semibold text-xs sm:text-sm hover:bg-[#EBE8DC] transition-all text-center"
              >
                <span>Kontaktsida</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-darkGrey shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* General Contact Box */}
      <div className="bg-brand-sand border border-[#E3DFC9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center space-y-4 shadow-sm overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-cardo text-brand-dark break-words">
          Vill du komma i kontakt med oss?
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-brand-darkGrey max-w-lg mx-auto break-words">
          Oavsett om du vill boka en föreläsning, starta en skolsatsning i er kommun eller har frågor 
          om Kunskapsbiblioteket och appen är du varmt välkommen att höra av dig.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hej@skolyoga.se"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-xs sm:text-sm shadow hover:bg-[#781b61] transition-all hover:shadow-md break-all sm:break-normal max-w-full"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Skicka ett mejl till hej@skolyoga.se</span>
          </a>
        </div>
      </div>

      </div>
    </div>
  );
}
