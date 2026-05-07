# Graffiti 101 — site

Bilingual (EN / FR) marketing & contact-to-purchase site for a Montreal graffiti workshop business. Built so the owner can edit all content himself through an admin panel — no code, no database to manage.

## What's here

- **Public site**: single scrolling page with sticky nav. Sections: Hero · About (mission, vision, team, past projects) · Services · Store · Reviews · Contact · Socials · Footer.
- **Admin panel** at `/admin`: edit every text field (in both languages, side-by-side), upload images, add/remove/reorder team members, projects, services, store items, reviews, and socials. Each "Save" commits the updated `content.json` to this GitHub repo, which triggers a Vercel redeploy.
- **Contact form**: validated, honeypot-protected, sends via Resend.

## How it works

- All editable content lives in [`data/content.json`](data/content.json).
- The admin panel reads from `content.json`, lets the owner edit, and commits the updated file via the GitHub Contents API.
- Vercel watches the repo and redeploys on push to `main`. **Content edits go live ~30 seconds after Save.**
- Images live on Cloudinary (free tier). The admin upload form pushes files there server-side and stores the resulting URL in `content.json`.
- **No database.** Repo is the source of truth for text content; Cloudinary for images.

## Local development

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is busy, Next.js will pick the next available port — watch the terminal output.

To test the admin panel locally, use the credentials in `.env.local`:
- Username: `Danteadmin` (set via `ADMIN_USERNAME`)
- Password: whatever you set in `ADMIN_PASSWORD`

Without the GitHub / Cloudinary / Resend env vars set, those features will return errors (login still works because that only needs `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`).

## Environment variables

All of these go in **Vercel → Project → Settings → Environment Variables** for production, and in `.env.local` (gitignored) for local dev.

| Variable | What it is | Where to get it |
|---|---|---|
| `ADMIN_USERNAME` | Admin panel username | Pick anything memorable. Stored as plaintext in env. |
| `ADMIN_PASSWORD` | Admin panel password | Pick a strong password. Stored as plaintext in env. |
| `SESSION_SECRET` | 32+ random chars used to sign the admin session cookie | Run `openssl rand -hex 32` in a terminal. |
| `GITHUB_TOKEN` | Fine-grained personal access token with `contents: write` on this repo only | See "GitHub PAT" section below. |
| `GITHUB_REPO_OWNER` | GitHub user/org that owns this repo | e.g. `decal702` |
| `GITHUB_REPO_NAME` | The repo name | `dantesite` |
| `GITHUB_BRANCH` | Branch to commit content edits to | `main` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account "cloud name" | See "Cloudinary" section below. |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Same place. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (do not commit) | Same place. |
| `RESEND_API_KEY` | Resend API key for the contact form | See "Resend" section below. |
| `RESEND_FROM_EMAIL` | Email address messages are sent *from* | `onboarding@resend.dev` for testing; use a verified domain in production. |

## First-time setup walkthrough

You only need to do this once.

### 1. GitHub personal access token (PAT)

This lets the admin panel commit `content.json` updates back to the repo.

1. Go to [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new) (Fine-grained tokens).
2. **Token name**: `dantesite admin saves`
3. **Expiration**: 1 year (you'll need to renew yearly).
4. **Repository access**: "Only select repositories" → pick `dantesite`.
5. **Repository permissions** → set **Contents** to **Read and write**.
6. Click **Generate token** and copy the token immediately — you can't see it again.
7. Paste it into Vercel as `GITHUB_TOKEN` (and into `.env.local` for local testing).

Set `GITHUB_REPO_OWNER` to your GitHub username, `GITHUB_REPO_NAME` to `dantesite`, and `GITHUB_BRANCH` to `main`.

### 2. Cloudinary

Free tier handles all images for this site comfortably (25 GB / 25 GB monthly bandwidth).

1. Sign up at [cloudinary.com](https://cloudinary.com/users/register_free).
2. After signup, go to **Settings → API Keys** in the Cloudinary console.
3. Copy:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`
4. Paste into Vercel and `.env.local`.

You don't need to configure upload presets or folders — the admin upload endpoint creates a `graffiti101/` folder automatically.

### 3. Resend (contact form email)

Free tier: 100 emails/day, 3,000/month — plenty.

1. Sign up at [resend.com](https://resend.com/signup).
2. Go to **API Keys** → **Create API Key**.
3. **Name**: `dantesite contact form`. **Permission**: "Sending access".
4. Copy the key → `RESEND_API_KEY` in Vercel and `.env.local`.
5. **For initial testing**, set `RESEND_FROM_EMAIL=onboarding@resend.dev` (Resend's shared sandbox sender — works without domain verification but only sends to the account owner's email).
6. **For production**, verify a domain in **Domains → Add Domain** (Resend will give you DNS records to add to your domain registrar). Once verified, set `RESEND_FROM_EMAIL` to something like `noreply@yourdomain.com`.

The destination address (where contact form messages are sent *to*) is configured in the admin panel's Contact section, not via env var — so the owner can change it without redeploying.

### 4. Admin credentials & session secret

```bash
# In .env.local for local dev — ALSO add these to Vercel for production
ADMIN_USERNAME=Danteadmin
ADMIN_PASSWORD=PickAStrongPassword!
SESSION_SECRET=<paste-output-of-openssl-rand-hex-32>
```

Generate the session secret with `openssl rand -hex 32` and paste the result. If you change `SESSION_SECRET` after deployment, all admin sessions are invalidated and the admin needs to log back in.

### 5. Vercel deployment

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework: **Next.js** (auto-detected).
4. Before clicking **Deploy**, expand **Environment Variables** and paste in every variable from the table above.
5. Click **Deploy**.
6. Once live, every push to `main` auto-deploys — including content edits saved through the admin panel.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-based theme via `@theme` in `app/globals.css`)
- [iron-session](https://github.com/vvo/iron-session) for admin auth (signed HttpOnly cookie, no third-party auth provider)
- [@dnd-kit](https://dndkit.com/) for drag-and-drop reordering in the admin panel
- [Cloudinary SDK](https://cloudinary.com/documentation/node_integration) for image uploads
- [Resend](https://resend.com/) for the contact form
- GitHub Contents API for committing `content.json`

## Project layout

```
app/
  page.tsx                  # public homepage
  layout.tsx                # root layout, fonts, metadata
  globals.css               # Tailwind v4 theme tokens, base styles
  actions.ts                # server actions (e.g. setLanguage)
  components/               # public site sections
  admin/
    page.tsx                # admin dashboard (auth-gated)
    AdminDashboard.tsx      # client dashboard composer
    login/                  # admin login page
    components/             # BilingualField, ImageField, SortableList, etc.
    editors/                # one editor per content section
  api/
    contact/route.ts        # POST /api/contact (Resend)
    admin/login/route.ts    # POST /api/admin/login
    admin/logout/route.ts   # POST /api/admin/logout
    admin/upload/route.ts   # POST /api/admin/upload (Cloudinary, admin only)
    admin/save/route.ts     # POST /api/admin/save  (GitHub commit, admin only)
data/
  content.json              # editable content (source of truth)
lib/
  content.ts                # types + content loader
  i18n.ts                   # UI strings, language helpers (client-safe)
  i18n-server.ts            # getLanguage() (reads cookie, server-only)
  session.ts                # iron-session config (server-only)
  cloudinary.ts             # upload helper (server-only)
  github.ts                 # commit-content helper (server-only)
  secure-compare.ts         # constant-time credential comparison
```

## How a content edit flows

1. Owner opens `/admin`, signs in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`. Session cookie is set (signed with `SESSION_SECRET`, HttpOnly, 1 year).
2. Owner edits a section (e.g. updates the hero tagline) and clicks **Save**.
3. Browser POSTs the entire updated `content.json` payload to `/api/admin/save`.
4. Server verifies admin session, then uses `GITHUB_TOKEN` to commit the new file via the GitHub Contents API. Commit message: `Admin update: <section> — <ISO timestamp>`.
5. GitHub triggers a Vercel deploy.
6. ~30 seconds later, the live site reflects the change.

The admin panel updates immediately in the UI (optimistic), but the public site only updates after the redeploy.

## Troubleshooting

**Contact form returns "Email service not configured"**
→ `RESEND_API_KEY` is missing in the deployed environment. Add it in Vercel → Settings → Environment Variables, then redeploy.

**Admin save returns "Missing env var: GITHUB_TOKEN"**
→ Same — add `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME` to Vercel.

**"GitHub commit failed (403/404)"**
→ The PAT doesn't have `contents: write` on this repo, or the repo owner/name env vars don't match. Regenerate the token with the right scope.

**Image upload fails with "Cloudinary env vars missing"**
→ Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

**"Port 3000 is in use" running `npm run dev`**
→ Something else is using 3000 (often another local Next.js dev server). Either stop it, or run `npm run dev -- -p 3001`.

**Admin login always says "Invalid credentials"**
→ Triple-check `ADMIN_USERNAME` and `ADMIN_PASSWORD` for trailing whitespace or copy-paste artifacts. Restart `npm run dev` after editing `.env.local` (env files are read once at boot).

**Login succeeds but `/admin` immediately redirects to `/admin/login`**
→ `SESSION_SECRET` is missing or shorter than 32 characters. Generate a new one with `openssl rand -hex 32`, paste it in, restart.
