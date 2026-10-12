"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

export interface SiteContent {
  // Startsida Hero
  hero_badge: string;
  hero_title_start: string;
  hero_title_highlight: string;
  hero_title_end: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

  // Statistik på startsidan
  stat_exercises: string;
  stat_exercises_label: string;
  stat_students: string;
  stat_students_label: string;
  stat_schools: string;
  stat_schools_label: string;

  // Metoden / Tre pelare
  pillar_1_title: string;
  pillar_1_desc: string;
  pillar_2_title: string;
  pillar_2_desc: string;
  pillar_3_title: string;
  pillar_3_desc: string;

  // Kontaktinfo
  contact_email: string;
  contact_phone: string;
  contact_location: string;

  // Kunskapsbibliotek intro
  library_intro: string;
}

export const defaultSiteContent: SiteContent = {
  hero_badge: "Evidensbaserad metod för klassrummet",
  hero_title_start: "Ge eleverna verktyg för ",
  hero_title_highlight: "stresshantering",
  hero_title_end: ", trygghet och studieteknik.",
  hero_subtitle:
    "Skolyoga tränar barn och unga i stresshantering, trygghet och studieteknik. Vi arbetar med upplevelsebaserat lärande, reflektion och nervsystemsreglering genom korta, kroppsbaserade övningar (1–5 minuter) och digitala program för skola och hem.",
  hero_cta_primary: "Utforska Kunskapsbiblioteket",
  hero_cta_secondary: "Hemmayoga för elever",

  stat_exercises: "125+",
  stat_exercises_label: "Evidensbaserade övningar",
  stat_students: "8 000+",
  stat_students_label: "Elever & pedagoger nådda",
  stat_schools: "150+",
  stat_schools_label: "Skolor i Sverige",

  pillar_1_title: "Stresshantering",
  pillar_1_desc: "Kroppsmedvetenhet och andningsövningar som snabbt reglerar nervsystemet och sänker puls och oro i klassrummet.",
  pillar_2_title: "Trygghet & Självkänsla",
  pillar_2_desc: "Rörelser och reflektion som stärker den inre tryggheten, gemenskapen i gruppen och minskar prestationskrav.",
  pillar_3_title: "Studieteknik & Fokus",
  pillar_3_desc: "Korta mikropauser mellan lektionspass som rensar sinnet, ökar koncentrationsförmågan och skapar studiero.",

  contact_email: "hej@skolyoga.se",
  contact_phone: "070-877 15 88",
  contact_location: "Göteborg & hela Sverige",

  library_intro:
    "Här hittar du korta, evidensbaserade övningar anpassade för att köras direkt i klassrummet. Filtrera på årskurs, önskad längd eller anpassning för att hitta rätt övning för stunden.",
};

const SITE_CONTENT_DOC = "_site_content";
const SITE_CONTENT_COLLECTION = "Kunskapsbibliotek";

/**
 * Hook to get real-time site content with fallback to default content.
 */
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const docRef = doc(db, SITE_CONTENT_COLLECTION, SITE_CONTENT_DOC);
      const unsubscribe = onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setContent({
              ...defaultSiteContent,
              ...data,
            });
          }
          setLoading(false);
        },
        (error) => {
          console.warn("Could not read site content from Firestore, using default:", error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn("Error setting up site content listener:", e);
      setLoading(false);
    }
  }, []);

  return { content, loading };
}

/**
 * Saves site content directly to Firestore.
 */
export async function saveSiteContentToFirestore(newContent: Partial<SiteContent>): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, SITE_CONTENT_COLLECTION, SITE_CONTENT_DOC);
    await setDoc(
      docRef,
      {
        ...newContent,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return { success: true, message: "Texterna har sparats och uppdaterats på hela hemsidan!" };
  } catch (err: any) {
    console.error("Failed to save site content:", err);
    return { success: false, message: err?.message || "Kunde inte spara texterna till Firebase." };
  }
}
