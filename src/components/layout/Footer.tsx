"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Instagram, Facebook, Youtube, Mail, Smartphone, ArrowRight, ShieldCheck, Sparkles, Accessibility } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Footer() {
  const { user } = useAuth();

  return (
    <footer aria-label="Sidfot" className="bg-[#2D2D2C] text-[#E0DDD5] pt-16 pb-12 border-t border-[#4A4A48]">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#4A4A48]/70">
          
          {/* Col 1: Mission & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/emblem_turquoise.png"
                  alt="Skolyoga logotyp symbol"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-[0.08em] font-cardo text-white uppercase">
                Skolyoga
              </span>
            </div>
            <p className="text-sm text-[#BFBAB0] leading-relaxed max-w-sm">
              Vi tränar elever och pedagoger i <strong>stresshantering</strong>, <strong>trygghet</strong> och <strong>studieteknik</strong>. 
              Genom korta, kroppsbaserade övningar skapar vi lugn och hållbara hjärnor i klassrummet.
            </p>

            {/* Social media links with accessible labels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/skolyoga/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3D3B] flex items-center justify-center hover:bg-brand-pink text-white transition-colors"
                aria-label="Besök Skolyoga på Instagram (öppnas i ny flik)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/skolyoga/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3D3B] flex items-center justify-center hover:bg-brand-pink text-white transition-colors"
                aria-label="Besök Skolyoga på Facebook (öppnas i ny flik)"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCXkuMhAmgWoc41O3n5XsJUw"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3D3B] flex items-center justify-center hover:bg-brand-pink text-white transition-colors"
                aria-label="Besök Skolyoga på YouTube (öppnas i ny flik)"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Col 2: För Skola & Finansiärer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Verksamhet</h4>
            <ul className="space-y-2 text-sm text-[#D1CCC2]">
              {user ? (
                <>
                  <li>
                    <Link href="/kunskapsbiblioteket" className="hover:text-brand-turquoise transition-colors">
                      Kunskapsbiblioteket
                    </Link>
                  </li>
                  <li>
                    <Link href="/program" className="hover:text-brand-turquoise transition-colors flex items-center gap-1">
                      <span>Digitala Program</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-yellow/30 text-amber-200">Inloggad</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/logga-in?tab=register" className="hover:text-brand-turquoise transition-colors flex items-center gap-1 font-semibold text-white">
                    <span>Skapa gratis konto</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-turquoise/30 text-teal-200">Gratis</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/utbildningar" className="hover:text-brand-turquoise transition-colors">
                  100h Skolyogakonsult
                </Link>
              </li>
              <li>
                <Link href="/?malgrupp=skola#malgrupp" className="hover:text-brand-turquoise transition-colors">
                  För skola & förskola
                </Link>
              </li>
              <li>
                <Link href="/?malgrupp=finansiar#malgrupp" className="hover:text-brand-turquoise transition-colors">
                  För finansiärer & företag
                </Link>
              </li>
              <li>
                <Link href="/stod-oss" className="hover:text-brand-turquoise transition-colors">
                  Stöd oss (Swish & Företag)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Metod & Projekt */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-turquoise uppercase tracking-wider">Metod & Projekt</h4>
            <ul className="space-y-2 text-sm text-[#D1CCC2]">
              <li>
                <Link href="/metoden" className="hover:text-brand-pink transition-colors">
                  Skolyogas metod
                </Link>
              </li>
              <li>
                <Link href="/metoden#nervsystemet" className="hover:text-brand-pink transition-colors">
                  Nervsystemet & Vagus
                </Link>
              </li>
              <li>
                <Link href="/projekt" className="hover:text-brand-pink transition-colors">
                  Utvecklingsprojekt
                </Link>
              </li>
              <li>
                <Link href="/artiklar" className="hover:text-brand-pink transition-colors">
                  Artiklar & Nyheter
                </Link>
              </li>
              <li>
                <Link href="/om-skolyoga" className="hover:text-brand-pink transition-colors">
                  Om oss & Teamet
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontakt, Support & Lagkrav */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-pink uppercase tracking-wider">Kontakt & Lagkrav</h4>
            <ul className="space-y-2 text-sm text-[#D1CCC2]">
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakta oss
                </Link>
              </li>
              <li>
                <Link href="/tillganglighet" className="text-brand-yellow hover:underline transition-colors flex items-center gap-1.5 font-semibold">
                  <Accessibility className="w-3.5 h-3.5" />
                  <span>Tillgänglighetsredogörelse</span>
                </Link>
              </li>
              <li>
                <Link href="/vanliga-fragor" className="hover:text-white transition-colors">
                  Vanliga frågor (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/villkor" className="hover:text-white transition-colors">
                  Allmänna villkor
                </Link>
              </li>
              <li>
                <Link href="/integritetspolicy" className="hover:text-white transition-colors">
                  Integritetspolicy (GDPR)
                </Link>
              </li>
              <li>
                <a href="mailto:hej@skolyoga.se" className="text-brand-turquoise hover:underline">
                  hej@skolyoga.se
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E9A90] gap-4">
          <p>© {new Date().getFullYear()} Skolyoga Sverige AB. Alla rättigheter förbehållna.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/tillganglighet" className="flex items-center gap-1.5 text-brand-yellow hover:underline">
              <Accessibility className="w-3.5 h-3.5" />
              <span>WCAG 2.1 AA & Tillgänglighetsdirektivet</span>
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-brand-turquoise">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Integrerad med Skolyoga-appen</span>
            </span>
            <span>•</span>
            <Link href="/integritetspolicy" className="hover:underline">
              GDPR-säkrad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
