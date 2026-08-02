"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ArtistGalleryProps = {
  images: string[];
  artistName: string;
};

type ImagePresentation = {
  position: string;
  fit?: "cover" | "contain";
};

const defaultPresentation: ImagePresentation = { position: "50% 24%", fit: "cover" };

/*
 * Every thumbnail is art-directed rather than relying on a generic centre crop.
 * Portraits that do not crop cleanly use contain, while the lightbox always shows
 * the complete original image.
 */
const imagePresentations: Record<string, ImagePresentation> = {
  "/images/artists/soreya/soreya-gallery-1.jpg": { position: "50% 23%" },
  "/images/artists/soreya/soreya-gallery-2.jpg": { position: "50% 18%" },
  "/images/artists/soreya/soreya-gallery-3.jpg": { position: "50% 18%", fit: "contain" },
  "/images/artists/soreya/soreya-gallery-4.jpg": { position: "50% 19%" },
  "/images/artists/soreya/soreya-gallery-5.jpg": { position: "50% 19%" },

  "/images/artists/marco-verturi/marco-verturi-gallery-1.jpg": { position: "50% 18%" },
  "/images/artists/marco-verturi/marco-verturi-gallery-2.jpg": { position: "50% 13%", fit: "contain" },
  "/images/artists/marco-verturi/marco-verturi-gallery-3.jpg": { position: "50% 29%" },
  "/images/artists/marco-verturi/marco-verturi-gallery-4.jpg": { position: "50% 15%" },
  "/images/artists/marco-verturi/marco-verturi-gallery-5.jpg": { position: "50% 24%" },
  "/images/artists/marco-verturi/marco-verturi-gallery-6.jpg": { position: "50% 15%" },
  "/images/artists/marco-verturi/marco-verturi-gallery-7.jpg": { position: "50% 23%" },

  "/images/artists/midnight-avenue/midnight-avenue-gallery-1.jpg": { position: "50% 18%" },
  "/images/artists/midnight-avenue/midnight-avenue-gallery-2.jpg": { position: "50% 25%" },
  "/images/artists/midnight-avenue/midnight-avenue-gallery-3.jpg": { position: "50% 26%" },
  "/images/artists/midnight-avenue/midnight-avenue-gallery-4.jpg": { position: "50% 26%" },
  "/images/artists/midnight-avenue/midnight-avenue-gallery-5.jpg": { position: "50% 20%" },

  "/images/artists/the-ashfords/the-ashfords-gallery-1.jpg": { position: "50% 28%" },
  "/images/artists/the-ashfords/the-ashfords-gallery-2.jpg": { position: "50% 27%" },
  "/images/artists/the-ashfords/the-ashfords-gallery-3.jpg": { position: "50% 24%" },
  "/images/artists/the-ashfords/the-ashfords-gallery-4.jpg": { position: "50% 25%" },
  "/images/artists/the-ashfords/the-ashfords-gallery-5.jpg": { position: "50% 24%" },

  "/images/artists/vierklang/vierklang-gallery-1.jpg": { position: "50% 23%" },
  "/images/artists/vierklang/vierklang-gallery-2.jpg": { position: "50% 22%" },
  "/images/artists/vierklang/vierklang-gallery-3.jpg": { position: "50% 23%" },
  "/images/artists/vierklang/vierklang-gallery-4.jpg": { position: "50% 22%" },
  "/images/artists/vierklang/vierklang-gallery-5.jpg": { position: "50% 23%" },
};

export function ArtistGallery({ images, artistName }: ArtistGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const presentations = useMemo(
    () => images.map((src) => imagePresentations[src] ?? defaultPresentation),
    [images],
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => {
    setActiveIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
  }, [images.length]);
  const next = useCallback(() => {
    setActiveIndex((current) => current === null ? null : (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, close, next, previous]);

  if (!images.length) return null;

  return (
    <>
      <div className="editorial-gallery" aria-label={`${artistName} image gallery`}>
        {images.map((src, index) => {
          const presentation = presentations[index];
          return (
            <button
              className={`editorial-gallery__item editorial-gallery__item--${index + 1} editorial-gallery__item--fit-${presentation.fit ?? "cover"}`}
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${artistName} gallery image ${index + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${artistName} gallery image ${index + 1}`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 66vw"
                loading="lazy"
                style={{ objectPosition: presentation.position }}
              />
              <span className="editorial-gallery__shade" aria-hidden="true" />
              <span className="editorial-gallery__open" aria-hidden="true">
                <span>View full image</span>
                <b>↗</b>
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${artistName} gallery viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
            const distance = endX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(distance) < 55) return;
            if (distance > 0) previous(); else next();
          }}
        >
          <div className="lightbox__topbar">
            <p>{artistName} <span>{activeIndex + 1} / {images.length}</span></p>
            <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close gallery">Close ×</button>
          </div>

          <button className="lightbox__arrow lightbox__arrow--previous" type="button" onClick={previous} aria-label="Previous image">←</button>

          <div className="lightbox__image-wrap">
            <Image
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt={`${artistName} gallery image ${activeIndex + 1}, full view`}
              fill
              priority
              sizes="100vw"
            />
          </div>

          <button className="lightbox__arrow lightbox__arrow--next" type="button" onClick={next} aria-label="Next image">→</button>
          <p className="lightbox__hint">Use arrow keys or swipe to browse · Esc to close</p>
        </div>
      )}
    </>
  );
}
