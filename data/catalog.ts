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
    name: "Midnight Avenue", slug: "midnight-avenue", album: "The Night Is Ours", cover: "/images/covers/midnight-avenue-the-night-is-ours.jpg",
    hero: "/images/artists/midnight-avenue/midnight-avenue-hero.jpg", profile: "/images/artists/midnight-avenue/midnight-avenue-profile.jpg",
    heroPosition: "50% 28%", profilePosition: "50% 40%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/midnight-avenue/midnight-avenue-gallery-${n}.jpg`),
    descriptor: "Night-drive pop · glamour · atmosphere", location: "International",
    bio: ["Midnight Avenue live where city light meets open road: polished pop, after-dark romance and the possibility that the best part of the night has not happened yet.", "The Night Is Ours travels through Havana, Marbella and Barcelona without losing its emotional compass. It is cinematic escapism built from melodies designed to stay long after sunrise."],
    quote: "Some songs belong to a place. These belong to the night.", year: "2026", catalogue: "PNR002",
    preview: "/audio/midnight-avenue.mp3",
    tracks: albumTracks([["Midnight Avenue","4:27"],["Caribbean Moonlight","4:38"],["Fire in Havana","4:03"],["One Night in Marbella","4:28"],["Barcelona Blue","4:18"],["Lady Roulette","4:04"],["Raise Your Glass","3:45"],["Crystal Eyes","5:10"],["Turn Up the Night","3:40"],["Play That Song Again","3:28"],["Stay Until Sunrise","3:50"],["Last Train Home","3:33"],["Behind the Mask","3:20"],["By Chance","4:05"],["If You Come Back Tonight","4:37"],["Don't Say Goodbye","4:00"],["One More Memory","4:00"],["When Tomorrow Comes","4:00"]], "/audio/midnight-avenue.mp3", "midnight-avenue")
  },
  {
    name: "Marco Verturi", slug: "marco-verturi", album: "Ogni Giorni Conta", cover: "/images/covers/marco-verturi-ogni-giorni-conta.jpg",
    hero: "/images/artists/marco-verturi/marco-verturi-hero.jpg", profile: "/images/artists/marco-verturi/marc-verturi-profile.jpg",
    heroPosition: "50% 16%", profilePosition: "50% 22%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/marco-verturi/marco-verturi-gallery-${n}.jpg`),
    descriptor: "Italian pop · warmth · timeless songwriting", location: "Italy",
    bio: ["Marco Verturi brings warmth, clarity and classic melodic instinct to contemporary Italian pop. His songs notice the small decisions that quietly change a life.", "Ogni Giorni Conta is a record about time, second chances and choosing to be present. Its arrangements are elegant rather than excessive, leaving room for language, melody and character."],
    quote: "Every day counts, especially the ordinary ones.", year: "2026", catalogue: "PNR003",
    preview: "/audio/marco-finche-ce-domani.mp3",
    tracks: albumTracks([["Finché C'è Domani","2:59"],["Ci Sei Ancora","3:18"],["Più Lontano Di Così","3:25"],["Il Tempo Di Guardare","3:04"],["Perdonare Me","3:01"],["Oltre La Prossima Curva","3:05"],["Quello Che Non Vedi","3:20"],["Vale Di Più","3:26"],["Questa Volta Scelgo Me","3:09"],["L'Uomo Che Divento","3:16"],["Prima Delle Otto","3:03"],["Il Rumore Che Manca","3:18"],["Il Più Fortunato","3:44"],["Le Vite Degli Altri","2:58"],["La Promessa Più Vera","2:56"],["Abbastanza Così","3:13"],["Un'Altra Occasione","3:05"],["Questa È La Mia Vita","3:04"]], "/audio/marco-finche-ce-domani.mp3", "marco-verturi")
  },
  {
    name: "The Ashfords", slug: "the-ashfords", album: "The Way We Feel", cover: "/images/covers/the-ashfords-the-way-we-feel.jpg",
    hero: "/images/artists/the-ashfords/the-ashfords-hero.jpg", profile: "/images/artists/the-ashfords/the-ashfords-profile.jpg",
    heroPosition: "50% 8%", profilePosition: "50% 24%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/the-ashfords/the-ashfords-gallery-${n}.jpg`),
    descriptor: "Soulful pop · harmony · classic romance", location: "United Kingdom",
    bio: ["The Ashfords pair close harmony with an instinct for timeless love songs. Their sound feels familiar in the best possible way, while the emotional detail remains firmly in the present.", "The Way We Feel is generous, melodic and unguarded: sixteen songs about commitment, anticipation, memory and the quiet relief of finding your way back to someone."],
    quote: "Harmony is not just how voices meet. It is how people do.", year: "2026", catalogue: "PNR004",
    preview: "/audio/ashfords-you-never-had-to-ask.mp3",
    tracks: albumTracks([["You Never Had to Ask","4:23"],["I Can't Wait Another Day","4:13"],["Every Time You Smile","4:24"],["If You Still Want My Love","4:25"],["Love's Got Other Plans","4:30"],["Take Me Back To Your Heart","4:38"],["Nothing Feels Better Than This","4:27"],["It Was You All Along","4:18"],["She's Looking My Way","4:17"],["Best Part of Loving You","4:38"],["Worth the Wait","4:43"],["The Way We Feel","4:39"],["Just Like the First Time","4:31"],["Every Day with You","4:10"],["All We Need Is Tonight","4:19"],["We'll Always Find Our Way","4:30"]], "/audio/ashfords-you-never-had-to-ask.mp3", "the-ashfords")
  },
  {
    name: "Vierklang", slug: "vierklang", album: "Das Leben wartet", cover: "/images/covers/vierklang-das-leben-wartet.jpg",
    hero: "/images/artists/vierklang/vierklang-hero.jpg", profile: "/images/artists/vierklang/vierklang-profile.jpg",
    heroPosition: "50% 18%", profilePosition: "50% 28%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/vierklang/vierklang-gallery-${n}.jpg`),
    descriptor: "German pop · optimism · rich vocal colour", location: "Germany",
    bio: ["Vierklang turn four distinct voices into one uplifting whole. Their music is grounded in friendship, gratitude and the courage to begin again.", "Das Leben wartet moves between intimate reflection and communal choruses. The album's optimism is earned rather than decorative: it looks backward honestly, then chooses tomorrow."],
    quote: "Life is waiting — not somewhere else, but in the next step.", year: "2026", catalogue: "PNR005",
    preview: "/audio/vierklang-heute-fangt-das-leben-an.mp3",
    tracks: albumTracks([["Heute fängt das Leben an","3:30"],["Manchmal reicht ein Augenblick","3:25"],["Mit dir wird alles leicht","3:19"],["Hier schlägt mein Herz noch immer","3:38"],["Irgendwann warst du mein Zuhause","3:37"],["Diese Nacht gehört uns zwei","3:25"],["Ohne dich fehlt einfach etwas","3:14"],["Danke, dass du da gewesen bist","4:19"],["Trau dich einfach loszugehen","3:37"],["Es ist nie zu spät für morgen","4:20"],["Das Glück war immer hier","3:30"],["Du hast an mich geglaubt","3:48"],["Solang wir zusammen geh'n","3:25"],["Mit jedem Jahr ein bisschen mehr","3:23"],["Auf uns und jeden neuen Morgen","3:32"]], "/audio/vierklang-heute-fangt-das-leben-an.mp3", "vierklang")
  },
  {
    name: "Sophie Beaulieu", slug: "sophie-beaulieu", album: "Choisir La Vie", cover: "/images/covers/sophie-beaulieu-choisir-la-vie.jpg",
    hero: "/images/artists/sophie-beaulieu/sophie-beaulieu-hero.jpg", profile: "/images/artists/sophie-beaulieu/sophie-beaulieu-profile.jpg",
    heroPosition: "50% 28%", profilePosition: "50% 30%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/sophie-beaulieu/sophie-beaulieu-gallery-${n}.jpg`),
    descriptor: "Classical crossover · cinematic storytelling · symphonic pop", location: "Canada",
    bio: [
      "Some voices fill a room. Others stop time.",
      "Sophie Beaulieu belongs to the rare group of artists whose performances are built as much on emotion as technical brilliance. With a rich, expressive soprano capable of moving effortlessly from intimate piano ballads to soaring orchestral anthems, she has become known for recordings that combine classical elegance with contemporary cinematic storytelling.",
      "Born in Quebec, Canada, Sophie discovered music at an early age, studying classical voice before developing a style that refused to be confined to a single genre. Drawing inspiration from many great French-speaking Canadian artists, classical crossover, film scores and symphonic pop, she created a signature sound that is both timeless and unmistakably modern.",
      "On stage, Sophie is renowned for her striking visual presence. Whether performing beneath a single spotlight in an intimate theatre or accompanied by a full symphony orchestra in grand concert halls, every appearance is carefully crafted as a theatrical experience. Her performances balance vulnerability with quiet strength, allowing every lyric to feel personal while every crescendo carries cinematic scale.",
      "Her debut album, Choisir La Vie (Choose Life), introduced audiences to an artist unafraid of exploring hope, resilience, love and self-discovery. Rather than relying on dramatic spectacle alone, the album established Sophie's reputation for heartfelt interpretation and beautifully orchestrated arrangements.",
      "Away from the stage, Sophie remains deeply committed to the craft of songwriting and musical interpretation, believing that every performance should leave an audience feeling something long after the final note has faded. This philosophy has earned her a loyal international following who appreciate music that values substance as much as spectacle.",
      "Graceful, sophisticated and emotionally captivating, Sophie Beaulieu continues to redefine modern classical crossover—proving that true elegance never goes out of style."
    ],
    quote: "True elegance never goes out of style.", year: "2026", catalogue: "PNR006",
    preview: "/audio/sophie-beaulieu-je-choisis-la-vie.mp3",
    tracks: albumTracks([["Je choisis la vie","3:38"],["Plus Haut Que La Peur","3:31"],["Si Tu Me Voyais","3:48"],["Plus Jamais À Genoux","3:12"],["Jusqu'Au Dernier Souffle","3:57"],["Quand Tout S'Éteint","3:35"],["Je N'Attends Plus Demain","3:05"],["Ce Que Je Laisse Derrière","3:39"],["Tu Es Arrivé Sans Bruit","3:22"],["J'Apprends À Y Croire","3:42"],["Je Tiendrai La Lumière","3:05"],["Je N'Ai Plus Peur D'Aimer","4:19"],["Merci À Celle Que J'Étais","3:50"],["Si Mon Histoire Peut T'Aider","3:15"],["Tout Commence Ici","3:44"]], "/audio/sophie-beaulieu-je-choisis-la-vie.mp3", "sophie-beaulieu")
  },
  {
    name: "Elias Rowan", slug: "elias-rowan", album: "The Lives We Passed", cover: "/images/covers/elias-rowan-the-lives-we-passed.jpg",
    hero: "/images/artists/elias-rowan/elias-rowan-hero.jpg", profile: "/images/artists/elias-rowan/elias-rowan-profile.jpg",
    heroPosition: "50% 42%", profilePosition: "50% 32%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/elias-rowan/elias-rowan-gallery-${n}.jpg`),
    descriptor: "British singer-songwriter · timeless storytelling · cinematic warmth", location: "United Kingdom",
    bio: [
      "Some voices don't need to shout to be heard.",
      "Elias Rowan is a British singer-songwriter whose music is built on honesty, craftsmanship and timeless storytelling. With a rich, expressive voice and songs that linger long after the final note, he writes about life's turning points—the people we meet, the roads we choose and the memories that quietly shape who we become.",
      "Drawing inspiration from Britain's rich tradition of singer-songwriters while embracing a contemporary, cinematic sound, Elias blends acoustic guitars, piano, warm strings and understated production into songs that feel both classic and modern. His performances are thoughtful rather than theatrical, allowing every lyric to take centre stage.",
      "His debut album, The Lives We Passed, is a collection of beautifully observed stories about chance encounters, lost opportunities, enduring love and the unexpected moments that change everything. Rather than dwelling on regret, the album celebrates the idea that every experience—whether fleeting or lifelong—leaves its mark and helps define the person we become.",
      "Away from the studio, Elias is known for his understated style and unmistakably British character. Equally at home in a city loft, a quiet coastal town or a countryside pub, he finds inspiration in everyday conversations and overlooked moments, believing that the best songs are hidden within ordinary lives.",
      "What sets Elias apart is his ability to make deeply personal stories feel universal. His lyrics are filled with vivid detail, emotional warmth and quiet optimism, inviting listeners to see their own memories reflected in every verse. His music doesn't rely on grand gestures—it earns its place through authenticity, melody and emotional truth.",
      "Whether performing with a full band or stripped back with an acoustic guitar, Elias creates an atmosphere where every audience member feels part of the story. His concerts are intimate, heartfelt experiences that celebrate connection, reflection and hope.",
      "With The Lives We Passed, Elias Rowan introduces himself as one of Britain's most compelling contemporary singer-songwriters—an artist whose music reminds us that life isn't measured only by the paths we take, but also by the people, places and moments that quietly pass through it and stay with us forever."
    ],
    quote: "Some voices don't need to shout to be heard.", year: "2026", catalogue: "PNR007",
    preview: "/audio/elias-rowan-the-book-i-never-came-for.mp3",
    tracks: albumTracks([["The Book I Never Came For","3:49"],["The Road I've Never Travelled","3:56"],["I Should Have Told You Long Ago","3:30"],["Every Tuesday","5:20"],["Love Learns New Voices","3:38"],["Before Closing Time","5:23"],["The Last Projectionist","4:44"],["Seven Minutes Fast","4:20"],["The Empty Place Beside Him","5:21"],["The Christmas Lantern","4:54"],["The Wednesday Club","4:03"],["The Piano Nobody Wanted","4:21"],["Every Thursday","4:49"],["The Glove Maker","4:49"],["The Boy Who Always Waved","5:09"],["The Table by the Window","4:50"]], "/audio/elias-rowan-the-book-i-never-came-for.mp3", "elias-rowan")
  }
];

export const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug);
