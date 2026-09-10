import exercisesData from "@/data/exercises.json";
import { Exercise } from "@/types";

export const allExercises: Exercise[] = exercisesData as Exercise[];

export function getExerciseBySlug(slug: string): Exercise | undefined {
  return allExercises.find((ex) => ex.slug === slug || ex.id === slug);
}

export function getFeaturedExercises(): Exercise[] {
  // Pick popular or highly rated exercises
  return allExercises
    .filter((ex) => ex.youtube_id && ex.thumbnail_url)
    .sort((a, b) => b.views_count - a.views_count)
    .slice(0, 6);
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  allExercises.forEach((ex) => {
    if (ex.category) cats.add(ex.category);
  });
  return Array.from(cats);
}

export function getAllLevelTags(): string[] {
  const levels = new Set<string>();
  allExercises.forEach((ex) => {
    ex.level_tags.forEach((lvl) => levels.add(lvl));
  });
  return ["Förskolan", "Lågstadiet", "Mellanstadiet", "Högstadiet", "Gymnasiet"].filter((l) => levels.has(l));
}

export function getAllTweakTags(): string[] {
  const tweaks = new Set<string>();
  allExercises.forEach((ex) => {
    ex.tweak_tags.forEach((t) => tweaks.add(t));
  });
  return ["Sittande", "NPF", "Anpassad skola", "Stress och oro"].filter((t) => tweaks.has(t));
}

export function getAllDurations(): string[] {
  return ["1 min", "3 min", "5 min", "10 min"];
}
