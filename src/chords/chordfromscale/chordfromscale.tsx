import { chordsFromScale } from "../../notes/notes/notes";
import { TNotes } from "../dictionaryutils/dictionaryutils";
import Image from "next/image";
import dStyles from "../dictionaryutils/dictionaryutils.module.css";
import React from "react";
import { list } from "../../elements/images";
import { Chord } from "../chord/chord";
import {
	GlobalModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import styles from "./chordfromscale.module.css";

export function ChordsFromScale({ notes: scale }: TNotes) {
	const scales = chordsFromScale(scale);
	const modal = useModalContext();
	if (scales.length > 0) {
		return (
			<>
				<span className={dStyles.bold}>Chords in Scale</span>
				<div className={styles.container}>
					{scales.map((chordCollection) => {
						return (
							<div
								onClick={modal((data) => {
									return (
										<React.StrictMode>
											<GlobalModalContext>
												<Chord
													name={chordCollection.name}
													notes={chordCollection.notes}
												/>
											</GlobalModalContext>
										</React.StrictMode>
									);
								})}
								className={`${dStyles.bubble} clickable`}
								key={chordCollection.name}
							>
								<span className={dStyles.align}>{chordCollection.name}</span>
								<Image src={list} alt="Chord Information" />
							</div>
						);
					})}
				</div>
			</>
		);
	}
	return <div>No Chords found</div>;
}
