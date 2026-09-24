"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, User, Menu, X, LogOut, Smartphone, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, favorites, logout, loginDemo } = useAuth();

  const navLinks = [
    { name: "Kunskapsbiblioteket", href: "/kunskapsbiblioteket" },
    { name: "Utbildningar", href: "/utbildningar" },
    { name: "Om Skolyoga", href: "/om-skolyoga" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-sand/95 backdrop-blur-md border-b border-[#E3DFC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with official mandala emblem */}
          <Link href="/" className="flex items-center gap-3.5 group">
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
                Livsförmågor i skolan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors hover:text-brand-dustyPurple ${
                    isActive ? "text-brand-dustyPurple font-bold border-b-2 border-brand-dustyPurple pb-0.5" : "text-brand-dark/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/mina-favoriter"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dustyPink/20 text-brand-dustyPurple text-sm font-semibold hover:bg-brand-dustyPink/30 transition-colors border border-brand-dustyPink/40"
                >
                  <Heart className="w-4 h-4 fill-brand-dustyPink text-brand-dustyPink" />
                  <span>Favoriter ({favorites.length})</span>
                </Link>
                
                <div className="flex items-center gap-2.5 text-sm text-brand-dark font-medium pl-3 border-l border-[#E3DFC9]">
                  <div className="w-8 h-8 rounded-full bg-brand-dustyTurquoise text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="leading-tight text-xs font-bold text-brand-dark">{user.fullName}</span>
                    <span className="text-[10px] text-brand-darkGrey">{user.schoolName || "Lärare / Skola"}</span>
                  </div>
                  <button
                    onClick={logout}
                    title="Logga ut"
                    className="p-1.5 text-brand-darkGrey hover:text-brand-dustyPurple transition-colors ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => loginDemo("teacher")}
                  className="text-xs text-brand-darkGrey hover:text-brand-dustyPurple underline underline-offset-4 mr-1"
                  title="Klicka för att testa som inloggad lärare"
                >
                  (Demo-inlogg)
                </button>
                <Link
                  href="/logga-in"
                  className="text-sm font-medium text-brand-dark hover:text-brand-dustyPurple transition-colors px-3 py-2"
                >
                  Logga in
                </Link>
                <Link
                  href="/logga-in?tab=register"
                  className="px-5 py-2.5 rounded-full bg-brand-dustyPurple text-white text-sm font-medium shadow-sm hover:bg-[#781b61] transition-all hover:shadow"
                >
                  Skapa konto
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <Link
                href="/mina-favoriter"
                className="p-2 text-brand-dustyPurple"
                aria-label="Favoriter"
              >
                <Heart className="w-5 h-5 fill-brand-dustyPink text-brand-dustyPink" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-dark hover:bg-brand-sandDark transition-colors"
              aria-label="Öppna meny"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E3DFC9] bg-brand-sand px-4 pt-3 pb-6 space-y-4 shadow-md">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-brand-dark hover:text-brand-dustyPurple py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-[#E3DFC9] flex flex-col gap-3">
            {user ? (
              <>
                <div className="text-sm text-brand-dark font-medium">
                  Inloggad som <span className="font-bold">{user.fullName}</span>
                </div>
                <Link
                  href="/mina-favoriter"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-brand-dustyPurple font-medium"
                >
                  <Heart className="w-4 h-4 fill-brand-dustyPink text-brand-dustyPink" />
                  Mina sparade favoriter ({favorites.length})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm text-red-600 font-medium py-1"
                >
                  Logga ut
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/logga-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full border border-brand-dustyPurple text-brand-dustyPurple font-medium text-sm"
                >
                  Logga in
                </Link>
                <Link
                  href="/logga-in?tab=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-brand-dustyPurple text-white font-medium text-sm shadow-sm"
                >
                  Skapa konto
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
