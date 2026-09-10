"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, User, School, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const router = useRouter();
  const { loginDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [role, setRole] = useState<"teacher" | "school_admin">("teacher");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login / save profile
    loginDemo(role);
    router.push("/mina-favoriter");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      
      {/* Brand Icon Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-brand-coral flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-md mb-3">
          S
        </div>
        <h1 className="text-2xl font-bold text-brand-dark">
          {activeTab === "login" ? "Välkommen tillbaka" : "Skapa konto för din skola"}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Få tillgång till 125 övningar och spara dina lektionspass
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-stone-200/70 p-1 mb-6">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === "login" ? "bg-white text-brand-dark shadow-sm" : "text-stone-600 hover:text-brand-dark"
          }`}
        >
          Logga in
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === "register" ? "bg-white text-brand-dark shadow-sm" : "text-stone-600 hover:text-brand-dark"
          }`}
        >
          Skapa nytt konto
        </button>
      </div>

      {/* Card Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {activeTab === "register" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ditt namn</label>
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">Skola / Kommun</label>
                <div className="relative">
                  <School className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="t.ex. Paradisskolan, Trollhättan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Din roll</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                >
                  <option value="teacher">Lärare / Pedagog</option>
                  <option value="school_admin">Skolledare / Rektor</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">E-postadress</label>
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
              <label className="block text-xs font-semibold text-stone-700">Lösenord</label>
              {activeTab === "login" && (
                <a href="#" className="text-[11px] text-brand-coral hover:underline">
                  Glömt lösenord?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-brand-coral text-white font-semibold text-sm shadow-md hover:bg-[#cf4f3d] transition-colors"
          >
            {activeTab === "login" ? "Logga in" : "Skapa konto"}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="pt-4 border-t border-stone-100 text-center space-y-2">
          <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">
            Snabbtest under utveckling
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                loginDemo("teacher");
                router.push("/mina-favoriter");
              }}
              className="flex-1 py-2 px-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-50"
            >
              Logga in som Lärare
            </button>
            <button
              onClick={() => {
                loginDemo("school_admin");
                router.push("/mina-favoriter");
              }}
              className="flex-1 py-2 px-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-50"
            >
              Logga in som Rektor
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
