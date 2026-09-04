do $$
begin
  create type public.user_role as enum ('student', 'industry', 'admin');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.student_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  city text,
  state text,
  pincode text,
  previous_participation boolean not null default false,
  additional_info text,
  skills text[] not null default '{}',
  preferred_locations text[] not null default '{}',
  preferred_sectors text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.education (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.student_profiles(id) on delete cascade,
  university text not null,
  degree text not null,
  gpa text,
  graduation_year integer
);

create table if not exists public.companies (
  id uuid primary key references public.profiles(id) on delete cascade,
  name text not null,
  registration_number text,
  sector text,
  company_size text,
  description text,
  website text,
  contact_name text,
  designation text,
  contact_email text,
  contact_phone text,
  office_address text,
  created_at timestamptz not null default now()
);

create table if not exists public.internships (
  id bigint generated always as identity primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  department text,
  location text,
  work_mode text,
  duration_months integer,
  stipend numeric,
  description text,
  learning_outcomes text,
  capacity integer not null default 1,
  required_skills text[] not null default '{}',
  minimum_degree text,
  field_of_study text,
  minimum_gpa text,
  graduation_year_range text,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  internship_id bigint not null references public.internships(id) on delete cascade,
  student_id uuid not null references public.student_profiles(id) on delete cascade,
  status text not null default 'Under Review',
  created_at timestamptz not null default now(),
  unique (internship_id, student_id)
);

alter table public.internships add column if not exists minimum_degree text;
alter table public.internships add column if not exists field_of_study text;
alter table public.internships add column if not exists minimum_gpa text;
alter table public.internships add column if not exists graduation_year_range text;

alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.education enable row level security;
alter table public.companies enable row level security;
alter table public.internships enable row level security;
alter table public.applications enable row level security;

drop policy if exists "Users can view their profile" on public.profiles;
drop policy if exists "Users can create their profile" on public.profiles;
drop policy if exists "Users can update their profile" on public.profiles;
drop policy if exists "Students manage their profile" on public.student_profiles;
drop policy if exists "Students manage their education" on public.education;
drop policy if exists "Companies manage their profile" on public.companies;
drop policy if exists "Anyone can view company summaries" on public.companies;
drop policy if exists "Anyone can view active internships" on public.internships;
drop policy if exists "Companies manage their internships" on public.internships;
drop policy if exists "Companies update their internships" on public.internships;
drop policy if exists "Companies delete their internships" on public.internships;
drop policy if exists "Students view their applications" on public.applications;
drop policy if exists "Students create applications" on public.applications;
drop policy if exists "Companies view applications for their internships" on public.applications;
drop policy if exists "Companies view applicants for their internships" on public.student_profiles;

create policy "Users can view their profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can create their profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Users can update their profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Students manage their profile" on public.student_profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Students manage their education" on public.education
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);
create policy "Companies manage their profile" on public.companies
  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Anyone can view company summaries" on public.companies
  for select using (true);
create policy "Anyone can view active internships" on public.internships
  for select using (status = 'Active' or auth.uid() = company_id);
create policy "Companies manage their internships" on public.internships
  for insert with check (auth.uid() = company_id);
create policy "Companies update their internships" on public.internships
  for update using (auth.uid() = company_id);
create policy "Companies delete their internships" on public.internships
  for delete using (auth.uid() = company_id);
create policy "Students view their applications" on public.applications
  for select using (auth.uid() = student_id);
create policy "Students create applications" on public.applications
  for insert with check (auth.uid() = student_id);

create policy "Companies view applications for their internships" on public.applications
  for select using (
    exists (
      select 1 from public.internships
      where internships.id = applications.internship_id
        and internships.company_id = auth.uid()
    )
  );
create policy "Companies view applicants for their internships" on public.student_profiles
  for select using (
    exists (
      select 1 from public.applications
      join public.internships on internships.id = applications.internship_id
      where applications.student_id = student_profiles.id
        and internships.company_id = auth.uid()
    )
  );
