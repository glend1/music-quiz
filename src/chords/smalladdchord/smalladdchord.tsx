import styles from "./smalladdchord.module.css";
import { v4 as uuid } from "uuid";
import { TChords } from "../types";
import { Dispatch, SetStateAction } from "react";

export default function SmallAddChord({
	setChords,
	setActive,
}: {
	setChords: Dispatch<SetStateAction<TChords>>;
	setActive: Dispatch<SetStateAction<string>>;
}) {
	return (
		<div
			className={`${styles.add} clickable`}
			onClick={() => {
				setChords((prev) => {
					let id = uuid();
					setActive(id);
					return { ...prev, [id]: [] };
				});
			}}
		></div>
	);
}
