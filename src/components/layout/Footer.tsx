import React from "react";
import Link from "next/link";
import { Heart, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#24292e] text-[#d9dfe4] pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700/60">
          
          {/* Col 1: Mission & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center text-white font-bold text-xl shadow-sm">
                S
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Skolyoga</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Vi utbildar skolpersonal i livsförmågor och tillhandahåller evidensbaserade, 
              korta rörelse- och fokusövningar (1–5 minuter) som skapar trygghet, studiero 
              och hållbara hjärnor i klassrummet.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/skolyoga/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-coral text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/skolyoga/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-coral text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCXkuMhAmgWoc41O3n5XsJUw"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-coral text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Utbildningar */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Utbildningar</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/utbildningar" className="hover:text-brand-coral transition-colors">
                  Alla utbildningar
                </Link>
              </li>
              <li>
                <Link href="/utbildningar" className="hover:text-brand-coral transition-colors">
                  100h Skolyogautbildning
                </Link>
              </li>
              <li>
                <Link href="/utbildningar" className="hover:text-brand-coral transition-colors">
                  Halvdagsworkshops
                </Link>
              </li>
              <li>
                <Link href="/utbildningar" className="hover:text-brand-coral transition-colors">
                  Skolsatsningar & Kommun
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kunskapsbibliotek */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Biblioteket</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/kunskapsbiblioteket" className="hover:text-brand-coral transition-colors">
                  Alla 125 övningar
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?kategori=Stresshantering" className="hover:text-brand-coral transition-colors">
                  Stresshantering
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?kategori=Fokus" className="hover:text-brand-coral transition-colors">
                  Fokus i klassrummet
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?anpassning=NPF" className="hover:text-brand-coral transition-colors">
                  NPF-anpassade övningar
                </Link>
              </li>
              <li>
                <Link href="/kunskapsbiblioteket?anpassning=Sittande" className="hover:text-brand-coral transition-colors">
                  Sittande övningar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontakt & Organisation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Kontakt</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-coral" />
                <a href="mailto:hej@skolyoga.se" className="hover:text-white transition-colors">
                  hej@skolyoga.se
                </a>
              </p>
              <p className="text-xs text-gray-400 pt-2">
                Skolyoga Ekonomisk Förening<br />
                Org.nr: 769635-4927
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Skolyoga. Alla rättigheter förbehållna.</p>
          <div className="flex items-center gap-6">
            <Link href="/om-skolyoga" className="hover:text-white transition-colors">
              Om oss
            </Link>
            <Link href="/om-skolyoga" className="hover:text-white transition-colors">
              Integritetspolicy
            </Link>
            <Link href="/om-skolyoga" className="hover:text-white transition-colors">
              Allmänna villkor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
