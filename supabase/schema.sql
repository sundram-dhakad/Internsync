create type public.user_role as enum ('student', 'industry', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table public.student_profiles (
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

create table public.education (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.student_profiles(id) on delete cascade,
  university text not null,
  degree text not null,
  gpa text,
  graduation_year integer
);

create table public.companies (
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

create table public.internships (
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
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create table public.applications (
  id bigint generated always as identity primary key,
  internship_id bigint not null references public.internships(id) on delete cascade,
  student_id uuid not null references public.student_profiles(id) on delete cascade,
  status text not null default 'Under Review',
  created_at timestamptz not null default now(),
  unique (internship_id, student_id)
);

alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.education enable row level security;
alter table public.companies enable row level security;
alter table public.internships enable row level security;
alter table public.applications enable row level security;

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
create policy "Anyone can view active internships" on public.internships
  for select using (status = 'Active' or auth.uid() = company_id);
create policy "Companies manage their internships" on public.internships
  for insert with check (auth.uid() = company_id);
create policy "Companies update their internships" on public.internships
  for update using (auth.uid() = company_id);
create policy "Students view their applications" on public.applications
  for select using (auth.uid() = student_id);
create policy "Students create applications" on public.applications
  for insert with check (auth.uid() = student_id);
