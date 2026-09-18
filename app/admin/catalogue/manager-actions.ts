"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createManagedArtist, createManagedRelease, createManagedTrack, deleteManagedTrack, updateManagedArtist, updateManagedRelease, updateManagedTrack, upsertManagedArtist, upsertManagedRelease, upsertManagedTrack, type CatalogueStatus, type ReleaseType } from "@/lib/catalogue-manager";
import { currentCatalogueArtists } from "@/data/current-catalogue";
import { getArtistReleases } from "@/data/releases";
const text=(d:FormData,n:string)=>String(d.get(n)||"").trim();
const nullable=(d:FormData,n:string)=>text(d,n)||null;
const slugify=(v:string)=>v.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export async function saveArtist(d:FormData){await requireAdmin();const id=text(d,"id"),name=text(d,"name"),slug=slugify(text(d,"slug")||name);if(!name||!slug)redirect("/admin/catalogue?error=Artist+name+and+slug+are+required");const payload={name,slug,biography:nullable(d,"biography"),image:nullable(d,"image"),website:nullable(d,"website"),spotify:nullable(d,"spotify"),apple_music:nullable(d,"apple_music"),instagram:nullable(d,"instagram"),status:text(d,"status") as CatalogueStatus};try{id?await updateManagedArtist(id,payload):await createManagedArtist(payload)}catch(e){redirect(`/admin/catalogue?error=${encodeURIComponent(e instanceof Error?e.message:"Unable to save artist")}`)}revalidatePath("/admin/catalogue");redirect("/admin/catalogue?saved=artist");}
export async function saveRelease(d:FormData){await requireAdmin();const id=text(d,"id"),title=text(d,"title"),slug=slugify(text(d,"slug")||title);if(!text(d,"artist_id")||!title||!slug)redirect("/admin/catalogue?error=Artist,+title+and+slug+are+required");const price=Math.max(0,Math.round(Number(text(d,"price")||0)*100));const pub=nullable(d,"publish_at");const payload={artist_id:text(d,"artist_id"),title,slug,release_type:text(d,"release_type") as ReleaseType,catalogue_number:nullable(d,"catalogue_number"),release_date:nullable(d,"release_date"),description:nullable(d,"description"),artwork:nullable(d,"artwork"),price_pence:price,currency:(text(d,"currency")||"GBP").toUpperCase(),status:text(d,"status") as CatalogueStatus,publish_at:pub?new Date(pub).toISOString():null};try{id?await updateManagedRelease(id,payload):await createManagedRelease(payload)}catch(e){redirect(`/admin/catalogue?error=${encodeURIComponent(e instanceof Error?e.message:"Unable to save release")}`)}revalidatePath("/admin/catalogue");redirect("/admin/catalogue?saved=release");}
export async function saveTrack(d:FormData){await requireAdmin();const id=text(d,"id"),releaseId=text(d,"release_id"),title=text(d,"title");if(!releaseId||!title)redirect("/admin/catalogue?error=Release+and+track+title+are+required");const payload={release_id:releaseId,track_number:Math.max(1,Number(text(d,"track_number")||1)),title,duration:nullable(d,"duration"),isrc:nullable(d,"isrc"),lyrics:nullable(d,"lyrics"),credits:nullable(d,"credits"),preview_audio:nullable(d,"preview_audio"),master_audio:nullable(d,"master_audio")};try{id?await updateManagedTrack(id,payload):await createManagedTrack(payload)}catch(e){redirect(`/admin/catalogue/releases/${releaseId}?error=${encodeURIComponent(e instanceof Error?e.message:"Unable to save track")}`)}revalidatePath(`/admin/catalogue/releases/${releaseId}`);redirect(`/admin/catalogue/releases/${releaseId}?saved=track`);}
export async function removeTrack(d:FormData){await requireAdmin();const id=text(d,"id"),releaseId=text(d,"release_id");if(id)await deleteManagedTrack(id);revalidatePath(`/admin/catalogue/releases/${releaseId}`);redirect(`/admin/catalogue/releases/${releaseId}?saved=removed`);}

export async function syncCurrentCatalogue(){await requireAdmin();try{
  for(const artist of currentCatalogueArtists){
    const artistRows=await upsertManagedArtist({name:artist.name,slug:artist.slug,biography:Array.isArray(artist.bio)?artist.bio.join("\n\n"):artist.bio||null,image:artist.profile||artist.hero||null,website:null,spotify:null,apple_music:null,instagram:null,status:"published"});
    const managedArtist=artistRows[0]; if(!managedArtist) throw new Error(`Unable to sync ${artist.name}`);
    for(const release of getArtistReleases(artist)){
      const releaseSlug=`${artist.slug}-${release.catalogue.toLowerCase()}`;
      const releaseRows=await upsertManagedRelease({artist_id:managedArtist.id,title:release.album,slug:releaseSlug,release_type:"album",catalogue_number:release.catalogue||null,release_date:release.year?`${release.year}-01-01`:null,description:null,artwork:release.cover||null,price_pence:0,currency:"GBP",status:"published",publish_at:null});
      const managedRelease=releaseRows[0]; if(!managedRelease) throw new Error(`Unable to sync ${release.album}`);
      for(let i=0;i<release.tracks.length;i++){const track=release.tracks[i];await upsertManagedTrack({release_id:managedRelease.id,track_number:i+1,title:track.title,duration:track.duration||null,isrc:null,lyrics:null,credits:null,preview_audio:track.audio||null,master_audio:null});}
    }
  }
}catch(e){redirect(`/admin/catalogue?error=${encodeURIComponent(e instanceof Error?e.message:"Unable to sync catalogue")}`)}
revalidatePath("/admin/catalogue");redirect("/admin/catalogue?saved=sync");}
