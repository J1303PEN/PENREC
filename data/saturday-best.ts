import type { Artist } from "@/data/catalog";

export const saturdayBest: Artist = {
  name: "The Cast of Saturday Best",
  slug: "cast-of-saturday-best",
  album: "Saturday Best",
  cover: "/images/covers/saturday-best-pnr020.jpg",
  hero: "/images/covers/saturday-best-pnr020.jpg",
  profile: "/images/covers/saturday-best-pnr020.jpg",
  gallery: ["/images/covers/saturday-best-pnr020.jpg"],
  descriptor: "1958 dance-hall stage musical · original songs · company cast recording",
  location: "United Kingdom",
  bio: [
    "The Cast of Saturday Best brings Darren Penman's original stage musical to record: a warm, fast-moving ensemble piece set across one Saturday night in a British Palais in 1958, with a short coda one week later.",
    "Junior reporter Eddie Harland arrives expecting to collect six inches of harmless social notes. Instead, the evening gives him borrowed suits, bad arithmetic, a false age, a missed bus, the ambitions of the bandleader's daughter and the name of the woman everybody else simply calls the cloakroom girl. Around him, the Palais works as hard as its dancers: chairs are carried, coats numbered, admission counted, music copied and mistakes corrected.",
    "Saturday Best is written to feel like a living working dance hall rather than a museum piece. Its comedy comes from behaviour and character, while the score moves through sixteen numbers performed by principals, orchestra and full company. The cast recording follows the complete musical sequence from Meet Me at the Palais through to the six-minute grand finale This Is Saturday Best.",
    "Music, lyrics and script are by Darren Penman. The show is conceived as a two-act musical with approximately 106 minutes of playing time excluding the interval."
  ],
  quote: "Meet me at the Palais — in your Saturday Best.",
  year: "2026",
  catalogue: "PNR020",
  preview: "https://audio.penrec.co.uk/01_meet_me_at_the_palais.mp3",
  tracks: [
    ["Meet Me At The Palais","3:48","01_meet_me_at_the_palais.mp3"],
    ["The Boy in the Borrowed Suit","3:58","02_the_boy_in_the_borrowed_suit.mp3"],
    ["Irene Won't Dance","4:30","03_irene_wont_dance.mp3"],
    ["Half a Crown Short","3:43","04_half_a_crown_short.mp3"],
    ["Peggy Knows the Foxtrot","5:35","05_peggy_knows_the_foxtrot.mp3"],
    ["The Cloakroom Girl","5:13","06_the_cloakroom_girl.mp3"],
    ["Arthur Says He's Twenty-One","4:13","07_arthur_says_hes_21.mp3"],
    ["Three Dances with June","4:53","08_three_dances_with_june.mp3"],
    ["The Bandleader's Daughter","4:22","09_the_bandleaders_daughter.mp3"],
    ["Save the Last Bus","3:27","10_save_the_last_bus.mp3"],
    ["Chairs on the Floor","4:48","11_chairs_on_the_floor.mp3"],
    ["Vera Vale Sits Down","4:58","12_vera_vale_sits_down.mp3"],
    ["Mr Shaw's Rules","3:32","13_mr_shaws_rules.mp3"],
    ["Saturday Best","4:04","14_saturday_best.mp3"],
    ["Next Saturday","3:54","15_next_saturday.mp3"],
    ["This Is Saturday Best","6:04","16_this_is_saturday_best.mp3"]
  ].map(([title,duration,file])=>({title,duration,audio:`https://audio.penrec.co.uk/${file}`}))
};
