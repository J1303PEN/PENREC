import type { Artist } from "@/data/catalog";

const audioBase = "https://audio.penrec.co.uk/pnr033";

export const doorAtMidnight: Artist = {
  name: "Original Soundtrack",
  slug: "the-door-at-midnight",
  album: "The Door at Midnight",
  cover: `${audioBase}/the_door_at_midnight_front_cover.jpg`,
  hero: `${audioBase}/the_door_at_midnight_front_cover.jpg`,
  profile: `${audioBase}/the_door_at_midnight_front_cover.jpg`,
  gallery: [`${audioBase}/the_door_at_midnight_front_cover.jpg`],
  descriptor: "17 songs · companion to Darren Penman’s fantasy novel",
  location: "United Kingdom",
  bio: [
    "The Door at Midnight — Original Soundtrack is the musical companion to Darren Penman’s fantasy novel, translating its strange doorways, shifting worlds and emotional journey into seventeen original songs.",
    "Beginning with the title track, the album follows the story’s sense of discovery and uncertainty through songs including “Beyond The Landing,” “Worlds in the Sky,” “Marcus,” “Sophie’s Light,” “Arthur’s Map” and “Eleven Doors.” As the journey expands, “The Night We Flew,” “The Floating City” and “Not the Only Way” move deeper into the world beyond the landing, while the later songs turn towards memory, home and what the experience leaves behind.",
    "Rather than simply retelling the novel chapter by chapter, the soundtrack concentrates on its characters, places and emotional themes. “Home Again,” “The Things We Keep,” “Some Doors Shouldn’t Exist” and closing track “Still Believing” give the final part of the album a more reflective character, bringing the journey back to the ideas of imagination, courage and continuing to believe in possibilities beyond the ordinary.",
    "Across its seventeen tracks, The Door at Midnight is designed to work both as a companion to the book and as an album in its own right — another way into the same world."
  ],
  quote: "Another way into the same world.",
  year: "2026",
  catalogue: "PNR033",
  preview: `${audioBase}/01_the_door_at_midnight.mp3`,
  tracks: [
    ["The Door at Midnight","4:19","01_the_door_at_midnight.mp3"],
    ["Braver Than I Know","4:21","02_braver_than_i_know.mp3"],
    ["Beyond The Landing","4:33","03_beyond_the_landing.mp3"],
    ["Worlds in the Sky","4:54","04_worlds_in_the_sky.mp3"],
    ["Marcus","4:50","05_marcus.mp3"],
    ["Sophie’s Light","5:07","06_sophies_light.mp3"],
    ["Arthur’s Map","4:24","07_arthurs_map.mp3"],
    ["Eleven Doors","4:03","08_eleven_doors.mp3"],
    ["The Night We Flew","3:59","09_the_night_we_flew.mp3"],
    ["Somewhere in Between","3:58","10_somewhere_in_between.mp3"],
    ["The Floating City","4:49","11_the_floating_city.mp3"],
    ["Not the Only Way","3:58","12_not_the_only_way.mp3"],
    ["Remember to Dream","4:30","13_remember_to_dream.mp3"],
    ["Home Again","5:10","14_home_again.mp3"],
    ["The Things We Keep","3:44","15_the_things_we_keep.mp3"],
    ["Some Doors Shouldn’t Exist","4:43","16_some_doors_shouldnt_exist.mp3"],
    ["Still Believing","4:37","17_still_believing.mp3"],
  ].map(([title,duration,file]) => ({ title, duration, audio: `${audioBase}/${file}` })),
};
