import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  query,
  orderBy,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { Exercise } from "@/types";
import staticExercises from "@/data/exercises.json";

export const EXERCISES_COLLECTION = "Kunskapsbibliotek";

function cleanHtml(text: string): string {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

/**
 * Extracts YouTube ID from diverse formats of YouTube URLs or shorts.
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes(".")) {
    return trimmed;
  }
  const match = trimmed.match(/(?:embed\/|v=|youtu\.be\/|\/v\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

/**
 * Normalizes a Firestore document to an Exercise object.
 */
export function docToExercise(id: string, data: DocumentData): Exercise {
  const ytId = data.youtube_id || extractYouTubeId(data.video_url || "") || null;
  
  const staticMatch = (staticExercises as Exercise[]).find(
    (e) => String(e.id) === String(id) || e.slug === String(id) || e.title.trim().toLowerCase() === (data.title || "").trim().toLowerCase()
  );

  let thumb = data.thumbnail_url;
  if (!thumb || thumb.includes("img.youtube.com")) {
    if (staticMatch?.thumbnail_url && !staticMatch.thumbnail_url.includes("img.youtube.com")) {
      thumb = staticMatch.thumbnail_url;
    } else if (ytId) {
      thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
  }

  const rawCat = data.category || data.categories;
  const catString = Array.isArray(rawCat) ? (rawCat[0] || "Stresshantering") : (rawCat || "Stresshantering");

  return {
    id: id || data.id || "",
    title: data.title || "",
    slug: data.slug || id,
    link: data.link || `https://skolyoga.se/video/${data.slug || id}/`,
    description: cleanHtml(data.description || ""),
    video_url:
      data.video_url ||
      (ytId ? `https://www.youtube.com/embed/${ytId}` : ""),
    youtube_id: ytId,
    thumbnail_url: thumb,
    duration_formatted: data.duration_formatted || "00:03:00",
    duration_tag: data.duration_tag || "3 min",
    category: catString,
    categories: Array.isArray(rawCat) ? rawCat : [catString],
    level_tags: Array.isArray(data.level_tags) ? data.level_tags : [],
    tweak_tags: Array.isArray(data.tweak_tags) ? data.tweak_tags : [],
    is_protected: typeof data.is_protected === "boolean" ? data.is_protected : true,
    views_count: typeof data.views_count === "number" ? data.views_count : 0,
  };
}

/**
 * Fetch all exercises from Firestore.
 * Falls back to static data if collection is empty or unreachable.
 */
export async function getExercisesFromFirestore(): Promise<{
  exercises: Exercise[];
  fromFirestore: boolean;
}> {
  try {
    const colRef = collection(db, EXERCISES_COLLECTION);
    const snap = await getDocs(colRef);

    if (!snap.empty) {
      const list: Exercise[] = [];
      snap.forEach((d) => {
        if (d.id.startsWith("_")) return;
        const data = d.data();
        if (!data.title || data.title.trim().length === 0) return;
        list.push(docToExercise(d.id, data));
      });
      return { exercises: list, fromFirestore: true };
    }
  } catch (err) {
    console.warn("Could not fetch exercises from Firestore, using static cache:", err);
  }

  return { exercises: staticExercises as Exercise[], fromFirestore: false };
}

/**
 * Real-time listener for exercises in Firestore.
 * Calls callback whenever exercises are added or updated in Firebase.
 */
export function subscribeToFirestoreExercises(
  callback: (exercises: Exercise[], count: number) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const colRef = collection(db, EXERCISES_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
          const list: Exercise[] = [];
          snapshot.forEach((d) => {
            if (d.id.startsWith("_")) return;
            const data = d.data();
            if (!data.title || data.title.trim().length === 0) return;
            list.push(docToExercise(d.id, data));
          });
          callback(list, list.length);
        } else {
          // If empty in Firestore, pass static exercises
          callback(staticExercises as Exercise[], 0);
        }
      },
      (error) => {
        console.warn("Firestore subscription error (falling back to static):", error);
        if (onError) onError(error);
        callback(staticExercises as Exercise[], 0);
      }
    );
    return unsubscribe;
  } catch (e) {
    console.warn("Failed to subscribe to Firestore exercises:", e);
    callback(staticExercises as Exercise[], 0);
    return () => {};
  }
}

/**
 * Seeds or updates all 125 exercises from the static dataset into Firestore.
 * Uses batch write (Firestore allows up to 500 operations per batch).
 */
export async function seedExercisesToFirestore(): Promise<{
  success: boolean;
  count: number;
  message: string;
}> {
  try {
    const batch = writeBatch(db);
    const items = staticExercises as Exercise[];

    items.forEach((item) => {
      // Use item.id (e.g. '120') or slug as doc id
      const docId = String(item.id || item.slug);
      const docRef = doc(db, EXERCISES_COLLECTION, docId);

      batch.set(
        docRef,
        {
          id: docId,
          title: item.title,
          slug: item.slug,
          link: item.link,
          description: cleanHtml(item.description),
          youtube_id: item.youtube_id,
          video_url: item.video_url,
          thumbnail_url: item.thumbnail_url,
          duration_formatted: item.duration_formatted,
          duration_tag: item.duration_tag,
          category: item.category,
          level_tags: item.level_tags,
          tweak_tags: item.tweak_tags,
          is_protected: item.is_protected,
          views_count: item.views_count,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    });

    await batch.commit();

    return {
      success: true,
      count: items.length,
      message: `Lyckades ladda upp ${items.length} övningar till Firebase Firestore!`,
    };
  } catch (err: any) {
    console.error("Error seeding exercises to Firestore:", err);
    return {
      success: false,
      count: 0,
      message: err.message || "Ett fel uppstod vid sparande till Firebase.",
    };
  }
}

/**
 * Updates a single exercise in Firestore (YouTube link, description, tags, etc.)
 */
export async function updateExerciseInFirestore(
  exerciseId: string,
  data: Partial<Exercise>
): Promise<boolean> {
  try {
    const docRef = doc(db, EXERCISES_COLLECTION, exerciseId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error(`Failed to update exercise ${exerciseId} in Firestore:`, err);
    return false;
  }
}

/**
 * Adds a brand new exercise to Firestore.
 */
export async function addNewExerciseToFirestore(
  exerciseData: Partial<Exercise>
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const ytId = exerciseData.youtube_id || extractYouTubeId(exerciseData.video_url || "") || null;
    const slug = (exerciseData.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9åäö]+/gi, "-")
      .replace(/^-|-$/g, "") || `video-${Date.now()}`;
    const docId = `ex-${Date.now()}`;
    const docRef = doc(db, EXERCISES_COLLECTION, docId);

    const categories = exerciseData.categories && exerciseData.categories.length > 0
      ? exerciseData.categories
      : (exerciseData.category ? [exerciseData.category] : ["Stresshantering"]);

    const payload = {
      id: docId,
      title: exerciseData.title || "Ny övning",
      slug: slug,
      link: `https://skolyoga.se/video/${slug}/`,
      description: cleanHtml(exerciseData.description || ""),
      video_url: ytId ? `https://www.youtube.com/embed/${ytId}` : (exerciseData.video_url || ""),
      youtube_id: ytId,
      thumbnail_url: exerciseData.thumbnail_url || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : ""),
      duration_formatted: exerciseData.duration_formatted || "00:03:00",
      duration_tag: exerciseData.duration_tag || "3 min",
      category: categories[0] || "Stresshantering",
      categories: categories,
      level_tags: exerciseData.level_tags || [],
      tweak_tags: exerciseData.tweak_tags || [],
      is_protected: typeof exerciseData.is_protected === "boolean" ? exerciseData.is_protected : true,
      views_count: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, payload);
    return { success: true, id: docId };
  } catch (err: any) {
    console.error("Failed to add exercise to Firestore:", err);
    return { success: false, id: "", error: err.message || "Kunde inte spara till Firebase." };
  }
}

/**
 * Deletes an exercise from Firestore.
 */
export async function deleteExerciseFromFirestore(exerciseId: string): Promise<boolean> {
  try {
    const docRef = doc(db, EXERCISES_COLLECTION, exerciseId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(`Failed to delete exercise ${exerciseId}:`, err);
    return false;
  }
}
