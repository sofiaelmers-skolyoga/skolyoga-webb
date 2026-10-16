"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  Sparkles, 
  Building2, 
  Smartphone, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Users, 
  Award,
  Send,
  Loader2
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function StodOssPage() {
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    supportType: "Sponsra en workshop för en skola (15 900 kr)",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: companyForm.contactPerson,
          email: companyForm.email,
          phone: companyForm.phone,
          school: companyForm.companyName,
          subject: `Företagsstöd: ${companyForm.supportType}`,
          message: `FÖRETAGSSTÖD SKOLYOGA\nFöretag: ${companyForm.companyName}\nKontaktperson: ${companyForm.contactPerson}\nE-post: ${companyForm.email}\nTelefon: ${companyForm.phone}\nTyp av stöd: ${companyForm.supportType}\nMeddelande: ${companyForm.message}`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Stöd Skolyoga"
        badgeIcon={<Heart className="w-3.5 h-3.5" />}
        title="Var med och skapa lugn och framtidstro i skolan"
        description="Ditt stöd ger barn och unga i hela Sverige evidensbaserade verktyg för stresshantering, återhämtning och studiero. Välj om du vill bidra privat eller via företag."
        bgImage="/images/heroes/stod_oss_hero.jpg"
        bgAlt="Stöd Skolyoga – elever och pedagoger i klassrummet"
        align="center"
        objectPosition="object-[center_35%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">

      {/* Two Paths Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Path 1: Privatpersoner via Swish */}
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-dustyPink/20 text-brand-dustyPurple flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              För privatpersoner – Swish
            </h2>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Varje krona gör skillnad. Ditt bidrag möjliggör fler kostnadsfria filmer i Kunskapsbiblioteket, digitala hjälpmedel och spridning av metoden till skolor med särskilt stora behov.
            </p>

            <div className="p-6 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-3">
              <div className="text-xs uppercase font-bold tracking-wider text-brand-dustyPurple">
                Swisha ditt bidrag direkt:
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-brand-dark tracking-wide">
                123 456 78 90
              </div>
              <div className="text-xs text-brand-darkGrey">
                Mottagare: <strong>Skolyoga Sverige</strong> • Märk betalningen med <em>Gåva</em>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-brand-darkGrey pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>100 kr bidrar till tillgängliggörande av övningsfilmer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>300 kr finansierar ett tryckt analogt övningsmaterial till en klass</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                <span>500 kr möjliggör stödinsats för elevhälsa och NPF</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#EBE8DC]">
            <a
              href="https://app.swish.nu/1234567890"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all"
            >
              <span>Öppna Swish</span>
            </a>
          </div>
        </div>

        {/* Path 2: Företagsstöd */}
        <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-dustyTurquoise/20 text-brand-dustyTurquoise flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#1B6465]" />
            </div>
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              För företag & organisationer
            </h2>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Investera i framtidens generationer. Som företag kan ni finansiera konkreta utbildningsinsatser för en skola i er hemkommun eller sponsra en hel fortbildningsomgång.
            </p>

            <div className="space-y-3 pt-2 text-xs text-brand-dark">
              <div className="p-3.5 rounded-xl bg-brand-sand border border-[#E3DFC9]">
                <strong className="block text-brand-dark font-cardo text-sm">Sponsra en workshop för en skola</strong>
                <span className="text-brand-darkGrey">Finansiera en 2–3 timmars upplevelsebaserad utbildning för ett helt lärarlag (15 900 kr exkl. moms).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-brand-sand border border-[#E3DFC9]">
                <strong className="block text-brand-dark font-cardo text-sm">Kommuninsats eller studiedag</strong>
                <span className="text-brand-darkGrey">Bekosta fortbildning i stresshantering och studieteknik för elevhälsan och skolledare i en kommun.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-brand-sand border border-[#E3DFC9]">
                <strong className="block text-brand-dark font-cardo text-sm">Företagspartner för mental hälsa</strong>
                <span className="text-brand-darkGrey">Långsiktigt partnerskap med synlighet i effektrapporter och föreläsningar för personalen.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EBE8DC]">
            <a
              href="#foretagsforfragan"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-brand-sand border border-[#D5D0BE] text-brand-dark font-semibold text-sm hover:bg-[#EBE8DC] transition-all"
            >
              <span>Skicka förfrågan om företagsstöd ↓</span>
            </a>
          </div>
        </div>

      </div>

      {/* Corporate Sponsorship Form */}
      <section id="foretagsforfragan" className="bg-white rounded-3xl border border-[#E3DFC9] p-8 md:p-12 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
            Intresseanmälan för företagsstöd
          </h2>
          <p className="text-sm text-brand-darkGrey max-w-lg mx-auto">
            Fyll i formuläret nedan så kontaktar vi er för att diskutera hur ert företag bäst kan göra skillnad för barn och unga.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-brand-sand text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-brand-dustyTurquoise mx-auto" />
            <h3 className="text-xl font-bold font-cardo text-brand-dark">Tack för ert engagemang!</h3>
            <p className="text-sm text-brand-darkGrey">
              Vi har mottagit er förfrågan och återkommer inom kort till {companyForm.email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Företag / Organisation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyForm.companyName}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  placeholder="Företagsnamn AB"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0BE] bg-brand-sand/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Kontaktperson <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyForm.contactPerson}
                  onChange={(e) => setCompanyForm({ ...companyForm, contactPerson: e.target.value })}
                  placeholder="För- och efternamn"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0BE] bg-brand-sand/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  E-postadress <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  placeholder="namn@foretag.se"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0BE] bg-brand-sand/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  placeholder="070-123 45 67"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0BE] bg-brand-sand/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Önskad form av stöd
              </label>
              <select
                value={companyForm.supportType}
                onChange={(e) => setCompanyForm({ ...companyForm, supportType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0BE] bg-brand-sand/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
              >
                <option value="Sponsra en workshop för en skola (15 900 kr)">Sponsra en workshop för en skola (15 900 kr)</option>
                <option value="Sponsra 100h-utbildning för skolpersonal (11 900 kr)">Sponsra 100h-utbildning för skolpersonal (11 900 kr)</option>
                <option value="Större kommuninsats eller partnerskap">Större kommuninsats eller partnerskap</option>
                <option value="Annan gåva / samarbete">Annan gåva / samarbete</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Meddelande / Tankar kring samarbetet
              </label>
              <textarea
                rows={3}
                value={companyForm.message}
                onChange={(e) => setCompanyForm({ ...companyForm, message: e.target.value })}
                placeholder="Berätta gärna kort om era tankar eller om ni vill rikta stödet till en särskild skola eller kommun..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0BE] bg-brand-sand/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Skickar intresseanmälan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Skicka intresseanmälan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* VÅRA SAMARBETSPARTNERS & STÖDJARE */}
      <section className="space-y-8 pt-6 border-t border-[#E3DFC9]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyTurquoise/20 text-[#1B6465] text-xs font-bold uppercase tracking-wider">
            <span>Samarbetspartners & Stödjare</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
            Företag och organisationer som stöttar Skolyoga
          </h2>
          <p className="text-sm text-brand-darkGrey">
            Tillsammans med våra engagerade partners kan vi nå ut till fler skolor och ge tusentals barn och elever konkreta verktyg för livet.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          {[
            {
              name: "ICA Maxi Nacka",
              logo: "/images/partners/ica_maxi_nacka.svg",
              role: "Företagspartner",
            },
            {
              name: "ICA Kvantum Vallentuna",
              logo: "/images/partners/ica_kvantum_vallentuna.svg",
              role: "Företagspartner",
            },
            {
              name: "Folkhälsomyndigheten",
              logo: "/images/partners/folkhalsomyndigheten.svg",
              role: "Projektstöd",
            },
            {
              name: "Allmänna Arvsfonden",
              logo: "/images/partners/arvsfonden.svg",
              role: "Projektfinansiär",
            },
            {
              name: "Generation Pep",
              logo: "/images/partners/generation_pep.svg",
              role: "Samarbetspartner",
            },
            {
              name: "Funkibator",
              logo: "/images/partners/funkibator.svg",
              role: "Samarbetspartner",
            },
          ].map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-2xl border border-[#E3DFC9] p-4 flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-shadow group text-center"
            >
              <div className="relative w-full h-16 flex items-center justify-center p-2">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logotyp`}
                  width={160}
                  height={50}
                  className="max-h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div className="pt-2 border-t border-[#F2EFE6] w-full">
                <span className="text-[11px] font-semibold text-brand-dark block truncate">
                  {partner.name}
                </span>
                <span className="text-[10px] text-brand-darkGrey block">
                  {partner.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
}
