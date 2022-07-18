import { useBoolean } from "../../util/customhooks/customhooks";
import { Chord, IStdNote } from "../../notes/notes/notes";
import {
	IntervalT,
	TType,
} from "../../notes/usequestiongeneration/usequestiongeneration";
import { CheckBox } from "../../elements/checkbox/checkbox";
import styles from "./questioncontrols.module.css";

function highlightNote(i: number, j: number, string: string | undefined) {
	return i == j ? (
		<span key={i} className={styles.highlight}>
			{string}
		</span>
	) : (
		<span key={i}>{string}</span>
	);
}

export function QuestionControls({
	type,
	chord,
	root,
	interval,
	question,
	current,
}: {
	current: number;
	question: IStdNote[];
	type: TType;
	chord: Chord | undefined;
	interval: IntervalT | undefined;
	root: IStdNote;
}) {
	const { bool: showAnswer, toggle: toggleViewQuestions } = useBoolean(false);
	return (
		<>
			<h3>{type}</h3>
			{root && root.note ? <h3>{root.note}</h3> : ""}
			{type == "Chord" && chord ? <h3>{chord.symbol}</h3> : ""}
			{type == "Interval" && interval ? <h3>{interval.description}</h3> : ""}
			<CheckBox
				id={"viewQuestions"}
				label={"Show Answer"}
				bool={showAnswer}
				toggle={toggleViewQuestions}
			/>
			{question && showAnswer ? (
				<h3 className={styles.answer}>
					{question.map((e, i) => {
						if (e && e.note) {
							return highlightNote(i, current, e.note);
						}
					})}
				</h3>
			) : (
				""
			)}
		</>
	);
}
