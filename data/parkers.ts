import type { Artist } from "@/data/catalog";

const imageBase = "https://audio.penrec.co.uk/parkers";
const audioBase = "https://audio.penrec.co.uk";

export const theParkers: Artist = {
  name: "The Parkers",
  slug: "the-parkers",
  album: "I Got the Job",
  cover: `${imageBase}/cover.jpg`,
  hero: `${imageBase}/hero.jpg`,
  profile: `${imageBase}/profile.jpg`,
  heroPosition: "50% 35%",
  profilePosition: "50% 30%",
  gallery: ["001", "002", "003", "004"].map((n) => `${imageBase}/gallery-${n}.jpg`),
  descriptor: "Doo-wop · rhythm & blues · early soul · rock ’n’ roll",
  location: "United Kingdom",
  bio: [
    "The Parkers are a four-piece vocal group bringing the swagger, sophistication and irresistible energy of the great male groups of the late 1950s and early 1960s into a sound made for today. Built around four distinctive voices, immaculate harmonies and genuine old-school showmanship, they inhabit a world where sharp tailoring, polished shoes, glowing theatre marquees and a great melody still matter.",
    "Their music draws on doo-wop, rhythm and blues, early soul and rock ’n’ roll, with strong lead vocals, tight four-part harmonies and arrangements built to let the personalities of all four singers come through. The production is contemporary and polished, but the musical values are deliberately timeless: memorable songs, voices that work together and performances with character.",
    "The Parkers are a group rather than a frontman with backing singers. Leads can rotate, harmonies answer and support them, and each voice brings a different colour to the record. That interplay gives the songs humour, warmth and a conversational quality that recalls the great vocal groups without simply copying them.",
    "Their visual identity is just as important. Classic 1960s tailoring, carefully styled colour photography and highly polished shoes give The Parkers the presence of entertainers who understand that a record begins before the first note is heard. The look belongs to the same world as the music, but it is presented with the clarity and confidence of a modern act.",
    "I Got the Job captures that spirit across sixteen songs, balancing optimism, romance, humour and the small dramas of everyday life. The title track sets the tone: upbeat, characterful and immediately memorable, while the album as a whole gives the four voices room to trade lines, harmonise and tell stories together.",
    "The Parkers may look as though they have just walked out of 1962, but they are not trying to recreate the past. They take the craft, style and sheer entertainment value of that era and use it as the foundation for something that belongs to PENREC now."
  ],
  quote: "Four distinctive voices. Immaculate harmonies. Genuine old-school showmanship.",
  year: "2026",
  catalogue: "PNR025",
  preview: `${audioBase}/01_i_got_the_job.mp3`,
  tracks: [
    { title: "I Got the Job", duration: "3:28", audio: `${audioBase}/01_i_got_the_job.mp3` },
    { title: "Put In a Good Word", duration: "3:53", audio: `${audioBase}/02_put_in_a_good_word.mp3` },
    { title: "My Pay's Already Gone", duration: "4:03", audio: `${audioBase}/03_my_pays_already_gone.mp3` },
    { title: "Keep This Between Us", duration: "4:13", audio: `${audioBase}/04_keep_this_between_us.mp3` },
    { title: "You Can't Blame the Song", duration: "4:10", audio: `${audioBase}/05_you_cant_blame_the_song.mp3` },
    { title: "She Picked the Quiet One", duration: "3:37", audio: `${audioBase}/06_she_picked_the_quiet_one.mp3` },
    { title: "Nobody Told Me She Could Dance", duration: "3:37", audio: `${audioBase}/07_nobody_told_me_she_could_dance.mp3` },
    { title: "I Should've Let Her Finish", duration: "5:13", audio: `${audioBase}/08_i_shouldve_let_her_finish.mp3` },
    { title: "I Was Hoping You'd Say That", duration: "4:07", audio: `${audioBase}/09_i_was_hoping_youd_say_that.mp3` },
    { title: "Leave Some Room for Me", duration: "3:37", audio: `${audioBase}/10_leave_some_room_for_me.mp3` },
    { title: "You're Coming With Us", duration: "4:08", audio: `${audioBase}/11_youre_coming_with_us.mp3` },
    { title: "Don't Ask Me About Her", duration: "4:28", audio: `${audioBase}/12_dont_ask_me_about_her.mp3` },
    { title: "You're Not Helping", duration: "3:47", audio: `${audioBase}/13_youre_not_helping.mp3` },
    { title: "Don't Tell Her I Said That", duration: "4:22", audio: `${audioBase}/14_dont_tell_her_i_said_that.mp3` },
    { title: "What Did You Tell Your Mother?", duration: "4:09", audio: `${audioBase}/15_what_did_you_tell_your_mother.mp3` },
    { title: "She Was Looking at You", duration: "4:19", audio: `${audioBase}/16_she_was_looking_at_you.mp3` }
  ]
};
