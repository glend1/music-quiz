import { MidiEvents } from "./midievents";
import {
	renderHook,
	act,
	RenderResult,
} from "@testing-library/react-hooks/dom";
import { IArray, useArray } from "../../util/customhooks/customhooks";
import { IStdNote } from "../../notes/notes/notes";

describe("midiEvents: These are the events used in midicontrols component", () => {
	describe("mouse: Should trigger when you press a mouse button", () => {
		it("press: Should push onto the array", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			const {
				result: {
					current: { mouse },
				},
			} = renderHook(() => MidiEvents(array.current, true, 4));
			act(() => {
				mouse({ target: { dataset: { natural: "D" } } } as any);
			});
			expect(array.current.array).toStrictEqual([
				{ note: "D4", name: "D", octave: 4, abc: "D", midi: 62 },
			]);
		});
		it("depress: Should remove from the array", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			const result = renderHook(() => MidiEvents(array.current, true, 4));
			act(() => {
				result.result.current.mouse({
					target: { dataset: { natural: "C" } },
				} as any);
			});
			result.rerender();
			act(() => {
				result.result.current.mouse({
					target: { dataset: { natural: "D" } },
				} as any);
			});
			result.rerender();
			act(() => {
				result.result.current.mouse({
					target: { dataset: { natural: "C" } },
				} as any);
			});
			result.rerender();
			expect(array.current.array).toStrictEqual([
				{ note: "D4", name: "D", octave: 4, abc: "D", midi: 62 },
			]);
		});
	});
	describe("midiKeyboard: Should trigger when you press a button on a midikeyboard", () => {
		var array: RenderResult<IArray<IStdNote>>;
		function fireEvent(inputType: string, note: { note: { number: number } }) {
			let i: any = {
				addListener(type: string, fn: (e: any) => void) {
					if (type == inputType) {
						fn(note);
					}
				},
			};
			renderHook(() => MidiEvents(array.current, true, 4, jest.fn(), i));
		}
		beforeEach(() => {
			({ result: array } = renderHook(() => useArray<IStdNote>()));
		});
		it("noteon: Should push onto the array", () => {
			act(() => {
				fireEvent("noteon", { note: { number: 62 } });
			});
			expect(array.current.array).toStrictEqual([
				{ note: "D4", name: "D", octave: 4, abc: "D", midi: 62 },
			]);
		});
		it("noteoff: Should remove from the array", () => {
			act(() => {
				fireEvent("noteon", { note: { number: 60 } });
			});
			act(() => {
				fireEvent("noteon", { note: { number: 62 } });
			});
			act(() => {
				fireEvent("noteoff", { note: { number: 60 } });
			});
			expect(array.current.array).toStrictEqual([
				{ note: "D4", name: "D", octave: 4, abc: "D", midi: 62 },
			]);
		});
	});
	describe("key: Should trigger when you press a button on the keyboard", () => {
		it("keydown: Should push onto the array", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			const {
				result: {
					current: { key },
				},
			} = renderHook(() => MidiEvents(array.current, true, 4));
			act(() => {
				key({ natural: "d" }, "keydown");
			});
			expect(array.current.array).toStrictEqual([
				{ note: "D4", name: "D", octave: 4, abc: "D", midi: 62 },
			]);
		});
		it("keyup: Should remove from the array", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			const result = renderHook(() => MidiEvents(array.current, true, 4));
			const key = result.result.current.key;
			act(() => {
				key({ natural: "d" }, "keydown");
			});
			result.rerender();
			act(() => {
				key({ natural: "e" }, "keydown");
			});
			result.rerender();
			act(() => {
				key({ natural: "d" }, "keyup");
			});
			result.rerender();
			expect(array.current.array).toStrictEqual([
				{ note: "E4", name: "E", octave: 4, abc: "E", midi: 64 },
			]);
		});
		it("otherevent: Should throw an error", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			const {
				result: {
					current: { key },
				},
			} = renderHook(() => MidiEvents(array.current, true, 4));
			expect(() => {
				key({ natural: "d" }, "other");
			}).toThrowError("Event not recognized");
		});
		describe("audioEvent: this controls how a tone is played", () => {
			it("keydown: Should play a tone", () => {
				var i, d;
				var mockCallback = jest.fn((str, data) => {
					i = str;
					d = data;
				});
				const { result: array } = renderHook(() => useArray<IStdNote>());
				const {
					result: {
						current: { key },
					},
				} = renderHook(() => MidiEvents(array.current, true, 4, mockCallback));
				act(() => {
					key({ natural: "d" }, "keydown");
				});
				expect(i).toBe("start");
				expect(d).toStrictEqual({
					note: "D4",
					name: "D",
					octave: 4,
					abc: "D",
					midi: 62,
				});
			});
			it("keydown: Should stop playing a tone", () => {
				var i, d;
				var mockCallback = jest.fn((str, data) => {
					i = str;
					d = data;
				});
				const { result: array } = renderHook(() => useArray<IStdNote>());
				const {
					result: {
						current: { key },
					},
				} = renderHook(() => MidiEvents(array.current, true, 4, mockCallback));
				act(() => {
					key({ natural: "d" }, "keyup");
				});
				expect(i).toBe("stop");
				expect(d).toStrictEqual({
					note: "D4",
					name: "D",
					octave: 4,
					abc: "D",
					midi: 62,
				});
			});
		});
	});
});
