export type VideoCategory = 
  | 'Stresshantering'
  | 'Studieteknik'
  | 'Trygghet'
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
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  exerciseIds: string[];
  createdAt: string;
}
