import { Piano } from "../../canvas/piano/deletepiano";
import {
	getScaleNotes,
	IStdNote,
	simplify,
	StdNote,
} from "../../notes/notes/notes";
import dStyles from "../deleteparent/deleteparent.module.css";
import { ChordsFromScale } from "../chordfromscale/chordfromscale";
import { capitalizeFirstLetter } from "../../util/string/string";
import { TScale } from "../types";

export function ScaleInformation({ scale, root }: TScale) {
	if (scale && root) {
		const notes = getScaleNotes(root, scale);
		let simplified: IStdNote[] = [];
		notes.forEach((note) => {
			simplified.push(StdNote(`${simplify(note)}4`));
		});
		return (
			<div>
				<h3>Scale: {capitalizeFirstLetter(`${root} ${scale}`)}</h3>
				<Piano
					width={100}
					height={50}
					highlight={simplified}
					cb={(e: React.MouseEvent<SVGElement>): void => {}}
				></Piano>
				<div>
					<span className={dStyles.bold}>Notes</span>
					{notes.map((i) => {
						return (
							<div key={i} className={dStyles.bubble}>
								{i}
							</div>
						);
					})}
				</div>
				<ChordsFromScale notes={notes}></ChordsFromScale>
			</div>
		);
	}
	return <div>Please provide some Scale infromation</div>;
}
