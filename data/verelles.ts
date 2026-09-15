import type { Artist } from "@/data/catalog";

const imageBase = "https://audio.penrec.co.uk/verelles";

export const theVerelles: Artist = {
  name: "The Verelles",
  slug: "the-verelles",
  album: "No Halfway Love",
  cover: `${imageBase}/cover.jpg`,
  hero: `${imageBase}/hero.jpg`,
  profile: `${imageBase}/profile.jpg`,
  heroPosition: "50% 35%",
  profilePosition: "50% 30%",
  gallery: ["001", "002", "003", "004", "005"].map((n) => `${imageBase}/gallery-${n}.jpg`),
  descriptor: "Vocal soul · timeless glamour · contemporary production",
  location: "International",
  bio: [
    "The Verelles are a three-piece vocal group built around the timeless glamour, drama and emotional power of the great female vocal groups, but with a sound designed for a modern audience. Sophisticated, stylish and unapologetically romantic, they combine rich harmonies, commanding lead vocals and classic soul storytelling with contemporary production.",
    "Visually, The Verelles inhabit a world of old-school show-business glamour: sweeping gowns, immaculate styling, dramatic stage lighting and the confidence of performers who understand that presentation is part of the music. Their image recalls the elegance of the great 1960s and 1970s vocal groups without becoming an exercise in nostalgia. The Verelles are not pretending to belong to another era; they are taking its glamour, musicianship and sense of occasion and making it their own.",
    "At the centre of their identity are three distinctive voices. Each member has her own character and presence, but the defining Verelles sound emerges when those voices come together. Lead vocals can move between the three women, while close harmonies, answering phrases and tightly arranged backing vocals give every song the sense of a real group rather than a single singer with accompaniment.",
    "Their songs deal in emotional situations people recognise immediately: knowing when a relationship has run its course, refusing to settle for half-hearted love, watching someone return too late, choosing dignity over drama and discovering that confidence can be every bit as powerful as heartbreak. The writing is direct, melodic and conversational, allowing personality to sit at the centre of every performance.",
    "No Halfway Love brings that identity together across seventeen songs. From the title track's declaration of emotional certainty to the wit, warmth and resilience running through You Had Your Chance, Let Him Come To You, Everybody Knew But Me, She Left, So You Came Back and Don't Be Kind About It, the album is designed as a complete vocal-group record rather than a collection of disconnected tracks.",
    "The Verelles balance classic soul discipline with a contemporary sense of scale. Their music respects the craft of the great vocal groups — memorable melodies, strong arrangements, distinctive personalities and harmonies that matter — while refusing to become a museum piece. The result is polished, dramatic and unmistakably alive.",
    "Elegant. Soulful. Romantic. Dramatic. Three women. Three voices. No halfway love."
  ],
  quote: "Three women. Three voices. No halfway love.",
  year: "2026",
  catalogue: "PNR024",
  preview: "https://audio.penrec.co.uk/01_no_halfway_love.mp3",
  tracks: [
    { title: "No Halfway Love", duration: "3:34", audio: "https://audio.penrec.co.uk/01_no_halfway_love.mp3" },
    { title: "You Had Your Chance", duration: "4:00", audio: "https://audio.penrec.co.uk/02_you_had_your_chance.mp3" },
    { title: "Let Him Come To You", duration: "3:33", audio: "https://audio.penrec.co.uk/03_let_him_come_to_you.mp3" },
    { title: "I've Got Better Things To Do", duration: "3:44", audio: "https://audio.penrec.co.uk/04_ive_got_better_things_to_do.mp3" },
    { title: "Everybody Knew But Me", duration: "3:35", audio: "https://audio.penrec.co.uk/05_everybody_knew_but_me.mp3" },
    { title: "I Didn't Say No", duration: "3:10", audio: "https://audio.penrec.co.uk/06_i_didnt_say_no.mp3" },
    { title: "Come On And Mean It", duration: "3:41", audio: "https://audio.penrec.co.uk/07_come_on_and_mean_it.mp3" },
    { title: "I'm Glad You Asked", duration: "3:29", audio: "https://audio.penrec.co.uk/08_im_glad_you_asked.mp3" },
    { title: "She Left, So You Came Back", duration: "3:35", audio: "https://audio.penrec.co.uk/09_she_left_so_you_came_back.mp3" },
    { title: "He Knows I Know", duration: "3:11", audio: "https://audio.penrec.co.uk/10_he_knows_i_know.mp3" },
    { title: "If There's Somebody Else", duration: "3:51", audio: "https://audio.penrec.co.uk/11_if_theres_somebody_else.mp3" },
    { title: "That's How I Know It's You", duration: "3:35", audio: "https://audio.penrec.co.uk/12_thats_how_i_know_its_you.mp3" },
    { title: "After Tonight", duration: "3:55", audio: "https://audio.penrec.co.uk/13_after_tonight.mp3" },
    { title: "I Knew Before You Said It", duration: "3:20", audio: "https://audio.penrec.co.uk/14_i_knew_before_you_said_it.mp3" },
    { title: "Tell Him I Asked About Him", duration: "3:40", audio: "https://audio.penrec.co.uk/15_tell_him_i_asked_about_him.mp3" },
    { title: "Save Saturday For Me", duration: "3:26", audio: "https://audio.penrec.co.uk/16_save_saturday_for_me.mp3" },
    { title: "Don't Be Kind About It", duration: "4:19", audio: "https://audio.penrec.co.uk/17_dont_be_kindabout_it.mp3" }
  ]
};