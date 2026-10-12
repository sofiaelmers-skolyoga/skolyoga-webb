import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import fs from "fs";
import path from "path";

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

const exercisesRaw = fs.readFileSync("src/data/exercises.json", "utf-8");
const exercises = JSON.parse(exercisesRaw);

console.log(`Loaded ${exercises.length} exercises from exercises.json`);

async function sync() {
  try {
    console.log("Checking connection to Firestore 'Kunskapsbibliotek'...");
    const snap = await getDocs(collection(db, "Kunskapsbibliotek"));
    console.log(`Found ${snap.size} documents in Firestore 'Kunskapsbibliotek' collection.`);

    let updated = 0;
    for (const ex of exercises) {
      const docId = String(ex.id || ex.slug);
      const docRef = doc(db, "Kunskapsbibliotek", docId);
      await setDoc(
        docRef,
        {
          thumbnail_url: ex.thumbnail_url,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      updated++;
      if (updated % 20 === 0) {
        console.log(`Synced ${updated}/${exercises.length} exercises...`);
      }
    }

    console.log(`✅ Successfully updated all ${updated} exercises with brand thumbnails in Firestore!`);
  } catch (err) {
    console.error("Sync error:", err);
  }
}

sync().then(() => {
  process.exit(0);
});
