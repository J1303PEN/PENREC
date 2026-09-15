# PENREC SITE BUILD GUIDE — LOCKED WORKFLOW

**Purpose:** This is the permanent reference for adding PENREC artists and releases. Check this file before every future release so the process is not rediscovered or guessed.

**Repository:** `J1303PEN/PENREC`
**Production branch:** `main`
**Live site:** `https://penrec.vercel.com`
**Deployment:** Vercel automatically deploys pushes to `main`.
**Media storage:** Cloudflare R2 bucket `penrec-audio`
**Public media domain:** `https://audio.penrec.co.uk`

---

## 1. SOURCE RELEASE PACKAGE

A normal PENREC release ZIP should contain:

- MP3 files for every album track
- album cover JPG
- artist hero JPG
- artist profile JPG
- gallery JPGs
- tracklisting PDF where supplied
- biography / artist copy where supplied or already approved

Before changing the website, inspect the ZIP and confirm the exact catalogue number, artist, album title, track count, filenames, durations and available images. Do not guess missing information.

Ignore source-package junk such as `.DS_Store`, `__MACOSX`, duplicate WAVs or temporary files unless explicitly required.

---

## 2. FILE NAMING

### Audio

Audio is stored at the **root** of the R2 bucket, using lowercase, zero-padded track numbers and underscores. Avoid spaces, `+`, apostrophes and punctuation.

Example:

`01_no_halfway_love.mp3`
`02_you_had_your_chance.mp3`

Public URL:

`https://audio.penrec.co.uk/01_no_halfway_love.mp3`

Do not invent nested release folders for audio unless the site architecture is deliberately changed later.

### Images

New release images are stored in an artist/release folder in R2. The working PNR024 convention is:

`verelles/cover.jpg`
`verelles/hero.jpg`
`verelles/profile.jpg`
`verelles/gallery-001.jpg`
`verelles/gallery-002.jpg`
...

Public URLs therefore use:

`https://audio.penrec.co.uk/verelles/cover.jpg`

For future artists, use a simple lowercase URL-safe artist slug as the folder, e.g. `parkers/`.

Recommended names:

`<artist-folder>/cover.jpg`
`<artist-folder>/hero.jpg`
`<artist-folder>/profile.jpg`
`<artist-folder>/gallery-001.jpg`
`<artist-folder>/gallery-002.jpg`
...

---

## 3. CLOUDFLARE R2 UPLOAD

Bucket: `penrec-audio`

Wrangler upload pattern:

```bash
npx wrangler r2 object put "penrec-audio/OBJECT_NAME" --file="LOCAL_FILE" --content-type="MIME_TYPE" --remote
```

Use `audio/mpeg` for MP3 and `image/jpeg` for JPG where specifying MIME type.

Wrangler v4.131.2 does **not** provide the previously assumed `wrangler r2 object list` workflow. Do not send the user through that failed route again.

After upload, verify the expected public URL rather than assuming the object is accessible.

---

## 4. WEBSITE DATA ARCHITECTURE

Core artist type and original catalogue live in:

`data/catalog.ts`

Additional release data lives in:

`data/releases.ts`

PNR024 established the safe pattern of a dedicated artist data file:

`data/verelles.ts`

Future new artists can use the same pattern, for example:

`data/parkers.ts`

The dedicated artist object must conform to the `Artist` type imported from `@/data/catalog` and include:

- `name`
- `slug`
- `album`
- `cover`
- `hero`
- `profile`
- `heroPosition` / `profilePosition` if required
- `gallery`
- `descriptor`
- `location`
- `bio`
- `quote`
- `year`
- `catalogue`
- `preview`
- complete `tracks` array

Every track should explicitly contain the correct Cloudflare `audio` URL for new releases rather than relying on the old `albumTracks()` local `/audio/` filename convention.

---

## 5. FILES THAT MUST KNOW ABOUT A NEW ARTIST

When adding a completely new artist, check and update all relevant consumers. PNR024 required these locations:

- `app/artists/page.tsx` — public artist roster
- `lib/catalogue-live.ts` — artist resolver; `getResolvedArtist` and admin resolver must be able to resolve the new artist
- `app/artists/[slug]/page.tsx` — include artist in static params
- `app/releases/[slug]/page.tsx` — include artist in static params
- `components/catalogue-browser.tsx` — include artist/release in public catalogue
- `app/releases/page.tsx` — ensure catalogue/artist/track totals include the new artist where applicable

Before finishing a release, search the repository for relevant `artists`, `getArtist`, `generateStaticParams`, roster and catalogue consumers. Do not assume the above list can never change.

For an artist's first release, a separate entry in `data/releases.ts` is not automatically required: the primary `Artist` object can represent the first/legacy release and the existing release helpers can wrap it. Later releases by the same artist belong in the multi-release structure.

---

## 6. NEXT.JS REMOTE IMAGES

The site uses Next.js `Image`. Cloudflare-hosted images therefore require `next.config.ts` to permit the media hostname.

Current required host:

`audio.penrec.co.uk`

Do not remove this remote image configuration while R2-hosted imagery is in use.

---

## 7. DEPLOYMENT ORDER

Preferred release sequence:

1. Inspect and validate release package.
2. Normalise media filenames.
3. Upload all MP3s to R2.
4. Upload cover, hero, profile and galleries to R2.
5. Verify public media URLs.
6. Create/update artist/release data in GitHub.
7. Wire new artist into every required catalogue/route consumer.
8. Push to `main`.
9. Check Vercel status for the **latest** commit. Ignore superseded failed intermediate deployments once a later successful deployment replaces them.
10. Verify the production site itself: artist listing, artist page, release page, cover, hero, profile/gallery, biography, catalogue number, track listing and audio playback.
11. Only then describe the release as **live**.

Do not tell the user to keep refreshing while the Vercel deployment is still pending.

---

## 8. PNR024 — WORKING REFERENCE

**Artist:** The Verelles
**Album:** *No Halfway Love*
**Catalogue:** PNR024
**Tracks:** 17
**Artist slug:** `the-verelles`
**R2 image folder:** `verelles/`
**Artist data:** `data/verelles.ts`

PNR024 is the reference implementation for the current release process. It proved the working chain:

**release package → Cloudflare R2 media → GitHub catalogue/route wiring → Vercel production deployment → live verification**

When a future task is unclear, inspect the current PNR024 implementation in the repository before inventing a different workflow.

---

## 9. CURRENT NEXT RELEASE

**PNR025 — The Parkers — _I Got the Job_**

The supplied PNR025 package contains 16 MP3s, album cover, hero image, profile image, four gallery images and a tracklisting PDF. Normalise source filenames before upload, including punctuation/space anomalies, and use `parkers/` for the R2 image folder unless the final artist slug dictates otherwise.

---

## 10. LOCKED OPERATING RULES

- Check the repository and package rather than guessing.
- Never change an established catalogue number.
- Never claim media has uploaded until the upload succeeds.
- Never claim a release is live until the latest Vercel deployment succeeds **and** production is checked.
- Do not make the user repeat established Cloudflare, GitHub or Vercel setup.
- Reuse this workflow for each subsequent PENREC release.
- Preserve approved biography, artwork and release information rather than regenerating them without instruction.
- Normalise problematic filenames at ingestion so source-package naming errors do not become permanent public URLs.

**This document is the canonical PENREC website build/deployment reference and should be updated whenever the architecture or proven workflow changes.**