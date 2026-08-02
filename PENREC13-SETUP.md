# PENREC13 Corrected Setup

1. Run `INSTALL-PENREC13.command` and select the current PENREC project folder containing `package.json`.
2. Open Supabase → SQL Editor → New query.
3. Paste and run `supabase/migrations/20260731_penrec13_admin_operations.sql`.
4. The migration creates missing profiles, backfills existing users, and makes the oldest existing account the initial `super_admin` only when no administrator exists.
5. Restart PENREC with `npm run dev`.
6. Visit `/admin`.

A successful SQL result reads `Success. No rows returned`.
