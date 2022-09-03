import { ChordInformation } from "../chordinformation/chordinformation";
import { Scales } from "../scales/scales";
import { TNotes } from "../types";

export function ChordContainer({ notes }: TNotes) {
	return (
		<div>
			<ChordInformation notes={notes} />
			<Scales notes={notes} />
		</div>
	);
}
