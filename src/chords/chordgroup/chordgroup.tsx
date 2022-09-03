import styles from "../../../styles/shared.module.css";
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
		<>
			<section className={styles.container}>
				<div className={styles.card}>
					<ChordSelector chords={setChords} />
				</div>
				<AddChord chords={setChords} />
			</section>
			{chordNumbers.length >= 2 ? (
				<section className={styles.card}>
					<Scales notes={scale} />
				</section>
			) : null}
		</>
	);
}
