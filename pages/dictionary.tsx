import { useState } from "react";
import React from "react";
import { ChordGroup } from "../src/chords/chordgroup/chordgroup";
import { TChords } from "../src/chords/types";

export default function Dictionary() {
	const [chords, setChords] = useState<TChords>({});
	return <ChordGroup chords={chords} setChords={setChords} />;
}
