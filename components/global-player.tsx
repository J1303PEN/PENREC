"use client";

import Image from "next/image";
import { usePlayer } from "@/components/player-context";

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function GlobalPlayer() {
  const {
    currentItem,
    queue,
    currentIndex,
    playing,
    currentTime,
    duration,
    progress,
    volume,
    muted,
    queueOpen,
    toggle,
    previous,
    next,
    seek,
    setVolume,
    toggleMute,
    jumpTo,
    removeFromQueue,
    clearUpcoming,
    toggleQueue,
    closeQueue,
  } = usePlayer();

  const upcomingCount = Math.max(0, queue.length - currentIndex - 1);

  return (
    <>
      {queueOpen && <button className="queue-scrim" type="button" onClick={closeQueue} aria-label="Close queue" />}
      <section id="penrec-queue" className={`queue-panel${queueOpen ? " queue-panel--open" : ""}`} aria-label="Playback queue" aria-hidden={!queueOpen}>
        <header className="queue-panel__header">
          <div><span>Listening session</span><h2>Queue</h2></div>
          <div className="queue-panel__header-actions">
            {upcomingCount > 0 && <button type="button" onClick={clearUpcoming}>Clear upcoming</button>}
            <button type="button" className="queue-panel__close" onClick={closeQueue} aria-label="Close queue">×</button>
          </div>
        </header>
        <ol className="queue-list">
          {queue.map((item, index) => {
            const current = index === currentIndex;
            return (
              <li key={`${item.id}-${index}`} className={current ? "queue-list__item queue-list__item--current" : "queue-list__item"}>
                <button type="button" className="queue-list__select" onClick={() => jumpTo(index)}>
                  <Image src={item.cover} width={56} height={56} alt="" />
                  <span><small>{current ? "Now playing" : index < currentIndex ? "Played" : "Up next"}</small><b>{item.title}</b><em>{item.artistName} · {item.album}</em></span>
                  <time>{item.durationLabel}</time>
                </button>
                {!current && <button type="button" className="queue-list__remove" onClick={() => removeFromQueue(index)} aria-label={`Remove ${item.title} from queue`}>×</button>}
              </li>
            );
          })}
        </ol>
      </section>

      <aside className="global-player" aria-label="PENREC music player">
        <Image src={currentItem.cover} width={52} height={52} alt="" />
        <div className="global-player__track">
          <small>Now previewing · {currentItem.catalogue}</small>
          <b>{currentItem.title}</b>
          <span>{currentItem.artistName} · {currentItem.album}</span>
        </div>
        <div className="global-player__transport">
          <div className="global-player__controls">
            <button type="button" onClick={previous} aria-label="Previous track" disabled={currentIndex === 0}>‹</button>
            <button type="button" className="global-player__play" onClick={() => void toggle()} aria-label={playing ? "Pause" : "Play"}>{playing ? "Ⅱ" : "▶"}</button>
            <button type="button" onClick={next} aria-label="Next track" disabled={currentIndex === queue.length - 1}>›</button>
          </div>
          <div className="global-player__timeline">
            <time>{formatTime(currentTime)}</time>
            <input type="range" min="0" max="100" step="0.1" value={progress} onChange={(event) => seek(Number(event.currentTarget.value))} aria-label="Seek through track" />
            <time>{formatTime(duration)}</time>
          </div>
        </div>
        <div className="global-player__volume">
          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>{muted ? "Muted" : "Volume"}</button>
          <input type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => setVolume(Number(event.currentTarget.value))} aria-label="Volume" aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)} percent`} />
        </div>
        <button className="global-player__queue" type="button" onClick={toggleQueue} aria-expanded={queueOpen} aria-controls="penrec-queue">Queue <span>{upcomingCount}</span></button>
      </aside>
    </>
  );
}
