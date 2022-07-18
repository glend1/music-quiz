import { Piano } from "../../canvas/piano/piano";
import { isChord, IStdNote, simplify, StdNote } from "../../notes/notes/notes";
import dStyles from "../dictionaryutils/dictionaryutils.module.css";
import { TNotes } from "../dictionaryutils/dictionaryutils";
import { Inversions } from "../inversions/inversions";

export function Chord({ notes }: TNotes) {
	if (isChord(notes)) {
		let simplified: IStdNote[] = [];
		notes.forEach((note) => {
			simplified.push(StdNote(`${simplify(note)}4`));
		});
		return (
			<>
				<Piano
					width={100}
					height={50}
					highlight={simplified}
					cb={(e: React.MouseEvent<SVGElement>): void => {}}
				></Piano>
				<span className={dStyles.bold}>Notes</span>
				{notes.map((note) => {
					return (
						<div className={dStyles.bubble} key={note}>
							{note}
						</div>
					);
				})}
				<Inversions notes={notes}></Inversions>
			</>
		);
	}
	return <div>Not a valid Chord</div>;
}
