# PENREC17.1 — Live Catalogue Manager (Stable)

This maintenance release corrects the TypeScript validation failure in the public Music catalogue.

## Fixed
- Strongly types public managed releases as `ManagedRelease[]`.
- Types the release-card mapping callback explicitly.
- Keeps ISRC optional for all managed tracks.
- Retains the PENREC17 artist, release and track management features.

## Database
Use the included PENREC17 migration only if it has not already been applied.
