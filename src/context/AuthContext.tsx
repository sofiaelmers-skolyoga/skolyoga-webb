"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, Playlist } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  favorites: string[];
  playlists: Playlist[];
  toggleFavorite: (exerciseId: string) => void;
  isFavorite: (exerciseId: string) => boolean;
  createPlaylist: (title: string, description?: string) => void;
  addToPlaylist: (playlistId: string, exerciseId: string) => void;
  loginDemo: (role?: "teacher" | "school_admin") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("skolyoga_user");
      const savedFavs = localStorage.getItem("skolyoga_favorites");
      const savedPlaylists = localStorage.getItem("skolyoga_playlists");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      if (savedPlaylists) {
        setPlaylists(JSON.parse(savedPlaylists));
      } else {
        // Initial example playlist for teachers
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
      console.error("Failed to load user state from localStorage", e);
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (exerciseId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(exerciseId);
      const next = exists ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId];
      localStorage.setItem("skolyoga_favorites", JSON.stringify(next));
      return next;
    });
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

  const loginDemo = (role: "teacher" | "school_admin" = "teacher") => {
    const demoUser: UserProfile = {
      id: "usr-demo-1",
      email: role === "teacher" ? "larare@skolyoga.se" : "rektor@skolyoga.se",
      fullName: role === "teacher" ? "Sofia Elmers (Lärare)" : "Karin Larsson (Skolledare)",
      role,
      schoolName: "Paradisskolan Trollhättan",
      municipality: "Trollhättan",
    };
    setUser(demoUser);
    localStorage.setItem("skolyoga_user", JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skolyoga_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        playlists,
        toggleFavorite,
        isFavorite,
        createPlaylist,
        addToPlaylist,
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
