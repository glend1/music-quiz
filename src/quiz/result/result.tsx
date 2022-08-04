import { useEffect, useState } from "react";
import { HistoryTable, IHistory } from "../historytable/historytable";
import {
	useCounter,
	useStopwatch,
	useArray,
} from "../../util/customhooks/customhooks";
import { IStdNote } from "../../notes/notes/notes";

type IAnswer = {
	question: IStdNote;
	answer: IStdNote[];
	nextQuestion: () => void;
};

export function Result({ question, answer, nextQuestion }: IAnswer) {
	const { i: hits, increment: incrementHits, set: setHits } = useCounter();
	const {
		i: misses,
		increment: incrementMisses,
		set: setMisses,
	} = useCounter();
	const [message, setMessage] = useState("No Attempt");
	const { time, start, stop, reset } = useStopwatch();
	const {
		array: history,
		push: pushHistory,
		clear: clearHistory,
	} = useArray<IHistory>();
	useEffect(() => {
		if (answer.length >= 1) {
			if (
				answer.find((el) => {
					if (el && question) {
						return el.midi == question.midi;
					}
				})
			) {
				nextQuestion();
				setMessage("Correct");
				reset();
				incrementHits();
				pushHistory({ type: "hit", time });
			} else {
				setMessage("Wrong");
				incrementMisses();
				pushHistory({ type: "miss", time });
			}
		}
	}, [answer]);
	return (
		<>
			<div>{message}</div>
			<div>{time.toFixed(3)}</div>
			<div>
				<button onClick={start}>Start</button>
				<button onClick={stop}>Stop</button>
				<button onClick={reset}>Reset</button>
				<button
					onClick={() => {
						setMessage("Reset");
						setHits(0);
						setMisses(0);
						clearHistory();
					}}
				>
					Reset Stats
				</button>
			</div>
			<div>
				{hits}/{hits + misses}
			</div>
			<HistoryTable history={history} />
		</>
	);
}
