"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, User, AlertCircle, CheckCircle2, Smartphone, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormCardProps {
  initialTab?: "login" | "register";
  onSuccess?: () => void;
  showTitle?: boolean;
}

export function LoginFormCard({
  initialTab = "login",
  onSuccess,
  showTitle = true,
}: LoginFormCardProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">(initialTab);
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithApple,
    resetPassword,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getSwedishErrorMessage = (err: any) => {
    const code = err?.code || "";
    switch (code) {
      case "auth/user-not-found":
        return "Det finns inget konto registrerat med denna e-postadress.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Felaktig e-postadress eller lösenord. Försök igen.";
      case "auth/email-already-in-use":
        return "E-postadressen är redan registrerad. Logga in eller klicka på Glömt lösenord.";
      case "auth/weak-password":
        return "Lösenordet är för svagt. Det måste innehålla minst 6 tecken.";
      case "auth/invalid-email":
        return "Ange en giltig e-postadress.";
      case "auth/too-many-requests":
        return "För många misslyckade försök. Kontot är tillfälligt spärrat för din säkerhet. Försök igen om en stund eller återställ lösenordet.";
      case "auth/popup-closed-by-user":
        return "Inloggningsrutan stängdes innan inloggningen hann slutföras.";
      case "auth/operation-not-allowed":
        return "Denna inloggningsmetod behöver aktiveras i Firebase Console.";
      case "auth/unauthorized-domain":
        return "Denna domän är ännu inte godkänd i Firebase Console.";
      case "auth/account-exists-with-different-credential":
        return "Ett konto finns redan med denna e-postadress men med ett annat inloggningssätt. Logga in med det sättet istället.";
      default:
        return err?.message || "Ett fel uppstod vid inloggning. Kontrollera dina uppgifter och försök igen.";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await loginWithEmail(email, password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Lösenordet måste innehålla minst 6 tecken.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await registerWithEmail(email, password, name);
      if (onSuccess) onSuccess();
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
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await loginWithApple();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Vänligen ange din e-postadress.");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await resetPassword(email);
      setSuccessMessage(
        `Ett återställningsmejl har skickats till ${email}. Kontrollera din inkorg och skräppost.`
      );
    } catch (err: any) {
      setErrorMessage(getSwedishErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Icon Header */}
      {showTitle && (
        <div className="text-center mb-6">
          <div className="relative w-16 h-16 mx-auto mb-3">
            <Image
              src="/images/emblem_turquoise.png"
              alt="Skolyoga logotyp symbol"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cardo text-brand-dark tracking-wide">
            {activeTab === "login" && "Välkommen tillbaka"}
            {activeTab === "register" && "Skapa ditt pedagogkonto"}
            {activeTab === "forgot" && "Återställ lösenord"}
          </h2>
          <p className="text-xs text-brand-darkGrey mt-1 max-w-sm mx-auto">
            Gemensamt konto för webben och Skolyoga-appen i mobilen
          </p>
        </div>
      )}

      {/* App integration note */}
      <div className="mb-6 p-3.5 rounded-2xl bg-white border border-[#E3DFC9] flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-brand-dustyTurquoise/20 flex items-center justify-center shrink-0">
          <Smartphone className="w-4 h-4 text-brand-dustyTurquoise" />
        </div>
        <div className="text-[11px] text-brand-dark leading-tight">
          <strong className="block text-xs font-semibold text-brand-dark">Synkad med Skolyoga-appen</strong>
          Dina sparade övningar och progression är tillgängliga överallt.
        </div>
      </div>

      {/* Tabs (Hidden on forgot view) */}
      {activeTab !== "forgot" && (
        <div className="flex rounded-2xl bg-[#EBE8DC] p-1 mb-6">
          <button
            onClick={() => {
              setActiveTab("login");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-brand-darkGrey hover:text-brand-dark"
            }`}
          >
            Logga in
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "register"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-brand-darkGrey hover:text-brand-dark"
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
        <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Card Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-5">
        {/* Google & Apple Login */}
        {activeTab !== "forgot" && (
          <>
            <div className="space-y-2.5">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                type="button"
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 flex items-center justify-center gap-3 text-xs font-semibold text-stone-700 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
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

              <button
                onClick={handleAppleLogin}
                disabled={isLoading}
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-stone-900 text-white flex items-center justify-center gap-3 text-xs font-semibold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.38-.58.67-1.09 1.74-.96 2.78 1.04.08 2.08-.54 2.71-1.29z" />
                </svg>
                <span>Fortsätt med Apple</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-brand-darkGrey uppercase tracking-wider">
                eller med e-post
              </span>
            </div>
          </>
        )}

        {/* FORGOT PASSWORD FORM */}
        {activeTab === "forgot" ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                E-postadress
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-darkGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namn@skola.se"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Skickar..." : "Skicka återställningslänk"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-xs text-brand-darkGrey hover:text-brand-dark underline cursor-pointer"
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
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Ditt namn
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-darkGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="För- och efternamn"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                E-postadress
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-darkGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namn@skola.se"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-brand-dark">
                  {activeTab === "register" ? "Välj ett lösenord" : "Lösenord"}
                </label>
                {activeTab === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("forgot");
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[11px] text-brand-purple hover:underline font-medium cursor-pointer"
                  >
                    Glömt lösenord?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-darkGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minst 6 tecken"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-darkGrey hover:text-brand-dark cursor-pointer"
                  aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Vänta...</span>
              ) : (
                <>
                  <span>{activeTab === "login" ? "Logga in" : "Skapa gratis konto & kom igång"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Quick toggle between Login and Register */}
        {activeTab !== "forgot" && (
          <div className="pt-4 border-t border-[#EBE8DC] text-center">
            {activeTab === "login" ? (
              <p className="text-xs text-brand-darkGrey">
                Har du inget konto än?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("register");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="font-bold text-brand-purple hover:underline cursor-pointer"
                >
                  Skapa ett gratis konto här &rarr;
                </button>
              </p>
            ) : (
              <p className="text-xs text-brand-darkGrey">
                Har du redan ett konto?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="font-bold text-brand-purple hover:underline cursor-pointer"
                >
                  Logga in här &rarr;
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
