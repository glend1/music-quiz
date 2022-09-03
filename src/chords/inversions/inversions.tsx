import dStyles from "../deleteparent/deleteparent.module.css";
import { uniqueChords } from "../../notes/notes/notes";
import { TNotes } from "../types";

export function Inversions({ notes }: TNotes) {
	const chords = uniqueChords(notes);
	if (chords.length > 0) {
		return (
			<div>
				<span className={dStyles.bold}>Inversions</span>
				{chords.map((chord, i) => {
					return (
						<div key={i} className={dStyles.bubble}>
							{chord}
						</div>
					);
				})}
			</div>
		);
	}
	return <div>No Chords found</div>;
}
