import styles from "../styles/index.module.css";
import Link from "next/link";
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
			<div className={styles.float}>
				<Link href={"/"}>
					<a>Go Home</a>
				</Link>
				<AddChord chords={setChords} />
			</div>
			<ChordGroup chords={chords} setChords={setChords} />
		</>
	);
}
