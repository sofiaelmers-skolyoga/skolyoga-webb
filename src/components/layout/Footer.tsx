import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Instagram, Facebook, Youtube, Mail, Smartphone, ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2D2D2C] text-[#E0DDD5] pt-16 pb-12 border-t border-[#4A4A48]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#4A4A48]/70">
          
          {/* Col 1: Mission & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/emblem_turquoise.png"
                  alt="Skolyoga emblem"
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
              Vi utbildar skolpersonal i livsförmågor och tillhandahåller evidensbaserade, 
              korta rörelse- och fokusövningar (1–5 minuter) som skapar trygghet, studiero 
              och hållbara hjärnor i klassrummet.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/skolyoga/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3D3B] flex items-center justify-center hover:bg-brand-dustyPink text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/skolyoga/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3D3B] flex items-center justify-center hover:bg-brand-dustyPink text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCXkuMhAmgWoc41O3n5XsJUw"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3D3B] flex items-center justify-center hover:bg-brand-dustyPink text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Utbildningar */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-warmYellow uppercase tracking-wider">Utbildningar</h4>
            <ul className="space-y-2 text-sm text-[#D1CCC2]">
              <li>
                <Link href="/utbildningar" className="hover:text-brand-dustyTurquoise transition-colors">
                  Alla utbildningar
                </Link>
              </li>
              <li>
                <Link href="/utbildningar" className="hover:text-brand-dustyTurquoise transition-colors">
                  100h Skolyogautbildning
                </Link>
              </li>
              <li>
                <Link href="/utbildningar" className="hover:text-brand-dustyTurquoise transition-colors">
                  Halvdagsworkshops
                </Link>
              </li>
              <li>
                <Link href="/utbildningar" className="hover:text-brand-dustyTurquoise transition-colors">
                  Skolsatsningar & Kommun
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kunskapsbibliotek */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-dustyTurquoise uppercase tracking-wider">Biblioteket</h4>
            <ul className="space-y-2 text-sm text-[#D1CCC2]">
              <li>
                <Link href="/kunskapsbiblioteket" className="hover:text-brand-dustyPink transition-colors">
                  Alla 125 övningar
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?kategori=Stresshantering" className="hover:text-brand-dustyPink transition-colors">
                  Stresshantering
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?kategori=Fokus" className="hover:text-brand-dustyPink transition-colors">
                  Fokus i klassrummet
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?anpassning=NPF" className="hover:text-brand-dustyPink transition-colors">
                  NPF-anpassat stöd
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?anpassning=Sittande" className="hover:text-brand-dustyPink transition-colors">
                  Sittande övningar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Skolyoga App & Kontakt */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-dustyPink uppercase tracking-wider">Mobilappen & Kontakt</h4>
            <div className="space-y-3 text-sm text-[#D1CCC2]">
              <div className="p-3 rounded-2xl bg-[#3D3D3B] border border-[#52524E]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src="/images/app_icon_512.png"
                      alt="Skolyoga App"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-white">Skolyoga Appen</span>
                </div>
                <p className="text-[11px] text-[#BFBAB0] leading-snug">
                  Samma inloggning på webb och mobil med fullständig synkronisering.
                </p>
              </div>

              <p className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-brand-dustyTurquoise shrink-0" />
                <a href="mailto:hej@skolyoga.se" className="hover:text-white transition-colors">
                  hej@skolyoga.se
                </a>
              </p>
              <p className="text-[11px] text-[#A6A095]">
                Skolyoga Ekonomisk Förening<br />
                Org.nr: 769635-4927
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E988D] gap-4">
          <p>© {new Date().getFullYear()} Skolyoga. Alla rättigheter förbehållna.</p>
          <div className="flex items-center gap-6">
            <Link href="/om-skolyoga" className="hover:text-white transition-colors">
              Om oss
            </Link>
            <Link href="/integritetspolicy" className="hover:text-white transition-colors">
              Integritetspolicy
            </Link>
            <Link href="/utbildningar" className="hover:text-white transition-colors">
              Utbildningar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
