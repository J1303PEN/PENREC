import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Integrations | PENREC Studio" };

type Integration = {
  name: string;
  description: string;
  variables: string[];
};

const integrations: Integration[] = [
  {
    name: "Stripe",
    description: "Payments, checkout and payment webhooks.",
    variables: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
  },
  {
    name: "Cloudflare R2",
    description: "Private digital-release storage and customer downloads.",
    variables: ["R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_ENDPOINT", "R2_BUCKET_NAME", "R2_PUBLIC_URL"],
  },
  {
    name: "Gelato",
    description: "Print-on-demand fulfilment for eligible PENREC products.",
    variables: ["GELATO_API_KEY"],
  },
  {
    name: "Printful",
    description: "Print-on-demand fulfilment and product routing.",
    variables: ["PRINTFUL_API_TOKEN"],
  },
];

function configured(variables: string[]) {
  return variables.every((name) => Boolean(process.env[name]?.trim()));
}

export default async function IntegrationsPage() {
  await requireAdmin();

  return (
    <main id="content" className="admin-page shell inside">
      <header className="account-hero">
        <div>
          <p className="eyebrow">PENREC Studio</p>
          <h1>Integrations</h1>
          <p>Connected services used by PENREC commerce and fulfilment.</p>
        </div>
        <Link className="button button--outline" href="/admin">Back to Studio</Link>
      </header>

      <section className="admin-grid">
        {integrations.map((integration) => {
          const ready = configured(integration.variables);
          return (
            <article key={integration.name}>
              <span>{ready ? "Configured" : "Configuration required"}</span>
              <h2>{integration.name}</h2>
              <p>{integration.description}</p>
              <p>{ready ? "Production credentials are available to the server." : "The required production environment variables are not all present."}</p>
            </article>
          );
        })}
      </section>

      <section className="account-empty">
        <h2>Credentials stay outside GitHub</h2>
        <p>API keys and secrets are read from the deployment environment only. PENREC never displays their values in the Studio.</p>
      </section>
    </main>
  );
}
