"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, User, School, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">(defaultTab);
  const router = useRouter();
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    resetPassword,
    loginDemo,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [role, setRole] = useState<"teacher" | "school_admin">("teacher");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper to translate Firebase error codes to friendly Swedish
  const getSwedishErrorMessage = (err: any) => {
    const code = err?.code || "";
    switch (code) {
      case "auth/user-not-found":
        return "Det finns inget konto registrerat med denna e-postadress.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Felaktig e-postadress eller lösenord. Försök igen.";
      case "auth/email-already-in-use":
        return "E-postadressen är redan registrerad. Logga in istället eller klicka på Glömt lösenord.";
      case "auth/weak-password":
        return "Lösenordet är för svagt. Det måste innehålla minst 6 tecken.";
      case "auth/invalid-email":
        return "Ange en giltig e-postadress.";
      case "auth/too-many-requests":
        return "För många misslyckade försök. Kontot är tillfälligt låst för din säkerhet. Försök igen om en stund eller återställ lösenordet.";
      case "auth/popup-closed-by-user":
        return "Inloggningen med Google avbröts.";
      default:
        return err?.message || "Ett oväntat fel uppstod vid inloggning. Försök igen.";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await loginWithEmail(email, password);
      router.push("/mina-favoriter");
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await registerWithEmail(email, password, name, school);
      setSuccessMessage(
        "Ditt konto har skapats! Du kan nu logga in med samma uppgifter både här på hemsidan och i Skolyoga-appen."
      );
      setActiveTab("login");
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      router.push("/mina-favoriter");
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Vänligen ange din e-postadress ovan.");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await resetPassword(email);
      setSuccessMessage(
        `Ett återställningsmejl har skickats till ${email}. Kontrollera även skräpposten.`
      );
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      
      {/* Brand Icon Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-brand-coral flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-md mb-3">
          S
        </div>
        <h1 className="text-2xl font-bold text-brand-dark">
          {activeTab === "login" && "Logga in på Skolyoga"}
          {activeTab === "register" && "Skapa ett konto"}
          {activeTab === "forgot" && "Återställ lösenord"}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Samma inloggning används både på hemsidan och i Skolyoga-appen
        </p>
      </div>

      {/* Tabs (Hidden on forgot view) */}
      {activeTab !== "forgot" && (
        <div className="flex rounded-xl bg-stone-200/70 p-1 mb-6">
          <button
            onClick={() => {
              setActiveTab("login");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "login"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-stone-600 hover:text-brand-dark"
            }`}
          >
            Logga in
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "register"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-stone-600 hover:text-brand-dark"
            }`}
          >
            Skapa nytt konto
          </button>
        </div>
      )}

      {/* Messages */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Card Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
        
        {/* Google Inloggning */}
        {activeTab !== "forgot" && (
          <>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 flex items-center justify-center gap-3 text-xs font-semibold text-stone-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Fortsätt med Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-stone-400 uppercase tracking-wider">
                eller med e-post
              </span>
            </div>
          </>
        )}

        {/* FORGOT PASSWORD FORM */}
        {activeTab === "forgot" ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                E-postadress
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namn@skola.se"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-brand-coral text-white font-semibold text-sm shadow-md hover:bg-[#cf4f3d] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Skickar återställningsmejl..." : "Skicka återställningslänk"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-xs text-stone-500 hover:text-brand-dark"
              >
                Tillbaka till inloggning
              </button>
            </div>
          </form>
        ) : (
          /* LOGIN OR REGISTER FORM */
          <form
            onSubmit={activeTab === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            {activeTab === "register" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ditt namn
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="För- och efternamn"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Skola / Kommun
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="t.ex. Paradisskolan, Trollhättan"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                E-postadress
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namn@skola.se"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Lösenord
                </label>
                {activeTab === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("forgot");
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[11px] text-brand-coral hover:underline"
                  >
                    Glömt lösenord?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minst 6 tecken"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-brand-coral text-white font-semibold text-sm shadow-md hover:bg-[#cf4f3d] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Vänta...</span>
              ) : (
                <span>{activeTab === "login" ? "Logga in" : "Skapa konto"}</span>
              )}
            </button>
          </form>
        )}

        {/* Quick Demo Login Option */}
        <div className="pt-4 border-t border-stone-100 text-center space-y-2">
          <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">
            Snabbtest utan konto
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                loginDemo("teacher");
                router.push("/mina-favoriter");
              }}
              className="flex-1 py-2 px-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-50"
            >
              Provklicka som Lärare
            </button>
            <button
              type="button"
              onClick={() => {
                loginDemo("school_admin");
                router.push("/mina-favoriter");
              }}
              className="flex-1 py-2 px-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-50"
            >
              Provklicka som Rektor
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Laddar inloggningsformulär...</div>}>
      <LoginContent />
    </Suspense>
  );
}
