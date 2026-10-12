import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyCz32U40-5TyKON39vd1Nkg3r1BSGePtGI",
  authDomain: "skolyoga-app.firebaseapp.com",
  projectId: "skolyoga-app",
  storageBucket: "skolyoga-app.firebasestorage.app",
  messagingSenderId: "456068553138",
  appId: "1:456068553138:web:d7f66e88f5a26897d46cab",
  measurementId: "G-4BDVFY888W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const exercisesPath = "src/data/exercises.json";
const exercises = JSON.parse(fs.readFileSync(exercisesPath, "utf-8"));

// 1. IDs of Stillin and interview films to remove
const stillinIdsToRemove = new Set([
  "1257", // Det här är stillin'
  "1262", // Lärare tycker till om stillin'
  "1287", // Skolkuratorn berättar
  "1288", // why shit matters
  "1289", // Så här säger elever som har provat stillin'
  "1290", // Sähär säger läraren som har provat stillin'
  "1291", // Mental träning med elever
  "1292", // Vad är det bästa med stillin'?
  "1293", // Vi svarar på dina frågor om stillin'
  "1295", // Andningsövningar med elklassen
]);

// 2. New thumbnail mappings
const newThumbnailMap = {
  "4060": "/images/thumbnails/hjartoppnare.png",
  "4062": "/images/thumbnails/ryggradsrotation.png",
  "4064": "/images/thumbnails/vajande_fageln.png",
  "4066": "/images/thumbnails/axellyft.png",
  "4068": "/images/thumbnails/skogen.png",
  "4070": "/images/thumbnails/h_et.png",
  "4072": "/images/thumbnails/barnet.png",
  "4074": "/images/thumbnails/mjuka_fotleder.png",
  "4076": "/images/thumbnails/halv_duva.png",
  "4078": "/images/thumbnails/flygplanet.png",
  "4080": "/images/thumbnails/nackrull.png",
  "4085": "/images/thumbnails/magandning.png",
  "3053": "/images/thumbnails/stjarnan.png",
  "2044": "/images/thumbnails/rytm.png",
  "2107": "/images/thumbnails/vilan.png",
};

async function main() {
  console.log(`Initial exercise count: ${exercises.length}`);

  // Filter out Stillin and interview films
  const remainingExercises = exercises.filter((ex) => !stillinIdsToRemove.has(String(ex.id)));
  console.log(`Remaining exercises after removing Stillin/interviews: ${remainingExercises.length}`);

  // Apply new thumbnails
  let appliedThumbsCount = 0;
  remainingExercises.forEach((ex) => {
    const newThumb = newThumbnailMap[String(ex.id)];
    if (newThumb) {
      ex.thumbnail_url = newThumb;
      appliedThumbsCount++;
      console.log(`Updated thumbnail for ${ex.id} (${ex.title}) -> ${newThumb}`);
    }
  });
  console.log(`Applied ${appliedThumbsCount} new thumbnails.`);

  // Save to local exercises.json
  fs.writeFileSync(exercisesPath, JSON.stringify(remainingExercises, null, 2), "utf-8");
  console.log(`Saved updated ${exercisesPath}`);

  // Delete Stillin films from Firestore
  console.log("\nDeleting Stillin films from Firestore 'Kunskapsbibliotek'...");
  for (const id of stillinIdsToRemove) {
    try {
      const docRef = doc(db, "Kunskapsbibliotek", id);
      await deleteDoc(docRef);
      console.log(`Deleted doc ${id} from Firestore`);
    } catch (e) {
      console.error(`Error deleting doc ${id}:`, e.message);
    }
  }

  // Sync remaining exercises to Firestore
  console.log("\nSyncing all remaining exercises to Firestore 'Kunskapsbibliotek'...");
  let synced = 0;
  for (const ex of remainingExercises) {
    const docId = String(ex.id || ex.slug);
    const docRef = doc(db, "Kunskapsbibliotek", docId);
    await setDoc(
      docRef,
      {
        id: docId,
        title: ex.title,
        slug: ex.slug,
        link: ex.link,
        description: ex.description,
        youtube_id: ex.youtube_id,
        video_url: ex.video_url,
        thumbnail_url: ex.thumbnail_url,
        duration_formatted: ex.duration_formatted,
        duration_tag: ex.duration_tag,
        category: ex.category,
        categories: ex.categories || [ex.category],
        level_tags: ex.level_tags || [],
        tweak_tags: ex.tweak_tags || [],
        is_protected: ex.is_protected,
        views_count: ex.views_count || 0,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    synced++;
    if (synced % 20 === 0) {
      console.log(`Synced ${synced}/${remainingExercises.length} to Firestore...`);
    }
  }

  console.log(`\n✅ Successfully synced all ${synced} exercises to Firestore!`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
