# InternSync

InternSync is a Next.js platform for helping students connect with internship opportunities and helping organizations manage internship listings and candidates.

## Features

- Student and industry portals
- Internship discovery and matching workflows
- Resume parsing and auto-fill support
- Admin dashboard
- Responsive interface built with reusable components

## Tech Stack

- Next.js 14 with the App Router
- React 18
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide icons

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or pnpm

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build
npm run start
npm run lint
```

## Main Routes

- `/` - Home page
- `/student/login` - Student login
- `/student/dashboard` - Student dashboard
- `/industry/login` - Industry login
- `/industry/dashboard` - Industry dashboard
- `/admin/dashboard` - Admin dashboard

## Project Structure

```text
app/          Next.js pages and layouts
components/   Reusable UI components
hooks/        Shared React hooks
lib/          Utilities
public/       Static assets
styles/       Additional styles
```

## Project Status

InternSync is an active project being developed for an internship matching platform. Authentication is now connected to Supabase, with additional backend workflows being added as development continues.

## License

No license has been specified yet.
