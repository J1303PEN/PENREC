export type LaunchArtist = {
  name: string;
  slug: string;
  album: string;
  cover: string;
  descriptor: string;
};

export const launchArtists: LaunchArtist[] = [
  {
    name: "Soreya",
    slug: "soreya",
    album: "I Like Who I Am",
    cover: "/images/covers/soreya-i-like-who-i-am.jpg",
    descriptor: "Modern soul · self-belief · cinematic pop",
  },
  {
    name: "Midnight Avenue",
    slug: "midnight-avenue",
    album: "The Night Is Ours",
    cover: "/images/covers/midnight-avenue-the-night-is-ours.jpg",
    descriptor: "Night-drive pop · glamour · atmosphere",
  },
  {
    name: "Marco Verturi",
    slug: "marco-verturi",
    album: "Ogni Giorni Conta",
    cover: "/images/covers/marco-verturi-ogni-giorni-conta.jpg",
    descriptor: "Italian pop · warmth · timeless songwriting",
  },
  {
    name: "The Ashfords",
    slug: "the-ashfords",
    album: "The Way We Feel",
    cover: "/images/covers/the-ashfords-the-way-we-feel.jpg",
    descriptor: "Soulful pop · harmony · classic romance",
  },
  {
    name: "Vierklang",
    slug: "vierklang",
    album: "Das Leben wartet",
    cover: "/images/covers/vierklang-das-leben-wartet.jpg",
    descriptor: "German pop · optimism · rich vocal colour",
  },
  {
    name: "Sophie Beaulieu",
    slug: "sophie-beaulieu",
    album: "Choisir La Vie",
    cover: "/images/covers/sophie-beaulieu-choisir-la-vie.jpg",
    descriptor: "Classical crossover · cinematic storytelling · symphonic pop",
  },
  {
    name: "Elias Rowan",
    slug: "elias-rowan",
    album: "The Lives We Passed",
    cover: "/images/covers/elias-rowan-the-lives-we-passed.jpg",
    descriptor: "British singer-songwriter · timeless storytelling · cinematic warmth",
  },
  {
    name: "Shelley Dante",
    slug: "shelley-dante",
    album: "Night Dancing",
    cover: "/images/covers/shelley-dante-night-dancing.svg",
    descriptor: "Dance-pop · disco glamour · emotional power",
  },
];

export const featuredReleases = launchArtists;
