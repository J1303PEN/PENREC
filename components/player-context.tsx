"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { artists, type Artist, type Track } from "@/data/catalog";

export type QueueItem = {
  id: string;
  artistSlug: string;
  artistName: string;
  album: string;
  cover: string;
  catalogue: string;
  trackNumber: number;
  title: string;
  durationLabel: string;
  audio: string;
};

type PlayerContextValue = {
  currentItem: QueueItem;
  queue: QueueItem[];
  currentIndex: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  muted: boolean;
  queueOpen: boolean;
  playableTracksFor: (artist: Artist) => QueueItem[];
  playArtist: (artist: Artist) => void;
  playAlbum: (artist: Artist) => void;
  queueAlbum: (artist: Artist) => void;
  playTrack: (artist: Artist, track: Track, trackIndex: number) => void;
  toggle: () => Promise<void>;
  next: () => void;
  previous: () => void;
  seek: (percent: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  jumpTo: (index: number) => void;
  removeFromQueue: (index: number) => void;
  clearUpcoming: () => void;
  toggleQueue: () => void;
  closeQueue: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

function queueItemsForArtist(artist: Artist): QueueItem[] {
  return artist.tracks.flatMap((track, index) => track.audio ? [{
    id: `${artist.slug}-${index}-${track.audio}`,
    artistSlug: artist.slug,
    artistName: artist.name,
    album: artist.album,
    cover: artist.cover,
    catalogue: artist.catalogue,
    trackNumber: index + 1,
    title: track.title,
    durationLabel: track.duration,
    audio: track.audio,
  }] : []);
}

const launchQueue = artists.flatMap(queueItemsForArtist);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoplayRef = useRef(false);
  const [queue, setQueue] = useState<QueueItem[]>(launchQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);

  const currentItem = queue[currentIndex] ?? launchQueue[0];

  const selectIndex = useCallback((index: number, autoplay = true) => {
    setQueue((existing) => {
      if (existing.length === 0) return launchQueue;
      const safeIndex = Math.min(Math.max(index, 0), existing.length - 1);
      shouldAutoplayRef.current = autoplay;
      setCurrentIndex(safeIndex);
      return existing;
    });
  }, []);

  const replaceQueue = useCallback((items: QueueItem[], startIndex = 0) => {
    if (items.length === 0) return;
    shouldAutoplayRef.current = true;
    setQueue(items);
    setCurrentIndex(Math.min(Math.max(startIndex, 0), items.length - 1));
  }, []);

  const next = useCallback(() => {
    if (currentIndex < queue.length - 1) selectIndex(currentIndex + 1, true);
    else setPlaying(false);
  }, [currentIndex, queue.length, selectIndex]);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    if (currentIndex > 0) selectIndex(currentIndex - 1, true);
  }, [currentIndex, selectIndex]);

  const playableTracksFor = useCallback((artist: Artist) => queueItemsForArtist(artist), []);

  const playAlbum = useCallback((artist: Artist) => {
    replaceQueue(queueItemsForArtist(artist));
  }, [replaceQueue]);

  const playArtist = useCallback((artist: Artist) => {
    const items = queueItemsForArtist(artist);
    const isSameItem = items[0]?.id === currentItem.id;
    if (isSameItem) {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) void audio.play().catch(() => setPlaying(false));
      else audio.pause();
      return;
    }
    replaceQueue(items);
  }, [currentItem.id, replaceQueue]);

  const queueAlbum = useCallback((artist: Artist) => {
    const items = queueItemsForArtist(artist);
    if (items.length === 0) return;
    setQueue((existing) => {
      const known = new Set(existing.map((item) => item.id));
      const additions = items.filter((item) => !known.has(item.id));
      return [...existing, ...additions];
    });
    setQueueOpen(true);
  }, []);

  const playTrack = useCallback((artist: Artist, track: Track, trackIndex: number) => {
    if (!track.audio) return;
    const items = queueItemsForArtist(artist);
    const index = items.findIndex((item) => item.trackNumber === trackIndex + 1);
    replaceQueue(items, Math.max(index, 0));
  }, [replaceQueue]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      setPlaying(false);
    }
  }, []);

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const safePercent = Math.min(100, Math.max(0, percent));
    audio.currentTime = (safePercent / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
  }, []);

  const setVolume = useCallback((value: number) => {
    const safeVolume = Math.min(1, Math.max(0, value));
    setVolumeState(safeVolume);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = safeVolume;
      if (safeVolume > 0) audio.muted = false;
    }
    if (safeVolume > 0) setMuted(false);
    window.localStorage.setItem("penrec_player_volume", String(safeVolume));
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
  }, []);

  const jumpTo = useCallback((index: number) => selectIndex(index, true), [selectIndex]);

  const removeFromQueue = useCallback((index: number) => {
    setQueue((existing) => {
      if (existing.length <= 1 || index === currentIndex) return existing;
      const updated = existing.filter((_, itemIndex) => itemIndex !== index);
      if (index < currentIndex) setCurrentIndex((value) => Math.max(0, value - 1));
      return updated;
    });
  }, [currentIndex]);

  const clearUpcoming = useCallback(() => {
    setQueue((existing) => existing.slice(0, currentIndex + 1));
  }, [currentIndex]);

  useEffect(() => {
    const storedValue = window.localStorage.getItem("penrec_player_volume");
    const storedVolume = storedValue === null ? Number.NaN : Number(storedValue);
    const initialVolume = Number.isFinite(storedVolume) && storedVolume >= 0 && storedVolume <= 1 ? storedVolume : 0.8;
    setVolumeState(initialVolume);
    if (audioRef.current) audioRef.current.volume = initialVolume;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentItem) return;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (shouldAutoplayRef.current) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      setPlaying(false);
    }
  }, [currentItem]);

  const value = useMemo<PlayerContextValue>(() => ({
    currentItem,
    queue,
    currentIndex,
    playing,
    currentTime,
    duration,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
    volume,
    muted,
    queueOpen,
    playableTracksFor,
    playArtist,
    playAlbum,
    queueAlbum,
    playTrack,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    jumpTo,
    removeFromQueue,
    clearUpcoming,
    toggleQueue: () => setQueueOpen((open) => !open),
    closeQueue: () => setQueueOpen(false),
  }), [currentItem, queue, currentIndex, playing, currentTime, duration, volume, muted, queueOpen, playableTracksFor, playArtist, playAlbum, queueAlbum, playTrack, toggle, next, previous, seek, setVolume, toggleMute, jumpTo, removeFromQueue, clearUpcoming]);

  return (
    <PlayerContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={currentItem.audio}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onEnded={next}
      />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}
