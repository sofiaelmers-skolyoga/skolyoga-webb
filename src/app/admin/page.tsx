"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sliders, 
  FileText, 
  Video, 
  ListFilter, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Search, 
  Play, 
  Clock, 
  Eye, 
  ShieldCheck,
  ArrowLeft,
  Upload,
  Copy,
  Check,
  FileDown,
  X,
  Loader2,
  Image as ImageIcon,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  School,
  CheckSquare,
  BarChart3,
  TrendingUp,
  Users,
  Download
} from "lucide-react";
import { useSiteContent, saveSiteContentToFirestore, SiteContent, defaultSiteContent } from "@/lib/siteContent";
import { 
  subscribeToFirestoreExercises, 
  addNewExerciseToFirestore, 
  updateExerciseInFirestore,
  deleteExerciseFromFirestore, 
  extractYouTubeId,
  seedExercisesToFirestore
} from "@/lib/firebaseExercises";
import { fetchSiteAnalyticsSummary, GA_MEASUREMENT_ID } from "@/lib/analytics";
import { db, storage } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Exercise } from "@/types";

interface Inquiry {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  school?: string;
  subject?: string;
  message?: string;
  createdAt?: string;
  status?: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"content" | "add_video" | "manage_videos" | "documents" | "inbox" | "analytics">("content");
  const { content, loading: contentLoading } = useSiteContent();

  // Content form state
  const [formData, setFormData] = useState<SiteContent>(content);
  const [saveStatus, setSaveStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // When content loads from Firestore, populate form
  useEffect(() => {
    if (!contentLoading) {
      setFormData(content);
    }
  }, [content, contentLoading]);

  // Video Management state
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchVideo, setSearchVideo] = useState("");
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [videoAddStatus, setVideoAddStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // New video form fields
  const [newTitle, setNewTitle] = useState("");
  const [newYoutubeUrl, setNewYoutubeUrl] = useState("");
  const [newThumbnailUrl, setNewThumbnailUrl] = useState("");
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [newDuration, setNewDuration] = useState("3 min");
  const [newCategories, setNewCategories] = useState<string[]>(["Stresshantering"]);
  const [newGradeLevels, setNewGradeLevels] = useState<string[]>(["Mellanstadiet"]);
  const [newTweaks, setNewTweaks] = useState<string[]>([]);
  const [newDescription, setNewDescription] = useState("");
  const [newIsProtected, setNewIsProtected] = useState(true);

  // Quick Edit / Thumbnail modal state
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [editThumbUrl, setEditThumbUrl] = useState("");
  const [isUpdatingThumb, setIsUpdatingThumb] = useState(false);

  // Documents state
  const [copiedDocUrl, setCopiedDocUrl] = useState<string | null>(null);
  const [docUploadStatus, setDocUploadStatus] = useState<{ success?: boolean; message?: string; url?: string } | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  // Real-time exercises listener
  useEffect(() => {
    const unsubscribe = subscribeToFirestoreExercises((items) => {
      setExercises(items);
    });
    return () => unsubscribe();
  }, []);

  // Inquiries / Inbox state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);

  // Real-time inquiries listener
  useEffect(() => {
    try {
      const q = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snap) => {
          const list: Inquiry[] = [];
          snap.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as Inquiry);
          });
          setInquiries(list);
          setInquiriesLoading(false);
        },
        (err) => {
          console.warn("Inquiries snapshot error:", err);
          setInquiriesLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      setInquiriesLoading(false);
    }
  }, []);

  const handleDeleteInquiry = async (id: string) => {
    if (confirm("Vill du ta bort detta meddelande?")) {
      try {
        await deleteDoc(doc(db, "contact_inquiries", id));
      } catch (err) {
        console.error("Delete inquiry error:", err);
      }
    }
  };

  const handleToggleInquiryStatus = async (inquiry: Inquiry) => {
    const nextStatus = inquiry.status === "read" ? "unread" : "read";
    try {
      await updateDoc(doc(db, "contact_inquiries", inquiry.id), { status: nextStatus });
    } catch (err) {
      console.error("Update inquiry status error:", err);
    }
  };

  // Analytics state
  const [analyticsData, setAnalyticsData] = useState<{
    pageViews: Record<string, any>;
    videoStats: Record<string, any>;
    customEvents: Record<string, any>;
    activeUsersCount: number;
    totalCompletedExercises: number;
    surveys: any[];
  } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "analytics") {
      setAnalyticsLoading(true);
      fetchSiteAnalyticsSummary().then((data) => {
        setAnalyticsData(data);
        setAnalyticsLoading(false);
      });
    }
  }, [activeTab]);

  // Export Analytics & Exercise Views to CSV
  const handleExportAnalyticsCSV = () => {
    const rows: string[][] = [
      ["Typ", "Namn / Titel", "Kategori", "Årskurser", "Längd", "Antal visningar / Värde"],
    ];

    const sortedByViews = [...exercises].sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
    sortedByViews.forEach((ex) => {
      rows.push([
        "Övningsfilm",
        `"${(ex.title || "").replace(/"/g, '""')}"`,
        `"${ex.category || ""}"`,
        `"${(ex.level_tags || []).join(", ")}"`,
        `"${ex.duration_tag || ""}"`,
        String(ex.views_count || 0),
      ]);
    });

    if (analyticsData?.pageViews) {
      Object.entries(analyticsData.pageViews).forEach(([key, val]) => {
        if (key !== "updatedAt" && typeof val === "number") {
          rows.push(["Sidvisning", `"${key}"`, "Hemsida", "-", "-", String(val)]);
        }
      });
    }

    const csvContent = "\uFEFF" + rows.map((r) => r.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `skolyoga_anvandardata_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const extractedYtId = extractYouTubeId(newYoutubeUrl);

  // Category toggle
  const toggleCategory = (cat: string) => {
    setNewCategories((prev) =>
      prev.includes(cat) ? (prev.length > 1 ? prev.filter((c) => c !== cat) : prev) : [...prev, cat]
    );
  };

  // Grade toggle
  const toggleGrade = (grade: string) => {
    setNewGradeLevels((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  // Tweak toggle
  const toggleTweak = (tweak: string) => {
    setNewTweaks((prev) =>
      prev.includes(tweak) ? prev.filter((t) => t !== tweak) : [...prev, tweak]
    );
  };

  // Handle Save Content
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);
    const res = await saveSiteContentToFirestore(formData);
    setSaveStatus(res);
    setIsSaving(false);
    setTimeout(() => setSaveStatus(null), 5000);
  };

  // Handle Add Video
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setVideoAddStatus({ success: false, message: "Vänligen ange en titel på övningen." });
      return;
    }
    if (!newYoutubeUrl.trim()) {
      setVideoAddStatus({ success: false, message: "Vänligen ange en YouTube-länk." });
      return;
    }

    setIsAddingVideo(true);
    setVideoAddStatus(null);

    const res = await addNewExerciseToFirestore({
      title: newTitle.trim(),
      video_url: newYoutubeUrl.trim(),
      youtube_id: extractedYtId,
      thumbnail_url: newThumbnailUrl.trim() || undefined,
      duration_tag: newDuration,
      duration_formatted: `00:0${newDuration.replace(/\D/g, "") || "3"}:00`,
      category: newCategories[0],
      categories: newCategories,
      level_tags: newGradeLevels,
      tweak_tags: newTweaks,
      description: newDescription.trim(),
      is_protected: newIsProtected,
    });

    if (res.success) {
      setVideoAddStatus({
        success: true,
        message: `Filmen "${newTitle}" har lagts till i Firebase och syns nu i Kunskapsbiblioteket!`,
      });
      // Reset form
      setNewTitle("");
      setNewYoutubeUrl("");
      setNewThumbnailUrl("");
      setNewDescription("");
      setNewTweaks([]);
    } else {
      setVideoAddStatus({ success: false, message: res.error || "Ett fel uppstod vid sparandet." });
    }
    setIsAddingVideo(false);
  };

  // Handle Upload Thumbnail file to Firebase Storage
  const handleUploadThumbnailFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingThumb(true);
      const fileRef = ref(storage, `thumbnails/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setNewThumbnailUrl(url);
      setIsUploadingThumb(false);
    } catch (err: any) {
      console.error("Thumbnail upload error:", err);
      setIsUploadingThumb(false);
      alert("Fel vid uppladdning till Firebase Storage: " + (err.message || "Okänt fel"));
    }
  };

  // Handle Upload Document (PDF) to Firebase Storage
  const handleUploadDocumentFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingDoc(true);
      setDocUploadStatus(null);
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileRef = ref(storage, `documents/${safeName}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setDocUploadStatus({
        success: true,
        message: `Dokumentet "${file.name}" har laddats upp till Firebase Storage!`,
        url,
      });
      setIsUploadingDoc(false);
    } catch (err: any) {
      console.error("Document upload error:", err);
      setIsUploadingDoc(false);
      setDocUploadStatus({
        success: false,
        message: "Kunde inte ladda upp till Firebase: " + (err.message || "Okänt fel"),
      });
    }
  };

  // Handle Save Edit Thumbnail on existing exercise
  const handleSaveEditThumbnail = async () => {
    if (!editingExercise || !editThumbUrl.trim()) return;
    setIsUpdatingThumb(true);
    const ok = await updateExerciseInFirestore(editingExercise.id, {
      thumbnail_url: editThumbUrl.trim(),
    });
    setIsUpdatingThumb(false);
    if (ok) {
      setExercises((prev) =>
        prev.map((e) => (e.id === editingExercise.id ? { ...e, thumbnail_url: editThumbUrl.trim() } : e))
      );
      setEditingExercise(null);
      setEditThumbUrl("");
    } else {
      alert("Kunde inte uppdatera tumnageln i Firebase.");
    }
  };

  // Handle sync all thumbnails from brand set to Firebase
  const [isSyncingAllThumbs, setIsSyncingAllThumbs] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleSyncAllThumbnailsToFirestore = async () => {
    if (!confirm("Vill du synka alla övningar och deras officiella Skolyoga-tumnaglar till Firebase Firestore?")) return;
    setIsSyncingAllThumbs(true);
    setSyncFeedback(null);
    try {
      const res = await seedExercisesToFirestore();
      if (res.success) {
        setSyncFeedback(`Klart! Alla ${res.count} övningar och tumnaglar har sparats och synkats i Firebase.`);
      } else {
        setSyncFeedback(`Kunde inte synka: ${res.message}`);
      }
    } catch (err: any) {
      setSyncFeedback(`Fel vid synkning: ${err.message || "Okänt fel"}`);
    } finally {
      setIsSyncingAllThumbs(false);
      setTimeout(() => setSyncFeedback(null), 6000);
    }
  };

  // Handle Delete Video
  const handleDeleteVideo = async (exercise: Exercise) => {
    if (confirm(`Är du säker på att du vill ta bort filmen "${exercise.title}" från Firebase?`)) {
      await deleteExerciseFromFirestore(exercise.id);
    }
  };

  // Filtered exercises list
  const filteredExercises = exercises.filter((ex) =>
    ex.title.toLowerCase().includes(searchVideo.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchVideo.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-[#E3DFC9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-warmYellow/30 text-[#735100] text-xs font-semibold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Skolyoga Administrationspanel</span>
          </div>
          <h1 className="text-3xl font-bold font-cardo text-brand-dark">
            Adminpanel
          </h1>
          <p className="text-sm text-brand-darkGrey mt-1">
            Redigera texter på hemsidan eller lägg upp nya filmer i Kunskapsbiblioteket
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E3DFC9] text-xs font-semibold text-brand-dark hover:bg-stone-50 transition-colors shadow-xs self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tillbaka till hemsidan</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-[#EBE8DC] p-1.5 rounded-2xl max-w-5xl">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "content"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-brand-darkGrey hover:text-brand-dark"
          }`}
        >
          <FileText className="w-4 h-4 text-brand-purple" />
          <span>Redigera texter</span>
        </button>

        <button
          onClick={() => setActiveTab("add_video")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "add_video"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-brand-darkGrey hover:text-brand-dark"
          }`}
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>Lägg till film</span>
        </button>

        <button
          onClick={() => setActiveTab("manage_videos")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "manage_videos"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-brand-darkGrey hover:text-brand-dark"
          }`}
        >
          <Video className="w-4 h-4 text-brand-turquoise" />
          <span>Alla filmer ({exercises.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("documents")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "documents"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-brand-darkGrey hover:text-brand-dark"
          }`}
        >
          <FileDown className="w-4 h-4 text-[#8C2272]" />
          <span>Dokument & PDF</span>
        </button>

        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "inbox"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-brand-darkGrey hover:text-brand-dark"
          }`}
        >
          <Inbox className="w-4 h-4 text-brand-purple" />
          <span>Inkorg ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "analytics"
              ? "bg-white text-brand-dark shadow-sm"
              : "text-brand-darkGrey hover:text-brand-dark"
          }`}
        >
          <BarChart3 className="w-4 h-4 text-brand-turquoise" />
          <span>Statistik & Data</span>
        </button>
      </div>

      {/* TAB 1: REDIGERA TEXTER */}
      {activeTab === "content" && (
        <form onSubmit={handleSaveContent} className="space-y-8">
          
          {saveStatus && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                saveStatus.success
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {saveStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{saveStatus.message}</span>
            </div>
          )}

          {/* Sektion 1: Startsida Hero */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#EBE8DC]">
              <FileText className="w-5 h-5 text-brand-purple" />
              <h2 className="text-xl font-bold font-cardo text-brand-dark">
                Startsidan – Huvudrubrik & Ingress
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Märke ovanför rubrik (Badge)
                </label>
                <input
                  type="text"
                  value={formData.hero_badge}
                  onChange={(e) => setFormData({ ...formData, hero_badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Rubrik: Början
                </label>
                <input
                  type="text"
                  value={formData.hero_title_start}
                  onChange={(e) => setFormData({ ...formData, hero_title_start: e.target.value })}
                  placeholder="Ge eleverna verktyg för "
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-purple uppercase tracking-wider">
                  Rubrik: Markerat ord (lila färg)
                </label>
                <input
                  type="text"
                  value={formData.hero_title_highlight}
                  onChange={(e) => setFormData({ ...formData, hero_title_highlight: e.target.value })}
                  placeholder="stresshantering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-brand-purple/40 text-sm font-semibold text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Rubrik: Slut
                </label>
                <input
                  type="text"
                  value={formData.hero_title_end}
                  onChange={(e) => setFormData({ ...formData, hero_title_end: e.target.value })}
                  placeholder=", trygghet och studieteknik."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Ingress / Huvudtext
                </label>
                <textarea
                  rows={3}
                  value={formData.hero_subtitle}
                  onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Text på lila huvudknapp
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_primary}
                  onChange={(e) => setFormData({ ...formData, hero_cta_primary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Text på vit sekundärknapp
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_secondary}
                  onChange={(e) => setFormData({ ...formData, hero_cta_secondary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>

            </div>
          </div>

          {/* Sektion 2: Statistik */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
            <h2 className="text-xl font-bold font-cardo text-brand-dark pb-4 border-b border-[#EBE8DC]">
              Statistik & Nyckeltal
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
                <label className="text-xs font-bold text-brand-dark">Siffra 1</label>
                <input
                  type="text"
                  value={formData.stat_exercises}
                  onChange={(e) => setFormData({ ...formData, stat_exercises: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3DFC9] text-sm font-bold text-brand-dark"
                />
                <input
                  type="text"
                  value={formData.stat_exercises_label}
                  onChange={(e) => setFormData({ ...formData, stat_exercises_label: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E3DFC9] text-xs text-brand-darkGrey"
                />
              </div>

              <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
                <label className="text-xs font-bold text-brand-dark">Siffra 2</label>
                <input
                  type="text"
                  value={formData.stat_students}
                  onChange={(e) => setFormData({ ...formData, stat_students: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3DFC9] text-sm font-bold text-brand-dark"
                />
                <input
                  type="text"
                  value={formData.stat_students_label}
                  onChange={(e) => setFormData({ ...formData, stat_students_label: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E3DFC9] text-xs text-brand-darkGrey"
                />
              </div>

              <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-2">
                <label className="text-xs font-bold text-brand-dark">Siffra 3</label>
                <input
                  type="text"
                  value={formData.stat_schools}
                  onChange={(e) => setFormData({ ...formData, stat_schools: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3DFC9] text-sm font-bold text-brand-dark"
                />
                <input
                  type="text"
                  value={formData.stat_schools_label}
                  onChange={(e) => setFormData({ ...formData, stat_schools_label: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E3DFC9] text-xs text-brand-darkGrey"
                />
              </div>

            </div>
          </div>

          {/* Sektion 3: Kontaktuppgifter */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
            <h2 className="text-xl font-bold font-cardo text-brand-dark pb-4 border-b border-[#EBE8DC]">
              Kontaktuppgifter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark">E-postadress</label>
                <input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark">Telefonnummer</label>
                <input
                  type="text"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark">Ort / Område</label>
                <input
                  type="text"
                  value={formData.contact_location}
                  onChange={(e) => setFormData({ ...formData, contact_location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark"
                />
              </div>
            </div>
          </div>

          {/* Spara-knapp */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm shadow-md hover:bg-[#781b61] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Sparar till Firebase..." : "Spara alla texter"}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: LÄGG TILL NY FILM */}
      {activeTab === "add_video" && (
        <form onSubmit={handleAddVideo} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#EBE8DC]">
            <Plus className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold font-cardo text-brand-dark">
              Lägg till ny film i Kunskapsbiblioteket
            </h2>
          </div>

          {videoAddStatus && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                videoAddStatus.success
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {videoAddStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{videoAddStatus.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Titel */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Filmens titel *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="t.ex. Andas med magen, Solhälsning vid bänken"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>

            {/* YouTube Länk */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                YouTube-länk eller video-ID *
              </label>
              <input
                type="text"
                required
                value={newYoutubeUrl}
                onChange={(e) => setNewYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=SJ32m4y45KQ eller SJ32m4y45KQ"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <p className="text-[11px] text-brand-darkGrey">
                Klistra bara in YouTube-länken. ID och förhandsvisningsbild hämtas automatiskt!
              </p>
            </div>

            {/* Förhandsgranskning om YouTube ID hittades */}
            {extractedYtId && (
              <div className="md:col-span-2 p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] flex items-center gap-4">
                <img
                  src={`https://img.youtube.com/vi/${extractedYtId}/hqdefault.jpg`}
                  alt="Förhandsvisning"
                  className="w-28 aspect-video rounded-lg object-cover shadow-xs"
                />
                <div className="text-xs text-brand-dark">
                  <span className="font-semibold text-emerald-700 block">✓ YouTube-ID identifierat: {extractedYtId}</span>
                  <span className="text-[11px] text-brand-darkGrey">Tumnagel genereras automatiskt från YouTube.</span>
                </div>
              </div>
            )}

            {/* Tumnagel / Thumbnail för filmen (Card 3 & Card 27) */}
            <div className="md:col-span-2 p-4 rounded-2xl bg-brand-sand border border-[#E3DFC9] space-y-3">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                <span>Tumnagel / Förhandsvisningsbild</span>
                <span className="text-[11px] font-normal text-brand-darkGrey">Valfritt – standard är YouTubes tumnagel</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-dark">Ange URL eller bildlänk</label>
                  <input
                    type="text"
                    value={newThumbnailUrl}
                    onChange={(e) => setNewThumbnailUrl(e.target.value)}
                    placeholder="t.ex. /images/thumbnails/10.png eller bild-URL"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3DFC9] text-xs text-brand-dark"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-dark">Eller ladda upp bild till Firebase</label>
                  <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-dashed border-brand-purple/40 text-brand-purple hover:bg-brand-purple/5 cursor-pointer text-xs font-semibold transition-colors">
                    {isUploadingThumb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{isUploadingThumb ? "Laddar upp..." : "Välj bildfil (PNG/JPG)"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadThumbnailFile}
                      className="hidden"
                      disabled={isUploadingThumb}
                    />
                  </label>
                </div>
              </div>

              {/* Förhandsvisning av vald tumnagel */}
              {(newThumbnailUrl || extractedYtId) && (
                <div className="flex items-center gap-3 pt-2 border-t border-[#EBE8DC]">
                  <img
                    src={newThumbnailUrl || `https://img.youtube.com/vi/${extractedYtId}/hqdefault.jpg`}
                    alt="Tumnagel förhandsvisning"
                    className="w-24 aspect-video rounded-lg object-cover border border-[#E3DFC9]"
                  />
                  <div className="text-xs text-brand-darkGrey">
                    <span className="font-semibold text-brand-dark block">Aktiv tumnagel</span>
                    <span className="text-[11px] break-all">{newThumbnailUrl || "YouTubes automatiska tumnagel"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Längd */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Längd
              </label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                <option value="1 min">1 min</option>
                <option value="3 min">3 min</option>
                <option value="5 min">5 min</option>
                <option value="10 min">10 min</option>
              </select>
            </div>

            {/* Skyddad film */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="inline-flex items-center gap-2 cursor-pointer pb-2">
                <input
                  type="checkbox"
                  checked={newIsProtected}
                  onChange={(e) => setNewIsProtected(e.target.checked)}
                  className="rounded text-brand-purple focus:ring-brand-purple w-4 h-4"
                />
                <span className="text-xs font-medium text-brand-dark">
                  Kräver inloggat konto (låst för icke-inloggade)
                </span>
              </label>
            </div>

            {/* Vad man tränar / Kategori */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Vad man tränar / Kategori (välj en eller flera)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Stresshantering", "Fokus", "Studieteknik", "Trygghet", "För skolpersonal"].map((cat) => {
                  const active = newCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        active
                          ? "bg-brand-purple text-white border-brand-purple shadow-xs"
                          : "bg-brand-sand text-stone-700 border-[#E3DFC9] hover:border-brand-purple/40"
                      }`}
                    >
                      {active ? `✓ ${cat}` : cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Årskurser */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Årskurser (välj de som passar)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Förskolan", "Lågstadiet", "Mellanstadiet", "Högstadiet", "Gymnasiet"].map((grade) => {
                  const active = newGradeLevels.includes(grade);
                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => toggleGrade(grade)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        active
                          ? "bg-brand-turquoise text-white border-brand-turquoise shadow-xs"
                          : "bg-brand-sand text-stone-700 border-[#E3DFC9] hover:border-brand-turquoise/50"
                      }`}
                    >
                      {active ? `✓ ${grade}` : grade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Anpassningar */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Anpassningar (valfritt)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Sittande", "NPF", "Anpassad skola", "Stress och oro"].map((tweak) => {
                  const active = newTweaks.includes(tweak);
                  return (
                    <button
                      key={tweak}
                      type="button"
                      onClick={() => toggleTweak(tweak)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        active
                          ? "bg-brand-pink text-white border-brand-pink shadow-xs"
                          : "bg-brand-sand text-stone-700 border-[#E3DFC9] hover:border-brand-pink/50"
                      }`}
                    >
                      {active ? `✓ ${tweak}` : tweak}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Beskrivning */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Beskrivning av övningen
              </label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Kort beskrivning av övningen och hur den genomförs i klassrummet..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>

          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              disabled={isAddingVideo}
              className="px-8 py-3.5 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingVideo ? "Sparar till Firebase..." : "Publicera film till Kunskapsbiblioteket"}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: HANTERA BEFINTLIGA FILMER */}
      {activeTab === "manage_videos" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE8DC]">
            <div>
              <h2 className="text-xl font-bold font-cardo text-brand-dark">
                Alla filmer i Kunskapsbiblioteket ({exercises.length})
              </h2>
              <p className="text-xs text-brand-darkGrey mt-0.5">
                Hämtas direkt och i realtid från Firestore-samlingen <code className="text-brand-purple font-mono">Kunskapsbibliotek</code>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSyncAllThumbnailsToFirestore}
                disabled={isSyncingAllThumbs}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-dustyPurple text-white text-xs font-semibold shadow-xs hover:bg-[#781b61] transition-all disabled:opacity-50 cursor-pointer"
                title="Synka alla officiella Skolyoga-tumnaglar till Firebase"
              >
                {isSyncingAllThumbs ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>{isSyncingAllThumbs ? "Synkar till Firebase..." : "Synka alla tumnaglar till Firebase"}</span>
              </button>

              {/* Sökfält */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-brand-darkGrey absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchVideo}
                  onChange={(e) => setSearchVideo(e.target.value)}
                  placeholder="Sök bland filmer..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-sand border border-[#E3DFC9] text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
            </div>
          </div>

          {syncFeedback && (
            <div className="p-3.5 rounded-xl bg-brand-turquoise/15 border border-brand-turquoise/30 text-brand-dark text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-turquoise" />
              <span>{syncFeedback}</span>
            </div>
          )}

          <div className="divide-y divide-[#EBE8DC] max-h-[600px] overflow-y-auto pr-1">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="py-3.5 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  {exercise.thumbnail_url ? (
                    <img
                      src={exercise.thumbnail_url}
                      alt={exercise.title}
                      className="w-16 aspect-video rounded-lg object-cover shrink-0 border border-stone-200"
                    />
                  ) : (
                    <div className="w-16 aspect-video rounded-lg bg-brand-sand flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 text-brand-purple" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-brand-dark truncate">
                      {exercise.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-brand-darkGrey mt-0.5">
                      <span className="font-semibold text-brand-purple">{exercise.category}</span>
                      <span>•</span>
                      <span>{exercise.duration_tag}</span>
                      {exercise.level_tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{exercise.level_tags.join(", ")}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingExercise(exercise);
                      setEditThumbUrl(exercise.thumbnail_url || "");
                    }}
                    className="px-2.5 py-1.5 text-xs font-semibold text-brand-dark hover:text-brand-purple rounded-lg hover:bg-brand-sand transition-colors cursor-pointer flex items-center gap-1 border border-[#E3DFC9]"
                    title="Ändra tumnagel"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-brand-turquoise" />
                    <span className="hidden sm:inline">Byt bild</span>
                  </button>

                  {exercise.youtube_id && (
                    <a
                      href={`https://www.youtube.com/watch?v=${exercise.youtube_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-brand-darkGrey hover:text-brand-purple rounded-lg hover:bg-brand-sand transition-colors"
                      title="Öppna på YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => handleDeleteVideo(exercise)}
                    className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Ta bort film"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Edit Thumbnail Modal (Card 3) */}
          {editingExercise && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E3DFC9] shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#EBE8DC]">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-brand-turquoise" />
                    <h3 className="font-bold text-base text-brand-dark">
                      Byt tumnagel för: {editingExercise.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditingExercise(null)}
                    className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Current image preview */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-brand-dark block">Förhandsgranskning</label>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-brand-sand border border-[#E3DFC9]">
                    <img
                      src={editThumbUrl || editingExercise.thumbnail_url || `https://img.youtube.com/vi/${editingExercise.youtube_id}/hqdefault.jpg`}
                      alt="Tumnagel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Input or upload */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-dark block mb-1">
                      Bildadress (URL eller lokal sökväg)
                    </label>
                    <input
                      type="text"
                      value={editThumbUrl}
                      onChange={(e) => setEditThumbUrl(e.target.value)}
                      placeholder="t.ex. /images/thumbnails/10.png eller https://..."
                      className="w-full px-3 py-2 rounded-xl bg-brand-sand border border-[#E3DFC9] text-xs text-brand-dark"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-dark block mb-1">
                      Eller ladda upp bild till Firebase Storage
                    </label>
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-sand border border-dashed border-brand-purple/40 text-brand-purple hover:bg-brand-purple/10 cursor-pointer text-xs font-semibold transition-colors">
                      {isUploadingThumb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{isUploadingThumb ? "Laddar upp..." : "Välj bildfil från datorn"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          try {
                            setIsUploadingThumb(true);
                            const fileRef = ref(storage, `thumbnails/${Date.now()}_${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`);
                            await uploadBytes(fileRef, f);
                            const url = await getDownloadURL(fileRef);
                            setEditThumbUrl(url);
                            setIsUploadingThumb(false);
                          } catch (err: any) {
                            alert("Kunde inte ladda upp till Firebase: " + err.message);
                            setIsUploadingThumb(false);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE8DC]">
                  <button
                    type="button"
                    onClick={() => setEditingExercise(null)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-brand-dark hover:bg-stone-100"
                  >
                    Avbryt
                  </button>
                  <button
                    type="button"
                    disabled={isUpdatingThumb || !editThumbUrl.trim()}
                    onClick={handleSaveEditThumbnail}
                    className="px-6 py-2 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-[#781b61] transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isUpdatingThumb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Spara ny tumnagel</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: DOKUMENT & PDF (CARD 8 & CARD 12) */}
      {activeTab === "documents" && (
        <div className="space-y-8">
          
          {/* Info Card */}
          <div className="bg-gradient-to-r from-brand-sand via-white to-brand-sand rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dustyPurple/15 text-[#8C2272] text-xs font-bold uppercase tracking-wider">
              <FileDown className="w-3.5 h-3.5" />
              <span>Dokument- och filhanterare</span>
            </div>
            <h2 className="text-2xl font-bold font-cardo text-brand-dark">
              Central lagring av arbetsmaterial & rapporter
            </h2>
            <p className="text-sm text-brand-darkGrey leading-relaxed max-w-3xl">
              Här administreras alla officiella PDF-filer. Alla filer i tabellen nedan sparas direkt på den nya plattformen under 
              <code className="px-1.5 py-0.5 mx-1 rounded bg-[#EBE8DC] text-brand-purple font-mono text-xs">/documents/</code> 
              eller i Firebase Storage. Både hemsidan och Skolyoga-appen i mobilen laddar ner från samma källa utan att vara beroende av gamla externa servrar.
            </p>
          </div>

          {/* Upload New Document Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EBE8DC]">
              <Upload className="w-5 h-5 text-brand-turquoise" />
              <h3 className="text-lg font-bold font-cardo text-brand-dark">
                Ladda upp nytt dokument till Firebase Storage
              </h3>
            </div>

            <p className="text-xs text-brand-darkGrey">
              När du laddar upp ett PDF-dokument sparas det direkt i Skolyogas Firebase Storage bucket (<code className="font-mono text-brand-purple">skolyoga-app.firebasestorage.app/documents/</code>). 
              Du får en permanent publik länk som kan klistras in i övningar, program eller skickas till skolor.
            </p>

            <div className="max-w-md">
              <label className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-sand/70 border-2 border-dashed border-[#D5D0BE] hover:border-brand-purple/60 cursor-pointer transition-all group">
                {isUploadingDoc ? (
                  <div className="flex items-center gap-2 text-brand-purple text-xs font-bold py-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Laddar upp till Firebase...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-brand-purple mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-brand-dark">Klicka för att välja PDF från datorn</span>
                    <span className="text-[11px] text-brand-darkGrey mt-1">Stödjer .pdf-filer</span>
                  </>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUploadDocumentFile}
                  disabled={isUploadingDoc}
                  className="hidden"
                />
              </label>
            </div>

            {docUploadStatus && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between gap-3 ${
                  docUploadStatus.success
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {docUploadStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                  <span className="truncate">{docUploadStatus.message}</span>
                </div>

                {docUploadStatus.url && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(docUploadStatus.url!);
                      setCopiedDocUrl(docUploadStatus.url!);
                      setTimeout(() => setCopiedDocUrl(null), 3000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedDocUrl === docUploadStatus.url ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDocUrl === docUploadStatus.url ? "Kopierad!" : "Kopiera länk"}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Table of Available Documents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-cardo text-brand-dark pb-3 border-b border-[#EBE8DC]">
              Tillgängliga dokument på hemsidan (12 st)
            </h3>

            <div className="divide-y divide-[#EBE8DC]">
              {[
                { title: "Effektrapport 2025", file: "Skolyoga-Effektrapport-2025.pdf", size: "13.8 MB", tag: "Rapport" },
                { title: "Hemmayoga Vecka 1: Händerna som trygga punkter", file: "Vecka-1-handerna-som-trygga-punkter.pdf", size: "948 KB", tag: "Hemmayoga" },
                { title: "Hemmayoga Vecka 2: Spänningar i kroppen", file: "Vecka-2-Spanningar-i-kroppen.pdf", size: "147 KB", tag: "Hemmayoga" },
                { title: "Hemmayoga Vecka 3: Grunda neråt", file: "Vecka-3-grunda-nerat.pdf", size: "182 KB", tag: "Hemmayoga" },
                { title: "Hemmayoga Vecka 4: Aktivering till avspänning", file: "Vecka-4-aktivering-till-avspanning.pdf", size: "81 KB", tag: "Hemmayoga" },
                { title: "Hemmayoga Vecka 5: Lugn-och-ro-ljudet", file: "Vecka-5-lugn-och-ro-ljudet.pdf", size: "300 KB", tag: "Hemmayoga" },
                { title: "Hemmayoga Vecka 6: Andas i en fyrkant", file: "Vecka-6-andas-i-en-fyrkant.pdf", size: "43 KB", tag: "Hemmayoga" },
                { title: "Lärarhandledning NPF", file: "Lararhandledning-NPF.pdf", size: "7.5 MB", tag: "Handledning" },
                { title: "Lärarhandledning Stress och oro", file: "Lararhandledning-stress-och-oro.pdf", size: "7.3 MB", tag: "Handledning" },
                { title: "Handledning Anpassad skola", file: "Anpassat-material-handledning-anpassad-skola.pdf", size: "3.3 MB", tag: "Handledning" },
                { title: "Evidensrapport: Skolyoga som evidensbaserat verktyg", file: "Skolyoga-ett-evidensbaserat-verktyg.pdf", size: "138 KB", tag: "Metod" },
                { title: "Hemmayoga info till vårdnadshavare och elever", file: "Hemmayoga-Kort-info-till-vardnadshavare-och-elever.pdf", size: "1.4 MB", tag: "Information" },
              ].map((docItem) => {
                const docPath = `/documents/${docItem.file}`;
                const isCopied = copiedDocUrl === docPath;

                return (
                  <div key={docItem.file} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-brand-pink/20 text-brand-purple flex items-center justify-center shrink-0">
                        <FileDown className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-brand-dark truncate">{docItem.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-sand text-brand-darkGrey font-semibold shrink-0">
                            {docItem.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-darkGrey mt-0.5">
                          {docItem.file} • <span className="font-medium text-stone-500">{docItem.size}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.origin + docPath);
                          setCopiedDocUrl(docPath);
                          setTimeout(() => setCopiedDocUrl(null), 3000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-sand border border-[#E3DFC9] text-brand-dark text-xs font-semibold hover:bg-[#EBE8DC] transition-colors flex items-center gap-1 cursor-pointer"
                        title="Kopiera länk"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? "Kopierad!" : "Kopiera länk"}</span>
                      </button>

                      <a
                        href={docPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-brand-purple text-white text-xs font-semibold hover:bg-[#781b61] transition-colors flex items-center gap-1"
                        download
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Ladda ner</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: INKORG / INKOMNA MEDDELANDEN */}
      {activeTab === "inbox" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE8DC]">
            <div>
              <h2 className="text-xl font-bold font-cardo text-brand-dark flex items-center gap-2">
                <Inbox className="w-5 h-5 text-brand-purple" />
                <span>Inkomna formulär & förfrågningar ({inquiries.length})</span>
              </h2>
              <p className="text-xs text-brand-darkGrey mt-0.5">
                Här sparas alla inskickade kontaktförfrågningar, kursanmälningar och butiksordrar direkt i realtid från Firestore.
              </p>
            </div>
          </div>

          {inquiriesLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-brand-darkGrey">
              <Loader2 className="w-6 h-6 animate-spin text-brand-purple" />
              <span className="text-xs">Hämtar inkomna meddelanden...</span>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-12 text-center text-brand-darkGrey text-sm">
              Inga inkomna meddelanden än. När besökare skickar in ett formulär dyker det upp här direkt!
            </div>
          ) : (
            <div className="divide-y divide-[#EBE8DC] space-y-4">
              {inquiries.map((inq) => {
                const isRead = inq.status === "read";
                const dateStr = inq.createdAt ? new Date(inq.createdAt).toLocaleString("sv-SE") : "Nyss";

                return (
                  <div
                    key={inq.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isRead
                        ? "bg-[#FAF8F5] border-[#EAE6D8]"
                        : "bg-white border-brand-purple/30 shadow-xs ring-1 ring-brand-purple/15"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EBE8DC]/60">
                      <div className="flex flex-wrap items-center gap-2">
                        {!isRead && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-purple text-white text-[10px] font-bold uppercase tracking-wider">
                            Nytt
                          </span>
                        )}
                        <h3 className="font-bold text-sm text-brand-dark">{inq.name || "Anonym"}</h3>
                        {inq.school && (
                          <span className="text-xs text-brand-darkGrey flex items-center gap-1">
                            • <School className="w-3 h-3 text-brand-purple" /> {inq.school}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-brand-darkGrey">{dateStr}</span>
                    </div>

                    <div className="py-3 space-y-2">
                      <div className="text-xs font-semibold text-brand-purple flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{inq.subject || "Allmän förfrågan"}</span>
                      </div>
                      <p className="text-xs text-brand-dark leading-relaxed whitespace-pre-wrap bg-brand-sand/40 p-3 rounded-xl border border-[#E3DFC9]/60">
                        {inq.message || "(Inget meddelande)"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                      <div className="flex flex-wrap items-center gap-4 text-brand-darkGrey">
                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || "Förfrågan Skolyoga")}`}
                            className="inline-flex items-center gap-1 text-brand-purple font-semibold hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </a>
                        )}
                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone}`}
                            className="inline-flex items-center gap-1 hover:text-brand-dark"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{inq.phone}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleInquiryStatus(inq)}
                          className="px-3 py-1.5 rounded-lg border border-[#E3DFC9] bg-white text-[11px] font-semibold text-brand-dark hover:bg-stone-50 transition-colors cursor-pointer"
                        >
                          {isRead ? "Markera som oläst" : "Markera som hanterad"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Ta bort"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: STATISTIK & ANVÄNDARDATA */}
      {activeTab === "analytics" && (() => {
        const totalVideoViews = exercises.reduce((acc, ex) => acc + (ex.views_count || 0), 0);
        const topExercises = [...exercises]
          .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
          .slice(0, 15);
        const maxViews = topExercises[0]?.views_count || 1;

        // Category breakdown
        const categoryCounts: Record<string, { count: number; views: number }> = {};
        exercises.forEach((ex) => {
          const cat = ex.category || "Övrigt";
          if (!categoryCounts[cat]) categoryCounts[cat] = { count: 0, views: 0 };
          categoryCounts[cat].count += 1;
          categoryCounts[cat].views += ex.views_count || 0;
        });
        const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1].views - a[1].views);
        const maxCatViews = sortedCategories[0]?.[1]?.views || 1;

        return (
          <div className="space-y-8">
            {/* Top Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-cardo text-brand-dark flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-turquoise" />
                  <span>Användardata & Insikter</span>
                </h2>
                <p className="text-xs text-brand-darkGrey mt-1">
                  Se vilka filmer, kategorier och sidor som används mest. Spåras automatiskt via Firestore och Google Analytics 4 (<code className="font-mono text-brand-purple">{GA_MEASUREMENT_ID}</code>).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportAnalyticsCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dustyPurple text-white text-xs font-semibold shadow-xs hover:bg-[#781b61] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportera till Excel (CSV)</span>
                </button>

                <a
                  href="https://analytics.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-sand border border-[#E3DFC9] text-brand-dark text-xs font-semibold hover:bg-[#EBE8DC] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-brand-purple" />
                  <span>Öppna Google Analytics</span>
                </a>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-[#E3DFC9] shadow-xs">
                <div className="flex items-center justify-between text-brand-darkGrey text-xs font-semibold mb-2">
                  <span>Totala filmspelningar</span>
                  <Play className="w-4 h-4 text-brand-purple" />
                </div>
                <div className="text-3xl font-bold font-cardo text-brand-dark">
                  {totalVideoViews.toLocaleString("sv-SE")}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  Uppdateras i realtid vid varje visning
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E3DFC9] shadow-xs">
                <div className="flex items-center justify-between text-brand-darkGrey text-xs font-semibold mb-2">
                  <span>Övningar i biblioteket</span>
                  <Video className="w-4 h-4 text-brand-turquoise" />
                </div>
                <div className="text-3xl font-bold font-cardo text-brand-dark">
                  {exercises.length} st
                </div>
                <p className="text-[11px] text-brand-darkGrey mt-1">
                  Fördelat på {sortedCategories.length} kategorier
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E3DFC9] shadow-xs">
                <div className="flex items-center justify-between text-brand-darkGrey text-xs font-semibold mb-2">
                  <span>Aktiva användarprofiler</span>
                  <Users className="w-4 h-4 text-brand-pink" />
                </div>
                <div className="text-3xl font-bold font-cardo text-brand-dark">
                  {analyticsLoading ? "..." : (analyticsData?.activeUsersCount || 0)}
                </div>
                <p className="text-[11px] text-brand-darkGrey mt-1">
                  {analyticsData?.totalCompletedExercises || 0} genomförda programövningar
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E3DFC9] shadow-xs">
                <div className="flex items-center justify-between text-brand-darkGrey text-xs font-semibold mb-2">
                  <span>Inkomna formulär & svar</span>
                  <Inbox className="w-4 h-4 text-[#735100]" />
                </div>
                <div className="text-3xl font-bold font-cardo text-brand-dark">
                  {inquiries.length + (analyticsData?.surveys?.length || 0)}
                </div>
                <p className="text-[11px] text-brand-darkGrey mt-1">
                  {inquiries.length} kontaktärenden • {analyticsData?.surveys?.length || 0} enkätsvar
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Top 15 Most Played Videos */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#EBE8DC]">
                  <div>
                    <h3 className="text-lg font-bold font-cardo text-brand-dark flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-purple" />
                      <span>Mest spelade övningarna (Topp 15)</span>
                    </h3>
                    <p className="text-xs text-brand-darkGrey">
                      Vilka övningsfilmer som pedagoger och elever startar oftast
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {topExercises.map((ex, idx) => {
                    const pct = Math.max(6, Math.round(((ex.views_count || 0) / maxViews) * 100));
                    return (
                      <div key={ex.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-brand-sand text-brand-dark font-bold flex items-center justify-center text-[10px] shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-brand-dark truncate">{ex.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-sand text-brand-purple font-semibold shrink-0">
                              {ex.category}
                            </span>
                          </div>
                          <span className="font-bold text-brand-dark shrink-0">
                            {(ex.views_count || 0).toLocaleString("sv-SE")} visningar
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-brand-sand overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand-dustyPurple transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Popularity & Page Views */}
              <div className="space-y-8">
                {/* Category Breakdown */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-5">
                  <div className="pb-3 border-b border-[#EBE8DC]">
                    <h3 className="text-lg font-bold font-cardo text-brand-dark">
                      Populäraste kategorierna
                    </h3>
                    <p className="text-xs text-brand-darkGrey">
                      Totala filmvisningar per fokusområde
                    </p>
                  </div>

                  <div className="space-y-4">
                    {sortedCategories.map(([cat, stats]) => {
                      const pct = Math.max(8, Math.round((stats.views / maxCatViews) * 100));
                      return (
                        <div key={cat} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-brand-dark">{cat}</span>
                            <span className="text-brand-darkGrey font-medium">
                              {stats.views.toLocaleString("sv-SE")} visningar ({stats.count} filmer)
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-brand-sand overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-turquoise"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tracked Page Views */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-4">
                  <div className="pb-3 border-b border-[#EBE8DC]">
                    <h3 className="text-lg font-bold font-cardo text-brand-dark">
                      Sidvisningar (Nya hemsidan)
                    </h3>
                    <p className="text-xs text-brand-darkGrey">
                      Antal besök per undersida sedan spårningsstart
                    </p>
                  </div>

                  {analyticsData?.pageViews && Object.keys(analyticsData.pageViews).length > 0 ? (
                    <div className="divide-y divide-[#EBE8DC] text-xs">
                      {Object.entries(analyticsData.pageViews)
                        .filter(([k, v]) => k !== "updatedAt" && k !== "total_views" && typeof v === "number")
                        .sort((a, b) => (b[1] as number) - (a[1] as number))
                        .slice(0, 10)
                        .map(([pageKey, count]) => (
                          <div key={pageKey} className="py-2.5 flex items-center justify-between">
                            <span className="font-medium text-brand-dark">
                              /{pageKey === "startsida" ? "" : pageKey.replace(/_/g, "/")}
                            </span>
                            <span className="font-bold text-brand-purple">{String(count)} visningar</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-xs text-brand-darkGrey py-4">
                      Sidvisningar samlas nu in löpande när besökare navigerar på sajten.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Hemmayoga Survey Responses */}
            {analyticsData?.surveys && analyticsData.surveys.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFC9] shadow-sm space-y-4">
                <h3 className="text-lg font-bold font-cardo text-brand-dark">
                  Inkomna svar från 3-veckorsutvärderingen (Hemmayoga)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analyticsData.surveys.map((s: any) => (
                    <div key={s.id} className="p-4 rounded-2xl bg-brand-sand/50 border border-[#E3DFC9] text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-brand-dark">
                        <span>Upplevelse: {s.rating || "-"} / 5</span>
                        <span className="text-brand-darkGrey font-normal">
                          {s.createdAt ? new Date(s.createdAt).toLocaleDateString("sv-SE") : ""}
                        </span>
                      </div>
                      {s.effect && <p><strong>Märkt effekt:</strong> {s.effect}</p>}
                      {s.comments && <p className="italic text-brand-darkGrey">"{s.comments}"</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

    </div>
  );
}
