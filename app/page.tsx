import { HomepageContent } from "@/components/homepage-content";
import { getPublicCatalogueReleases } from "@/lib/catalogue-live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const releases=await getPublicCatalogueReleases();
  return <HomepageContent releases={releases}/>;
}
