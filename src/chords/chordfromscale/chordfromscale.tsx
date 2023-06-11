import { chordsFromScale } from "../../notes/notes/notes";
import Image from "next/image";
import dStyles from "../deleteparent/deleteparent.module.css";
import React from "react";
import { list } from "../../elements/images";
import { Chord } from "../chord/chord";
import {
	ModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import styles from "./chordfromscale.module.css";
import { TNotes } from "../types";

export function ChordsFromScale({ notes: scale }: TNotes) {
	const scales = chordsFromScale(scale);
	const [, setModalState] = useModalContext();
	if (scales.length > 0) {
		return (
			<>
				<span className={dStyles.bold}>Chords in Scale</span>
				<div className={styles.container}>
					{scales.map((chordCollection) => {
						return (
							<div
								onClick={() => {
									setModalState((prev) => [
										...prev,
										{
											title: chordCollection.name,
											node: (
												<Chord
													key={prev.length}
													name={chordCollection.name}
													notes={chordCollection.notes}
												/>
											),
										},
									]);
								}}
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
