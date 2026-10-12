"use client";

import React from "react";
import Image from "next/image";

interface PageHeroProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: string;
  bgImage: string;
  bgAlt?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
  variant?: "vibrant" | "light" | "dark";
  objectPosition?: string;
}

export function PageHero({
  badge,
  badgeIcon,
  title,
  description,
  bgImage,
  bgAlt = "Bakgrundsbild Skolyoga",
  actions,
  children,
  align = "center",
  variant = "vibrant",
  objectPosition = "object-[center_28%]",
}: PageHeroProps) {
  const isLight = variant === "light";

  return (
    <section className="relative w-full overflow-hidden border-b border-[#2C2724]/40 py-16 sm:py-24 md:py-28 bg-[#181614] text-white">
      {/* Background Image full-bleed edge-to-edge - Clearly visible, black & white, bright with centered faces */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={bgImage}
          alt={bgAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${objectPosition} grayscale brightness-[1.10] contrast-[1.05] transition-opacity duration-300`}
        />
        {/* Subtle atmospheric vignette overlay for crystal clear text readability */}
        <div
          className={`absolute inset-0 ${
            isLight
              ? "bg-gradient-to-b from-brand-sand/85 via-brand-sand/70 to-brand-sand"
              : "bg-gradient-to-b from-black/45 via-black/25 to-black/60"
          }`}
        />
      </div>

      {/* Content Container - Expansive Scandinavian Width */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className={`space-y-4 sm:space-y-5 ${
            align === "center" ? "text-center max-w-4xl mx-auto" : "max-w-3xl"
          }`}
        >
          {badge && (
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                isLight
                  ? "bg-brand-pink/25 border border-brand-pink/40 text-brand-purple"
                  : "bg-white/15 backdrop-blur-md border border-white/25 text-[#FFE271]"
              }`}
            >
              {badgeIcon}
              <span>{badge}</span>
            </div>
          )}

          <h1
            className={`text-3xl sm:text-5xl md:text-6xl font-bold font-cardo tracking-tight leading-[1.15] ${
              isLight ? "text-brand-dark" : "text-white drop-shadow-md"
            }`}
          >
            {title}
          </h1>

          <p
            className={`text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal ${
              isLight ? "text-brand-darkGrey" : "text-stone-100 drop-shadow-sm"
            }`}
          >
            {description}
          </p>

          {actions && (
            <div
              className={`pt-2 flex flex-wrap items-center gap-4 ${
                align === "center" ? "justify-center" : "justify-start"
              }`}
            >
              {actions}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
