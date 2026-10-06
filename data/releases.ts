import { northArray } from "@/data/north-array";
import { tobiasTangleAndFriends } from "@/data/tobias-tangle-and-friends";
import { judeVarlow } from "@/data/jude-varlow";
import { reno } from "@/data/reno";
import { hyx } from "@/data/hyx";
import { francesMartine } from "@/data/frances-martine";
import { shine } from "@/data/shine";
import { artists, type Artist, type Track } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { saturdayBest } from "@/data/saturday-best";
import { doorAtMidnight } from "@/data/door-at-midnight";

export type ReleaseData = {
  album: string;
  cover: string;
  year: string;
  catalogue: string;
  preview: string;
  tracks: Track[];
  releaseCredit?: string;
  description?: string;
};

export type ReleaseArtist = Omit<Artist, "hero" | "profile" | "gallery" | "heroPosition" | "profilePosition"> & { releaseCredit?: string; description?: string };

const additionalReleases: Partial<Record<string, ReleaseData[]>> = {
  "shine": [{
  "album": "Soul in My Heart",
  "cover": "https://audio.penrec.co.uk/shine/soul-in-my-heart-cover.jpg?v=pnr042",
  "year": "2026",
  "catalogue": "PNR042",
  "preview": "https://audio.penrec.co.uk/01_love_of_a_lifetime.mp3?v=pnr042",
  "tracks": [
    {
      "title": "Love of a Lifetime",
      "duration": "5:22",
      "audio": "https://audio.penrec.co.uk/01_love_of_a_lifetime.mp3?v=pnr042"
    },
    {
      "title": "The Time for Us is Right Now",
      "duration": "4:53",
      "audio": "https://audio.penrec.co.uk/02_the_time_for_us_is_right_now.mp3?v=pnr042"
    },
    {
      "title": "Philadelphia City Limits",
      "duration": "4:19",
      "audio": "https://audio.penrec.co.uk/03_philadelphia_city_limits.mp3?v=pnr042"
    },
    {
      "title": "Studio 54",
      "duration": "4:43",
      "audio": "https://audio.penrec.co.uk/04_studio_54.mp3?v=pnr042"
    },
    {
      "title": "With Friends Like These",
      "duration": "4:42",
      "audio": "https://audio.penrec.co.uk/05_with_friends_like_these.mp3?v=pnr042"
    },
    {
      "title": "New Shores",
      "duration": "5:01",
      "audio": "https://audio.penrec.co.uk/06_new_shores.mp3?v=pnr042"
    },
    {
      "title": "A Life Worth Living",
      "duration": "4:39",
      "audio": "https://audio.penrec.co.uk/07_a_life_worth_living.mp3?v=pnr042"
    },
    {
      "title": "Family",
      "duration": "4:50",
      "audio": "https://audio.penrec.co.uk/08_family.mp3?v=pnr042"
    },
    {
      "title": "You Bring Best Out of Me",
      "duration": "4:08",
      "audio": "https://audio.penrec.co.uk/09_you_bring_best_out_of_me.mp3?v=pnr042"
    },
    {
      "title": "Distance is Not a Barrier to Love",
      "duration": "5:04",
      "audio": "https://audio.penrec.co.uk/10_distance_is_not_a_barrier_to_love.mp3?v=pnr042"
    },
    {
      "title": "Up on this Stage",
      "duration": "5:18",
      "audio": "https://audio.penrec.co.uk/11_up_on_this_stage.mp3?v=pnr042"
    },
    {
      "title": "Soul in My Heart",
      "duration": "5:02",
      "audio": "https://audio.penrec.co.uk/12_soul_in_my_heart.mp3?v=pnr042"
    },
    {
      "title": "Bright Lights",
      "duration": "4:37",
      "audio": "https://audio.penrec.co.uk/13_bright_lights.mp3?v=pnr042"
    },
    {
      "title": "Just Before You Go",
      "duration": "4:48",
      "audio": "https://audio.penrec.co.uk/14_just_before_you_go.mp3?v=pnr042"
    },
    {
      "title": "My Final Wish",
      "duration": "4:53",
      "audio": "https://audio.penrec.co.uk/15_my_final_wish.mp3?v=pnr042"
    }
  ],
  "description": "Soul in My Heart is SHINE’s second release on PENREC. Its fifteen-track sequence opens with Love of a Lifetime and closes with My Final Wish."
}],
  "maison-45": [{
  "album": "Sans façon",
  "cover": "https://audio.penrec.co.uk/maison-45/sans-facon-cover.jpg",
  "year": "2026",
  "catalogue": "PNR038",
  "releaseCredit": "Léonie Vautrin vs. Maison 45",
  "preview": "https://audio.penrec.co.uk/01_passe_la_moi.mp3",
  "tracks": [
    {
      "title": "Passe-la-moi",
      "duration": "3:50",
      "audio": "https://audio.penrec.co.uk/01_passe_la_moi.mp3"
    },
    {
      "title": "Je n'ai rien promis",
      "duration": "4:14",
      "audio": "https://audio.penrec.co.uk/02_je_nai_rien_promis.mp3"
    },
    {
      "title": "Pas devant tout le monde",
      "duration": "4:02",
      "audio": "https://audio.penrec.co.uk/03_pas_devant_tout_le_monde.mp3"
    },
    {
      "title": "Ce n'est pas à vendre",
      "duration": "2:52",
      "audio": "https://audio.penrec.co.uk/04_ce_nest_pas_a_vendre.mp3"
    },
    {
      "title": "Vous dansez très mal",
      "duration": "3:42",
      "audio": "https://audio.penrec.co.uk/05_vous_dansez_tres_mal.mp3"
    },
    {
      "title": "Je garde mes rides",
      "duration": "4:05",
      "audio": "https://audio.penrec.co.uk/06_je_garde_mes_rides.mp3"
    },
    {
      "title": "Tu as pensé au pain",
      "duration": "4:10",
      "audio": "https://audio.penrec.co.uk/07_tu_as_pense_au_pain.mp3"
    },
    {
      "title": "J'ai vendu la bague",
      "duration": "4:09",
      "audio": "https://audio.penrec.co.uk/08_jai_vendu_la_bague.mp3"
    },
    {
      "title": "Mon visage n'est pas pour vous",
      "duration": "4:17",
      "audio": "https://audio.penrec.co.uk/09_mon_visage_nest_pas_pour_vous.mp3"
    },
    {
      "title": "Deux heures en moins",
      "duration": "4:34",
      "audio": "https://audio.penrec.co.uk/10_deux_heures_en_moins.mp3"
    },
    {
      "title": "Elle m'appelle Madame",
      "duration": "3:52",
      "audio": "https://audio.penrec.co.uk/11_elle_mappelle_madame.mp3"
    },
    {
      "title": "Apportez le dessert",
      "duration": "3:40",
      "audio": "https://audio.penrec.co.uk/12_apportez_le_dessert.mp3"
    },
    {
      "title": "Sans façon",
      "duration": "5:02",
      "audio": "https://audio.penrec.co.uk/13_sans_facon.mp3"
    },
    {
      "title": "Je garde le chien",
      "duration": "4:25",
      "audio": "https://audio.penrec.co.uk/14_je_garde_le_chien.mp3"
    }
  ]
}],
  "marco-verturi": [{
  "album": "Dove Mi Porta Il Cuore",
  "cover": "https://audio.penrec.co.uk/marco-verturi/dove-mi-porta-il-cuore-cover.png",
  "year": "2026",
  "catalogue": "PNR035",
  "preview": "https://audio.penrec.co.uk/01_dove_mi_porta_il_cuore.mp3",
  "tracks": [
    {
      "title": "Dove Mi Porta Il Cuore",
      "duration": "3:23",
      "audio": "https://audio.penrec.co.uk/01_dove_mi_porta_il_cuore.mp3"
    },
    {
      "title": "Un Giorno Migliore",
      "duration": "3:31",
      "audio": "https://audio.penrec.co.uk/02_un_giorno_migliore.mp3"
    },
    {
      "title": "Tutto Può Cambiare",
      "duration": "3:30",
      "audio": "https://audio.penrec.co.uk/03_tutto_puo_cambiare.mp3"
    },
    {
      "title": "La Strada Davanti",
      "duration": "3:43",
      "audio": "https://audio.penrec.co.uk/04_la_strada_davanti.mp3"
    },
    {
      "title": "Voglio Vivere Così",
      "duration": "3:34",
      "audio": "https://audio.penrec.co.uk/05_voglio_vivere_cosi.mp3"
    },
    {
      "title": "Quando sei con me",
      "duration": "3:35",
      "audio": "https://audio.penrec.co.uk/06_quando_sei_con_me.mp3"
    },
    {
      "title": "Sotto Questo Sole",
      "duration": "3:39",
      "audio": "https://audio.penrec.co.uk/07_sotto_questo_sole.mp3"
    },
    {
      "title": "Non è mai troppo tardi",
      "duration": "3:27",
      "audio": "https://audio.penrec.co.uk/08_non_e_mai_troppo_tardi.mp3"
    },
    {
      "title": "Il Meglio Deve Venire",
      "duration": "3:47",
      "audio": "https://audio.penrec.co.uk/09_il_meglio_deve_venire.mp3"
    },
    {
      "title": "Portami Via",
      "duration": "3:19",
      "audio": "https://audio.penrec.co.uk/10_portami_via.mp3"
    },
    {
      "title": "Questa Vita Mia",
      "duration": "3:42",
      "audio": "https://audio.penrec.co.uk/11_questa_vita_mia.mp3"
    },
    {
      "title": "Finché Ci Sei Tu",
      "duration": "3:16",
      "audio": "https://audio.penrec.co.uk/12_finche_ci_sei_tu.mp3"
    },
    {
      "title": "Un Passo In Più",
      "duration": "3:19",
      "audio": "https://audio.penrec.co.uk/13_un_passo_in_piu.mp3"
    },
    {
      "title": "Da Qui Ricomincio",
      "duration": "3:53",
      "audio": "https://audio.penrec.co.uk/14_da_qui_ricomincio.mp3"
    }
  ],
  "description": "Dove Mi Porta Il Cuore is a fourteen-track album by Marco Verturi, released on PENREC in 2026. The sequence opens with the title track and closes with Da Qui Ricomincio."
}, {
  "album": "Tutto Da Vivere",
  "cover": "https://audio.penrec.co.uk/marco-verturi/tutto-da-vivere-cover.jpg?v=pnr045",
  "year": "2026",
  "catalogue": "PNR045",
  "preview": "https://audio.penrec.co.uk/01_tutto_da_vivere.mp3?v=pnr045",
  "tracks": [
    {
      "title": "Tutto Da Vivere",
      "duration": "3:44",
      "audio": "https://audio.penrec.co.uk/01_tutto_da_vivere.mp3?v=pnr045"
    },
    {
      "title": "Questa Sera Usciamo",
      "duration": "3:36",
      "audio": "https://audio.penrec.co.uk/02_questa_sera_usciamo.mp3?v=pnr045"
    },
    {
      "title": "Dimmelo Adesso",
      "duration": "3:14",
      "audio": "https://audio.penrec.co.uk/03_dimmelo_adesso.mp3?v=pnr045"
    },
    {
      "title": "Un'Altra Estate",
      "duration": "3:08",
      "audio": "https://audio.penrec.co.uk/04_unaltra_estate.mp3?v=pnr045"
    },
    {
      "title": "Come Viene Viene",
      "duration": "2:50",
      "audio": "https://audio.penrec.co.uk/05_come_viene_viene.mp3?v=pnr045"
    },
    {
      "title": "Solo Per Un Po'",
      "duration": "3:48",
      "audio": "https://audio.penrec.co.uk/06_solo_per_un_po.mp3?v=pnr045"
    },
    {
      "title": "La Parte Migliore",
      "duration": "3:25",
      "audio": "https://audio.penrec.co.uk/07_la_parte_migliore.mp3?v=pnr045"
    },
    {
      "title": "Fuori Programma",
      "duration": "3:28",
      "audio": "https://audio.penrec.co.uk/08_fuori_programma.mp3?v=pnr045"
    },
    {
      "title": "Non Ci Penso Più",
      "duration": "2:57",
      "audio": "https://audio.penrec.co.uk/09_non_ci_penso_piu.mp3?v=pnr045"
    },
    {
      "title": "Stasera Tocca A Noi",
      "duration": "3:37",
      "audio": "https://audio.penrec.co.uk/10_stasera_tocca_a_noi.mp3?v=pnr045"
    },
    {
      "title": "Quello Che Volevo",
      "duration": "3:50",
      "audio": "https://audio.penrec.co.uk/11_quello_che_volevo.mp3?v=pnr045"
    },
    {
      "title": "Ci Vediamo Là",
      "duration": "3:53",
      "audio": "https://audio.penrec.co.uk/12_ci_vediamo_la.mp3?v=pnr045"
    },
    {
      "title": "Vale La Pena",
      "duration": "3:41",
      "audio": "https://audio.penrec.co.uk/13_vale_la_pena.mp3?v=pnr045"
    },
    {
      "title": "E Domani Si Vedrà",
      "duration": "4:18",
      "audio": "https://audio.penrec.co.uk/14_e_domani_si_vedra.mp3?v=pnr045"
    },
    {
      "title": "A Modo Mio",
      "duration": "4:04",
      "audio": "https://audio.penrec.co.uk/15_a_modo_mio.mp3?v=pnr045"
    }
  ],
  "description": "Marco Verturi’s third PENREC album brings together fifteen Italian-language songs, opening with Tutto Da Vivere and closing with A Modo Mio. Its titles explore evenings out, summer, spontaneity and finding a way forward on your own terms."
}],
  "the-glamour-katz": [
    {
      album: "Make Him Mine",
      cover: "/images/covers/the-glamour-katz-make-him-mine.webp",
      year: "2026",
      catalogue: "PNR023",
      preview: "https://audio.penrec.co.uk/01_make_him_mine.mp3",
      tracks: [
        { title: "Make Him Mine", duration: "4:08", audio: "https://audio.penrec.co.uk/01_make_him_mine.mp3" },
        { title: "Safe in the Arms of Love", duration: "3:52", audio: "https://audio.penrec.co.uk/02_safe_in_the_arms_of_love.mp3" },
        { title: "Dancing with my Baby", duration: "4:19", audio: "https://audio.penrec.co.uk/03_dancing_with_my_baby.mp3" },
        { title: "Name of Love", duration: "3:19", audio: "https://audio.penrec.co.uk/04_name_of_love.mp3" },
        { title: "Not Now, Maybe Later", duration: "3:30", audio: "https://audio.penrec.co.uk/05_not_now_maybe_later.mp3" },
        { title: "One True Lover", duration: "4:18", audio: "https://audio.penrec.co.uk/06_one_true_lover.mp3" },
        { title: "Ladies Put Your Hands Up", duration: "4:00", audio: "https://audio.penrec.co.uk/07_ladies_put_your_hands_up.mp3" },
        { title: "Claws Out", duration: "3:55", audio: "https://audio.penrec.co.uk/08_claws_out.mp3" },
        { title: "Moonlight Shadows", duration: "3:55", audio: "https://audio.penrec.co.uk/09_moonlight_shadows.mp3" },
        { title: "Why Did You Do", duration: "3:45", audio: "https://audio.penrec.co.uk/10_why_did_you_do.mp3" },
        { title: "My Body My Soul", duration: "4:01", audio: "https://audio.penrec.co.uk/11_my_body_my_soul.mp3" },
        { title: "On The Line", duration: "3:57", audio: "https://audio.penrec.co.uk/12_on_the_line.mp3" },
        { title: "Walking on Broken Glass", duration: "3:53", audio: "https://audio.penrec.co.uk/13_walking_on_broken_glass.mp3" },
        { title: "Take Me As I Am", duration: "3:10", audio: "https://audio.penrec.co.uk/14_take_me_as_i_am.mp3" },
        { title: "Starting Over Again", duration: "3:49", audio: "https://audio.penrec.co.uk/15_starting_over_again.mp3" },
        { title: "Ring on my Finger", duration: "3:48", audio: "https://audio.penrec.co.uk/16_ring_on_my_finger.mp3" },
        { title: "Walk Away From Happiness", duration: "3:10", audio: "https://audio.penrec.co.uk/17_walk_away_from_happiness.mp3" },
        { title: "Gotta get away from You", duration: "3:41", audio: "https://audio.penrec.co.uk/18_gotta_get_away_from_you.mp3" },
      ],
    },
  ],
  "fifth-and-main": [
    {
      album: "Christmas",
      cover: "/images/covers/fifth-and-main-christmas.webp",
      year: "2026",
      catalogue: "PNR022",
      preview: "https://audio.penrec.co.uk/01_christmas_starts_tonight.mp3",
      tracks: [
        { title: "Christmas Starts Tonight", duration: "5:08", audio: "https://audio.penrec.co.uk/01_christmas_starts_tonight.mp3" },
        { title: "Stay Till New Year", duration: "4:18", audio: "https://audio.penrec.co.uk/02_stay_till_new_year.mp3" },
        { title: "Same Time Next Year", duration: "5:02", audio: "https://audio.penrec.co.uk/03_same_time_next_year.mp3" },
        { title: "Can't Wait", duration: "4:29", audio: "https://audio.penrec.co.uk/04-cant_wait.mp3" },
        { title: "I Still Think of You", duration: "5:25", audio: "https://audio.penrec.co.uk/05_i_still_think_of_you.mp3" },
        { title: "Wide Awake", duration: "4:01", audio: "https://audio.penrec.co.uk/06_wide_awake.mp3" },
        { title: "One More Thing", duration: "3:33", audio: "https://audio.penrec.co.uk/07_one_more_thing.mp3" },
        { title: "Before the Day Begins", duration: "4:51", audio: "https://audio.penrec.co.uk/08_before-the_day_begins.mp3" },
        { title: "No Reason to Go", duration: "3:41", audio: "https://audio.penrec.co.uk/09_no_reason_to_go.mp3" },
        { title: "A Lifetime of Winters", duration: "5:45", audio: "https://audio.penrec.co.uk/10_a_lifetime_of_winters.mp3" },
        { title: "Take the Long Way", duration: "4:19", audio: "https://audio.penrec.co.uk/11_take_the_long_way.mp3" },
        { title: "Just Like You Did", duration: "5:03", audio: "https://audio.penrec.co.uk/12_just_like_you_did.mp3" },
        { title: "First One With You", duration: "4:22", audio: "https://audio.penrec.co.uk/13_first_one_with_you.mp3" },
        { title: "All I'll Remember", duration: "4:49", audio: "https://audio.penrec.co.uk/14_all_ill_remember.mp3" },
      ],
    },
    {
      album: "After Five",
      cover: "https://audio.penrec.co.uk/fifth-and-main/after-five-cover.jpg",
      year: "2026",
      catalogue: "PNR031",
      preview: "https://audio.penrec.co.uk/01_main_attraction.mp3",
      tracks: [
        { title: "Main Attraction", duration: "4:28", audio: "https://audio.penrec.co.uk/01_main_attraction.mp3" },
        { title: "Do You Always Get Your Way?", duration: "4:34", audio: "https://audio.penrec.co.uk/02_do_you_always_get_your_way.mp3" },
        { title: "You Love Me Back", duration: "4:27", audio: "https://audio.penrec.co.uk/03_you_love_me_back.mp3" },
        { title: "Keep Your Other Options", duration: "4:38", audio: "https://audio.penrec.co.uk/04_keep_your_other_options.mp3" },
        { title: "I Don't Hate You Anymore", duration: "4:23", audio: "https://audio.penrec.co.uk/05_i_dont_hate_you_anymore.mp3" },
        { title: "Predictable", duration: "4:20", audio: "https://audio.penrec.co.uk/06_predictable.mp3" },
        { title: "You've Already Got Me", duration: "4:37", audio: "https://audio.penrec.co.uk/07_youve_already_got_me.mp3" },
        { title: "You're Sorry I Found Out", duration: "4:39", audio: "https://audio.penrec.co.uk/08_youre_sorry_i_found_out.mp3" },
        { title: "Ask Me Properly", duration: "3:58", audio: "https://audio.penrec.co.uk/09_ask_me_properly.mp3" },
        { title: "Don't Decide Without Me", duration: "4:47", audio: "https://audio.penrec.co.uk/10_dont_decide_without_me.mp3" },
        { title: "You Heard Me", duration: "4:15", audio: "https://audio.penrec.co.uk/11_you_heard_me.mp3" },
        { title: "We've Earned This", duration: "4:08", audio: "https://audio.penrec.co.uk/12_weve_earned_this.mp3" },
        { title: "That Was Deliberate", duration: "4:15", audio: "https://audio.penrec.co.uk/13_that_was_deliberate.mp3" },
        { title: "Call Me Before You Call Her", duration: "4:57", audio: "https://audio.penrec.co.uk/14_call_me_before_you_call_her.mp3" },
        { title: "You Mistook My Patience", duration: "4:44", audio: "https://audio.penrec.co.uk/15_you_mistook_my_patience.mp3" },
      ],
    },
{
  "album": "Look at Us Now",
  "cover": "https://audio.penrec.co.uk/fifth-and-main/look-at-us-now-cover.jpg?v=pnr041",
  "year": "2026",
  "catalogue": "PNR041",
  "preview": "https://audio.penrec.co.uk/01_you_never_asked_me.mp3?v=pnr041",
  "tracks": [
    {
      "title": "You Never Asked Me",
      "duration": "4:03",
      "audio": "https://audio.penrec.co.uk/01_you_never_asked_me.mp3?v=pnr041"
    },
    {
      "title": "Not the Same as Missing Me",
      "duration": "5:25",
      "audio": "https://audio.penrec.co.uk/02_not_the_same_as_missing_me.mp3?v=pnr041"
    },
    {
      "title": "Say It Again",
      "duration": "3:47",
      "audio": "https://audio.penrec.co.uk/03_say_it_again.mp3?v=pnr041"
    },
    {
      "title": "We Never Finish a Fight",
      "duration": "3:54",
      "audio": "https://audio.penrec.co.uk/04_we_never_finish_a_fight.mp3?v=pnr041"
    },
    {
      "title": "I Should Have Asked You To Stay",
      "duration": "5:51",
      "audio": "https://audio.penrec.co.uk/05_i_should_have_asked_you_to_stay.mp3?v=pnr041"
    },
    {
      "title": "Everybody Gets a Version",
      "duration": "4:12",
      "audio": "https://audio.penrec.co.uk/06_everybody_gets_a_version.mp3?v=pnr041"
    },
    {
      "title": "I'm Glad Your Cancelled",
      "duration": "4:18",
      "audio": "https://audio.penrec.co.uk/07_im_glad_your_cancelled.mp3?v=pnr041"
    },
    {
      "title": "I'm In",
      "duration": "3:45",
      "audio": "https://audio.penrec.co.uk/08_im_in.mp3?v=pnr041"
    },
    {
      "title": "Love Me Like You Mean It",
      "duration": "3:52",
      "audio": "https://audio.penrec.co.uk/09_love_me_like_you_mean_it.mp3?v=pnr041"
    },
    {
      "title": "Don't Make Them Right About You",
      "duration": "3:53",
      "audio": "https://audio.penrec.co.uk/10_dont_make_them_right_about_you.mp3?v=pnr041"
    },
    {
      "title": "Go On Then",
      "duration": "3:23",
      "audio": "https://audio.penrec.co.uk/11_go_on_then.mp3?v=pnr041"
    },
    {
      "title": "One of Us Has to Say It",
      "duration": "4:23",
      "audio": "https://audio.penrec.co.uk/12_one_of_us_has_to_say_it.mp3?v=pnr041"
    },
    {
      "title": "You Don't Have to Be Strong With Me",
      "duration": "4:49",
      "audio": "https://audio.penrec.co.uk/13_you_dont_have_to_be_strong_with_me.mp3?v=pnr041"
    },
    {
      "title": "Tell Me The Worst",
      "duration": "3:52",
      "audio": "https://audio.penrec.co.uk/14_tell_me_the_worst.mp3?v=pnr041"
    },
    {
      "title": "Take the Compliment",
      "duration": "3:48",
      "audio": "https://audio.penrec.co.uk/15_take_the_compliment.mp3?v=pnr041"
    }
  ]
},
  ],
  "vierklang": [
    {
      album: "Zwischen den Jahren",
      cover: "https://audio.penrec.co.uk/vierklang/zwischen-den-jahren.jpg",
      year: "2026",
      catalogue: "PNR027",
      preview: "https://audio.penrec.co.uk/01_heiligabend_halb_neun.mp3",
      tracks: [
        { title: "Heiligabend, halb neun", duration: "3:53", audio: "https://audio.penrec.co.uk/01_heiligabend_halb_neun.mp3" },
        { title: "Drei Tage, zwei Familien", duration: "4:02", audio: "https://audio.penrec.co.uk/02_drei_tage_zwei_familien.mp3" },
        { title: "Später an Heiligabend", duration: "3:35", audio: "https://audio.penrec.co.uk/03_spater_an_heiligabend.mp3" },
        { title: "Noch eine Schicht bis Weihnachten", duration: "3:35", audio: "https://audio.penrec.co.uk/04_noch_eine_schicht_bis_weihnachten.mp3" },
        { title: "Dieses Jahr bei uns", duration: "3:35", audio: "https://audio.penrec.co.uk/05_dieses_jahr_bei_uns.mp3" },
        { title: "Nur noch zwei Tage bis Weihnachten", duration: "3:34", audio: "https://audio.penrec.co.uk/06_nur_noch_zwei_tage_bis_weihnachten.mp3" },
        { title: "Bis zum letzten Lied", duration: "4:03", audio: "https://audio.penrec.co.uk/07_bis_zum_letzten_lied.mp3" },
        { title: "Heute wird nicht früh gegangen", duration: "3:34", audio: "https://audio.penrec.co.uk/08_heute_wird_nicht_fruh_gegangen.mp3" },
        { title: "Wir kommen doch", duration: "3:33", audio: "https://audio.penrec.co.uk/09_wir_kommen_doch.mp3" },
        { title: "Letzter Samstag im Advent", duration: "3:35", audio: "https://audio.penrec.co.uk/10_letzter_samstag_im_advent.mp3" },
        { title: "Am zweiten Feiertag", duration: "3:36", audio: "https://audio.penrec.co.uk/11_am_zweiten_feiertag.mp3" },
        { title: "Vor der Bescherung", duration: "3:36", audio: "https://audio.penrec.co.uk/12_vor_der_bescherung.mp3" },
        { title: "Wenn der Weihnachtsmarkt schließt", duration: "3:36", audio: "https://audio.penrec.co.uk/13_wenn_der_weihnachtsmarkt_schliesst.mp3" },
        { title: "Nach der Christvesper", duration: "3:36", audio: "https://audio.penrec.co.uk/14_nach_der_christvesper.mp3" },
        { title: "Der Abend vor dem Abend", duration: "3:36", audio: "https://audio.penrec.co.uk/15_der_abend_vor_dem_abend.mp3" },
        { title: "Zwischen den Jahren", duration: "4:03", audio: "https://audio.penrec.co.uk/16_zwischen_den_jahren.mp3" },
        { title: "Am Morgen des Vierundzwanzigsten", duration: "4:00", audio: "https://audio.penrec.co.uk/17_am_morgen_des_vierundzwanzigsten.mp3" },
      ],
    },
  ],
  "shelley-dante": [
    {
      album: "I'm Glad You Called",
      cover: "https://audio.penrec.co.uk/shelley-dante/im-glad-you-called.jpg",
      year: "2026",
      catalogue: "PNR028",
      preview: "https://audio.penrec.co.uk/01_im_glad_you_called.mp3",
      tracks: [
        { title: "I'm Glad You Called", duration: "4:00", audio: "https://audio.penrec.co.uk/01_im_glad_you_called.mp3" },
        { title: "Don't Make Me Ask Again", duration: "4:09", audio: "https://audio.penrec.co.uk/02_dont_make_me_ask_again.mp3" },
        { title: "Stop Making Me Laugh", duration: "3:42", audio: "https://audio.penrec.co.uk/03_stop_making_me_laugh.mp3" },
        { title: "I Made Other Plans", duration: "4:14", audio: "https://audio.penrec.co.uk/04_i_made_other_plans.mp3" },
        { title: "Come Over Here", duration: "4:24", audio: "https://audio.penrec.co.uk/05_come_over_here.mp3" },
        { title: "Why Didn't We Do This Before?", duration: "4:17", audio: "https://audio.penrec.co.uk/06_why_didnt_we_do_this_before.mp3" },
        { title: "You Could've Told Me", duration: "3:43", audio: "https://audio.penrec.co.uk/07_you_couldve_told_me.mp3" },
        { title: "Call Somebody Else", duration: "3:23", audio: "https://audio.penrec.co.uk/08_call_somebody_else.mp3" },
        { title: "That's Not What You Said", duration: "4:12", audio: "https://audio.penrec.co.uk/09_thats_not_what_you_said.mp3" },
        { title: "I Could Get Used to You", duration: "3:49", audio: "https://audio.penrec.co.uk/10_i_could_get_used_to_you.mp3" },
        { title: "Don't Start", duration: "3:26", audio: "https://audio.penrec.co.uk/11_dont_start.mp3" },
        { title: "I Like You Best Like This", duration: "4:03", audio: "https://audio.penrec.co.uk/12_i_like_you_best_like_this.mp3" },
        { title: "Keep Me Company", duration: "4:03", audio: "https://audio.penrec.co.uk/13_keep_me_company.mp3" },
        { title: "Now You're Talking", duration: "4:14", audio: "https://audio.penrec.co.uk/14_now_youre_talking.mp3" },
        { title: "No Particular Reason", duration: "3:32", audio: "https://audio.penrec.co.uk/15_no_particular_reason.mp3" },
        { title: "I Needed This", duration: "3:38", audio: "https://audio.penrec.co.uk/16_i_needed_this.mp3" },
      ],
    },
  ],
};

function legacyRelease(artist: Artist): ReleaseData {
  const creditedArtist = artist as ReleaseArtist;
  return {
    album: artist.album,
    cover: artist.cover,
    year: artist.year,
    catalogue: artist.slug === "nikos-andros" ? "PNR021" : artist.catalogue,
    preview: artist.preview,
    tracks: artist.tracks,
    releaseCredit: creditedArtist.releaseCredit,
  };
}

export function getArtistReleases(artist: Artist): ReleaseData[] {
  return [legacyRelease(artist), ...(additionalReleases[artist.slug] ?? [])];
}

export function asReleaseArtist(artist: Artist, release: ReleaseData): ReleaseArtist {
  const { hero: _hero, profile: _profile, gallery: _gallery, heroPosition: _heroPosition, profilePosition: _profilePosition, ...releaseBase } = artist;
  return {
    ...releaseBase,
    description: release.description,
    album: release.album,
    cover: release.cover,
    year: release.year,
    catalogue: release.catalogue,
    preview: release.preview,
    tracks: release.tracks,
    releaseCredit: release.releaseCredit,
  };
}

export function getReleaseArtist(artist: Artist, catalogue?: string): ReleaseArtist {
  const releases = getArtistReleases(artist);
  const selected = catalogue
    ? releases.find((release) => release.catalogue.toLowerCase() === catalogue.toLowerCase())
    : releases[releases.length - 1];
  return asReleaseArtist(artist, selected ?? releases[releases.length - 1]);
}

export function getReleaseHref(artist: Artist, release: ReleaseData): string {
  const releases = getArtistReleases(artist);
  return releases.length === 1
    ? `/releases/${artist.slug}`
    : `/releases/${artist.slug}?release=${encodeURIComponent(release.catalogue)}`;
}

export type CatalogueRelease = ReleaseArtist & { releaseHref: string };

export function getCatalogueReleaseArtists(artists: Artist[]): CatalogueRelease[] {
  return artists.flatMap((artist) =>
    getArtistReleases(artist).map((release) => ({
      ...asReleaseArtist(artist, release),
      releaseHref: getReleaseHref(artist, release),
    })),
  );
}


export const completeCatalogueArtists: Artist[] = [
  ...artists,
  theVerelles,
  theParkers,
  maison45,
  localArrangement,
  directMotion,
  christieWalker,
  shine,
  francesMartine,
  hyx,
  reno,
  judeVarlow,
  tobiasTangleAndFriends,
  northArray,
  doorAtMidnight,
];

export const completeCatalogueReleases: CatalogueRelease[] = [
  ...getCatalogueReleaseArtists(completeCatalogueArtists),
  { ...saturdayBest, releaseHref: `/releases/${saturdayBest.slug}` },
];

export const completeCatalogueTrackCount = completeCatalogueReleases.reduce(
  (sum, release) => sum + release.tracks.length,
  0,
);
