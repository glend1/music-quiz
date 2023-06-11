import { getSingleChord } from "../../notes/notes/notes";
import Image from "next/image";
import dStyles from "../deleteparent/deleteparent.module.css";
import React from "react";
import { list } from "../../elements/images";
import { Chord } from "../chord/chord";
import {
	ModalContext,
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
		chordMessage = "Select a Chord by Clicking the Notes";
	}
	const [, setModalState] = useModalContext();
	return (
		<div>
			{chordMessage ? (
				chordMessage
			) : (
				<>
					<span className={dStyles.bold}>Chord Name</span>
					<div
						className={`${dStyles.bubble} clickable`}
						onClick={() => {
							setModalState((prev) => [
								...prev,
								{
									title: chord || "N/A",
									node: <Chord key={prev.length} name={chord} notes={notes} />,
								},
							]);
						}}
					>
						<span className={dStyles.align}>{chord}</span>
						<Image src={list} alt="Chord Information" />
					</div>
				</>
			)}
		</div>
	);
}
