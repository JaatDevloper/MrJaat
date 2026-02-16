# replit.md

## Overview

This is a personal portfolio/brand website called "MrJaat" — a dark, neon-accented, futuristic-themed full-stack web application. It features a home landing page, a quotes archive, and a system logs/command center. Users can create and view quotes and log entries. The app uses a React frontend with a cyberpunk/rugged aesthetic and an Express backend with PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with three pages: Home (`/`), Quotes (`/quotes`), Logs (`/logs`), and a 404 page
- **State Management / Data Fetching**: TanStack React Query for server state, with custom hooks in `client/src/hooks/use-jaat-data.ts` that wrap fetch calls
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives, stored in `client/src/components/ui/`
- **Custom Components**: `GlitchText`, `NeonButton`, `Navigation`, `CreateQuoteDialog`, `CreateLogDialog` in `client/src/components/`
- **Styling**: Tailwind CSS with CSS variables for theming. Dark theme with neon orange primary and neon green accent colors. Custom fonts: Oxanium (display), Outfit (body), JetBrains Mono (mono)
- **Animations**: Framer Motion for page transitions and scroll-triggered animations
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 running on Node.js with TypeScript (executed via `tsx`)
- **HTTP Server**: Node `http.createServer` wrapping Express
- **API Design**: REST API with routes defined in `server/routes.ts`. Route contracts (paths, methods, input/output schemas) are defined in `shared/routes.ts` using Zod, shared between client and server
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class using Drizzle ORM
- **Development**: Vite dev server is used as middleware in development mode (`server/vite.ts`) with HMR support
- **Production**: Client is built to `dist/public`, server is bundled with esbuild to `dist/index.cjs`

### Shared Code (`shared/`)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions for `quotes` and `logs` tables, plus Zod insert schemas generated via `drizzle-zod`
- **Routes** (`shared/routes.ts`): API contract definitions with paths, methods, Zod input/output schemas — used by both client hooks and server route handlers

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Driver**: `pg` (node-postgres) with connection pool
- **Connection**: Via `DATABASE_URL` environment variable (required)
- **Schema Push**: `npm run db:push` uses `drizzle-kit push` to apply schema changes
- **Tables**:
  - `quotes`: id (serial), content (text), author (text, default "MrJaat"), is_favorite (boolean), created_at (timestamp)
  - `logs`: id (serial), title (text), content (text), created_at (timestamp)

### Build System
- `npm run dev` — Development server with Vite HMR
- `npm run build` — Builds client with Vite, bundles server with esbuild
- `npm run start` — Runs production build
- `npm run db:push` — Pushes schema to database

## External Dependencies

### Database
- **PostgreSQL** — Primary data store, connected via `DATABASE_URL` environment variable

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit** + **drizzle-zod** — ORM, migrations, and schema-to-Zod generation
- **express** v5 — HTTP server framework
- **pg** + **connect-pg-simple** — PostgreSQL client and session store
- **@tanstack/react-query** — Client-side data fetching and caching
- **zod** — Runtime validation shared between client and server
- **framer-motion** — Animation library
- **wouter** — Client-side routing
- **shadcn/ui** components via Radix UI primitives — UI component library
- **tailwindcss** — Utility-first CSS framework
- **lucide-react** — Icon library
- **date-fns** — Date formatting utilities

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` — Dev-only Replit integrations