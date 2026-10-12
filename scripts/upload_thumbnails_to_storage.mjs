import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
const storage = getStorage(app);
const db = getFirestore(app);

const thumbnailsDir = "public/images/thumbnails";
const exercisesPath = "src/data/exercises.json";

async function main() {
  console.log("Starting Firebase Storage upload of brand thumbnails...");

  const files = fs.readdirSync(thumbnailsDir).filter((f) => f.endsWith(".png") || f.endsWith(".jpg"));
  console.log(`Found ${files.length} thumbnail files to process.`);

  const exercises = JSON.parse(fs.readFileSync(exercisesPath, "utf-8"));
  console.log(`Loaded ${exercises.length} exercises from ${exercisesPath}.`);

  const fileToStorageUrl = new Map();

  let uploadedCount = 0;
  for (const file of files) {
    const filePath = path.join(thumbnailsDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    // Clean storage path
    const safeName = file.replace(/\s+/g, "_");
    const storageRef = ref(storage, `thumbnails/${safeName}`);

    try {
      // Upload to Firebase Storage
      const snapshot = await uploadBytes(storageRef, fileBuffer, {
        contentType: file.endsWith(".png") ? "image/png" : "image/jpeg",
      });
      const downloadUrl = await getDownloadURL(storageRef);
      fileToStorageUrl.set(file, downloadUrl);
      uploadedCount++;
      if (uploadedCount % 10 === 0 || uploadedCount === files.length) {
        console.log(`Uploaded ${uploadedCount}/${files.length} thumbnails to Firebase Storage...`);
      }
    } catch (err) {
      console.error(`Error uploading ${file}:`, err.message);
    }
  }

  console.log(`\nSuccessfully uploaded ${fileToStorageUrl.size} thumbnails to Firebase Storage!`);

  // Update exercises in exercises.json and Firestore with the Firebase Storage URLs
  let updatedExercisesCount = 0;
  for (const ex of exercises) {
    const currentThumb = ex.thumbnail_url || "";
    if (currentThumb.startsWith("/images/thumbnails/")) {
      const filename = path.basename(currentThumb);
      const storageUrl = fileToStorageUrl.get(filename);
      if (storageUrl) {
        ex.thumbnail_url = storageUrl;
        
        // Also update Firestore document
        const docId = String(ex.id || ex.slug);
        const docRef = doc(db, "Kunskapsbibliotek", docId);
        try {
          await setDoc(docRef, { thumbnail_url: storageUrl, updatedAt: new Date().toISOString() }, { merge: true });
          updatedExercisesCount++;
        } catch (e) {
          console.warn(`Firestore update error for ${ex.id}:`, e.message);
        }
      }
    }
  }

  fs.writeFileSync(exercisesPath, JSON.stringify(exercises, null, 2), "utf-8");
  console.log(`\nUpdated ${updatedExercisesCount} exercises in exercises.json & Firestore with Firebase Storage URLs!`);
}

main().catch(console.error).then(() => process.exit(0));
