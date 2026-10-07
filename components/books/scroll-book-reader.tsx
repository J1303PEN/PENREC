"use client";

import { useState } from "react";
import styles from "./scroll-book-reader.module.css";

type Props = { title: string; pages: number; assets: string; pdf: string; downloadName: string; landscape?: boolean };
export function ScrollBookReader({ title, pages, assets, pdf, downloadName, landscape = false }: Props) {
  const [printing, setPrinting] = useState(false);
  const [error, setError] = useState("");
  async function printBook() {
    setPrinting(true); setError("");
    try {
      const frame = document.createElement("iframe");
      frame.title = `Print ${title}`;
      frame.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-10000px;";
      document.body.appendChild(frame);
      const doc = frame.contentDocument;
      if (!doc || !frame.contentWindow) { frame.remove(); throw new Error("Print window unavailable"); }
      const css = doc.createElement("style");
      css.textContent = `@page { size: A4 ${landscape ? "landscape" : "portrait"}; margin: 0; } body { margin: 0; } img { display:block; width:${landscape ? "297" : "210"}mm; height:${landscape ? "210" : "297"}mm; object-fit:contain; break-after:page; } img:last-child { break-after:auto; }`;
      doc.head.appendChild(css); doc.title = title;
      const images = Array.from({ length: pages }, (_, i) => {
        const image = doc.createElement("img");
        image.src = `${assets}/pages/${String(i + 1).padStart(2, "0")}.webp`;
        image.alt = `${title}, page ${i + 1}`;
        doc.body.appendChild(image); return image;
      });
      try { await Promise.all(images.map(image => image.decode())); }
      catch (error) { frame.remove(); throw error; }
      frame.contentWindow.addEventListener("afterprint", () => frame.remove(), { once: true });
      frame.contentWindow.focus(); frame.contentWindow.print();
    } catch { setError("A page could not load. Please try again, or download the PDF to print."); }
    finally { setPrinting(false); }
  }
  return <div className={`${styles.reader} ${landscape ? styles.landscape : ""}`}>
    <div className={styles.controls}>
      <a href={pdf} download={downloadName}>Download PDF</a>
      <button type="button" onClick={printBook} disabled={printing}>{printing ? "Preparing pages…" : "Print"}</button>
      <label>Go to page <select defaultValue="1" onChange={event => document.getElementById(`colour-page-${event.target.value}`)?.scrollIntoView({ behavior: "auto", block: "start" })}>
        {Array.from({ length: pages }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
      </select></label>
    </div>
    <p>Scroll to explore all {pages} pages. Download the PDF or print the book to colour it on paper.</p>
    {error && <p role="alert">{error}</p>}
    <div className={styles.pages}>
      {Array.from({ length: pages }, (_, i) => <figure id={`colour-page-${i + 1}`} key={i} className={styles.sheet}>
        {/* Full PDF pages include their artwork and page text. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${assets}/pages/${String(i + 1).padStart(2, "0")}.webp`} alt={`${title}, page ${i + 1}`} width={landscape ? 1754 : 1240} height={landscape ? 1240 : 1754} loading={i === 0 ? "eager" : "lazy"} />
        <figcaption>Page {i + 1} of {pages}</figcaption>
      </figure>)}
    </div>
  </div>;
}
