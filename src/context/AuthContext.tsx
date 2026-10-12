"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, Playlist, UserProgress } from "@/types";
import { auth, db, googleProvider, appleProvider } from "@/lib/firebase";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: User | null;
  isLoading: boolean;
  favorites: string[];
  recentlyWatched: string[];
  playlists: Playlist[];
  progress: UserProgress;
  toggleFavorite: (exerciseId: string) => Promise<void>;
  isFavorite: (exerciseId: string) => boolean;
  addRecentlyWatched: (exerciseId: string) => void;
  createPlaylist: (title: string, description?: string) => void;
  addToPlaylist: (playlistId: string, exerciseId: string) => void;
  removeFromPlaylist: (playlistId: string, exerciseId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  toggleWeekCompleted: (weekId: string) => Promise<void>;
  isWeekCompleted: (weekId: string) => boolean;
  markExerciseCompleted: (exerciseId: string, minutes?: number) => Promise<void>;
  setActiveProgramId: (programId: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    fullName?: string,
    schoolName?: string
  ) => Promise<{ needVerification: boolean }>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultProgress: UserProgress = {
  email: "guest",
  completedWeeks: [],
  completedExercises: [],
  streakDays: 1,
  totalMinutes: 0,
  activeProgramId: "yTk3wFhl1s011CoBYPpY", // Hemmayoga
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  // Load recently watched & playlists from localStorage
  useEffect(() => {
    try {
      const savedRecent = localStorage.getItem("skolyoga_recently_watched");
      if (savedRecent) {
        setRecentlyWatched(JSON.parse(savedRecent));
      }
    } catch (e) {
      console.error("Failed to load recently watched from localStorage", e);
    }
  }, []);

  // Load playlists from localStorage
  useEffect(() => {
    try {
      const savedPlaylists = localStorage.getItem("skolyoga_playlists");
      if (savedPlaylists) {
        setPlaylists(JSON.parse(savedPlaylists));
      } else {
        const initialPlaylists: Playlist[] = [
          {
            id: "morgonpass",
            title: "Morgonsamling (5 min)",
            description: "Lugna och fokuserande övningar att starta skoldagen med",
            exerciseIds: ["flygplanet", "stillhet", "tystnad"],
            createdAt: new Date().toISOString(),
          },
          {
            id: "efter-rast",
            title: "Återhämtning efter lunchrast",
            description: "Nervsystemsreglering och mikropauser",
            exerciseIds: ["magandning", "fotterna-i-golvet"],
            createdAt: new Date().toISOString(),
          },
        ];
        setPlaylists(initialPlaylists);
        localStorage.setItem("skolyoga_playlists", JSON.stringify(initialPlaylists));
      }
    } catch (e) {
      console.error("Failed to load playlists from localStorage", e);
    }
  }, []);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setIsLoading(true);
      if (fbUser) {
        setFirebaseUser(fbUser);
        const email = fbUser.email || "";
        const normalizedEmail = email.toLowerCase().trim();

        // 1. Fetch user profile from Firestore `users/{uid}`
        let userProfile: UserProfile = {
          id: fbUser.uid,
          email: email,
          fullName: fbUser.displayName || email.split("@")[0] || "Pedagog",
          role: "teacher",
          emailVerified: fbUser.emailVerified,
          avatarUrl: fbUser.photoURL || undefined,
        };

        try {
          const userDocRef = doc(db, "users", fbUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            userProfile = {
              ...userProfile,
              fullName: data.fullName || data.display_name || userProfile.fullName,
              role: data.role || "teacher",
              schoolName: data.schoolName || data.school_name || "",
              municipality: data.municipality || "",
              avatarUrl: data.avatarUrl || data.photoURL || userProfile.avatarUrl,
            };

            if (Array.isArray(data.favorites)) {
              setFavorites(data.favorites);
              localStorage.setItem("skolyoga_favorites", JSON.stringify(data.favorites));
            }

            if (Array.isArray(data.playlists) && data.playlists.length > 0) {
              setPlaylists(data.playlists);
              localStorage.setItem("skolyoga_playlists", JSON.stringify(data.playlists));
            }
          } else {
            // Read local favorites if first time
            const localFavs = localStorage.getItem("skolyoga_favorites");
            const favs = localFavs ? JSON.parse(localFavs) : [];
            setFavorites(favs);

            await setDoc(
              userDocRef,
              {
                email: fbUser.email,
                fullName: userProfile.fullName,
                role: "teacher",
                favorites: favs,
                updatedAt: new Date().toISOString(),
              },
              { merge: true }
            );
          }
        } catch (err) {
          console.warn("Firestore user sync note (using local cache):", err);
          const localFavs = localStorage.getItem("skolyoga_favorites");
          if (localFavs) setFavorites(JSON.parse(localFavs));
        }

        setUser(userProfile);
        localStorage.setItem("skolyoga_user", JSON.stringify(userProfile));

        // 2. Fetch user progress from Firestore `user_progress/{normalizedEmail}` (Exact match with Flutter app!)
        try {
          const progressDocRef = doc(db, "user_progress", normalizedEmail);
          const progressSnap = await getDoc(progressDocRef);

          if (progressSnap.exists()) {
            const pData = progressSnap.data();
            const loadedProgress: UserProgress = {
              email: normalizedEmail,
              completedWeeks: Array.isArray(pData.completedWeeks) ? pData.completedWeeks : [],
              completedExercises: Array.isArray(pData.completedExercises) ? pData.completedExercises : [],
              streakDays: typeof pData.streakDays === "number" ? pData.streakDays : 1,
              totalMinutes: typeof pData.totalMinutes === "number" ? pData.totalMinutes : 0,
              activeProgramId: pData.activeProgramId || "yTk3wFhl1s011CoBYPpY",
              hasCompletedSurvey: !!pData.hasCompletedSurvey,
            };
            setProgress(loadedProgress);
            localStorage.setItem("skolyoga_progress", JSON.stringify(loadedProgress));
          } else {
            const parsedProg: UserProgress = {
              email: normalizedEmail,
              completedWeeks: [],
              completedExercises: [],
              streakDays: 1,
              totalMinutes: 0,
              activeProgramId: "yTk3wFhl1s011CoBYPpY",
            };
            setProgress(parsedProg);

            await setDoc(
              progressDocRef,
              {
                email: normalizedEmail,
                completedWeeks: parsedProg.completedWeeks,
                completedExercises: parsedProg.completedExercises,
                streakDays: parsedProg.streakDays,
                totalMinutes: parsedProg.totalMinutes,
                activeProgramId: parsedProg.activeProgramId,
                updatedAt: new Date().toISOString(),
              },
              { merge: true }
            );
          }
        } catch (progErr) {
          console.warn("Firestore progress sync note:", progErr);
          const localProg = localStorage.getItem("skolyoga_progress");
          if (localProg) setProgress(JSON.parse(localProg));
        }
      } else {
        // No Firebase user - clear user state (require real account login)
        setFirebaseUser(null);
        setUser(null);
        localStorage.removeItem("skolyoga_user");

        const localFavs = localStorage.getItem("skolyoga_favorites");
        if (localFavs) setFavorites(JSON.parse(localFavs));

        const localProg = localStorage.getItem("skolyoga_progress");
        if (localProg) setProgress(JSON.parse(localProg));
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with Email & Password
  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), pass);
  };

  // Register with Email & Password
  const registerWithEmail = async (
    email: string,
    pass: string,
    fullName?: string,
    schoolName?: string
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    const fbUser = cred.user;
    const normalizedEmail = email.trim().toLowerCase();
    const resolvedName = (fullName || "").trim() || email.split("@")[0] || "Pedagog";

    // Update Firebase Auth displayName immediately
    try {
      await updateProfile(fbUser, { displayName: resolvedName });
    } catch (e) {
      console.warn("Could not update Firebase Auth displayName", e);
    }

    // Immediately update local user state so the user is logged in right away with their name
    const immediateProfile: UserProfile = {
      id: fbUser.uid,
      email: fbUser.email || email.trim(),
      fullName: resolvedName,
      schoolName: schoolName || "",
      role: "teacher",
      emailVerified: fbUser.emailVerified,
    };
    setUser(immediateProfile);
    localStorage.setItem("skolyoga_user", JSON.stringify(immediateProfile));

    // Send verification email in background
    try {
      await sendEmailVerification(fbUser);
    } catch (e) {
      console.warn("Could not send email verification", e);
    }

    // Save profile to Firestore `users/{uid}`
    try {
      await setDoc(
        doc(db, "users", fbUser.uid),
        {
          email: fbUser.email,
          fullName: resolvedName,
          schoolName: schoolName || "",
          role: "teacher",
          createdAt: new Date().toISOString(),
          favorites: [],
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("Could not create user document in Firestore", e);
    }

    // Initialize `user_progress/{normalizedEmail}` in Firestore for mobile app parity
    try {
      await setDoc(
        doc(db, "user_progress", normalizedEmail),
        {
          email: normalizedEmail,
          completedWeeks: [],
          completedExercises: [],
          streakDays: 1,
          totalMinutes: 0,
          activeProgramId: "yTk3wFhl1s011CoBYPpY",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("Could not create user_progress in Firestore", e);
    }

    return { needVerification: true };
  };

  // Login with Google (Popup)
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const fbUser = cred.user;
    const normalizedEmail = (fbUser.email || "").toLowerCase().trim();

    try {
      await setDoc(
        doc(db, "users", fbUser.uid),
        {
          email: fbUser.email,
          fullName: fbUser.displayName || fbUser.email?.split("@")[0] || "Pedagog",
          role: "teacher",
          avatarUrl: fbUser.photoURL || undefined,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("Could not sync Google user profile to Firestore", e);
    }

    // Sync progress doc
    try {
      const progRef = doc(db, "user_progress", normalizedEmail);
      const snap = await getDoc(progRef);
      if (!snap.exists()) {
        await setDoc(progRef, {
          email: normalizedEmail,
          completedWeeks: [],
          completedExercises: [],
          streakDays: 1,
          totalMinutes: 0,
          activeProgramId: "yTk3wFhl1s011CoBYPpY",
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn("Could not init user_progress for Google user", e);
    }
  };

  // Login with Apple (Popup)
  const loginWithApple = async () => {
    const cred = await signInWithPopup(auth, appleProvider);
    const fbUser = cred.user;
    const normalizedEmail = (fbUser.email || "").toLowerCase().trim();

    try {
      await setDoc(
        doc(db, "users", fbUser.uid),
        {
          email: fbUser.email,
          fullName: fbUser.displayName || fbUser.email?.split("@")[0] || "Pedagog",
          role: "teacher",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("Could not sync Apple user profile to Firestore", e);
    }

    // Sync progress doc
    try {
      const progRef = doc(db, "user_progress", normalizedEmail);
      const snap = await getDoc(progRef);
      if (!snap.exists()) {
        await setDoc(progRef, {
          email: normalizedEmail,
          completedWeeks: [],
          completedExercises: [],
          streakDays: 1,
          totalMinutes: 0,
          activeProgramId: "yTk3wFhl1s011CoBYPpY",
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn("Could not init user_progress for Apple user", e);
    }
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  // Sign Out
  const logout = async () => {
    if (firebaseUser) {
      await signOut(auth);
    }
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem("skolyoga_user");
  };

  // Update user profile in state and Firestore
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("skolyoga_user", JSON.stringify(updated));

    if (firebaseUser) {
      try {
        await setDoc(doc(db, "users", firebaseUser.uid), data, { merge: true });
      } catch (e) {
        console.warn("Could not update user profile in Firestore", e);
      }
    }
  };

  // Toggle week completed (synced with app via `user_progress/{email}`)
  const toggleWeekCompleted = async (weekId: string) => {
    const exists = progress.completedWeeks.includes(weekId);
    const nextWeeks = exists
      ? progress.completedWeeks.filter((id) => id !== weekId)
      : [...progress.completedWeeks, weekId];

    // Add 20 minutes if completed, deduct if uncompleted
    const nextMinutes = exists ? Math.max(0, progress.totalMinutes - 20) : progress.totalMinutes + 20;

    const nextProg: UserProgress = {
      ...progress,
      completedWeeks: nextWeeks,
      totalMinutes: nextMinutes,
    };

    setProgress(nextProg);
    localStorage.setItem("skolyoga_progress", JSON.stringify(nextProg));

    // Save to SharedPreferences-equivalent local key for instant parity
    const emailKey = (user?.email || "guest").toLowerCase().trim();
    localStorage.setItem(`completedWeeks_${emailKey}`, JSON.stringify(nextWeeks));

    // Sync to Firestore `user_progress/{email}` (matching Flutter app's YogaProvider exactly!)
    if (emailKey !== "guest") {
      try {
        await setDoc(
          doc(db, "user_progress", emailKey),
          {
            email: emailKey,
            completedWeeks: nextWeeks,
            totalMinutes: nextMinutes,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn("Could not update user_progress in Firestore:", err);
      }
    }
  };

  const isWeekCompleted = (weekId: string) => progress.completedWeeks.includes(weekId);

  // Mark an exercise completed
  const markExerciseCompleted = async (exerciseId: string, minutes: number = 3) => {
    const exists = progress.completedExercises.includes(exerciseId);
    if (exists) return;

    const nextExercises = [...progress.completedExercises, exerciseId];
    const nextMinutes = progress.totalMinutes + minutes;
    const nextProg: UserProgress = {
      ...progress,
      completedExercises: nextExercises,
      totalMinutes: nextMinutes,
    };

    setProgress(nextProg);
    localStorage.setItem("skolyoga_progress", JSON.stringify(nextProg));

    const emailKey = (user?.email || "guest").toLowerCase().trim();
    if (emailKey !== "guest") {
      try {
        await setDoc(
          doc(db, "user_progress", emailKey),
          {
            completedExercises: nextExercises,
            totalMinutes: nextMinutes,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn("Could not save exercise progress to Firestore:", err);
      }
    }
  };

  // Set active program
  const setActiveProgramId = async (programId: string) => {
    const nextProg: UserProgress = { ...progress, activeProgramId: programId };
    setProgress(nextProg);
    localStorage.setItem("skolyoga_progress", JSON.stringify(nextProg));

    const emailKey = (user?.email || "guest").toLowerCase().trim();
    if (emailKey !== "guest") {
      try {
        await setDoc(
          doc(db, "user_progress", emailKey),
          { activeProgramId: programId },
          { merge: true }
        );
      } catch (err) {
        console.warn("Could not update activeProgramId in Firestore:", err);
      }
    }
  };

  // Favorites toggle with string-safe ID normalization
  const toggleFavorite = async (exerciseId: string) => {
    const idStr = String(exerciseId);
    const exists = favorites.map(String).includes(idStr);
    const next = exists ? favorites.filter((id) => String(id) !== idStr) : [...favorites, idStr];

    setFavorites(next);
    localStorage.setItem("skolyoga_favorites", JSON.stringify(next));

    if (firebaseUser) {
      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        await setDoc(userDocRef, { favorites: next }, { merge: true });
      } catch (err) {
        console.warn("Could not update favorites in Firestore:", err);
      }
    }
  };

  const isFavorite = (exerciseId: string) => favorites.map(String).includes(String(exerciseId));

  // Add exercise to recently watched list
  const addRecentlyWatched = (exerciseId: string) => {
    const idStr = String(exerciseId);
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((id) => String(id) !== idStr);
      const next = [idStr, ...filtered].slice(0, 12); // keep top 12
      localStorage.setItem("skolyoga_recently_watched", JSON.stringify(next));
      return next;
    });

    if (firebaseUser) {
      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        setDoc(userDocRef, { lastWatchedAt: new Date().toISOString() }, { merge: true });
      } catch (err) {
        console.warn("Could not log watch event to Firestore:", err);
      }
    }
  };

  const syncPlaylistsToFirestore = async (updatedPlaylists: Playlist[]) => {
    if (firebaseUser) {
      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        await setDoc(userDocRef, { playlists: updatedPlaylists }, { merge: true });
      } catch (err) {
        console.warn("Could not save playlists to Firestore:", err);
      }
    }
  };

  const createPlaylist = (title: string, description?: string) => {
    const newPl: Playlist = {
      id: "pl-" + Date.now(),
      title,
      description,
      exerciseIds: [],
      createdAt: new Date().toISOString(),
    };
    const next = [...playlists, newPl];
    setPlaylists(next);
    localStorage.setItem("skolyoga_playlists", JSON.stringify(next));
    syncPlaylistsToFirestore(next);
  };

  const addToPlaylist = (playlistId: string, exerciseId: string) => {
    const idStr = String(exerciseId);
    setPlaylists((prev) => {
      const next = prev.map((p) => {
        if (p.id === playlistId && !p.exerciseIds.map(String).includes(idStr)) {
          return { ...p, exerciseIds: [...p.exerciseIds, idStr] };
        }
        return p;
      });
      localStorage.setItem("skolyoga_playlists", JSON.stringify(next));
      syncPlaylistsToFirestore(next);
      return next;
    });
  };

  const removeFromPlaylist = (playlistId: string, exerciseId: string) => {
    const idStr = String(exerciseId);
    setPlaylists((prev) => {
      const next = prev.map((p) => {
        if (p.id === playlistId) {
          return { ...p, exerciseIds: p.exerciseIds.filter((id) => String(id) !== idStr) };
        }
        return p;
      });
      localStorage.setItem("skolyoga_playlists", JSON.stringify(next));
      syncPlaylistsToFirestore(next);
      return next;
    });
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => {
      const next = prev.filter((p) => p.id !== playlistId);
      localStorage.setItem("skolyoga_playlists", JSON.stringify(next));
      syncPlaylistsToFirestore(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        favorites,
        recentlyWatched,
        playlists,
        progress,
        toggleFavorite,
        isFavorite,
        addRecentlyWatched,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        deletePlaylist,
        toggleWeekCompleted,
        isWeekCompleted,
        markExerciseCompleted,
        setActiveProgramId,
        updateUserProfile,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginWithApple,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
