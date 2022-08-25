import { ChordInformation } from "../chordinformation/chordinformation";
import { TNotes } from "../dictionaryutils/dictionaryutils";
import { Scales } from "../scales/scales";

export function ChordContainer({ notes }: TNotes) {
	return (
		<div>
			<ChordInformation notes={notes} />
			<Scales notes={notes} />
		</div>
	);
}
