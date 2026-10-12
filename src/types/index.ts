export type VideoCategory = 
  | 'Stresshantering'
  | 'Studieteknik'
  | 'Trygghet'
  | 'Om Skolyoga'
  | 'För skolpersonal'
  | 'Fokus'
  | 'Allmänt';

export type GradeLevel = 
  | 'Förskolan'
  | 'Lågstadiet'
  | 'Mellanstadiet'
  | 'Högstadiet'
  | 'Gymnasiet';

export type TweakTag = 
  | 'Sittande'
  | 'NPF'
  | 'Anpassad skola'
  | 'Stress och oro';

export interface Exercise {
  id: string;
  title: string;
  slug: string;
  link: string;
  description: string;
  video_url: string;
  youtube_id: string | null;
  thumbnail_url: string | null;
  duration_formatted: string;
  duration_tag: string;
  category: VideoCategory | string;
  categories?: string[];
  level_tags: string[];
  tweak_tags: string[];
  is_protected: boolean;
  views_count: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'teacher' | 'school_admin' | 'guest';
  schoolName?: string;
  municipality?: string;
  emailVerified?: boolean;
  avatarUrl?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  exerciseIds: string[];
  createdAt: string;
}

export interface ProgramWeek {
  id: string;
  weekNumber: number;
  title: string;
  exerciseName: string;
  classTitle: string;
  videoUrl?: string;
  classUrl?: string;
  pdfUrl?: string;
  description: string;
  instructions: string[];
  durationMinutes: number;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationWeeks: number;
  icon: string;
  badge: string;
  badges?: string[];
  tags?: string[];
  difficulty: string;
  isActive: boolean;
  weeks: ProgramWeek[];
}

export interface UserProgress {
  email: string;
  completedWeeks: string[];
  completedExercises: string[];
  streakDays: number;
  totalMinutes: number;
  activeProgramId: string;
  hasCompletedSurvey?: boolean;
}

