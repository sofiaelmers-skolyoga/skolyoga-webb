"use client";

import React, { useState } from "react";
import { ExternalLink, X, Heart, Star, Sparkles, Check, Send, MessageSquare } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface HemmayogaSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle?: string;
}

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScQJ6ASeieJsQuVO79EcCBQWUHZHYpxIy_kZNH3ziVtLT-QVA/viewform?usp=header";

export function HemmayogaSurveyModal({
  isOpen,
  onClose,
  programTitle = "Hemmayoga",
}: HemmayogaSurveyModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [effect, setEffect] = useState<string>("Ja, mycket");
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInAppForm, setShowInAppForm] = useState(false);

  if (!isOpen) return null;

  const handleSubmitQuickSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "survey_responses"), {
        program: "Hemmayoga",
        programId: "yTk3wFhl1s011CoBYPpY",
        week: 3,
        userId: user?.id || "anonymous",
        userEmail: user?.email || "anonymous",
        userName: user?.fullName || "Anonym",
        rating,
        effect,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Survey submission error:", err);
      // Fallback: still show thank you
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#E3DFC9] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="survey-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-darkGrey hover:text-brand-dark rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Stäng enkät"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Skolyoga branding */}
        <div className="flex items-start gap-4 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-warmYellow/30 text-[#735100] flex items-center justify-center shrink-0 border border-brand-warmYellow/50">
            <Sparkles className="w-6 h-6 text-brand-dustyPurple" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-brand-turquoise">
              Tre veckor i {programTitle}
            </div>
            <h2 id="survey-modal-title" className="text-xl sm:text-2xl font-bold font-cardo text-brand-dark">
              Hur upplever du Hemmayoga?
            </h2>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3 bg-brand-sand/60 rounded-2xl border border-brand-grey/15">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-cardo text-brand-dark">
              Varmt tack för din feedback!
            </h3>
            <p className="text-xs text-brand-darkGrey max-w-sm mx-auto">
              Dina svar hjälper oss att fortsätta skapa trygghet, lugn och återhämtning för elever och pedagoger.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-brand-darkGrey leading-relaxed">
              Du har nu kommit tre veckor in i Hemmayoga-programmet! Tack vare medel från Folkhälsomyndigheten kan vi erbjuda detta gratis, och din upplevelse är ovärderlig för vår fortsatta forskning och utveckling.
            </p>

            {/* Primary Action: Google Forms Enkät */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-sand via-white to-brand-sand/80 border border-[#E3DFC9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-dustyPurple flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Officiell enkät (Folkhälsomyndigheten)</span>
                </span>
                <span className="text-[11px] text-brand-darkGrey font-medium">Ca 2 min</span>
              </div>
              <p className="text-xs text-brand-darkGrey">
                Klicka nedan för att öppna den korta enkäten. Du kan svara helt anonymt.
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Keep modal open or let user close
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-dustyPurple text-white font-semibold text-sm shadow hover:bg-[#781b61] transition-all cursor-pointer"
              >
                <span>Öppna enkäten i Google Forms</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Secondary Action: Quick in-app survey (like in the mobile app) */}
            <div>
              {!showInAppForm ? (
                <button
                  type="button"
                  onClick={() => setShowInAppForm(true)}
                  className="w-full text-center text-xs text-brand-dustyPurple hover:underline font-semibold py-1 cursor-pointer"
                >
                  Eller svara med ett 10-sekunders snabbsvar här direkt ↓
                </button>
              ) : (
                <form onSubmit={handleSubmitQuickSurvey} className="p-5 rounded-2xl bg-white border border-[#E3DFC9] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                    Snabbenkät direkt i webbläsaren
                  </h3>

                  {/* Question 1: Rating */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark block">
                      1. Hur upplever du övningarna hittills? (1–5)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                            rating >= num
                              ? "bg-brand-warmYellow text-[#543b00] border border-amber-300"
                              : "bg-brand-sand text-brand-darkGrey border border-stone-200"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${rating >= num ? "fill-[#543b00]" : ""}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2: Effect */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark block">
                      2. Upplever du minskad stress eller ökad återhämtning?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Ja, mycket", "Ja, lite", "Inte än"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setEffect(opt)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            effect === opt
                              ? "bg-brand-turquoise text-white border border-brand-turquoise shadow-xs"
                              : "bg-brand-sand text-brand-darkGrey border border-[#E3DFC9] hover:bg-stone-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 3: Comments */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-dark block">
                      3. Egna reflektioner eller förslag? (frivilligt)
                    </label>
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Skriv dina tankar här..."
                      className="w-full px-3 py-2 rounded-xl bg-brand-sand border border-[#E3DFC9] text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-dustyTurquoise text-white text-xs font-semibold shadow hover:bg-[#1B6465] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Skickar..." : "Skicka snabbsvar"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Dismiss */}
            <div className="flex items-center justify-between pt-2 border-t border-[#EBE8DC]">
              <span className="text-[11px] text-brand-darkGrey">
                Dina svar behandlas konfidentiellt.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-brand-darkGrey hover:text-brand-dark cursor-pointer px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              >
                Påminn mig senare
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
