import { NewsFeed } from "@/components/news-feed";

export const metadata = { title: "Latest News | PENREC Music Group", description: "The latest releases, artist updates and stories from PENREC Music Group." };

export default function NewsPage(){
  return <main id="content" className="shell inside news-page"><header className="news-page__heading"><p className="eyebrow">PENREC Journal</p><h1>Latest News</h1><p>New releases, artist stories and announcements from across the label.</p></header><NewsFeed /></main>;
}
