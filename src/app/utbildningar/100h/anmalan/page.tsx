"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Award, 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard, 
  Building, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Send, 
  Loader2, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  HelpCircle
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function Anmalan100hPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    invoiceSchool: "",
    invoiceAddress: "",
    invoiceZipCity: "",
    invoiceReference: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/register-100h", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ett fel uppstod vid inskickandet.");
      }

      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Kunde inte skicka anmälan just nu. Vänligen försök igen eller maila oss direkt på hej@skolyoga.se.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackHref = `mailto:hej@skolyoga.se?subject=${encodeURIComponent(
    "Anmälan Skolyogautbildning 100h (Hösten 2027)"
  )}&body=${encodeURIComponent(
    `Hej Skolyoga!\n\nJag vill anmäla mig till Skolyogautbildningen 100h för hösten 2027.\n\nNamn: ${formData.name}\nE-post: ${formData.email}\nTelefon: ${formData.phone}\n\nFAKTURERING:\nOrganisation/Skola: ${formData.invoiceSchool}\nGatuadress/Box: ${formData.invoiceAddress}\nPostnummer & Ort: ${formData.invoiceZipCity}\nReferens/GLN: ${formData.invoiceReference}\n\nÖvrig info: ${formData.message}`
  )}`;

  return (
    <div className="space-y-10 pb-20">
      
      {/* Page Hero */}
      <PageHero
        badge="Certifiering"
        badgeIcon={<Award className="w-3.5 h-3.5" />}
        title="Anmälan: Skolyogautbildning 100h"
        description="Bli diplomerad Skolyogakonsult. Få fördjupad kompetens att leda evidensbaserade mikropauser, stressreglering och studieteknik i skolan."
        bgImage="/images/heroes/classroom_standing.jpg"
        bgAlt="Skolyoga Konsultutbildning"
        align="center"
        objectPosition="object-[52%_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/utbildningar"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-dustyPurple hover:underline group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Tillbaka till alla utbildningar</span>
          </Link>
        </div>

        {/* Success View */}
        {submitSuccess ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E3DFC9] shadow-md text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold font-cardo text-brand-dark">
                Tack för din anmälan!
              </h1>
              <p className="text-sm sm:text-base text-brand-darkGrey leading-relaxed">
                Vi har tagit emot din anmälan till <strong>Skolyogautbildning 100h (Hösten 2027)</strong>. 
                En bekräftelse har skickats till <strong>{formData.email}</strong> och vi kontaktar dig med detaljerat schema och välkomstmaterial.
              </p>
            </div>

            <div className="bg-brand-sand/50 p-6 rounded-2xl border border-[#E3DFC9] text-left text-xs sm:text-sm text-brand-dark space-y-2">
              <div className="font-bold text-brand-dustyPurple uppercase text-xs tracking-wider mb-2">
                Sammanfattning av anmälan:
              </div>
              <div><strong>Deltagare:</strong> {formData.name}</div>
              <div><strong>E-post:</strong> {formData.email}</div>
              <div><strong>Telefon:</strong> {formData.phone}</div>
              <div><strong>Fakturamottagare:</strong> {formData.invoiceSchool}</div>
              <div><strong>Adress:</strong> {formData.invoiceAddress}, {formData.invoiceZipCity}</div>
              {formData.invoiceReference && (
                <div><strong>Referens / GLN:</strong> {formData.invoiceReference}</div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/utbildningar"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all"
              >
                Tillbaka till utbildningar
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-[#D9D5C1] text-brand-dark font-semibold text-sm hover:bg-brand-sand/40 transition-all"
              >
                Gå till startsidan
              </Link>
            </div>

            <p className="text-xs text-brand-darkGrey pt-4">
              Har du några frågor under tiden? Kontakta oss gärna direkt på{" "}
              <a href="mailto:hej@skolyoga.se" className="text-brand-dustyPurple underline font-bold">
                hej@skolyoga.se
              </a>
            </p>
          </div>
        ) : (
          /* Registration Form View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Course Overview & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dustyPink/25 border border-brand-dustyPink/40 text-brand-dustyPurple text-xs font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certifierande utbildning</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">
                    Skolyogautbildning 100h
                  </h1>
                  <p className="text-xs sm:text-sm text-brand-darkGrey leading-relaxed">
                    Vår fördjupande 100-timmarsutbildning för dig som vill integrera evidensbaserade kroppsliga verktyg, stressreglering och studieteknik i skolans vardag.
                  </p>
                </div>

                {/* Course Metadata */}
                <div className="space-y-3.5 pt-4 border-t border-[#EBE8DC] text-xs text-brand-darkGrey">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-brand-dustyPurple shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-dark">Kursstart:</strong>
                      Datum för hösten 2027 kommer
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-dustyTurquoise shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-dark">Plats:</strong>
                      Stockholm (fysiska kurshelger) + digitala moduler & webbinarier
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-dustyTurquoise shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-dark">Omfattning:</strong>
                      100 timmar (teori, praktik och upplevelsebaserat lärande)
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-4 h-4 text-brand-dustyPurple shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-dark">Investering:</strong>
                      11 900 kr inkl. moms (faktureras)
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="pt-4 border-t border-[#EBE8DC] space-y-2.5">
                  <div className="text-xs uppercase font-bold text-brand-dustyPurple tracking-wider">
                    Detta ingår i utbildningen:
                  </div>
                  <ul className="space-y-2 text-xs text-brand-dark">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                      <span>Fysiska helgmoduler i Stockholm</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                      <span>Digital plattform med övningar & lektionsupplägg</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                      <span>Tryckta kompendier och metodmaterial</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                      <span>Handledning och mentorskap</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-dustyTurquoise shrink-0" />
                      <span>Diplom och certifiering som Skolyogainstruktör</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Help */}
                <div className="p-4 rounded-2xl bg-brand-sand/40 border border-[#E3DFC9] text-xs text-brand-darkGrey flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-brand-dustyPurple shrink-0 mt-0.5" />
                  <div>
                    Har du frågor om fakturering eller utbildningsupplägg? Mejla oss direkt på{" "}
                    <a href="mailto:hej@skolyoga.se" className="text-brand-dustyPurple font-bold underline">
                      hej@skolyoga.se
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Dedicated Registration Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DFC9] shadow-sm space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-cardo text-brand-dark">
                    Anmälningsformulär
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-darkGrey mt-1">
                    Fyll i formuläret nedan för att reservera din plats. Anmälan är bindande efter skriftlig bekräftelse.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Deltagarinformation */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-brand-dark font-cardo flex items-center gap-2 text-brand-dustyPurple uppercase tracking-wider">
                      <User className="w-4 h-4" />
                      <span>1. Deltagarinformation</span>
                    </h3>

                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-brand-dark mb-1">
                        För- och efternamn <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="T.ex. Anna Andersson"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-brand-dark mb-1">
                          E-postadress <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="anna.andersson@skola.se"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-brand-dark mb-1">
                          Telefonnummer <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="070-123 45 67"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Faktureringsadress */}
                  <div className="space-y-4 pt-4 border-t border-[#EBE8DC]">
                    <h3 className="text-sm font-bold text-brand-dark font-cardo flex items-center gap-2 text-brand-dustyPurple uppercase tracking-wider">
                      <Building className="w-4 h-4" />
                      <span>2. Faktureringsadress</span>
                    </h3>

                    <div>
                      <label htmlFor="invoiceSchool" className="block text-xs font-semibold text-brand-dark mb-1">
                        Fakturamottagare / Skola / Kommun / Företag <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="invoiceSchool"
                        type="text"
                        name="invoiceSchool"
                        required
                        value={formData.invoiceSchool}
                        onChange={handleChange}
                        placeholder="T.ex. Engelbrektsskolan / Stockholms stad"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="invoiceAddress" className="block text-xs font-semibold text-brand-dark mb-1">
                        Gatuadress / Box <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="invoiceAddress"
                        type="text"
                        name="invoiceAddress"
                        required
                        value={formData.invoiceAddress}
                        onChange={handleChange}
                        placeholder="T.ex. Skolvägen 1 eller Box 100"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="invoiceZipCity" className="block text-xs font-semibold text-brand-dark mb-1">
                          Postnummer och ort <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="invoiceZipCity"
                          type="text"
                          name="invoiceZipCity"
                          required
                          value={formData.invoiceZipCity}
                          onChange={handleChange}
                          placeholder="T.ex. 114 23 Stockholm"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="invoiceReference" className="block text-xs font-semibold text-brand-dark mb-1">
                          Referens / GLN-kod / Kostnadsställe
                        </label>
                        <input
                          id="invoiceReference"
                          type="text"
                          name="invoiceReference"
                          value={formData.invoiceReference}
                          onChange={handleChange}
                          placeholder="T.ex. Ref: Anna / GLN: 73..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Övrig information */}
                  <div className="space-y-4 pt-4 border-t border-[#EBE8DC]">
                    <h3 className="text-sm font-bold text-brand-dark font-cardo flex items-center gap-2 text-brand-dustyPurple uppercase tracking-wider">
                      <FileText className="w-4 h-4" />
                      <span>3. Övrig information</span>
                    </h3>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-brand-dark mb-1">
                        Yrkesroll, eventuella önskemål eller meddelande (valfritt)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Berätta gärna kort om din roll i skolan, tidigare erfarenhet eller om du har särskilda önskemål..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D5C1] bg-[#FAF9F5] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple focus:bg-white transition-all resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EBE8DC]">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Skickar anmälan...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Skicka anmälan</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-brand-darkGrey text-center sm:text-right">
                      Föredrar du att mejla?{" "}
                      <a
                        href={mailtoFallbackHref}
                        className="text-brand-dustyPurple font-bold underline hover:text-brand-dark"
                      >
                        Öppna mejl till hej@skolyoga.se
                      </a>
                    </p>
                  </div>

                </form>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
