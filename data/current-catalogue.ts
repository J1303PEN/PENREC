import { artists } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { saturdayBest } from "@/data/saturday-best";

export const currentCatalogueArtists = [
  ...artists,
  theVerelles,
  theParkers,
  maison45,
  localArrangement,
  directMotion,
  christieWalker,
  saturdayBest,
];
