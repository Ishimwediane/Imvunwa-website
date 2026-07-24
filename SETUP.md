# Imvunwa website — Supabase backend setup

This connects the admin dashboard (`/admin`) and the public website to a
free Supabase backend: **database + login + image storage**.

Until you finish these steps the site still works — it runs on built-in
default content, and the dashboard stays in **Preview mode**. Once the keys
are in place, the dashboard switches to **Live** and saves for real.

---

## 1. Create a Supabase project (free)

1. Go to <https://supabase.com> → **Sign in** → **New project**.
2. Give it a name (e.g. `imvunwa`), set a database password (save it), pick
   the region closest to Rwanda (e.g. *EU (Frankfurt)*), and create it.
3. Wait ~2 minutes for it to finish setting up.

## 2. Create the database tables + seed data

1. In your project, open **SQL Editor** (left sidebar) → **New query**.
2. Open the file [`supabase/schema.sql`](supabase/schema.sql) from this
   project, copy **all** of it, paste into the editor, and click **Run**.
3. You should see “Success”. This creates the tables, security rules, the
   image storage bucket, and fills in your current website content.

## 3. Get your API keys

1. Go to **Project Settings** (gear icon) → **API**.
2. Copy these two values:
   - **Project URL**  →  `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key  →  `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Open the file **`.env.local`** in this project and paste them in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   NEXT_PUBLIC_SUPABASE_BUCKET=images
   ```

4. Restart the dev server (`npm run dev`) so it picks up the new values.

> These keys are safe to expose in the browser — your data is protected by
> the Row Level Security rules created in step 2 (anyone can *read*, only
> signed-in admins can *change* anything).

## 4. Create your admin login

1. In Supabase go to **Authentication** → **Users** → **Add user** →
   **Create new user**.
2. Enter the owner's **email** and a **password**, and (important) tick
   **Auto Confirm User** so they can log in immediately.
3. That's the account you'll use at **`/admin/login`**.

> There is no public sign-up — the only way in is an account you create here.
> Add more staff later by adding more users.

## 5. Try it

1. Visit `/admin/login`, sign in with the account from step 4.
2. The orange “Preview mode” banner should now be a green **“Live”** banner.
3. Edit a service, add a team photo, change some text → it saves to Supabase.
   (Check **Table Editor** in Supabase to see the rows change.)

---

## Deploying to Vercel

When you deploy, add the same three environment variables in
**Vercel → Project → Settings → Environment Variables**
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_SUPABASE_BUCKET`), then redeploy.

## Images

Uploaded images go to the Supabase **`images`** storage bucket (public, with
a CDN). For heavy image use you can later switch uploads to Cloudinary — only
`lib/adminApi.js` (`uploadImage`) would change.

## Notes / what's next

- **Public pages** currently read through `lib/data.js`, which falls back to
  built-in defaults. Wiring each public page to read *live* from Supabase is
  the next step — best done now that the database exists so we can test it.
- If Supabase is ever slow or down, the site keeps serving default/cached
  content; only live editing needs Supabase online.
