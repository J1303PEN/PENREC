import type { Artist } from "@/data/catalog";

const audioBase = "https://audio.penrec.co.uk";
const imageBase = "https://audio.penrec.co.uk/jude-varlow";

export const judeVarlow: Artist = {
  name: "Jude Varlow", slug: "jude-varlow", album: "All Summer",
  cover: `${imageBase}/cover.png`, hero: `${imageBase}/cover.png`, profile: `${imageBase}/cover.png`, gallery: [],
  descriptor: "All Summer", location: "",
  bio: [
    "Jude Varlow’s All Summer is a collection of fourteen songs about the things people say, the things they assume and the moments that stay with them afterwards. Its titles trace a world of shared history, uncertain answers and conversations that do not quite end when the room goes quiet.",
    "The album opens with Before We Knew Too Much and moves through No More Maybe, Take It Personally and At the Same Time. Together, those songs introduce a record concerned with timing: what happens when people arrive at the same moment with different expectations, or recognise what mattered only after it has changed.",
    "Elsewhere, Keep Me Moving, I Needed That and It Still Works offer a different kind of perspective. The sequence makes room for forward motion alongside reflection, balancing the suggestion of departure in Better Leaving with the possibility of something worth returning to.",
    "The closing stretch brings Exactly What You Said, That’s on Me and Out of Practice into focus before the title track, All Summer, draws the album to a close. Across the record, everyday phrases become markers of a relationship: direct, recognisable and open to more than one reading.",
    "Released on PENREC as PNR040, All Summer introduces Jude Varlow through a cohesive fourteen-song collection and a bold visual identity: electric blue, expansive white lettering and flashes of red."
  ],
  quote: "", year: "2026", catalogue: "PNR040",
  preview: `${audioBase}/01_before_we_knew_too_much.mp3`,
  tracks: [
    { title: "Before We Knew Too Much", duration: "3:20", audio: `${audioBase}/01_before_we_knew_too_much.mp3` }, { title: "No More Maybe", duration: "4:22", audio: `${audioBase}/02_no_more_maybe.mp3` }, { title: "Take It Personally", duration: "3:30", audio: `${audioBase}/03_take_it_personally.mp3` }, { title: "At the Same Time", duration: "3:44", audio: `${audioBase}/04_at_the_same_time.mp3` }, { title: "Keep Me Moving", duration: "4:37", audio: `${audioBase}/05_keep_me_moving.mp3` }, { title: "Say When", duration: "3:55", audio: `${audioBase}/06_say_when.mp3` }, { title: "Better Leaving", duration: "3:39", audio: `${audioBase}/07_better_leaving.mp3` }, { title: "I Needed That", duration: "4:00", audio: `${audioBase}/08_i_needed_that.mp3` }, { title: "It Still Works", duration: "3:42", audio: `${audioBase}/09_it_still_works.mp3` }, { title: "I Thought You Knew", duration: "3:30", audio: `${audioBase}/10_i_thought_you_knew.mp3` }, { title: "Exactly What You Said", duration: "3:46", audio: `${audioBase}/11_exactly_what_you_said.mp3` }, { title: "That's on Me", duration: "4:22", audio: `${audioBase}/12_thats_on_me.mp3` }, { title: "Out of Practice", duration: "4:07", audio: `${audioBase}/13_out_of_practice.mp3` }, { title: "All Summer", duration: "3:22", audio: `${audioBase}/14_all_summer.mp3` },
  ],
};
