import { useId } from "react";
import { CheckBox } from "../../elements/checkbox/checkbox";
import { useBoolean } from "../../util/customhooks/customhooks";
import { ChordInformation } from "../chordinformation/chordinformation";
import { Scales } from "../scales/scales";
import { TNotes } from "../types";
import styles from "./chordcontainer.module.css";

export function ChordContainer({ notes }: TNotes) {
	const id = useId();
	const { bool: scale, toggle: toggleScale } = useBoolean(false);
	return (
		<div>
			<ChordInformation notes={notes} />
			<div className={styles.scale_visiblity}>
				<CheckBox
					id={`scale_visibility_${id}`}
					label={"Show Local Scales?"}
					bool={scale}
					toggle={toggleScale}
				/>
			</div>
			{scale ? <Scales notes={notes} /> : null}
		</div>
	);
}
