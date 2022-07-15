import { useState } from "react";
import { useArray, useCounter } from "../customhooks/customhooks";
import { randomFromRange } from "../../extensions/maths/maths";
import {
	Chord,
	createInterval,
	DirectionType,
	generateRandomNote,
	IStdNote,
	randomChord,
	StdNote,
} from "../../extensions/notes/notes";

export type IntervalT = { note: IStdNote; description: string };
export type TType = "Note" | "Chord" | "Interval" | undefined;
export type TQuestionGeneration = {
	root: IStdNote;
	newRoot: (min: number, max: number, accidental: boolean) => IStdNote;
	chord: Chord | undefined;
	newChord: (min: number, max: number, iRoot?: IStdNote) => void;
	interval: IntervalT | undefined;
	newInterval: (
		intervalRange: number,
		direction: DirectionType,
		iRoot?: IStdNote
	) => void;
	question: IStdNote[];
	current: number;
	type: TType;
	nextQuestion: () => void;
};

export function useQuestionGeneration() {
	const [root, setRoot] = useState<IStdNote>();
	const [chord, setChord] = useState<Chord | undefined>();
	const [interval, setInterval] = useState<IntervalT>();
	const answers = useArray<IStdNote>();
	const { i: current, increment, set: setCurrent } = useCounter(-1);
	const [type, setType] = useState<TType>();
	const [rootArguments, setRArgs] = useState<any>();
	const [chordArguments, setCArgs] = useState<any>();
	const [intervalArguments, setIArgs] = useState<any>();
	function newRoot(min: number, max: number, accidental: boolean) {
		setRArgs([min, max, accidental]);
		let note = generateRandomNote(min, max, accidental);
		if (note) {
			setRoot(note);
			answers.set([note]);
			setCurrent(0);
			setType("Note");
			return note;
		}
	}
	function newChord(min: number, max: number, iRoot = root) {
		if (iRoot) {
			setCArgs([min, max]);
			let difficulty = randomFromRange(min, max);
			if (difficulty) {
				let chord = randomChord(difficulty, iRoot.note);
				setChord(chord);
				answers.set(chord.notes.map((e) => StdNote(e)));
				setCurrent(0);
				setType("Chord");
			}
		}
	}
	function newInterval(
		intervalRange: number,
		direction: DirectionType,
		iRoot = root
	) {
		if (iRoot) {
			setIArgs([intervalRange, direction]);
			let newInterval = createInterval(iRoot, intervalRange, direction);
			if (newInterval) {
				setInterval(newInterval);
				answers.set([iRoot, newInterval.note]);
				setCurrent(0);
				setType("Interval");
			}
		}
	}
	function nextQuestion() {
		if (answers.array[current + 1]) {
			increment();
		} else {
			let note = newRoot(rootArguments[0], rootArguments[1], rootArguments[2]);
			switch (type) {
				case "Chord":
					newChord(chordArguments[0], chordArguments[1], note);
					break;
				case "Interval":
					newInterval(intervalArguments[0], intervalArguments[1], note);
					break;
				case "Note":
				default:
					break;
			}
		}
	}
	return {
		root,
		newRoot,
		chord,
		newChord,
		interval,
		newInterval,
		question: answers.array,
		current,
		type,
		nextQuestion,
	};
}
