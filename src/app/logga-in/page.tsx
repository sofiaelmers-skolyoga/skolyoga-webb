"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { LoginFormCard } from "@/components/auth/LoginFormCard";

function LoginContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";
  const router = useRouter();

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge="Pedagogkonto"
        badgeIcon={<Lock className="w-3.5 h-3.5" />}
        title={defaultTab === "register" ? "Skapa ditt pedagogkonto" : "Logga in på Skolyoga"}
        description="Ett gemensamt pedagogkonto för webbplatsen och Skolyoga-appen i mobilen. Dina program och spellistor synkas automatiskt."
        bgImage="/images/heroes/photoshoot_2119.jpg"
        bgAlt="Skolyoga inloggning bakgrund"
        align="center"
        objectPosition="object-[center_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 -mt-6 sm:-mt-10 relative z-20">
        <LoginFormCard
          initialTab={defaultTab}
          onSuccess={() => router.push("/profil")}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-brand-darkGrey">Laddar inloggningsformulär...</div>}>
      <LoginContent />
    </Suspense>
  );
}
