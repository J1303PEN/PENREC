# PENREC13 Corrected Release Notes

- Corrected the missing `public.profiles` migration dependency.
- Migration is self-contained and repeatable.
- Existing Supabase users are backfilled into `public.profiles`.
- The first existing account is bootstrapped as `super_admin` when no staff account exists.
- Authentication profile triggers are created safely.
- Staff/admin RLS policies and Data API privileges are installed.
- Existing `.env.local` remains protected by the macOS installer.
