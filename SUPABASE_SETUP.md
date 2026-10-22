# SKILLORA AI — SUPABASE & VERCEL SETUP GUIDE

This website is **100% cloud-ready** for Supabase and Vercel!

---

## 🟢 STEP 1: Create Your Free Supabase Database

1. Go to [https://supabase.com](https://supabase.com) and create an account / login.
2. Click **"New Project"**.
3. Choose a name (e.g. `skillora-ai`), set a database password, and click **Create new project**.

---

## 🟢 STEP 2: Run the SQL Schema (1-Click Database Setup)

1. In your Supabase project dashboard, click on **SQL Editor** in the left menu (icon looks like `>_`).
2. Click **"New Query"**.
3. Open the file **`supabase_schema.sql`** located in this project folder.
4. Copy all its content and paste it into the Supabase SQL Editor.
5. Click **"Run"** (green button at bottom right).

✅ **Done!** This automatically creates:
- `prompts` table with all 23 initial prompts (10+ Free Video & 10+ Free Image prompts + Premium prompts).
- `pricing_plans` table with your membership tiers.
- `site_config` table with your WhatsApp number (+92 316 1056008) and Admin PIN.
- Public read & write security policies.

---

## 🟢 STEP 3: Connect Supabase to Your Project

### A. For Local Testing (`.env` file):
1. In Supabase, go to **Project Settings** (gear icon) > **API**.
2. Copy your:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **Project API keys > `anon` `public`** key (e.g. `eyJhbGciOi...`)
3. Create a file named **`.env`** in your project folder (next to `package.json`):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Save the file. The website will immediately connect to your Supabase database!

---

## 🟢 STEP 4: Deploy Live to Vercel (1-Click)

1. Push your project code to GitHub or GitLab.
2. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add these 2 variables:
   - `VITE_SUPABASE_URL` = (Your Supabase Project URL)
   - `VITE_SUPABASE_ANON_KEY` = (Your Supabase Anon Public Key)
5. Click **"Deploy"**!

🎉 Your website will be live worldwide with live database sync!
Any prompt you add or price you edit in your Admin Panel will update in Supabase and show for all visitors across the world in real time!
