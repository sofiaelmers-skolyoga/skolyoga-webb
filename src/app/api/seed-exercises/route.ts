import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, writeBatch } from "firebase/firestore";
import staticExercises from "@/data/exercises.json";
import { Exercise } from "@/types";

function cleanHtml(text: string): string {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const items = staticExercises as Exercise[];
    const batch = writeBatch(db);

    items.forEach((item) => {
      const docId = String(item.id || item.slug);
      const docRef = doc(db, "Kunskapsbibliotek", docId);

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
          syncedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      count: items.length,
      message: `Klart! Alla ${items.length} övningar (YouTube-länkar, beskrivningar och taggar) har synkats till Firestore-kollektionen 'exercises'.`,
    });
  } catch (err: any) {
    console.error("Seeding API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Misslyckades att synka övningar till Firebase.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Support GET for easy triggering or checking
  return POST(new Request("http://localhost/api/seed-exercises", { method: "POST" }));
}
