import { Piano } from "../../canvas/piano/piano";
import { isChord, IStdNote, simplify, StdNote } from "../../notes/notes/notes";
import dStyles from "../deleteparent/deleteparent.module.css";
import { Inversions } from "../inversions/inversions";
import { TNotes } from "../types";

export function Chord({ notes, name }: TNotes) {
	if (isChord(notes)) {
		let simplified: IStdNote[] = [];
		notes.forEach((note) => {
			simplified.push(StdNote(`${simplify(note)}4`));
		});
		return (
			<>
				<h3>Chord: {name}</h3>
				<Piano
					width={100}
					height={50}
					highlight={simplified}
					cb={(e: React.MouseEvent<SVGElement>): void => {}}
				></Piano>
				<div>
					<span className={dStyles.bold}>Notes</span>
					{notes.map((note) => {
						return (
							<div className={dStyles.bubble} key={note}>
								{note}
							</div>
						);
					})}
				</div>
				<Inversions notes={notes}></Inversions>
			</>
		);
	}
	return <div>Not a valid Chord</div>;
}
