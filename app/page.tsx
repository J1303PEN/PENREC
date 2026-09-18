import { HomepageContent } from "@/components/homepage-content";
import { getPublicCatalogueReleases } from "@/lib/catalogue-live";
export default async function HomePage() {
  const releases=await getPublicCatalogueReleases();
  return <HomepageContent releases={releases}/>;
}
