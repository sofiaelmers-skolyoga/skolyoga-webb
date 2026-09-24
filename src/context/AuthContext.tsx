"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, Playlist } from "@/types";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
  playlists: Playlist[];
  toggleFavorite: (exerciseId: string) => Promise<void>;
  isFavorite: (exerciseId: string) => boolean;
  createPlaylist: (title: string, description?: string) => void;
  addToPlaylist: (playlistId: string, exerciseId: string) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    fullName?: string,
    schoolName?: string
  ) => Promise<{ needVerification: boolean }>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginDemo: (role?: "teacher" | "school_admin") => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

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
            description: "Lugna och fokuserande övningar att starta dagen med",
            exerciseIds: ["flygplanet", "stillhet", "tystnad"],
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

        // Fetch user profile & favorites from Firestore
        let userProfile: UserProfile = {
          id: fbUser.uid,
          email: fbUser.email || "",
          fullName: fbUser.displayName || fbUser.email?.split("@")[0] || "Pedagog",
          role: "teacher",
          emailVerified: fbUser.emailVerified,
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
            };

            if (Array.isArray(data.favorites)) {
              setFavorites(data.favorites);
              localStorage.setItem("skolyoga_favorites", JSON.stringify(data.favorites));
            }
          } else {
            // Read local favorites if first time
            const localFavs = localStorage.getItem("skolyoga_favorites");
            const favs = localFavs ? JSON.parse(localFavs) : [];
            setFavorites(favs);

            // Create initial user doc in Firestore
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
      } else {
        // No Firebase user - check if demo/guest user is active in localStorage
        setFirebaseUser(null);
        const savedUser = localStorage.getItem("skolyoga_user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed.role === "guest" || parsed.id.startsWith("usr-demo")) {
            setUser(parsed);
          } else {
            setUser(null);
            localStorage.removeItem("skolyoga_user");
          }
        } else {
          setUser(null);
        }

        const localFavs = localStorage.getItem("skolyoga_favorites");
        if (localFavs) setFavorites(JSON.parse(localFavs));
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with Email & Password
  const loginWithEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    if (!cred.user.emailVerified) {
      // In the app, email verification is recommended
      console.log("Email not verified yet for user", cred.user.email);
    }
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

    // Send verification email
    try {
      await sendEmailVerification(fbUser);
    } catch (e) {
      console.warn("Could not send email verification", e);
    }

    // Save profile to Firestore
    try {
      await setDoc(
        doc(db, "users", fbUser.uid),
        {
          email: fbUser.email,
          fullName: fullName || email.split("@")[0],
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

    return { needVerification: true };
  };

  // Login with Google (Popup)
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const fbUser = cred.user;

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
      console.warn("Could not sync Google user profile to Firestore", e);
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

  // Demo Login (for quick guest evaluation)
  const loginDemo = (role: "teacher" | "school_admin" = "teacher") => {
    const demoUser: UserProfile = {
      id: "usr-demo-1",
      email: role === "teacher" ? "larare@skolyoga.se" : "rektor@skolyoga.se",
      fullName: role === "teacher" ? "Sofia Elmers (Lärare)" : "Karin Larsson (Skolledare)",
      role,
      schoolName: "Paradisskolan Trollhättan",
      municipality: "Trollhättan",
      emailVerified: true,
    };
    setUser(demoUser);
    localStorage.setItem("skolyoga_user", JSON.stringify(demoUser));
  };

  // Favorites toggle (saved to state, localStorage, and Firestore if user is logged in)
  const toggleFavorite = async (exerciseId: string) => {
    const exists = favorites.includes(exerciseId);
    const next = exists ? favorites.filter((id) => id !== exerciseId) : [...favorites, exerciseId];

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

  const isFavorite = (exerciseId: string) => favorites.includes(exerciseId);

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
  };

  const addToPlaylist = (playlistId: string, exerciseId: string) => {
    setPlaylists((prev) => {
      const next = prev.map((p) => {
        if (p.id === playlistId && !p.exerciseIds.includes(exerciseId)) {
          return { ...p, exerciseIds: [...p.exerciseIds, exerciseId] };
        }
        return p;
      });
      localStorage.setItem("skolyoga_playlists", JSON.stringify(next));
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
        playlists,
        toggleFavorite,
        isFavorite,
        createPlaylist,
        addToPlaylist,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        resetPassword,
        loginDemo,
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
