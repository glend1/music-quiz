import { Dispatch, SetStateAction, useEffect, useState } from "react";
import kStyles from "../../canvas/piano/piano.module.css";
import dStyles from "../deleteparent/deleteparent.module.css";
import { ChordContainer } from "../chordcontainer/chordcontainer";
import { TChordMethod } from "../types";
import { TChords } from "../types";
import { IStdNote, StdNote } from "../../notes/notes/notes";
import { Piano } from "../../canvas/piano/piano";

export function ChordSelector({
	setChords,
	active,
	chords,
}: {
	setChords: Dispatch<SetStateAction<TChords>>;
	active: string;
	chords: TChords;
}) {
	let highlight: IStdNote[] = [];
	let simplified: string[] = [];
	if (chords[active]) {
		for (let i = 0; i < chords[active].length; i++) {
			let currentNote = StdNote(chords[active][i]);
			highlight.push(currentNote);
			simplified.push(currentNote!.name);
		}
	}
	return (
		<>
			<h2>Chord</h2>
			<span className={dStyles.bold}>Select a Chord</span>
			<Piano
				clickable={true}
				octaves={[3, 4]}
				highlight={highlight}
				cb={(e: React.MouseEvent<SVGElement>): void => {
					let pathElement = e.target as SVGElement;
					let clickedKeyData = pathElement.dataset;
					let note: string = "";
					if (clickedKeyData.natural) {
						note = clickedKeyData.natural;
					}
					if (clickedKeyData.sharp) {
						note = clickedKeyData.sharp;
					}
					if (clickedKeyData.octave) {
						note += clickedKeyData.octave;
					}
					if (chords[active].includes(note)) {
						setChords((prev) => {
							let filtered = prev[active].filter((current) => current != note);
							prev[active] = filtered;
							return { ...prev };
						});
					} else {
						setChords((prev) => {
							if (prev[active].includes(note)) {
								return prev;
							}
							prev[active].push(note);
							return { ...prev };
						});
					}
				}}
			/>
			<ChordContainer notes={simplified} />
		</>
	);
}
