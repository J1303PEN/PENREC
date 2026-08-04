import type { Metadata } from "next";
import Link from "next/link";
import { submitContactEnquiry } from "./actions";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | PENREC Music Group",
  description: "Contact PENREC Music Group about artists, music, press, partnerships and general enquiries.",
};

type ContactPageProps = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const state = await searchParams;

  return (
    <main id="content" className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <p className="eyebrow">Contact PENREC</p>
        <h1>Let&apos;s <em>connect.</em></h1>
        <p className={styles.intro}>
          For artist, press, partnership and general enquiries, send us a message.
          Every enquiry reaches the PENREC team directly.
        </p>
      </section>

      <section className={`shell ${styles.contactGrid}`} aria-labelledby="contact-form-title">
        <aside className={styles.details}>
          <p className="eyebrow">Real music. Real connection.</p>
          <h2>Start a conversation.</h2>
          <p>
            Whether you want to discuss our artists, catalogue, collaborations or the
            wider work of PENREC Music Group, choose the closest enquiry type and tell
            us how we can help.
          </p>
          <dl>
            <div><dt>Artist &amp; music</dt><dd>Catalogue, releases and artist enquiries</dd></div>
            <div><dt>Press &amp; media</dt><dd>Features, interviews and media requests</dd></div>
            <div><dt>Partnerships</dt><dd>Creative and commercial opportunities</dd></div>
          </dl>
        </aside>

        <div className={styles.formPanel}>
          <p className="eyebrow">Send an enquiry</p>
          <h2 id="contact-form-title">How can we help?</h2>

          {state.sent && (
            <div className={`${styles.alert} ${styles.success}`} role="status">
              <strong>Thank you for getting in touch.</strong>
              <span>Your enquiry has been received by the PENREC team.</span>
            </div>
          )}
          {state.error && (
            <div className={`${styles.alert} ${styles.error}`} role="alert">
              <strong>We couldn&apos;t send your enquiry.</strong>
              <span>{state.error}</span>
            </div>
          )}

          <form className={styles.form} action={submitContactEnquiry}>
            <div className={styles.fieldRow}>
              <label>
                Your name
                <input name="name" type="text" autoComplete="name" maxLength={120} required />
              </label>
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" maxLength={254} required />
              </label>
            </div>
            <label>
              Enquiry type
              <select name="enquiry_type" defaultValue="general" required>
                <option value="general">General enquiry</option>
                <option value="artist-music">Artists &amp; music</option>
                <option value="press-media">Press &amp; media</option>
                <option value="partnership">Partnership</option>
                <option value="licensing">Licensing &amp; catalogue</option>
                <option value="website">Website support</option>
              </select>
            </label>
            <label>
              Subject
              <input name="subject" type="text" maxLength={160} required />
            </label>
            <label>
              Your message
              <textarea name="message" rows={7} minLength={10} maxLength={5000} required />
            </label>
            <label className={styles.honeypot} aria-hidden="true">
              Leave this field empty
              <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <div className={styles.submitRow}>
              <button className="button button--gold" type="submit">Send enquiry</button>
              <p>We&apos;ll only use your details to respond to this enquiry. See our <Link href="/privacy">Privacy Policy</Link>.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
