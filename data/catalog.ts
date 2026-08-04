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
  },
  {
    name: "Shelley Dante", slug: "shelley-dante", album: "Night Dancing", cover: "/images/covers/shelley-dante-night-dancing-v2.svg",
    hero: "/images/artists/shelley-dante/shelley-dante-hero.png", profile: "/images/artists/shelley-dante/shelley-dante-profile.png",
    heroPosition: "24% 36%", profilePosition: "24% 28%",
    gallery: [1,2,3,4].map(n=>`/images/artists/shelley-dante/shelley-dante-gallery-${n}.png`),
    descriptor: "Dance-pop · disco glamour · emotional power", location: "International",
    bio: [
      "Some voices belong to the spotlight. Shelley Dante was made for the moment it comes alive.",
      "Shelley Dante is a contemporary pop artist whose music combines the energy of the dancefloor with the emotion of a great pop song. With a powerful, commanding voice and an instinct for unforgettable melodies, she creates music filled with infectious hooks, sophisticated production and an unmistakable sense of confidence.",
      "Drawing inspiration from classic disco, modern dance-pop and the drama of the great power ballads, Shelley’s sound moves effortlessly between euphoric club anthems and more intimate stories of love, disappointment and personal strength. Beneath the polished rhythms and sweeping choruses lies a genuine emotional honesty that gives every song its heart.",
      "Her songs explore the choices people make when the lights go down: the excitement of new attraction, the courage to walk away, the mistakes that continue to haunt us and the freedom that comes from finally knowing your own worth. Tracks such as Night Dancing, Love in the Shadows, Make a Move and Tomorrow Comes reveal an artist capable of bringing both attitude and vulnerability to the same performance.",
      "Shelley’s visual world is every bit as distinctive as her music. Glamorous, confident and effortlessly theatrical, she brings the colour and excitement of nightlife to the stage without allowing the spectacle to overshadow the song. Whether commanding a packed dancefloor or standing alone beneath a single spotlight, she performs with the presence of an artist completely in control of her moment.",
      "For Shelley, music is more than entertainment—it is escape, release and the freedom to become whoever you want to be. Bold, powerful and impossible to ignore, Shelley Dante is the sound of the night coming alive."
    ],
    quote: "Some voices belong to the spotlight. Shelley Dante was made for the moment it comes alive.", year: "2026", catalogue: "PNR008",
    preview: "/audio/shelley-dante-night-dancing.mp3",
    tracks: albumTracks([["Night Dancing","3:30"],["Love in the Shadows","3:43"],["Brick by Brick","3:50"],["On the Train","3:48"],["My Biggest Mistake","3:10"],["Macho Man","3:28"],["One Man Only","4:26"],["Something New","2:30"],["You Were Made to Break My Heart","3:55"],["Your Picture Next to Mine","3:40"],["The Penman Express","3:33"],["Make a Move","2:53"],["Next Door Heartbreak","3:17"],["Tomorrow Comes","4:29"],["Fool No More","3:45"]], "/audio/shelley-dante-night-dancing.mp3", "shelley-dante")
  },
  {
    name: "Luca Moretti", slug: "luca-moretti", album: "Donde Empieza Todo", cover: "/images/covers/luca-moretti-donde-empieza-todo.jpg",
    hero: "/images/artists/luca-moretti/luca-moretti-hero.jpg", profile: "/images/artists/luca-moretti/luca-moretti-profile.jpg",
    heroPosition: "58% 22%", profilePosition: "50% 18%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/luca-moretti/luca-moretti-gallery-${n}.jpg`),
    descriptor: "Spanish pop · Mediterranean passion · romantic storytelling", location: "Spain",
    bio: [
      "Some voices capture a moment. Luca Moretti makes it impossible to forget.",
      "Luca Moretti is a contemporary Spanish singer whose music combines Mediterranean passion, sophisticated pop production and the emotional power of a great romantic song. With a warm, expressive voice and an instinct for memorable melodies, he creates music that feels both deeply personal and effortlessly universal.",
      "Drawing inspiration from modern Spanish pop, classic European songwriting and the rhythms of the Mediterranean, Luca’s sound moves naturally between intimate ballads and uplifting, rhythm-driven anthems. Acoustic guitars, piano, sweeping strings and subtle Latin influences sit alongside polished contemporary production, giving his recordings a distinctive style that is elegant, passionate and unmistakably his own.",
      "At the heart of Luca’s music are stories of love, desire and the choices that change our lives. His songs explore the excitement of a new attraction, the uncertainty of relationships, the pain of saying goodbye and the courage it takes to begin again. Rather than presenting love as something perfect, Luca writes about it as it is—unpredictable, complicated and capable of transforming everything.",
      "There is a strong sense of place within his music. Sunlit coastlines, late-night streets, crowded bars and quiet city squares form the emotional landscape of his songs. These images give his recordings a cinematic quality, creating the feeling of memories unfolding beneath the Spanish sun or long after midnight.",
      "On stage, Luca is a confident and charismatic performer. Whether accompanied by a single acoustic guitar or a full live band, he brings intensity and sincerity to every performance. His understated style and natural connection with an audience allow even the largest songs to feel intimate, as though each lyric is being shared with one person alone.",
      "Away from the spotlight, Luca approaches his music with care and discipline. He believes that every recording must begin with a genuine emotion and a melody strong enough to remain with the listener. Each vocal, arrangement and instrumental detail is shaped around the story, resulting in music that feels polished without ever losing its honesty.",
      "With his distinctive voice, contemporary Spanish identity and gift for emotionally powerful songwriting, Luca Moretti represents a new generation of European pop artists—romantic without being predictable, stylish without losing sincerity and confident enough to let the music speak for itself."
    ],
    quote: "Some voices capture a moment. Luca Moretti makes it impossible to forget.", year: "2026", catalogue: "PNR009",
    preview: "/audio/luca-moretti-desde-que-llegaste.mp3",
    tracks: albumTracks([["Desde Que Llegaste","3:17"],["Antes De Verte","3:14"],["Cuando Callas Tú","3:35"],["Tus Pequeñas Costumbres","3:09"],["No Somos Iguales","2:57"],["Aquella Fotografía","3:18"],["Se Nos Hizo Tarde","3:10"],["Donde Empieza La Calma","3:22"],["Como Soy","3:02"],["Sin Darte Cuenta","3:09"],["Una Silla Más","4:20"],["Las Cosas Nuestras","2:54"],["Termino Tus Historias","3:10"],["Solo Con Mirarte","3:07"],["Lo Mejor No Ha Pasado","2:42"],["La Última Luz","3:23"]], "/audio/luca-moretti-desde-que-llegaste.mp3", "luca-moretti")
  },
  {
    name: "Khadijah Brown", slug: "khadijah-brown", album: "Grace", cover: "/images/covers/khadijah-brown-grace.jpg",
    hero: "/images/artists/khadijah-brown/khadijah-brown-hero.jpg", profile: "/images/artists/khadijah-brown/khadijah-brown-profile.jpg",
    heroPosition: "50% 18%", profilePosition: "45% 22%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/khadijah-brown/khadijah-brown-gallery-${n}.jpg`),
    descriptor: "Contemporary soul · gospel warmth · quiet strength", location: "International",
    bio: [
      "Some voices demand attention. Khadijah Brown’s earns something deeper: belief.",
      "Khadijah Brown is a contemporary soul artist whose music combines emotional honesty, quiet strength and the timeless power of an extraordinary voice. Rich, warm and deeply expressive, her performances move effortlessly from moments of intimate reflection to soaring declarations of hope, resilience and self-worth.",
      "Drawing inspiration from classic soul, gospel, sophisticated R&B and cinematic pop, Khadijah creates music that feels both familiar and entirely her own. Piano, strings, subtle rhythms and beautifully layered harmonies provide the setting for a voice capable of conveying tremendous power without ever sacrificing tenderness.",
      "Her album Grace explores the experiences that shape us: love and loss, forgiveness, faith, disappointment and the courage required to begin again. Its songs do not pretend that life is without difficulty. Instead, they celebrate the strength found in surviving those moments and the freedom that comes from accepting the person you have become.",
      "For Khadijah, grace is more than a spiritual idea. It is the patience we learn to offer ourselves, the dignity we retain when life tests us and the light that remains even during our darkest nights. That message runs throughout her music, giving each song a sense of purpose beyond its melody.",
      "On stage, Khadijah possesses a commanding yet deeply personal presence. She does not rely on spectacle to create an unforgettable moment. Whether standing beneath a single spotlight or performing with a full band and choir, her voice remains at the centre—powerful, controlled and filled with genuine feeling.",
      "Away from the stage, Khadijah approaches her music with thoughtfulness and care. She believes a song should leave the listener with something: a memory, a feeling or perhaps the courage to see their own life differently. Every lyric and arrangement is shaped around that belief, allowing the emotion of the performance to remain honest and unforced.",
      "With her unmistakable voice, natural elegance and ability to transform personal experience into universal truth, Khadijah Brown is an artist of remarkable depth. Her music reminds us that strength does not always need to shout—and that sometimes the most powerful thing we can do is face the world with grace."
    ],
    quote: "Some voices demand attention. Khadijah Brown’s earns something deeper: belief.", year: "2026", catalogue: "PNR010",
    preview: "/audio/khadijah-brown-love-dont-wait-forever.mp3",
    tracks: albumTracks([["Love Don't Wait Forever","3:35"],["Easy Like the Morning Breeze","3:44"],["I'm Not Carrying Your Worry","3:26"],["There's No Place Like Coming Home","3:47"],["Dance With Me Till Morning Light","3:48"],["Right Here on This Little Street","3:43"],["Some Hearts Change with the Seasons","4:23"],["Mama Said Love Will Find You","3:43"],["I Let the Hurt Drift Away","4:24"],["Every Sunrise Tells Me Something","3:59"],["Take Your Time","3:24"],["I Found My Smile Again","4:02"],["Friends Like You Are Hard to Find","4:13"],["Counting Every Blessing","3:59"],["Walk Into Tomorrow Smiling","3:55"]], "/audio/khadijah-brown-love-dont-wait-forever.mp3", "khadijah-brown")
  },
  {
    name: "Harper Lane", slug: "harper-lane", album: "Wide Open", cover: "/images/covers/harper-lane-wide-open.jpg",
    hero: "/images/artists/harper-lane/harper-lane-hero.jpg", profile: "/images/artists/harper-lane/harper-lane-profile.jpg",
    heroPosition: "50% 30%", profilePosition: "50% 24%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/harper-lane/harper-lane-gallery-${n}.jpg`),
    descriptor: "Contemporary country · heartfelt pop · honest storytelling", location: "United Kingdom",
    bio: [
      "Some artists chase the spotlight. Harper Lane simply tells the truth.",
      "Blending contemporary country with heartfelt pop, Harper Lane has built her sound around the moments that shape everyday lives—first loves, second chances, small-town dreams, family ties and the courage to begin again. Her songs are warm, honest and deeply personal, delivered with a voice that balances vulnerability with quiet strength.",
      "Raised in Britain but inspired by the storytelling traditions of Nashville, Harper combines modern country production with acoustic guitars, soaring melodies and lyrics that feel like conversations between old friends. Her music captures the beauty found in ordinary moments, proving that the biggest stories are often the ones lived away from the headlines.",
      "Her debut album, Wide Open, introduces an artist unafraid to wear her heart on her sleeve. Across the collection, Harper explores hope, resilience, love and self-discovery, creating songs that invite listeners to find pieces of their own lives within every chorus. Whether celebrating new beginnings or reflecting on roads already travelled, each track is written with authenticity and emotional honesty.",
      "On stage, Harper brings a natural warmth that makes every performance feel intimate, whether she's accompanied by a full band or simply an acoustic guitar. Her relaxed presence, effortless vocals and genuine connection with audiences have quickly earned her a reputation as an artist whose performances are as sincere as her songwriting.",
      "Influenced by the modern country sound while remaining unmistakably herself, Harper Lane represents a fresh voice for a new generation of country music lovers—one that embraces contemporary production without ever losing sight of the storytelling at the heart of the genre.",
      "With Wide Open, Harper Lane invites listeners to take the journey with her—one song, one memory and one new beginning at a time."
    ],
    quote: "Some artists chase the spotlight. Harper Lane simply tells the truth.", year: "2026", catalogue: "PNR011",
    preview: "/audio/harper-lane-wide-open.mp3",
    tracks: albumTracks([["Wide Open","3:47"],["When You Look At Me","4:10"],["Say You'll Stay","3:48"],["If I Don't Tell You Now","3:45"],["My Heart Knows Better","3:58"],["Good Kind of Gone","4:40"],["Right Here, Right Now","3:55"],["Find Me Again","3:58"],["Better With You","4:13"],["Whatever Comes Next","3:41"],["This Is The Life","4:13"],["You Don't Know Me Yet","3:28"],["Five More Minutes","3:59"],["You Change The Weather","4:00"],["Nothing Changed","3:45"],["That's More Like It","4:00"]], "/audio/harper-lane-wide-open.mp3", "harper-lane")
  },
  {
    name: "Ethan Blake", slug: "ethan-blake", album: "I'd Choose You Again", cover: "/images/covers/ethan-blake-id-choose-you-again.jpg",
    hero: "/images/artists/ethan-blake/ethan-blake-hero.jpg", profile: "/images/artists/ethan-blake/ethan-blake-profile.jpg",
    heroPosition: "50% 35%", profilePosition: "50% 24%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/ethan-blake/ethan-blake-gallery-${n}.jpg`),
    descriptor: "British rock-pop · raw emotion · timeless songwriting", location: "United Kingdom",
    bio: [
      "Some artists sing about heartbreak. Ethan Blake sounds as though he has lived through every word.",
      "With a powerful, emotionally charged voice and a natural ability to turn personal experience into unforgettable songs, Ethan Blake is a contemporary singer-songwriter unafraid to wear his heart on his sleeve. His music blends the raw honesty of rock, the storytelling tradition of country and the melodic strength of modern pop, creating a sound that feels both immediate and timeless.",
      "At just 21, Ethan possesses a voice far beyond his years—gritty and commanding when a song demands power, yet capable of remarkable tenderness in its quieter moments. Whether accompanied by a full band, sitting alone at a grand piano or singing over the warmth of an acoustic guitar, he performs with an intensity that makes every lyric feel personal.",
      "His debut album, I’d Choose You Again, explores love in all its complicated forms: the promises people struggle to keep, the mistakes they would undo, the relationships worth fighting for and the memories that remain long after someone has gone.",
      "Rather than presenting love as something perfect, Ethan writes about it as something real—messy, vulnerable, painful and occasionally strong enough to survive everything placed in its way.",
      "Beneath the album’s soaring choruses and powerful instrumentation lies a quieter question: if you could return to the beginning knowing everything that would happen, would you still make the same choice? For Ethan, the answer is found in every song. Even through disappointment, regret and heartbreak, some people remain worth choosing all over again."
    ],
    quote: "Some artists sing about heartbreak. Ethan Blake sounds as though he has lived through every word.", year: "2026", catalogue: "PNR012",
    preview: "/audio/ethan-blake-until-you-find-your-feet.mp3",
    tracks: albumTracks([["Until You Find Your Feet","3:38"],["Lean on Me Tonight","4:02"],["No Matter Where You Are","3:58"],["I'll Wait as Long as It Takes","4:15"],["If You Turn Around","4:23"],["Still My First Call","3:59"],["One More Minute","3:30"],["You Were Already There","3:59"],["You Said, \"Trust Me\"","3:50"],["I Never Said It Enough","3:58"],["It's Been Too Long","4:11"],["I Knew Right Then","4:13"],["I'd Choose You Again","4:17"],["We Didn't Even Notice","3:33"],["Before You Ask","3:40"],["It Was Always You","4:43"]], "/audio/ethan-blake-until-you-find-your-feet.mp3", "ethan-blake")
  },
  {
    name: "FEVER5", slug: "fever5", album: "Bridge to Your Heart", cover: "/images/covers/fever5-bridge-to-your-heart.jpg",
    hero: "/images/artists/fever5/fever5-hero.jpg", profile: "/images/artists/fever5/fever5-profile.jpg",
    heroPosition: "50% 35%", profilePosition: "50% 30%",
    gallery: [1,2,3,4,5].map(n=>`/images/artists/fever5/fever5-gallery-${n}.jpg`),
    descriptor: "Hi-NRG dance-pop · five-part harmony · pure pop happiness", location: "United Kingdom",
    bio: [
      "Some groups are formed through auditions. Others come together by chance. FEVER5 were family long before they ever stepped onto a stage.",
      "Raised on the same block, the five-piece is made up of two close-knit families whose lives have always been intertwined. Triplets Perry, Louis and Lachlan grew up just a few doors away from identical twins Gray and Marco, spending their childhoods making up dance routines in the street, borrowing cassette tapes, and dreaming of performing together one day.",
      "That lifelong friendship has become the band’s greatest strength. Years of growing up side by side have created an instinctive connection that can’t be manufactured. Every harmony locks effortlessly into place, every dance move lands with military precision, and every performance radiates the chemistry of five people who have known each other their entire lives.",
      "Musically, FEVER5 deliver a dazzling blend of Hi-NRG dance-pop, combining pulsating electronic production, soaring five-part harmonies, infectious hooks and unapologetically feel-good energy. Inspired by the golden era of dance music while embracing a modern pop sound, their songs are built for packed dance floors, festival crowds and anyone who believes pop should be joyful.",
      "On stage, FEVER5 are impossible to ignore. Their trademark is a spectacular live show featuring tightly choreographed routines, flawless vocal harmonies, dazzling costume changes and an infectious sense of fun. Every performance is designed as a celebration—bold, colourful, theatrical and proudly camp—where the audience becomes part of the party from the opening beat to the final encore.",
      "Behind the glitter, however, is a band built on genuine loyalty, family values and friendship. Their shared upbringing gives them an authenticity that shines through every lyric, every rehearsal and every performance.",
      "Whether they’re delivering euphoric club anthems, emotional pop ballads or irresistible dance-floor fillers, FEVER5 have one simple mission: to bring people together through music, movement and pure, unashamed pop happiness.",
      "With their unstoppable chemistry, precision choreography and larger-than-life personalities, FEVER5 prove that when family and friendship come together, the result is something truly electric."
    ],
    quote: "Some groups are formed through auditions. Others come together by chance. FEVER5 were family long before they ever stepped onto a stage.", year: "2026", catalogue: "PNR013",
    preview: "/audio/fever5-fever-five.mp3",
    tracks: albumTracks([["Fever Five","2:43"],["Dance Floor Train","3:13"],["Bridge to Your Heart","3:33"],["Christopher Street","4:01"],["Making Out on a Saturday Night","3:13"],["All About You","3:45"],["Never Too Late","4:04"],["Love It Loud","4:03"],["Wink Wink","3:13"],["Camp It Up It's Friday","3:06"],["Running on Empty","3:16"],["Touch Me Like That","2:53"]], "/audio/fever5-fever-five.mp3", "fever5")
  }
];

export const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug);
