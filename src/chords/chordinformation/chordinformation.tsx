import { getSingleChord } from "../../notes/notes/notes";
import { TNotes } from "../dictionaryutils/dictionaryutils";
import Image from "next/image";
import dStyles from "../dictionaryutils/dictionaryutils.module.css";
import * as ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import React from "react";
import { list } from "../../elements/images";
import { Chord } from "../chord/chord";

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
	return (
		<div>
			{chordMessage ? (
				chordMessage
			) : (
				<>
					{" "}
					<span className={dStyles.bold}>Chord Name</span>
					<div className={dStyles.bubble}>
						<span className={dStyles.align}>{chord}</span>
						<Image
							className="clickable"
							onClick={(e) => {
								let el = (e.target as HTMLElement).parentElement!
									.parentElement!;
								let generated = el.querySelector(".generated");
								if (generated) {
									generated.remove();
								} else {
									let div = document.createElement("div");
									div.className = "generated";
									el.appendChild(div);
									ReactDOM.createRoot(div).render(
										<React.StrictMode>
											<Chord notes={notes} />
										</React.StrictMode>
									);
									// ReactDOM.render(
									// 	<React.StrictMode>
									// 		<Chord notes={notes} />
									// 	</React.StrictMode>,
									// 	div
									// );
								}
							}}
							src={list}
							alt="Chord Information"
						/>
					</div>
				</>
			)}
		</div>
	);
}
