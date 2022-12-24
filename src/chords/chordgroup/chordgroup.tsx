import sharedStyles from "../../../styles/shared.module.css";
import styles from "./chordgroup.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Scales } from "../scales/scales";
import { TChords } from "../types";
import { SmallChord } from "../smallchord/smallchord";
import SmallAddChord from "../smalladdchord/smalladdchord";
import { ChordSelector } from "../chordselector/chordselector";
import { v4 as uuid } from "uuid";
import { StdNote } from "../../notes/notes/notes";

export function ChordGroup({
	chords,
	setChords,
}: {
	chords: TChords;
	setChords: Dispatch<SetStateAction<TChords>>;
}) {
	const id = uuid();
	const [active, setActive] = useState(id);
	useEffect(() => {
		setChords({ [id]: [] });
	}, []);
	let notes = new Set<string>();
	if (chords) {
		let chordKeys = Object.keys(chords);
		chordKeys.forEach((key) => {
			chords[key].forEach((note) => {
				notes.add(StdNote(note)!.name);
			});
		});
	}
	const scale = [...notes.keys()].sort();
	return (
		<div className={styles.layout}>
			<section className={styles.selector}>
				{Object.keys(chords).map((i) => {
					return (
						<SmallChord
							key={i}
							id={i}
							active={active}
							setActive={setActive}
							chords={chords}
							setChords={setChords}
						/>
					);
				})}
				<SmallAddChord setActive={setActive} setChords={setChords} />
			</section>
			<section className={styles.main}>
				<ChordSelector active={active} chords={chords} setChords={setChords} />
			</section>
			<aside className={`${sharedStyles.card} ${styles.thin}`}>
				<Scales notes={scale} title="Global Scales" />
			</aside>
		</div>
	);
}
