"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, User, Menu, X, LogOut, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, favorites, progress, logout } = useAuth();

  const loggedInLinks: Array<{ name: string; href: string }> = [
    { name: "Kunskapsbiblioteket", href: "/kunskapsbiblioteket" },
    { name: "Program", href: "/program" },
    { name: "Utbildningar (100h)", href: "/utbildningar" },
    { name: "Metoden", href: "/metoden" },
    { name: "Projekt & Effekt", href: "/projekt" },
    { name: "Om Skolyoga", href: "/om-skolyoga" },
  ];

  const loggedOutLinks: Array<{ name: string; href: string }> = [
    { name: "För skola & förskola", href: "/?malgrupp=skola#malgrupp" },
    { name: "Utbildningar (100h)", href: "/utbildningar" },
    { name: "Metoden", href: "/metoden" },
    { name: "För finansiärer & projekt", href: "/projekt" },
    { name: "Stöd oss", href: "/stod-oss" },
    { name: "Om Skolyoga", href: "/om-skolyoga" },
  ];

  const navLinks = user ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-40 bg-brand-sand/95 backdrop-blur-md border-b border-[#E3DFC9] transition-all">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with official mandala emblem */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0" aria-label="Skolyoga startsida">
            <div className="relative w-11 h-11 transition-transform group-hover:scale-105 shrink-0">
              <Image
                src="/images/emblem_turquoise.png"
                alt="Skolyoga logotyp symbol"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-[0.08em] font-cardo text-brand-dark uppercase">
                Skolyoga
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-darkGrey font-medium -mt-1">
                Trygghet, Stresshantering & Studieteknik
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Huvudmeny" className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const cleanHref = link.href.split("?")[0].split("#")[0];
              const isActive = cleanHref !== "/" && pathname.startsWith(cleanHref);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-brand-purple ${
                    isActive ? "text-brand-purple font-bold border-b-2 border-brand-purple pb-0.5" : "text-brand-dark/85"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden xl:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/mina-favoriter"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-pink/20 text-brand-purple text-xs font-semibold hover:bg-brand-pink/30 transition-colors border border-brand-pink/40"
                  title="Mina sparade övningar"
                >
                  <Heart className="w-3.5 h-3.5 fill-brand-pink text-brand-pink" />
                  <span>Favoriter ({favorites.length})</span>
                </Link>
                
                {/* Profile Link */}
                <Link
                  href="/profil"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E3DFC9] text-xs font-semibold text-brand-dark hover:border-brand-purple transition-all shadow-sm group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-turquoise text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="leading-tight font-bold group-hover:text-brand-purple line-clamp-1 max-w-[120px]">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-brand-darkGrey">
                      {progress.completedWeeks.length} veckor klara
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  aria-label="Logga ut"
                  title="Logga ut"
                  className="p-2 text-brand-darkGrey hover:text-brand-purple transition-colors rounded-full hover:bg-white cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/logga-in"
                  className="px-4 py-2 rounded-full bg-white border border-[#D5D0BE] text-brand-dark text-xs font-semibold hover:bg-stone-50 transition-all cursor-pointer"
                >
                  Logga in
                </Link>
                <Link
                  href="/logga-in?tab=register"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-[#781b61] transition-all shadow-sm cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Skapa gratis konto</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet controls (under xl) */}
          <div className="flex xl:hidden items-center gap-2">
            {!user ? (
              <Link
                href="/logga-in?tab=register"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-purple text-white text-xs font-semibold shadow-sm hover:bg-[#781b61] transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Gratis konto</span>
              </Link>
            ) : (
              <Link
                href="/profil"
                aria-label="Gå till min profil"
                className="w-8 h-8 rounded-full bg-brand-turquoise text-white flex items-center justify-center text-xs font-bold shadow-sm"
              >
                {user.fullName.charAt(0)}
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-dark hover:bg-brand-sand/80 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" aria-label="Mobilmeny" className="xl:hidden border-b border-[#E3DFC9] bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-brand-dark hover:bg-brand-sand transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/artiklar"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-brand-dark hover:bg-brand-sand transition-colors"
            >
              Artiklar & Nyheter
            </Link>
            <Link
              href="/kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-brand-dark hover:bg-brand-sand transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="/tillganglighet"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-brand-dustyPurple hover:bg-brand-sand transition-colors"
            >
              Tillgänglighetsredogörelse
            </Link>
          </div>

          <div className="pt-4 border-t border-brand-grey/15 space-y-2">
            {user ? (
              <>
                <Link
                  href="/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-turquoise/15 text-brand-dark font-semibold text-sm"
                >
                  <Award className="w-4 h-4 text-brand-turquoise" />
                  <span>Min Profil & Progress ({progress.completedWeeks.length} veckor klara)</span>
                </Link>
                <Link
                  href="/mina-favoriter"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-sand text-brand-dark font-semibold text-sm"
                >
                  <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
                  <span>Mina favoriter ({favorites.length})</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-xs text-red-600 font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logga ut ({user.email})</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/logga-in?tab=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-purple text-white font-semibold text-sm shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>Skapa gratis konto</span>
                </Link>
                <Link
                  href="/logga-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-sand text-brand-dark border border-[#D5D0BE] font-semibold text-sm"
                >
                  <span>Logga in</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
