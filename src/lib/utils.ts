import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(durationTag: string, formatted?: string): string {
  if (formatted && formatted !== "00:00:00") {
    const parts = formatted.split(":");
    if (parts.length === 3) {
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      if (minutes > 0) {
        return `${minutes} min ${seconds > 0 ? `${seconds} s` : ""}`.trim();
      }
      return `${seconds} sek`;
    }
  }
  return durationTag || "3 min";
}
