"use client";

import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./book-reader.module.css";

type ReaderProps = { title: string; totalPages: number; assets: string; pdf: string; downloadName: string };
const LoadedPages = createContext<Set<number>>(new Set());

type FlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (page: number) => void;
  getOrientation: () => string;
};
type BookHandle = { pageFlip: () => FlipApi };

const BookPage = forwardRef<HTMLDivElement, { number: number; assets: string; title: string; totalPages: number }>(
  function BookPage({ number, assets, title, totalPages }, ref) {
    const load = useContext(LoadedPages).has(number - 1);
    return (
      <div ref={ref} className={styles.leaf} data-density={number === 1 || number === totalPages ? "hard" : "soft"}>
        {load && (
          // The source PDF contains full-page artwork, including its text.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${assets}/pages/${String(number).padStart(2, "0")}.webp`}
            alt={`${title}, page ${number}`}
            width={1240} height={1748} draggable={false} />
        )}
      </div>
    );
  },
);

export function BookReader({ title, totalPages, assets, pdf, downloadName }: ReaderProps) {
  const book = useRef<BookHandle>(null);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [portrait, setPortrait] = useState(true);
  const [ready, setReady] = useState(false);
  const [turning, setTurning] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0, 1, 2, 3]));

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    setMounted(true);
    return () => preference.removeEventListener("change", update);
  }, []);

  function preload(index: number) {
    setLoaded(previous => {
      const next = new Set(previous);
      for (let i = Math.max(0, index - 3); i <= Math.min(totalPages - 1, index + 4); i++) next.add(i);
      return next;
    });
  }

  function navigate(direction: "next" | "previous") {
    if (!ready || turning) return;
    if (reduceMotion) {
      const next = direction === "next" ? (page === 0 || portrait ? page + 1 : page + 2) : (portrait ? page - 1 : page <= 2 ? 0 : page - 2);
      book.current?.pageFlip().turnToPage(Math.max(0, Math.min(totalPages - 1, next)));
    } else if (direction === "next") book.current?.pageFlip().flipNext();
    else book.current?.pageFlip().flipPrev();
  }

  const lastVisible = !portrait && page > 0 && page < totalPages - 1 ? page + 2 : page + 1;
  const atEnd = lastVisible >= totalPages;

  return (
    <section className={styles.reader} aria-label="Book reader"
      tabIndex={0} onKeyDown={event => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(event.key === "ArrowRight" ? "next" : "previous");
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          const target = event.key === "Home" ? 0 : totalPages - 1;
          preload(target);
          book.current?.pageFlip().turnToPage(target);
        }
      }}>
      <p className={styles.hint}>{reduceMotion ? "Use the arrows or choose a page to read." : "Turn the corners, swipe, or use the arrows to read."}</p>
      <LoadedPages.Provider value={loaded}>
      <div className={styles.stage}>
        {mounted ? (
          <HTMLFlipBook ref={book} width={420} height={592} size="stretch"
            minWidth={260} maxWidth={480} minHeight={367} maxHeight={677}
            startPage={0} drawShadow={!reduceMotion} flippingTime={reduceMotion ? 1 : 650}
            usePortrait startZIndex={0} autoSize maxShadowOpacity={0.25} showCover
            mobileScrollSupport={false} clickEventForward useMouseEvents={!reduceMotion}
            swipeDistance={30} showPageCorners={!reduceMotion} disableFlipByClick={false}
            className={styles.book} style={{}} renderOnlyPageLengthChange
            onInit={() => { setReady(true); setPortrait(book.current?.pageFlip().getOrientation() === "portrait"); }}
            onFlip={(event: { data: number }) => { setPage(event.data); preload(event.data); }}
            onChangeOrientation={(event: { data: string }) => setPortrait(event.data === "portrait")}
            onChangeState={(event: { data: string }) => setTurning(event.data === "flipping")}>
            {Array.from({ length: totalPages }, (_, index) => (
              <BookPage key={index} number={index + 1} assets={assets} title={title} totalPages={totalPages} />
            ))}
          </HTMLFlipBook>
        ) : <p role="status">Opening your book…</p>}
      </div>
      </LoadedPages.Provider>
      <div className={styles.controls}>
        <button type="button" onClick={() => navigate("previous")} disabled={!ready || turning || page === 0} aria-label="Previous page">← Previous</button>
        <span role="status" aria-live="polite" aria-atomic="true">
          {lastVisible > page + 1 ? `Pages ${page + 1}–${lastVisible}` : `Page ${page + 1}`} of {totalPages}
        </span>
        <button type="button" onClick={() => navigate("next")} disabled={!ready || turning || atEnd} aria-label="Next page">Next →</button>
      </div>
      <div className={styles.tools}>
        <label>Go to page <select value={page} disabled={!ready || turning} onChange={event => {
          const target = Number(event.target.value);
          preload(target);
          book.current?.pageFlip().turnToPage(target);
        }}>{Array.from({ length: totalPages }, (_, i) => <option key={i} value={i}>{i + 1}</option>)}</select></label>
        <button type="button" onClick={() => setZoom(!zoom)} aria-expanded={zoom}>{zoom ? "Close larger page" : "Enlarge current page"}</button>
        <a href={pdf} download={downloadName}>Download PDF</a>
      </div>
      {zoom && <div className={styles.enlarged}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${assets}/pages/${String(page + 1).padStart(2, "0")}.webp`}
          alt={`Enlarged page ${page + 1}`} width={1240} height={1748} />
      </div>}
      <noscript><p>To use the page-turning reader, enable JavaScript or <a href={pdf}>read the PDF</a>.</p></noscript>
    </section>
  );
}
