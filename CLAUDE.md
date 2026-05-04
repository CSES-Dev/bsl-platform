# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BSL Platform is a Next.js 15 web application for Big Strategy Labs, an invite-only startup accelerator. It manages startup applications, events, team leadership profiles, and provides an admin dashboard for reviewing applications.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB with Prisma ORM
- **Authentication:** NextAuth v5 (Google OAuth, JWT sessions)
- **Styling:** Tailwind CSS + Shadcn/Radix UI components
- **Validation:** Zod

## Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run lint-fix     # Fix lint issues and format with Prettier
npm run lint-check   # Check lint and formatting without fixing
npm run format       # Format all files with Prettier
npm run test         # Run Playwright E2E tests
npm run seed         # Seed user roles (edit prisma/seed.ts first)
npx prisma generate  # Generate Prisma client after schema changes
npx prisma db push   # Push schema changes to MongoDB
```

## Architecture

### App Router Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/    # NextAuth handler
│   ├── applications/startup/  # POST startup applications
│   ├── events/                # GET public events
│   └── admin/                 # Admin API (applications, events CRUD)
├── apply/                     # Application forms (startup, org, team)
├── admin/                     # Admin dashboard and application review
├── leaders/                   # Team leadership profiles
├── events/                    # Public events page
└── about/                     # About/mission page
```

### Key Directories

- **`components/ui/`** - Shadcn/Radix primitives (Button, Input, Card, etc.)
- **`components/layout/`** - PublicLayout wrapper with navbar/footer
- **`components/admin/`** - AdminLayout with sidebar
- **`lib/`** - Prisma client singleton, Mongoose connection, utilities
- **`services/`** - Data access layer (demo products, mock applications)

### Database (Prisma/MongoDB)

Three main models in `prisma/schema.prisma`:
- **User** - Auth with RBAC roles (USER, REVIEWER, AMBASSADOR, SUPER_ADMIN)
- **Application** - Form submissions with JSON payload, status tracking
- **Event** - Admin-managed events with creator relationship

### Authentication Flow

- NextAuth configured in `auth.ts` with Google provider
- Session provider wraps app in root `layout.tsx`
- Auth button component at `components/auth/AuthButton.tsx`
- RBAC roles defined but enforcement is TODO

### Seeding User Roles

Edit `prisma/seed.ts` to assign roles for testing:
```ts
const SEED_USERS = [
  { email: "your-email@gmail.com", role: "SUPER_ADMIN", name: "Your Name" },
];
```
Then run `npm run seed`. Safe to re-run (uses upsert).

### Path Aliases

Use `@/*` to import from project root (configured in tsconfig.json).

```typescript
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
```

## Environment Variables

Required in `.env` (see `.env.example`):
```
DATABASE_URL=mongodb://localhost:27017/test-db
AUTH_SECRET=        # openssl rand -base64 32
AUTH_GOOGLE_ID=     # Google Cloud Console
AUTH_GOOGLE_SECRET=
```

## Code Patterns

- Client components use `"use client"` directive
- API routes return `NextResponse.json()` with appropriate status codes
- Prisma client is singleton-cached in `lib/prisma.ts` to prevent hot-reload leaks
- Tailwind classes merged with `cn()` utility from `lib/utils.ts`
- Forms use client-side state with POST to API routes

## Testing

Playwright E2E tests in `tests/e2e/`. The config auto-starts dev server on port 3000.

```bash
npx playwright test                    # Run all tests
npx playwright test tests/e2e/demo.spec.ts  # Run specific test
```
