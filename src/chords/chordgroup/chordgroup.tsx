import sharedStyles from "../../../styles/shared.module.css";
import styles from "./chordgroup.module.css";
import { Dispatch, SetStateAction } from "react";
import { ChordSelector } from "../chordselector/chordselector";
import { Scales } from "../scales/scales";
import AddChord from "../addchord/addchord";
import { TChords } from "../types";

export function ChordGroup({
	chords,
	setChords,
}: {
	chords: TChords;
	setChords: Dispatch<SetStateAction<TChords>>;
}) {
	let notes = new Map();
	let chordNumbers = Object.keys(chords);
	chordNumbers.forEach((i) => {
		chords[i].forEach((j) => {
			notes.set(j, true);
		});
	});
	const scale = [...notes.keys()].sort();
	return (
		<div className={styles.flex}>
			<section className={`${styles.container} ${styles.wide}`}>
				<div className={sharedStyles.card}>
					<ChordSelector chords={setChords} />
				</div>
				<AddChord chords={setChords} />
			</section>
			<aside className={`${sharedStyles.card} ${styles.thin}`}>
				<Scales notes={scale} title="Global Scales" />
			</aside>
		</div>
	);
}
