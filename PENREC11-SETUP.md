# PENREC11 setup

1. Create or open the PENREC Supabase project.
2. Open **SQL Editor** and run `supabase/migrations/20260730_penrec11_auth.sql`.
3. In **Authentication → URL Configuration**, add:
   - Site URL: `http://localhost:3000` while developing
   - Redirect URL: `http://localhost:3000/auth/callback`
   - Add the matching `https://penrecords.com` URLs before production.
4. Copy `.env.example` to `.env.local` and enter the project URL and anon key.
5. Run the installer for your system:
   - macOS: double-click `INSTALL-PENREC11.command`
   - Windows PowerShell: run `install-penrec11.ps1`
6. Create your own account through `/register`.
7. In Supabase Table Editor, change that profile's role to `super_admin`.

Never place the Supabase service-role key in this website or in any `NEXT_PUBLIC_` variable.
