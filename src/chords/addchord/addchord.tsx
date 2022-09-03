import { MouseEventHandler } from "react";
import sharedStyles from "../../../styles/shared.module.css";
import styles from "./addchord.module.css";
import * as ReactDOM from "react-dom/client";
import React from "react";
import { ChordSelector } from "../chordselector/chordselector";
import { TChordMethod } from "../types";

export default function AddChord({ chords }: TChordMethod) {
	const add: MouseEventHandler<HTMLAnchorElement | HTMLElement> = (e) => {
		let container = document.querySelector(`.${sharedStyles.container}`);
		let add = document.querySelector(`.${styles.add}`);
		if (container && add) {
			let div = document.createElement("div");
			div.classList.add(sharedStyles.card);
			container.insertBefore(div, add);
			ReactDOM.createRoot(div).render(
				<React.StrictMode>
					<ChordSelector chords={chords} />
				</React.StrictMode>
			);
		}
	};
	return (
		<div
			className={`${sharedStyles.card} ${styles.add} clickable`}
			onClick={add}
		>
			<h2>Add Chord</h2>
		</div>
	);
}
