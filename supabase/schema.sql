-- Supabase PostgreSQL Schema for Skolyoga
-- EU Frankfurt Region recommended for Swedish GDPR compliance

-- 1. Organizations (Skolor & Kommuner)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  municipality text,
  license_tier text default 'basic', -- 'basic', 'school_license', 'municipality'
  license_expires_at timestamptz,
  created_at timestamptz default now()
);

-- 2. User Profiles (Lärare & Skolledare)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text default 'teacher' check (role in ('teacher', 'school_admin', 'consultant')),
  organization_id uuid references public.organizations(id) on delete set null,
  created_at timestamptz default now()
);

-- 3. Favorites (Sparade övningar)
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  exercise_id text not null,
  created_at timestamptz default now(),
  unique(user_id, exercise_id)
);

-- 4. Playlists (Lektionspass & morgonsamlingar)
create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  exercise_ids text[] default '{}',
  created_at timestamptz default now()
);

-- 5. Row Level Security (RLS) Policies
alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.playlists enable row level security;

-- Profiles: users can read & update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Favorites: users can only see & modify their own favorites
create policy "Users can view own favorites" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Users can insert own favorites" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own favorites" on public.favorites
  for delete using (auth.uid() = user_id);

-- Playlists: users can manage their own playlists
create policy "Users can manage own playlists" on public.playlists
  for all using (auth.uid() = user_id);
