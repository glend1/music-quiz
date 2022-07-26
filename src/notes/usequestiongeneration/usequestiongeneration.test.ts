import { renderHook, act } from "@testing-library/react";
import {
	TQuestionGeneration,
	useQuestionGeneration,
} from "./usequestiongeneration";

describe("useQuestionGeneration", () => {
	let result: { current: TQuestionGeneration };
	// let waitForNextUpdate: WaitForNextUpdate
	beforeEach(() => {
		// ({result, waitForNextUpdate} = renderHook(() => useQuestionGeneration()))
		({ result } = renderHook(() => useQuestionGeneration()));
		jest.spyOn(global.Math, "random").mockReturnValue(0.5);
		act(() => {
			result.current.newRoot(14, 34, false);
		});
	});
	afterEach(() => {
		jest.spyOn(global.Math, "random").mockRestore();
	});
	describe("newRoot", () => {
		it("Should generate a new Root", () => {
			act(() => {
				let note = result.current.newRoot(14, 34, false);
				expect(note?.note).toBe("F5");
			});
			expect(result.current.root?.note).toBe("F5");
			expect(result.current.question.length).toBe(1);
			expect(result.current.question).toStrictEqual([
				{ abc: "f", midi: 77, name: "F", note: "F5", octave: 5 },
			]);
			expect(result.current.current).toBe(0);
			expect(result.current.type).toBe("Note");
		});
		it("Should generate a new Root with nextQuestion", () => {
			jest.spyOn(global.Math, "random").mockReturnValue(0.7);
			act(() => {
				result.current.nextQuestion();
			});
			expect(result.current.current).toBe(0);
			expect(result.current.root?.note).toBe("C6");
		});
	});
	describe("newChord", () => {
		beforeEach(() => {
			act(() => {
				result.current.newChord(2, 4);
			});
		});
		it("Should generate a new Chord", () => {
			expect(result.current.chord?.name).toBe("F ");
			expect(result.current.question.map((note) => note?.note)).toStrictEqual([
				"F5",
				"A5",
				"Cb6",
			]);
			expect(result.current.current).toBe(0);
			expect(result.current.type).toBe("Chord");
		});
		it("Should go to the next note in the chord", () => {
			act(() => {
				result.current.nextQuestion();
			});
			expect(result.current.current).toBe(1);
			act(() => {
				result.current.nextQuestion();
			});
			expect(result.current.current).toBe(2);
			jest.spyOn(global.Math, "random").mockReturnValue(0.7);
			act(() => {
				result.current.nextQuestion();
			});
			expect(result.current.question.map((note) => note?.note)).toStrictEqual([
				"C6",
				"Eb6",
				"F6",
				"G6",
			]);
			expect(result.current.current).toBe(0);
		});
	});
	describe("newInterval", () => {
		beforeEach(() => {
			act(() => {
				result.current.newInterval(3, "Ascending");
			});
		});
		it("Should generate a new Interval", () => {
			expect(result.current.interval).toStrictEqual({
				note: { note: "G5", name: "G", octave: 5, abc: "g", midi: 79 },
				description: "Ascending Major Second",
			});
			expect(result.current.question.map((note) => note?.note)).toStrictEqual([
				"F5",
				"G5",
			]);
			expect(result.current.current).toBe(0);
			expect(result.current.type).toBe("Interval");
		});
		it("Should go to the next note in the interval", () => {
			act(() => {
				result.current.nextQuestion();
			});
			expect(result.current.current).toBe(1);
			jest.spyOn(global.Math, "random").mockReturnValue(0.8);
			act(() => {
				result.current.nextQuestion();
			});
			expect(result.current.question.map((note) => note?.note)).toStrictEqual([
				"E6",
				"G6",
			]);
			expect(result.current.current).toBe(0);
		});
	});
});
