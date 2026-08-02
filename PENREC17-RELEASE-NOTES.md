# PENREC17 — Live Catalogue Manager

PENREC17 introduces a normalized, Supabase-backed catalogue manager for artists, releases and tracks.

## New
- Create and edit managed artists.
- Create and edit albums, EPs, singles, compilations, live albums and soundtracks.
- Draft, scheduled, published and archived states.
- Add, edit, reorder by track number and remove tracks.
- Optional ISRC field: releases and tracks can be saved and published without an ISRC.
- Credits, lyrics, preview audio and master reference fields.
- Published managed releases appear on the public Music page.
- Existing five launch artists remain untouched as the safe built-in catalogue.

## Required database step
Run `supabase/migrations/20260802_penrec17_live_catalogue_manager.sql` once in Supabase SQL Editor.
