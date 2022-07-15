import styles from "../styles/index.module.css";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import {
	AddChord,
	TChords,
} from "../src/components/units/dictionaryutils/dictionaryutils";
import { ChordGroup } from "../src/components/compound/chordgroup/chordgroup";

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
