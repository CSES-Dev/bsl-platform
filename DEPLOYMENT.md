# Deployment & CI/CD (BSL-67)

This document covers continuous integration and the production deployment of the
BSL Platform to **Vercel** + **MongoDB Atlas**. The CI pipeline lives in code
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)); the infrastructure
steps below are one-time dashboard setup performed by the EM.

---

## 1. Continuous Integration (in this repo)

CI is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and runs
on every **pull request to `main`**:

1. Checkout
2. Setup Node 20 (with npm cache)
3. `npm ci --legacy-peer-deps`
4. `npx prisma generate`
5. `npm run lint`
6. `npm run build`

Notes on why each step is shaped this way:

- **`--legacy-peer-deps`** — `react-simple-maps@3` (added in BSL-64) still pins
  React 18 as a peer dependency while the project runs React 19. A plain
  `npm ci` fails the peer resolution; this flag matches the local install.
- **`npx prisma generate`** — the generated Prisma client is gitignored
  (`/generated/`, and the default client under `node_modules/.prisma`), so it
  must be generated before linting/building.
- **Mongo service container** — the gallery pages (`/startups`,
  `/organizations`, `/teams`) are server components that query MongoDB during
  `next build`'s static prerender. CI runs an ephemeral `mongo:7` service so the
  build can connect; the queries simply return empty result sets. No real data
  or production credentials are used in CI.
- **Lint step** — runs `npm run lint` (ESLint via the committed
  [`.eslintrc.json`](.eslintrc.json), `next/core-web-vitals`). The
  `npm run lint-check` script additionally runs `prettier --check`, which is not
  yet wired into CI because the existing codebase has not been Prettier-
  formatted (82 files differ). A repo-wide `prettier --write` should land as its
  own dedicated chore PR after the in-flight Sprint 5 branches merge, at which
  point the CI lint step can be switched to `npm run lint-check`.

### Branch protection (GitHub → Settings → Branches)

Add a protection rule for `main`:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging → select **`Lint & Build`**
- ✅ Require branches to be up to date before merging

This makes a green CI run mandatory before any merge to `main`.

---

## 2. MongoDB Atlas (production database)

1. Create a project and an **M0 (free tier)** cluster — sufficient for MVP.
2. Create a dedicated **production database user** with a strong password
   (do not reuse the local dev credentials).
3. **Network access:** whitelist `0.0.0.0/0` for the MVP (or restrict to
   Vercel's IP ranges if tightening later).
4. Copy the SRV connection string. It becomes `DATABASE_URL` in Vercel, e.g.:

   ```
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bsl?retryWrites=true&w=majority
   ```

> Prisma's MongoDB connector requires a **replica set** for write transactions.
> Atlas clusters (including M0) are replica sets by default, so this is already
> satisfied in production.

---

## 3. Vercel (hosting)

1. Import the `cses-dev/bsl-platform` repository into a new Vercel project.
2. Framework preset: **Next.js** (auto-detected).
3. **Install command override:** `npm ci --legacy-peer-deps` (same React 19 peer
   conflict as CI — set this under Project → Settings → General → Build & Dev).
4. Add Production environment variables (Project → Settings → Environment
   Variables). Mirror them to the Preview environment so PR previews work:

   | Variable             | Source                                             |
   | -------------------- | -------------------------------------------------- |
   | `DATABASE_URL`       | Atlas connection string (section 2)                |
   | `AUTH_SECRET`        | `openssl rand -base64 32`                          |
   | `AUTH_GOOGLE_ID`     | Google Cloud Console OAuth client                  |
   | `AUTH_GOOGLE_SECRET` | Google Cloud Console OAuth client                  |
   | `RESEND_API_KEY`     | Resend dashboard                                   |
   | `BSL_ADMIN_EMAIL`    | Comma-separated super-admin emails (do not commit) |

5. **Preview deployments** are on by default for PRs — confirm enabled.
6. Deploy. Note the stable production URL (e.g. `https://bsl-platform.vercel.app`
   or the custom domain).

---

## 4. Google OAuth (production)

In Google Cloud Console → APIs & Services → Credentials → the OAuth 2.0 client:

- **Authorized redirect URIs:** add
  `https://<your-vercel-domain>/api/auth/callback/google`
- **Authorized JavaScript origins:** add `https://<your-vercel-domain>`

Keep the existing `http://localhost:3000/...` entry for local development.

---

## 5. Production schema push + seed

Run **locally**, pointed at the production database, after Atlas is provisioned.
Do **not** commit real admin emails (same privacy convention as Sprint 4).

```bash
# Push the Prisma schema to the production cluster
DATABASE_URL="<atlas-connection-string>" npx prisma db push

# Edit prisma/seed.ts to list the real SUPER_ADMIN email(s) — do NOT commit.
DATABASE_URL="<atlas-connection-string>" npm run seed
```

This guarantees at least one super admin can sign in and reach `/admin`.

---

## Acceptance criteria mapping

| Criterion                                  | Where satisfied                                  |
| ------------------------------------------ | ------------------------------------------------ |
| CI runs on every PR, blocks merge on fail  | `.github/workflows/ci.yml` + branch protection   |
| Lint + build pass for current main         | Verified locally; CI green (fixes in this branch)|
| Production deployment live at stable URL   | Vercel (section 3)                               |
| Preview deployments work for PRs           | Vercel previews (section 3)                       |
| Google OAuth works in production           | Section 4                                        |
| Database provisioned + seeded super admin  | Sections 2 & 5                                    |
| All env vars documented in `.env.example`  | `.env.example` (updated this branch)             |
