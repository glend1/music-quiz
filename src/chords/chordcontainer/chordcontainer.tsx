import { isChord } from "../../notes/notes/notes";
import { ChordInformation } from "../chordinformation/chordinformation";
import { TNotes } from "../dictionaryutils/dictionaryutils";
import { Scales } from "../scales/scales";

export function ChordContainer({ notes }: TNotes) {
	if (!isChord(notes)) {
		return <div>No valid Chord</div>;
	}
	return (
		<div>
			<ChordInformation notes={notes} />
			<Scales notes={notes} />
		</div>
	);
}
