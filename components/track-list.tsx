"use client";

import type { Artist } from "@/data/catalog";
import { usePlayer } from "@/components/player-context";

export function TrackList({ artist }: { artist: Artist }) {
  const { currentItem, playing, playTrack } = usePlayer();

  return (
    <ol className="track-list track-list--interactive">
      {artist.tracks.map((track, index) => {
        const available = Boolean(track.audio);
        const isCurrent = currentItem.artistSlug === artist.slug && currentItem.trackNumber === index + 1;
        return (
          <li key={track.title} className={isCurrent ? "track-list__current" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{track.title}</b>
            <time>{track.duration}</time>
            {available ? (
              <button type="button" onClick={() => playTrack(artist, track, index)} aria-label={`Play ${track.title}`}>
                {isCurrent && playing ? "Ⅱ" : "▶"}
              </button>
            ) : <small>Album track</small>}
          </li>
        );
      })}
    </ol>
  );
}
