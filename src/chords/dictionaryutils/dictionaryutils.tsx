// import * as ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import iStyles from "../../../styles/index.module.css";
import styles from "./dictionaryutils.module.css";
import React, { Dispatch, SetStateAction } from "react";
import { ChordSelector } from "../chordselector/chordselector";

type OptionalCallback = { cb?: () => void };
export type TChords = { [key: string]: Array<string> } & Object;
export type TChordMethod = { chords: Dispatch<SetStateAction<TChords>> };
export type TNotes = { notes: string[] };
export type TScale = { scale: string; root: string };

export function AddChord({ chords }: TChordMethod) {
	return (
		<button
			onClick={(e) => {
				let container = document.querySelector(`.${iStyles.container}`);
				if (container) {
					let div = document.createElement("div");
					div.classList.add(iStyles.card);
					container.appendChild(div);
					// ReactDOM.createRoot(div).render(<React.StrictMode><ChordSelector chords={chords}/></React.StrictMode>)
					ReactDOM.render(
						<React.StrictMode>
							<ChordSelector chords={chords} />
						</React.StrictMode>,
						div
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
