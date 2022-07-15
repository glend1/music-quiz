import dStyles from "../../units/dictionaryutils/dictionaryutils.module.css";
import { uniqueChords } from "../../../util/extensions/notes/notes";
import { TNotes } from "../dictionaryutils/dictionaryutils";

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
