"use client";

import Image from "next/image";
import type { Artist } from "@/data/catalog";
import { usePlayer } from "@/components/player-context";

export function AudioPlayer({ artist, compact = false }: { artist: Artist; compact?: boolean }) {
  const { currentItem, playing, progress, playableTracksFor, playAlbum, queueAlbum } = usePlayer();
  const playable = playableTracksFor(artist);
  const first = playable[0];
  const isCurrent = first?.id === currentItem.id;

  return (
    <div className={compact ? "audio-player audio-player--compact" : "audio-player"}>
      <Image src={artist.cover} alt="" width={96} height={96} />
      <div className="audio-player__copy">
        <span>{playable.length > 1 ? `${playable.length} tracks available` : "Preview available"}</span>
        <b>{first?.title ?? artist.album}</b>
        <small>{artist.name} · {artist.album}</small>
      </div>
      <div className="audio-player__actions">
        <button type="button" className="audio-player__primary" onClick={() => playAlbum(artist)} aria-label={isCurrent && playing ? `Restart ${artist.album}` : `Play ${artist.album}`}>
          {isCurrent && playing ? "Ⅱ" : "▶"} <span>Play album</span>
        </button>
        <button type="button" className="audio-player__secondary" onClick={() => queueAlbum(artist)}>+ Queue</button>
      </div>
      <div className="audio-player__line" aria-hidden="true"><span style={{ width: `${isCurrent ? progress : 0}%` }} /></div>
    </div>
  );
}
