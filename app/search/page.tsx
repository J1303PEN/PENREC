import { CatalogueSearch } from "@/components/catalogue-search";

export default function SearchPage() {
  return <main id="content" className="inside catalogue-search-page"><div className="shell"><p className="eyebrow">Explore PENREC</p><h1>Search</h1><p className="listing-page__intro">Find an artist, album, track or catalogue number across the PENREC collection.</p><CatalogueSearch /></div></main>;
}
