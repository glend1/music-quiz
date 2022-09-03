import { getSingleChord } from "../../notes/notes/notes";
import Image from "next/image";
import dStyles from "../deleteparent/deleteparent.module.css";
import React from "react";
import { list } from "../../elements/images";
import { Chord } from "../chord/chord";
import {
	GlobalModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import { TNotes } from "../types";

export function ChordInformation({ notes }: TNotes) {
	var chordMessage: string | null;
	var chord: string | undefined;
	if (notes && notes.length) {
		chord = getSingleChord(notes);
		if (chord == undefined) {
			chordMessage = "No Chord found";
		} else {
			chordMessage = null;
		}
	} else {
		chordMessage = "Click a Key to begin Chord selection";
	}
	const modal = useModalContext();
	return (
		<div>
			{chordMessage ? (
				chordMessage
			) : (
				<>
					{" "}
					<span className={dStyles.bold}>Chord Name</span>
					<div
						className={`${dStyles.bubble} clickable`}
						onClick={modal((data) => {
							return (
								<React.StrictMode>
									<GlobalModalContext>
										<Chord name={chord} notes={notes} />
									</GlobalModalContext>
								</React.StrictMode>
							);
						})}
					>
						<span className={dStyles.align}>{chord}</span>
						<Image src={list} alt="Chord Information" />
					</div>
				</>
			)}
		</div>
	);
}
