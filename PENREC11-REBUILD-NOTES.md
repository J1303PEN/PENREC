# PENREC11 Rebuilt Release

This release replaces the damaged PENREC11 authentication files and keeps PENREC at version 11.

## Corrected

- Restored valid TypeScript after the interrupted manual edit.
- Corrected Supabase signup and recovery redirect parameters.
- Added support for current Supabase error response fields.
- Added clearer configuration and network error messages.
- Preserved the existing installer workflow.
- Included the required profiles/roles/RLS database migration.

## Important database step

Before registration is tested, run:

`supabase/migrations/20260730_penrec11_auth.sql`

in the Supabase SQL Editor. This creates the `profiles` table and signup trigger. Without it, Supabase may reject new accounts with a database error.

## Configuration

The installer preserves an existing `.env.local`. If installing into a fresh folder, copy `.env.example` to `.env.local` and add the PENREC Supabase Project URL and publishable key.
