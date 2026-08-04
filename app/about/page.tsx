import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | PENREC Music Group",
  description: "Discover the story, values and creative vision behind PENREC Music Group — music without boundaries.",
};

const values = [
  ["01", "Authenticity", "Music with an identity, a point of view and something genuine to say."],
  ["02", "Creativity", "Bold ideas developed into complete musical and visual worlds."],
  ["03", "Quality", "Care, craft and attention to detail at every stage of a release."],
  ["04", "Inclusivity", "Different voices, stories, cultures and genres all belong here."],
  ["05", "Emotion", "Songs designed to be felt, remembered and carried into everyday life."],
  ["06", "Legacy", "A growing catalogue created to matter beyond the moment."],
];

const disciplines = [
  "Artist identity and development",
  "Songwriting and music production",
  "Album and catalogue creation",
  "Artwork and visual storytelling",
  "Digital releases and discovery",
  "Complete creative direction",
];

export default function AboutPage() {
  return (
    <main id="content" className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <p className="eyebrow">About PENREC Music Group</p>
        <h1>Music without <em>boundaries.</em></h1>
        <p>
          PENREC is an independent home for distinctive artists, memorable songs and
          music that refuses to be defined by a single genre.
        </p>
      </section>

      <section className={`shell ${styles.story}`}>
        <div>
          <p className="eyebrow">Our story</p>
          <h2>Built around a lifelong belief in the power of a great song.</h2>
        </div>
        <div className={styles.storyCopy}>
          <p>
            PENREC Music Group was created from a genuine love of music, songwriting,
            artist development and creative storytelling. It began with a simple idea:
            great music should not be restricted by genre, passing trends or traditional
            expectations.
          </p>
          <p>
            Every PENREC artist is developed with a distinct voice, visual identity and
            story. Every release is approached as a complete creative work—music,
            imagery and emotion moving together with purpose.
          </p>
          <blockquote>One label. All genres. Endless music.</blockquote>
        </div>
      </section>

      <section className={styles.work}>
        <div className={`shell ${styles.workGrid}`}>
          <div>
            <p className="eyebrow">What we do</p>
            <h2>From the first idea to the finished record.</h2>
            <p>
              PENREC brings the different parts of music-making together, giving each
              project the space, direction and identity it needs to become something
              complete.
            </p>
          </div>
          <ol>
            {disciplines.map((discipline, index) => (
              <li key={discipline}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{discipline}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`shell ${styles.sounds}`}>
        <p className="eyebrow">One label, many sounds</p>
        <h2>Different genres.<br /><em>One creative standard.</em></h2>
        <div className={styles.soundCopy}>
          <p>
            From sophisticated pop, elegant chanson and cinematic singer-songwriters to
            soul, country, rock and high-energy dance music, PENREC celebrates the
            possibilities that open up when creativity is allowed to move freely.
          </p>
          <p>
            The sound may change from one artist to the next, but the intention remains
            the same: strong melodies, meaningful storytelling and music with a lasting
            emotional connection.
          </p>
        </div>
        <div className={styles.genreLine} aria-label="PENREC genres">
          <span>Pop</span><span>Chanson</span><span>Dance</span><span>Soul</span>
          <span>Country</span><span>Rock</span><span>Cinematic</span>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="shell">
          <div className={styles.valuesHeading}>
            <div><p className="eyebrow">What guides us</p><h2>Our values.</h2></div>
            <p>The principles behind every artist, song and release bearing the PENREC name.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map(([number, title, copy]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`shell ${styles.catalogue}`}>
        <div>
          <p className="eyebrow">The PENREC catalogue</p>
          <h2>More than a collection of tracks.</h2>
        </div>
        <div>
          <p>
            Each PENREC release is developed as a body of work with its own identity,
            story and catalogue number. Albums are shaped to take listeners on a journey,
            with every song contributing to something larger than itself.
          </p>
          <Link className="text-link" href="/releases">Discover the music</Link>
        </div>
      </section>

      <section className={styles.founder}>
        <div className={`shell ${styles.founderGrid}`}>
          <div className={styles.monogram} aria-hidden="true">DP</div>
          <div>
            <p className="eyebrow">Founder &amp; creative director</p>
            <h2>Darren Penman</h2>
            <p>
              PENREC was founded by Darren Penman, bringing together a lifelong passion
              for music with a background in Music &amp; Media Management, artist
              development and creative storytelling.
            </p>
            <p>
              His vision for PENREC is both personal and expansive: to create a home
              where artists can have a clear identity, every album can tell a complete
              story and memorable music can come from anywhere.
            </p>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.closing}`}>
        <p className="eyebrow">Discover. Experience. Remember.</p>
        <h2>Real music.<br />Real artists.<br /><em>Real connection.</em></h2>
        <nav aria-label="Explore PENREC">
          <Link className="button button--gold" href="/artists">Explore our artists</Link>
          <Link className="button button--outline" href="/releases">Discover the music</Link>
          <Link className={styles.contactLink} href="/contact">Contact PENREC →</Link>
        </nav>
      </section>
    </main>
  );
}
