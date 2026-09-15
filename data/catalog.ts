export type Track = {
  title: string;
  duration: string;
  audio?: string;
};

export type Artist = {
  name: string;
  slug: string;
  album: string;
  cover: string;
  hero: string;
  profile: string;
  heroPosition?: string;
  profilePosition?: string;
  gallery: string[];
  descriptor: string;
  location: string;
  bio: string[];
  quote: string;
  tracks: Track[];
  preview: string;
  year: string;
  catalogue: string;
  releaseCredit?: string;
};

function trackSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function albumTracks(items: [string, string][], preview: string, artistSlug: string): Track[] {
  return items.map(([title, duration], index) => ({
    title,
    duration,
    audio: index === 0 ? preview : `/audio/${artistSlug}-${trackSlug(title)}.mp3`,
  }));
}

export const artists: Artist[] = [
  {
    name: "Soreya", slug: "soreya", album: "I Like Who I Am", cover: "/images/covers/soreya-i-like-who-i-am.jpg",
    hero: "/images/artists/soreya/soreya-hero.jpg", profile: "/images/artists/soreya/soreya-profile.jpg",
    heroPosition: "50% 18%", profilePosition: "50% 22%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/soreya/soreya-gallery-${n}.jpg`),
    descriptor: "Modern soul · self-belief · cinematic pop", location: "United Kingdom",
    bio: ["Soreya makes emotionally direct pop with a soulful centre: music about finding your footing, choosing yourself and moving forward without losing tenderness.", "Her debut PENREC collection, I Like Who I Am, unfolds as a complete statement of self-belief. Across seventeen songs, intimate verses open into widescreen choruses and a voice that always keeps the human detail close."],
    quote: "The strongest voice is the one you finally recognise as your own.", year: "2026", catalogue: "PNR001",
    preview: "/audio/soreya-i-wont-stand-still.mp3",
    tracks: albumTracks([["I Won't Stand Still","3:49"],["Leave It Where It Belongs","4:40"],["This Is Where I Stand","4:04"],["When You Can't Believe","4:14"],["I'm Finally Breathing","3:54"],["You Make It Easy","4:04"],["Not This Time","4:05"],["This Feels Like Home","3:53"],["I Trust Myself","4:05"],["Some People Stay","4:34"],["I Should Have Said It","3:37"],["I'm Looking Forward","4:33"],["I'd Tell Her This","3:42"],["I Like Who I Am","3:45"],["Days Like These","4:29"],["I Forgive Myself","3:45"],["Keep a Little Hope","3:49"]], "/audio/soreya-i-wont-stand-still.mp3", "soreya")
  },
  {
    name: "Ethan Blake", slug: "ethan-blake", album: "I'd Choose You Again", cover: "/images/covers/ethan-blake-id-choose-you-again.jpg",
    hero: "/images/artists/ethan-blake/ethan-blake-hero.jpg", profile: "/images/artists/ethan-blake/ethan-blake-profile.jpg",
    heroPosition: "50% 24%", profilePosition: "50% 20%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/ethan-blake/ethan-blake-gallery-${n}.jpg`),
    descriptor: "Country pop · lived-in storytelling · warm hooks", location: "Canada",
    bio: ["Ethan Blake writes country-pop with the detail left in: long roads, old mistakes, second chances and the kind of love that feels stronger because it has survived ordinary life.", "I'd Choose You Again is warm, direct and unshowy — a record built around story, melody and a voice that sounds most convincing when it is telling the truth."],
    quote: "A good song should feel like a story you somehow already knew.", year: "2026", catalogue: "PNR012",
    preview: "/audio/ethan-blake-id-choose-you-again.mp3",
    tracks: albumTracks([["I'd Choose You Again","4:04"],["Halfway Home","3:54"],["What We Kept","4:12"],["The Long Way Round","3:46"],["Good Enough For Me","3:58"],["Back When We Knew Everything","4:20"],["A Little More Time","3:49"],["Nothing Fancy","3:43"],["Still Here","4:08"],["If I Had To","3:57"],["The Things You Don't Say","4:11"],["Sunday Drive","3:51"],["Somewhere Between","4:03"],["You Were Right","3:55"],["One More Mile","4:06"],["Home Again","4:18"]], "/audio/ethan-blake-id-choose-you-again.mp3", "ethan-blake")
  },
  {
    name: "Fifth & Main", slug: "fifth-and-main", album: "Here We Are", cover: "/images/covers/fifth-and-main-here-we-are.jpg",
    hero: "/images/artists/fifth-and-main/fifth-and-main-hero.jpg", profile: "/images/artists/fifth-and-main/fifth-and-main-profile.jpg",
    heroPosition: "50% 34%", profilePosition: "50% 26%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/fifth-and-main/fifth-and-main-gallery-${n}.jpg`),
    descriptor: "Five voices · Swedish-pop precision · grown-up harmony", location: "United Kingdom",
    bio: ["Fifth & Main are five distinct male voices built around the discipline of classic Swedish studio-pop: immaculate hooks, real harmonies and arrangements that know exactly when to lift.", "Here We Are introduces the group as a modern manband rather than a nostalgia exercise. Leads rotate, personalities stay audible and the choruses only work because all five voices are genuinely there."],
    quote: "Five voices. One chorus. No passengers.", year: "2026", catalogue: "PNR016",
    preview: "/audio/fifth-and-main-here-we-are.mp3",
    tracks: albumTracks([["Here We Are","4:01"],["Say It Like You Mean It","3:47"],["What You Came For","3:54"],["No Second Guess","4:08"],["Better With You","3:39"],["This Time Around","4:14"],["Something Real","3:52"],["All The Way","4:05"],["Right Where We Are","3:58"],["One More Chance","4:11"],["The Best Part","3:45"],["Stay A Little Longer","4:09"],["Everything Changes","3:56"],["Back To Us","4:17"],["Only You Know","3:49"],["Where We Belong","4:22"]], "/audio/fifth-and-main-here-we-are.mp3", "fifth-and-main")
  },
  {
    name: "Luca Moretti", slug: "luca-moretti", album: "Sotto Il Sole", cover: "/images/covers/luca-moretti-sotto-il-sole.jpg",
    hero: "/images/artists/luca-moretti/luca-moretti-hero.jpg", profile: "/images/artists/luca-moretti/luca-moretti-profile.jpg",
    heroPosition: "50% 22%", profilePosition: "50% 18%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/luca-moretti/luca-moretti-gallery-${n}.jpg`),
    descriptor: "Mediterranean pop · romance · widescreen melody", location: "Italy",
    bio: ["Luca Moretti makes Mediterranean pop with a cinematic sweep: romantic songs, sunlit arrangements and melodies designed to feel immediate even before the words have settled.", "Sotto Il Sole moves between intimacy and scale, keeping the vocal close while the production opens around it."],
    quote: "Romance sounds better when the horizon is wide.", year: "2026", catalogue: "PNR018",
    preview: "/audio/luca-moretti-sotto-il-sole.mp3",
    tracks: albumTracks([["Sotto Il Sole","4:03"],["Dimmi Di Sì","3:51"],["Una Notte Ancora","4:14"],["Dove Vai","3:48"],["Solo Con Te","4:05"],["Il Mare Tra Noi","4:18"],["Come Prima","3:56"],["Senza Paura","4:09"],["Questa Vita","3:44"],["Resta Qui","4:11"],["Fino A Domani","3:58"],["La Strada Di Casa","4:16"],["Non È Finita","3:52"],["Un'Altra Estate","4:07"],["Per Sempre Forse","4:21"],["Buonanotte Amore","4:26"]], "/audio/luca-moretti-sotto-il-sole.mp3", "luca-moretti")
  },
  {
    name: "Nikos Andros", slug: "nikos-andros", album: "Νέες Αρχές", cover: "/images/covers/nikos-andros-nees-arches.jpg",
    hero: "/images/artists/nikos-andros/nikos-andros-hero.jpg", profile: "/images/artists/nikos-andros/nikos-andros-profile.jpg",
    heroPosition: "50% 26%", profilePosition: "50% 20%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/nikos-andros/nikos-andros-gallery-${n}.jpg`),
    descriptor: "Greek pop · modern laïko · emotional scale", location: "Greece",
    bio: ["Nikos Andros brings the emotional directness of modern Greek pop into a polished contemporary setting, balancing laïko colour with widescreen production.", "Νέες Αρχές is about beginnings after endings: romantic, resilient and built around melodies that carry the feeling before translation is ever needed."],
    quote: "Every ending leaves room for a new beginning.", year: "2026", catalogue: "PNR020",
    preview: "/audio/nikos-andros-nees-arches.mp3",
    tracks: albumTracks([["Νέες Αρχές","4:08"],["Μείνε Λίγο","3:55"],["Ό,τι Μένει","4:16"],["Πάλι Εδώ","3:49"],["Χωρίς Εσένα","4:04"],["Μια Ακόμα Νύχτα","4:21"],["Δεν Φοβάμαι","3:58"],["Πες Μου","4:11"],["Σαν Πρώτη Φορά","3:53"],["Δίπλα Μου","4:07"],["Όλα Αλλάζουν","3:46"],["Μέχρι Το Πρωί","4:18"],["Κάπου Θα Σε Βρω","4:02"],["Μην Φεύγεις","4:12"],["Από Την Αρχή","4:25"],["Καληνύχτα","4:29"]], "/audio/nikos-andros-nees-arches.mp3", "nikos-andros")
  }
];

export function getArtist(slug: string) { return artists.find(a => a.slug === slug); }
