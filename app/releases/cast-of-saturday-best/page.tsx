import ReleasePage from "../[slug]/page";
export const dynamic = "force-dynamic";
export default function SaturdayBestReleasePage() { return ReleasePage({params: Promise.resolve({slug: "cast-of-saturday-best"}), searchParams: Promise.resolve({})}); }
