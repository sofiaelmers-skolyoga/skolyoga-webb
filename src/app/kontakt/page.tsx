"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, User, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function KontaktPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Utbildning / Workshop");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          school,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Något gick fel när meddelandet skulle skickas.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMessage(
        err.message || "Kunde inte skicka formuläret just nu. Klicka nedan för att mejla oss direkt!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoHref = `mailto:hej@skolyoga.se?subject=${encodeURIComponent(
    `[Skolyoga Kontakt] ${subject} - ${name || "Förfrågan"}`
  )}&body=${encodeURIComponent(
    `Hej Skolyoga!\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone || "-"}\nSkola / Organisation: ${school || "-"}\nÄmne: ${subject}\n\nMeddelande:\n${message}\n`
  )}`;

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Ta kontakt"
        badgeIcon={<MessageCircle className="w-3.5 h-3.5" />}
        title="Vi vill gärna höra från dig"
        description="Oavsett om du är lärare, rektor, representerar elevhälsan eller är nyfiken på ett projekt – hör av dig så berättar vi mer om hur Skolyoga kan stötta er."
        bgImage="/images/heroes/classroom_standing.jpg"
        bgAlt="Skolyoga kontakt bakgrund"
        align="center"
        objectPosition="object-[52%_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct contact info & Sofia card */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Sofia Card */}
          <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-turquoise/40 shrink-0">
                <Image
                  src="/images/profil_bild.jpg"
                  alt="Sofia Elmers"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold font-cardo text-brand-dark">Sofia Elmers</h2>
                <div className="text-xs text-brand-darkGrey mt-0.5">Skolyoga Sverige</div>
              </div>
            </div>

            <p className="text-sm text-brand-darkGrey leading-relaxed">
              ”Har du funderingar kring hur en studiedag läggs upp, hur ni kan söka bidrag för fortbildning eller hur appen implementeras i er skola? Kontakta mig direkt!”
            </p>

            <div className="space-y-3 pt-2 border-t border-[#EBE8DC] text-xs sm:text-sm text-brand-dark">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                <a href="mailto:hej@skolyoga.se" className="hover:underline font-semibold">hej@skolyoga.se</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Verksamhet i hela Sverige</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ pointer */}
          <div className="p-6 rounded-2xl bg-brand-sand border border-brand-grey/15 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
              Har du snabba frågor?
            </h3>
            <p className="text-xs text-brand-darkGrey leading-relaxed">
              Kolla gärna vår sida med vanliga frågor där vi svarar på hur lektionsövningarna fungerar, om eleverna behöver byta om och hur Skolyoga anpassas för NPF.
            </p>
            <Link
              href="/vanliga-fragor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:underline"
            >
              <span>Gå till Vanliga frågor (FAQ)</span>
              <span>→</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 bg-brand-dustyTurquoise/20 text-[#1B6465] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark">Tack för ditt meddelande! 🌸</h2>
                <p className="text-sm sm:text-base text-brand-darkGrey max-w-md mx-auto leading-relaxed">
                  Ditt meddelande har skickats till <span className="font-semibold text-brand-purple">hej@skolyoga.se</span> och sparats i vårt system. Vi återkopplar så snabbt vi kan, oftast inom 24 timmar på vardagar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-sand/60 border border-[#E3DFC9] text-xs text-brand-darkGrey max-w-md mx-auto text-left space-y-1">
                <p className="font-semibold text-brand-dark">Skickade uppgifter:</p>
                <p>• <strong>Från:</strong> {name} ({email})</p>
                {phone && <p>• <strong>Telefon:</strong> {phone}</p>}
                {school && <p>• <strong>Skola/Organisation:</strong> {school}</p>}
                <p>• <strong>Ärende:</strong> {subject}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setSchool("");
                    setMessage("");
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-brand-grey/20 text-xs font-semibold text-brand-dark hover:bg-brand-sand transition-colors"
                >
                  Skicka ett nytt meddelande
                </button>
                <a
                  href={mailtoHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold hover:bg-brand-purple/20 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Öppna i e-postprogram</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyPurple/15 text-brand-dustyPurple text-xs font-semibold uppercase tracking-wider mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Skickas till hej@skolyoga.se</span>
                </div>
                <h2 className="text-2xl font-bold font-cardo text-brand-dark mb-1">Skicka ett meddelande</h2>
                <p className="text-xs text-brand-darkGrey">
                  Fyll i formuläret nedan. Meddelandet vidarebefordras direkt till vårt team på <strong className="text-brand-dark">hej@skolyoga.se</strong>.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <p>
                    Du kan också mejla oss direkt via länken nedan:
                  </p>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-1.5 font-bold text-red-900 underline hover:text-red-700"
                  >
                    <span>Öppna mejl till hej@skolyoga.se</span>
                    <span>→</span>
                  </a>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1.5">Ditt namn *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anna Andersson"
                    className="w-full px-4 py-3 rounded-xl bg-brand-sand/40 border border-brand-grey/20 text-brand-dark text-sm focus:outline-none focus:border-brand-purple transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1.5">Din e-postadress *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anna@skola.se"
                    className="w-full px-4 py-3 rounded-xl bg-brand-sand/40 border border-brand-grey/20 text-brand-dark text-sm focus:outline-none focus:border-brand-purple transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1.5">Telefonnummer (valfritt)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="070-123 45 67"
                    className="w-full px-4 py-3 rounded-xl bg-brand-sand/40 border border-brand-grey/20 text-brand-dark text-sm focus:outline-none focus:border-brand-purple transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1.5">Skola / Organisation</label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="t.ex. Mellanstadiet, Göteborg"
                    className="w-full px-4 py-3 rounded-xl bg-brand-sand/40 border border-brand-grey/20 text-brand-dark text-sm focus:outline-none focus:border-brand-purple transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1.5">Vad gäller saken?</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-brand-sand/40 border border-brand-grey/20 text-brand-dark text-sm focus:outline-none focus:border-brand-purple transition-all"
                >
                  <option value="Utbildning / Workshop">Utbildning eller Workshop för skolan</option>
                  <option value="100h Skolyogakonsult">100h Skolyogakonsult-utbildning</option>
                  <option value="Hemmayoga / Appen">Hemmayoga / Frågor om appen</option>
                  <option value="Projekt & Samverkan">Projekt, forskning och samverkan</option>
                  <option value="Övrigt">Övrigt</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1.5">Ditt meddelande *</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Berätta lite om er skola, era behov eller vad du vill veta mer om..."
                  className="w-full px-4 py-3 rounded-xl bg-brand-sand/40 border border-brand-grey/20 text-brand-dark text-sm focus:outline-none focus:border-brand-purple transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-brand-purple/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Skickar till hej@skolyoga.se...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Skicka meddelande</span>
                    </>
                  )}
                </button>

                <span className="text-xs text-brand-darkGrey">
                  Eller mejla oss direkt på{" "}
                  <a href="mailto:hej@skolyoga.se" className="text-brand-purple font-medium hover:underline">
                    hej@skolyoga.se
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
      </div>
    </div>
  );
}
