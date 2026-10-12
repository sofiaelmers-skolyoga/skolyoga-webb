import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, increment, getDoc, collection, getDocs } from "firebase/firestore";

export const GA_MEASUREMENT_ID = "G-4BDVFY888W";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Tracks a page view in Google Analytics 4 and increments page counter in Firestore.
 */
export async function trackPageView(pathname: string) {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname,
    });
  }

  // Don't track admin page views in public stats
  if (pathname.startsWith("/admin")) return;

  // 2. Increment page counter in Firestore 'site_analytics/page_views'
  try {
    const cleanKey = pathname === "/" ? "startsida" : pathname.replace(/\//g, "_").replace(/^_/, "");
    const ref = doc(db, "site_analytics", "page_views");
    await setDoc(
      ref,
      {
        [cleanKey]: increment(1),
        total_views: increment(1),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    // Non-blocking
  }
}

/**
 * Tracks when an exercise video is played.
 * Increments views_count on the exercise document in Firestore and logs to GA4.
 */
export async function trackVideoPlay(exerciseId: string, title: string, category: string) {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4 event
  if (typeof window.gtag === "function") {
    window.gtag("event", "play_exercise_video", {
      exercise_id: exerciseId,
      exercise_title: title,
      exercise_category: category,
    });
  }

  // 2. Increment views_count on the exercise in Firestore 'Kunskapsbibliotek'
  try {
    const exRef = doc(db, "Kunskapsbibliotek", String(exerciseId));
    await updateDoc(exRef, {
      views_count: increment(1),
    });
  } catch (e) {
    // Fallback if updateDoc fails
  }

  // 3. Increment category counter in 'site_analytics/video_stats'
  try {
    const statsRef = doc(db, "site_analytics", "video_stats");
    await setDoc(
      statsRef,
      {
        total_video_plays: increment(1),
        [`category_${category}`]: increment(1),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    // Non-blocking
  }
}

/**
 * Tracks custom user interactions (e.g. PDF downloads, filter selections).
 */
export async function trackCustomEvent(eventName: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  try {
    const eventsRef = doc(db, "site_analytics", "custom_events");
    await setDoc(
      eventsRef,
      {
        [eventName]: increment(1),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    // Non-blocking
  }
}

/**
 * Fetches aggregated analytics data from Firestore for the Admin Dashboard.
 */
export async function fetchSiteAnalyticsSummary() {
  try {
    const pageViewsSnap = await getDoc(doc(db, "site_analytics", "page_views"));
    const videoStatsSnap = await getDoc(doc(db, "site_analytics", "video_stats"));
    const customEventsSnap = await getDoc(doc(db, "site_analytics", "custom_events"));

    // Also fetch user_progress count & hemmayoga_surveys count
    let activeUsersCount = 0;
    let totalCompletedExercises = 0;
    try {
      const usersSnap = await getDocs(collection(db, "user_progress"));
      activeUsersCount = usersSnap.size;
      usersSnap.forEach((d) => {
        const data = d.data();
        if (Array.isArray(data.completedExercises)) {
          totalCompletedExercises += data.completedExercises.length;
        }
      });
    } catch (e) {
      // ignore if empty
    }

    const surveys: any[] = [];
    try {
      const surveySnap = await getDocs(collection(db, "hemmayoga_surveys"));
      surveySnap.forEach((d) => {
        surveys.push({ id: d.id, ...d.data() });
      });
    } catch (e) {
      // ignore if empty
    }

    return {
      pageViews: pageViewsSnap.exists() ? pageViewsSnap.data() : {},
      videoStats: videoStatsSnap.exists() ? videoStatsSnap.data() : {},
      customEvents: customEventsSnap.exists() ? customEventsSnap.data() : {},
      activeUsersCount,
      totalCompletedExercises,
      surveys,
    };
  } catch (err) {
    console.warn("Could not fetch site analytics summary:", err);
    return {
      pageViews: {},
      videoStats: {},
      customEvents: {},
      activeUsersCount: 0,
      totalCompletedExercises: 0,
      surveys: [],
    };
  }
}
