import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Piano } from "../../canvas/piano/deletepiano";
import Image from "next/image";
import { cross } from "../../elements/images";
import { getSingleChord, IStdNote, StdNote } from "../../notes/notes/notes";
import { TChords } from "../types";
import styles from "./smallchord.module.css";

export function SmallChord({
	chords,
	active,
	setChords,
	id,
	setActive,
}: {
	active: string;
	setActive: Dispatch<SetStateAction<string>>;
	chords: TChords;
	setChords: Dispatch<SetStateAction<TChords>>;
	id: string;
}) {
	let clickEvent: MouseEventHandler<HTMLElement> = (e) => {
		setActive(id);
	};
	let selected: IStdNote[] = [];
	if (chords[id]) {
		selected = chords[id].map((i) => {
			return StdNote(i);
		});
	}
	let chord = getSingleChord(chords[id]);
	return (
		<div
			onClick={clickEvent}
			className={`${styles.chord} ${active == id ? styles.active : null}`}
		>
			<Image
				onClick={(e) => {
					e.stopPropagation();
					if (id == active) {
						let ids = Object.keys(chords);
						let index = ids.indexOf(id);
						let previousId = ids[index - 1];
						if (previousId) {
							setActive(previousId);
						}
					}
					setChords((prev) => {
						delete prev[id];
						return { ...prev };
					});
				}}
				height={25}
				src={cross}
				alt="Delete Chord"
			/>
			<span>{chord}</span>
			<Piano
				width={100}
				height={50}
				highlight={selected}
				cb={function (): void {}}
			/>
		</div>
	);
}
