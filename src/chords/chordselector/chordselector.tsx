import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Piano } from "../../canvas/piano/piano";
import kStyles from "../../canvas/piano/piano.module.css";
import dStyles from "../dictionaryutils/dictionaryutils.module.css";
import { TChordMethod } from "../dictionaryutils/dictionaryutils";
import { DeleteParent } from "../dictionaryutils/dictionaryutils";
import { ChordContainer } from "../chordcontainer/chordcontainer";

export function ChordSelector({ chords }: TChordMethod) {
	const [uid] = useState(uuid());
	const [notes, setNotes] = useState<string[]>([]);
	return (
		<>
			<h2>Chord</h2>
			<span className={dStyles.bold}>Select a Chord</span>
			<Piano
				higher={true}
				highlight={[]}
				cb={(e: React.MouseEvent<SVGElement>): void => {
					let path = e.target as SVGElement;
					path.classList.toggle(kStyles.show);
					let selected: string[] = [];
					let g = path.parentNode;
					if (g) {
						let key = g.parentNode;
						if (key) {
							key.querySelectorAll(`.${kStyles.show}`).forEach((e) => {
								let el = e as SVGElement;
								let note: string | undefined = undefined;
								if (el.dataset.natural) {
									note = el.dataset.natural;
								} else {
									note = el.dataset.sharp;
								}
								if (note) {
									if (note.length) {
										selected.push(note);
									}
								}
							});
							setNotes(() => selected);
							chords((prev) => {
								prev[uid] = selected;
								return { ...prev };
							});
							let keyContainer = key.parentNode;
							if (keyContainer) {
								let card = keyContainer.parentNode;
								if (card) {
									let generated = card.querySelector(`.generated`);
									if (generated) {
										generated.remove();
									}
								}
							}
						}
					}
				}}
			/>
			<ChordContainer notes={notes} />
			<DeleteParent
				cb={() => {
					chords((prev) => {
						delete prev[uid];
						return { ...prev };
					});
				}}
			/>
		</>
	);
}
