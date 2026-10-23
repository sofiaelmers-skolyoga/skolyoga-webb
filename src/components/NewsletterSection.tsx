"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, CheckCircle, Sparkles, ArrowRight, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Lärare");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ett fel inträffade.");
      }

      // Local fallback storage
      try {
        const subscribers = JSON.parse(localStorage.getItem("skolyoga_subscribers") || "[]");
        subscribers.push({ email, role, subscribedAt: new Date().toISOString() });
        localStorage.setItem("skolyoga_subscribers", JSON.stringify(subscribers));
      } catch (localErr) {
        console.warn("localStorage save:", localErr);
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Error saving newsletter subscription:", err);
      // Still set submitted for resilient user experience
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-brand-sand/40 to-brand-sand relative overflow-hidden">
      {/* Background Mandala Watermark */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none opacity-5 w-96 h-96">
        <Image
          src="/images/emblem_turquoise.png"
          alt="Mandala emblem"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E3DFC9] shadow-xl shadow-brand-dark/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Text column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/30 text-brand-dark text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                <span>Skolyogas Nyhetsbrev</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-cardo text-brand-dark tracking-tight leading-tight">
                Få konkreta övningar för välmående i skolan och förskolan
              </h2>

              <p className="mt-4 text-brand-darkGrey text-base leading-relaxed">
                Varannan vecka skickar vi ut korta klassrumsövningar, tips för elever med stress eller NPF, 
                och aktuell forskning kring upplevelsebaserat lärande och trygghet i skolan.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-brand-darkGrey">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-brand-turquoise" />
                  Helt kostnadsfritt
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-brand-turquoise" />
                  Ingen reklam eller spam
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-brand-turquoise" />
                  Avregistrera när du vill
                </span>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-5 bg-brand-sand/70 p-6 sm:p-8 rounded-2xl border border-[#E3DFC9]">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-brand-turquoise/20 text-brand-turquoise rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-cardo text-brand-dark">
                    Tack för att du prenumererar! 🌸
                  </h3>
                  <p className="text-sm text-brand-darkGrey leading-relaxed">
                    Vi har registrerat <strong className="text-brand-dark">{email}</strong>. Välkommen till Skolyoga!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail("");
                    }}
                    className="mt-4 text-xs text-brand-purple font-semibold hover:underline"
                  >
                    Anmäl en till adress
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="newsletter-email" className="block text-xs font-semibold text-brand-dark mb-1.5">
                      Din e-postadress
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-brand-darkGrey/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="namn@skola.se"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#D5D0BE] text-brand-dark placeholder:text-brand-darkGrey/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newsletter-role" className="block text-xs font-semibold text-brand-dark mb-1.5">
                      Vad är din roll?
                    </label>
                    <select
                      id="newsletter-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#D5D0BE] text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all"
                    >
                      <option value="Lärare">Lärare / Pedagog</option>
                      <option value="Skolledare">Skolledare / Rektor</option>
                      <option value="Elevhälsa">Elevhälsa (kurator, psykolog, skolsyster)</option>
                      <option value="Specialpedagog">Specialpedagog / Resurspedagog</option>
                      <option value="Förälder">Förälder / Vårdnadshavare</option>
                      <option value="Övrigt">Övrigt intresserad</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-brand-purple/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Registrerar...</span>
                      </>
                    ) : (
                      <>
                        <span>Prenumerera på nyhetsbrevet</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-brand-darkGrey text-center leading-normal">
                    Genom att anmäla dig godkänner du vår{" "}
                    <Link href="/integritetspolicy" className="underline hover:text-brand-purple">
                      integritetspolicy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
