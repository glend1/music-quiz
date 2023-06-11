import { Dispatch, SetStateAction } from "react";

export type TChords = { [key: string]: Array<string> } & Object;
export type TChordMethod = { chords: Dispatch<SetStateAction<TChords>> };
export type TNotes = { notes: string[]; name?: string };
export type TScale = { scale: string; root: string };
