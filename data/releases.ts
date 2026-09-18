import { artists, type Artist, type Track } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { saturdayBest } from "@/data/saturday-best";

export type ReleaseData = {
  album: string;
  cover: string;
  year: string;
  catalogue: string;
  preview: string;
  tracks: Track[];
  releaseCredit?: string;
};

export type ReleaseArtist = Omit<Artist, "hero" | "profile" | "gallery" | "heroPosition" | "profilePosition"> & { releaseCredit?: string };

const additionalReleases: Partial<Record<string, ReleaseData[]>> = {
  "the-glamour-katz": [
    {
      album: "Make Him Mine",
      cover: "/images/covers/the-glamour-katz-make-him-mine.jpg",
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
      cover: "/images/covers/fifth-and-main-christmas.jpg",
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
  const { hero: _hero, profile: _profile, gallery: _gallery, heroPosition: _heroPosition, profilePosition: _profilePosition, ...artistWithoutIdentityImages } = artist;
  return {
    ...artistWithoutIdentityImages,
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
];

export const completeCatalogueReleases: CatalogueRelease[] = [
  ...getCatalogueReleaseArtists(completeCatalogueArtists),
  { ...saturdayBest, releaseHref: `/releases/${saturdayBest.slug}` },
];

export const completeCatalogueTrackCount = completeCatalogueReleases.reduce(
  (sum, release) => sum + release.tracks.length,
  0,
);
