import type { Artist } from "@/data/catalog";

const imageBase = "https://audio.penrec.co.uk/maison-45";
const audioBase = "https://audio.penrec.co.uk";

export const maison45: Artist = {
  name: "Maison 45",
  slug: "maison-45",
  album: "Out Tonight",
  cover: `${imageBase}/out-tonight-cover.jpg`,
  hero: `${imageBase}/hero.jpg`,
  profile: `${imageBase}/hero.jpg`,
  heroPosition: "50% 50%",
  profilePosition: "50% 50%",
  gallery: [`${imageBase}/lorna-may-001.jpg`, `${imageBase}/lorna-may-002.jpg`],
  descriptor: "European pop · French chanson · cinematic arrangements",
  location: "United Kingdom",
  bio: [
    "Maison 45 is the musical alter ego of British music producer, songwriter and creative Darren Penman — a project built around his love of sophisticated European pop, French chanson, cinematic arrangements and songs driven by melody and emotion.",
    "The name provides Penman with a distinct musical space in which to explore a more continental sound. Maison 45 draws inspiration from the drama and storytelling of classic French music, particularly the chanson tradition and artists such as Édith Piaf, while deliberately avoiding simple nostalgia or imitation.",
    "Instead, those influences become the starting point for something contemporary.",
    "The Maison 45 sound can move between intimate piano-led songs, sweeping strings, orchestral pop, acoustic instrumentation and polished modern production. Arrangements are allowed to breathe and develop, often beginning with restraint before growing into something considerably more dramatic. At other times, the production remains deliberately sparse, leaving the melody and vocal performance at the centre of the record.",
    "There is romance in Maison 45, but also melancholy, confidence, sensuality and theatricality. The music embraces the emotional directness that once characterised much of European popular music — songs unafraid of a strong melody, a dramatic lyric or a genuinely memorable chorus.",
    "That philosophy reflects Penman’s wider career in music. Having worked across pop, dance and production, Maison 45 allows him to step away from the expectations attached to any particular genre and follow a more instinctive approach to record-making. French and wider European influences can coexist with British pop songwriting, cinematic scoring and contemporary production without any one of them defining the project completely.",
    "The visual world is equally important. Maison 45 suggests Paris after dark, grand theatres, pavement cafés, old cinemas, intimate performance rooms and the understated glamour of European nightlife. Yet, like the music, the imagery is viewed through a contemporary lens rather than treated as a recreation of another era.",
    "Maison 45 ultimately represents another side of Darren Penman as a producer: more cinematic, more European and occasionally more theatrical, but still centred on the element that has always mattered most to him — the song.",
    "Classic influences. Modern production. European soul.",
    "Maison 45."
  ],
  quote: "Classic influences. Modern production. European soul.",
  year: "2026",
  catalogue: "PNR026",
  releaseCredit: "Lorna May vs Maison 45",
  preview: `${audioBase}/01_some_nerve.mp3`,
  tracks: [
    { title: "Some Nerve", duration: "4:47", audio: `${audioBase}/01_some_nerve.mp3` },
    { title: "Says Who", duration: "3:22", audio: `${audioBase}/02_says_who.mp3` },
    { title: "Ask Me Not Her", duration: "4:28", audio: `${audioBase}/03_ask_me_not_her.mp3` },
    { title: "I Heard You First Time", duration: "4:23", audio: `${audioBase}/04_i_heard_you_first_time.mp3` },
    { title: "Did He Look Happy", duration: "4:23", audio: `${audioBase}/05_did_he_look_happy.mp3` },
    { title: "I Like Him Anyway", duration: "4:12", audio: `${audioBase}/06_i_like_him_anyway.mp3` },
    { title: "Don't Waste the Record", duration: "3:55", audio: `${audioBase}/07_dont_waste_the_record.mp3` },
    { title: "My Turn to Lead", duration: "4:18", audio: `${audioBase}/08_my_turn_to_lead.mp3` },
    { title: "You Were Right About Him", duration: "4:44", audio: `${audioBase}/09_you_were_right_about_him.mp3` },
    { title: "Your Mother Answered", duration: "4:05", audio: `${audioBase}/10_your_mother_answered.mp3` },
    { title: "Don't Say It Kindly", duration: "4:36", audio: `${audioBase}/11_dont_say_it_kindly.mp3` },
    { title: "You Laughed at the Right Part", duration: "4:42", audio: `${audioBase}/12_you_laughed_at_the_right_part.mp3` },
    { title: "My First Pay Packet", duration: "4:10", audio: `${audioBase}/13_my_first_pay_packet.mp3` },
    { title: "I Didn't Miss You Today", duration: "5:02", audio: `${audioBase}/14_i_didnt_miss_you_today.mp3` }
  ]
};
