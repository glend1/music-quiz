import styles from "../../../styles/index.module.css";
import { TChords } from "../dictionaryutils/dictionaryutils";
import { Dispatch, SetStateAction } from "react";
import { ChordSelector } from "../chordselector/chordselector";
import { Scales } from "../scales/scales";

export function ChordGroup({
	chords,
	setChords,
}: {
	chords: TChords;
	setChords: Dispatch<SetStateAction<TChords>>;
}) {
	let notes = new Map();
	Object.keys(chords).forEach((i) => {
		chords[i].forEach((j) => {
			notes.set(j, true);
		});
	});
	const scale = [...notes.keys()].sort();
	return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<ChordSelector chords={setChords} />
				</div>
			</div>
			<div className={styles.card}>
				<Scales notes={scale} />
			</div>
		</>
	);
}
