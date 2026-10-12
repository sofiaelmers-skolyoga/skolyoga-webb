"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink, ChevronDown, Check } from "lucide-react";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  url: string;
}

const realInstagramPosts: InstagramPost[] = [
  {
    id: "ig-1",
    image: "/images/instagram/post_1.jpg",
    caption: "Vi är med! ♥︎ Skolyoga är nu en del av Upp till oss! – Sveriges största manifestation för ungas psykiska hälsa. Och behovet av konkreta verktyg för återhämtning och trygghet i skolan har aldrig varit större.",
    likes: 248,
    comments: 26,
    url: "https://www.instagram.com/p/DeL4UbLCAW0/",
  },
  {
    id: "ig-2",
    image: "/images/instagram/post_2.jpg",
    caption: "Har du ett barn som har svårt att komma till skolan? ♥︎ Imorgon håller vi höstens kostnadsfria digitala träff om hur kroppen och nervsystemet kan hjälpa barn och unga med problematisk skolfrånvaro.",
    likes: 312,
    comments: 41,
    url: "https://www.instagram.com/p/DeG6Wb-mLU-/",
  },
  {
    id: "ig-3",
    image: "/images/instagram/post_3.jpg",
    caption: "Vi ses på Lärkraft 2026! Den 27 oktober finns Skolyoga på plats på Stockholmsmässan – kom och träffa oss i vår monter och prova korta mikropauser för klassrummet! 👏",
    likes: 189,
    comments: 15,
    url: "https://www.instagram.com/p/Dd_Dw4ej5XF/",
  },
  {
    id: "ig-4",
    image: "/images/instagram/post_4.jpg",
    caption: "Har du hört talas om samreglering? ✨ Samreglering är en viktig del av hur barn lär sig att hantera stress och starka känslor – genom en vuxens lugna nervsystem.",
    likes: 420,
    comments: 38,
    url: "https://www.instagram.com/p/Dd8mUHKDMft/",
  },
  {
    id: "ig-5",
    image: "/images/instagram/post_5.jpg",
    caption: "Nyfiken på Hemmayoga? Prova tillsammans med oss – live och kostnadsfritt! Med stöd av Folkhälsomyndigheten erbjuder vi 6 veckors guidat hemmayogaprogram för familjer och unga. 🌿",
    likes: 275,
    comments: 23,
    url: "https://www.instagram.com/p/Dd1JDFUFQqn/",
  },
  {
    id: "ig-6",
    image: "/images/instagram/post_6.jpg",
    caption: "Tusentals barn i Sverige lever idag med omfattande skolfrånvaro. Bakom varje siffra finns ett barn – och en familj – som kämpar. Genom trygga kroppsliga verktyg bygger vi vägen tillbaka.",
    likes: 345,
    comments: 31,
    url: "https://www.instagram.com/p/Ddq-ykdE_9O/",
  },
  {
    id: "ig-7",
    image: "/images/instagram/post_7.jpg",
    caption: "Vilken dag på Generation Pep! 👏 I helgen fick vi på Skolyoga vara med på Pep-dagen i Hagaparken – en dag fylld av rörelse, glädje och gemenskap för barn och unga. Tack till alla som kom! 💜",
    likes: 290,
    comments: 22,
    url: "https://www.instagram.com/skolyoga/",
  },
  {
    id: "ig-8",
    image: "/images/instagram/post_8.jpg",
    caption: "Vilken fin kväll vi fick tillsammans på vårt Skolyoga Retreat i Stockholm! ❤️ En kväll fylld av yoga, återhämtning, reflektion och fina möten med lärare och elevhälsa.",
    likes: 218,
    comments: 19,
    url: "https://www.instagram.com/skolyoga/",
  },
  {
    id: "ig-9",
    image: "/images/instagram/post_9.jpg",
    caption: "Hur är det att gå Skolyogas 100h-utbildning? 🌿 Tryggt, lärorikt, inspirerande, upplevelsebaserat och fullt av konkreta verktyg att använda i skolan och mötet med barn och unga.",
    likes: 264,
    comments: 27,
    url: "https://www.instagram.com/p/Dda9MbCDx9h/",
  },
  {
    id: "ig-10",
    image: "/images/instagram/post_10.jpg",
    caption: "Glimtar från våra helgmoduler i Stockholm. Vi varvar teori om nervsystem och hjärna med praktiska övningar som kan göras direkt vid skolbänken. 💛",
    likes: 230,
    comments: 17,
    url: "https://www.instagram.com/skolyoga/",
  },
  {
    id: "ig-11",
    image: "/images/instagram/post_11.jpg",
    caption: "I helgen samlades Skolyoga för en helg fylld av praktik, kreativitet och framtidstänk. 🌿 Vi utvecklar metoder som gör skillnad i svensk skola varje dag.",
    likes: 285,
    comments: 24,
    url: "https://www.instagram.com/p/DdUa7FflIi8/",
  },
  {
    id: "ig-12",
    image: "/images/instagram/post_12.jpg",
    caption: "Vi ses på Pep-dagen i Hagaparken! 👏 Tillsammans skapar vi förutsättningar för rörelseglädje och psykiskt välmående för alla barn i Sverige.",
    likes: 310,
    comments: 29,
    url: "https://www.instagram.com/p/DdI71DyDYqY/",
  },
];

export function InstagramFeed() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedPosts = showAll ? realInstagramPosts : realInstagramPosts.slice(0, 8);

  return (
    <section className="py-20 bg-brand-sand/60 border-t border-[#E3DFC9]">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shrink-0 shadow-md">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="/images/instagram/avatar.webp"
                  alt="Skolyoga Instagram Profilbild"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold font-cardo text-brand-dark">
                  skolyoga
                </h3>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-white text-[11px]" title="Officiellt konto">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-brand-darkGrey max-w-xl leading-relaxed">
                Vi är en ideell organisation som ger barn & unga verktyg för stresshantering, studieteknik och trygghet genom kroppen – anpassat till skolmiljö.
              </p>
              <div className="flex items-center gap-4 pt-1 text-xs text-brand-dark font-medium">
                <span><strong>2 300+</strong> följare</span>
                <span><strong>@skolyoga</strong></span>
              </div>
            </div>
          </div>

          <a
            href="https://www.instagram.com/skolyoga/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Följ @skolyoga</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Section title */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
            Senaste inläggen från Instagram
          </h2>
          <p className="text-xs sm:text-sm text-brand-darkGrey mt-1">
            Klicka på ett inlägg för att öppna det direkt på Instagram.
          </p>
        </div>

        {/* Posts Grid - Real posts, authentic photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#E3DFC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full bg-brand-sand overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-brand-dark/50 backdrop-blur-[2px] flex items-center justify-center gap-6 text-white transition-opacity duration-300 ${
                    hoveredId === post.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <Heart className="w-5 h-5 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-brand-darkGrey line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>
                <div className="mt-4 pt-3 border-t border-[#EBE8DC] flex items-center justify-between text-xs text-brand-purple font-medium">
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Visa på Instagram</span>
                  </span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load more button */}
        {!showAll && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D9D5C1] text-brand-dark font-semibold text-xs hover:bg-brand-sand/50 transition-colors shadow-sm"
            >
              <span>Visa fler inlägg från @skolyoga</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
