import { useState } from "react";
import React from "react";
import {
	AddChord,
	TChords,
} from "../src/chords/dictionaryutils/dictionaryutils";
import { ChordGroup } from "../src/chords/chordgroup/chordgroup";

export default function Dictionary() {
	const [chords, setChords] = useState<TChords>({});
	return (
		<>
			<AddChord chords={setChords} />
			<ChordGroup chords={chords} setChords={setChords} />
		</>
	);
}
