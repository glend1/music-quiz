import * as ReactDOM from "react-dom/client";
import styles from "./dictionaryutils.module.css";
import sStyles from "../../../styles/shared.module.css";
import React, { Dispatch, SetStateAction } from "react";
import { ChordSelector } from "../chordselector/chordselector";

type OptionalCallback = { cb?: () => void };
export type TChords = { [key: string]: Array<string> } & Object;
export type TChordMethod = { chords: Dispatch<SetStateAction<TChords>> };
export type TNotes = { notes: string[]; name?: string };
export type TScale = { scale: string; root: string };

export function AddChord({ chords }: TChordMethod) {
	return (
		<button
			className={sStyles.float}
			onClick={(e) => {
				let container = document.querySelector(`.${sStyles.container}`);
				if (container) {
					let div = document.createElement("div");
					div.classList.add(sStyles.card);
					container.appendChild(div);
					ReactDOM.createRoot(div).render(
						<React.StrictMode>
							<ChordSelector chords={chords} />
						</React.StrictMode>
					);
				}
			}}
		>
			Add
		</button>
	);
}

export function DeleteParent({ cb }: OptionalCallback) {
	return (
		<button
			className={styles.deleteParent}
			onClick={(e) => {
				const element = e.target as HTMLElement;
				if (element.parentNode) {
					const parentElement = element.parentNode;
					if (parentElement.parentNode) {
						parentElement.parentNode.removeChild(parentElement);
						if (cb) {
							cb();
						}
					}
				}
			}}
		>
			Remove
		</button>
	);
}
