import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Keyboard } from "./keyboard";

describe("keyboard", () => {
	it("Should not call the callback", () => {
		const callback = jest.fn();
		render(<Keyboard cb={callback}></Keyboard>);
		userEvent.keyboard("a");
		expect(callback).not.toHaveBeenCalled();
	});
	describe("Layout", () => {
		it("Should not call the callback if something is selected", () => {
			const callback = jest.fn();
			render(<Keyboard cb={callback}></Keyboard>);
			const select = screen.getByRole("combobox");
			userEvent.selectOptions(select, ["Layout"]);
			userEvent.keyboard("u");
			expect(callback).not.toBeCalled();
		});
		it("Should use the correct layout", async () => {
			const callback = jest.fn();
			render(<Keyboard cb={callback}></Keyboard>);
			const select = screen.getByRole("combobox");
			await userEvent.selectOptions(select, ["Layout"]);
			await userEvent.keyboard("z");
			expect(callback).toHaveBeenNthCalledWith(1, { natural: "C" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(2, { natural: "C" }, "keyup");
			await userEvent.keyboard("s");
			expect(callback).toHaveBeenNthCalledWith(
				3,
				{ sharp: "C#", flat: "Db" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				4,
				{ sharp: "C#", flat: "Db" },
				"keyup"
			);
			await userEvent.keyboard("x");
			expect(callback).toHaveBeenNthCalledWith(5, { natural: "D" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(6, { natural: "D" }, "keyup");
			await userEvent.keyboard("d");
			expect(callback).toHaveBeenNthCalledWith(
				7,
				{ sharp: "D#", flat: "Eb" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				8,
				{ sharp: "D#", flat: "Eb" },
				"keyup"
			);
			await userEvent.keyboard("c");
			expect(callback).toHaveBeenNthCalledWith(9, { natural: "E" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(10, { natural: "E" }, "keyup");
			await userEvent.keyboard("v");
			expect(callback).toHaveBeenNthCalledWith(11, { natural: "F" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(12, { natural: "F" }, "keyup");
			await userEvent.keyboard("g");
			expect(callback).toHaveBeenNthCalledWith(
				13,
				{ sharp: "F#", flat: "Gb" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				14,
				{ sharp: "F#", flat: "Gb" },
				"keyup"
			);
			await userEvent.keyboard("b");
			expect(callback).toHaveBeenNthCalledWith(15, { natural: "G" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(16, { natural: "G" }, "keyup");
			await userEvent.keyboard("h");
			expect(callback).toHaveBeenNthCalledWith(
				17,
				{ sharp: "G#", flat: "Ab" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				18,
				{ sharp: "G#", flat: "Ab" },
				"keyup"
			);
			await userEvent.keyboard("n");
			expect(callback).toHaveBeenNthCalledWith(19, { natural: "A" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(20, { natural: "A" }, "keyup");
			await userEvent.keyboard("j");
			expect(callback).toHaveBeenNthCalledWith(
				21,
				{ sharp: "A#", flat: "Bb" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				22,
				{ sharp: "A#", flat: "Bb" },
				"keyup"
			);
			await userEvent.keyboard("m");
			expect(callback).toHaveBeenNthCalledWith(23, { natural: "B" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(24, { natural: "B" }, "keyup");
		});
	});
	describe("Alphabetical", () => {
		it("Should not call the callback if something is selected", () => {
			const callback = jest.fn();
			render(<Keyboard cb={callback}></Keyboard>);
			const select = screen.getByRole("combobox");
			userEvent.selectOptions(select, ["Alphabetical"]);
			userEvent.keyboard("u");
			expect(callback).not.toBeCalled();
		});
		it("Should use the correct layout", async () => {
			const callback = jest.fn();
			render(<Keyboard cb={callback}></Keyboard>);
			const select = screen.getByRole("combobox");
			await userEvent.selectOptions(select, ["Alphabetical"]);
			await userEvent.keyboard("c");
			expect(callback).toHaveBeenNthCalledWith(1, { natural: "C" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(2, { natural: "C" }, "keyup");
			await userEvent.keyboard("C");
			expect(callback).toHaveBeenNthCalledWith(
				3,
				{ sharp: "C#", flat: "B" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				4,
				{ sharp: "C#", flat: "B" },
				"keyup"
			);
			await userEvent.keyboard("d");
			expect(callback).toHaveBeenNthCalledWith(5, { natural: "D" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(6, { natural: "D" }, "keyup");
			await userEvent.keyboard("D");
			expect(callback).toHaveBeenNthCalledWith(
				7,
				{ sharp: "D#", flat: "Db" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				8,
				{ sharp: "D#", flat: "Db" },
				"keyup"
			);
			await userEvent.keyboard("e");
			expect(callback).toHaveBeenNthCalledWith(9, { natural: "E" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(10, { natural: "E" }, "keyup");
			await userEvent.keyboard("E");
			expect(callback).toHaveBeenNthCalledWith(
				11,
				{ sharp: "F", flat: "Eb" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				12,
				{ sharp: "F", flat: "Eb" },
				"keyup"
			);
			await userEvent.keyboard("f");
			expect(callback).toHaveBeenNthCalledWith(13, { natural: "F" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(14, { natural: "F" }, "keyup");
			await userEvent.keyboard("F");
			expect(callback).toHaveBeenNthCalledWith(
				15,
				{ sharp: "F#", flat: "E" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				16,
				{ sharp: "F#", flat: "E" },
				"keyup"
			);
			await userEvent.keyboard("g");
			expect(callback).toHaveBeenNthCalledWith(17, { natural: "G" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(18, { natural: "G" }, "keyup");
			await userEvent.keyboard("G");
			expect(callback).toHaveBeenNthCalledWith(
				19,
				{ sharp: "G#", flat: "Gb" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				20,
				{ sharp: "G#", flat: "Gb" },
				"keyup"
			);
			await userEvent.keyboard("a");
			expect(callback).toHaveBeenNthCalledWith(21, { natural: "A" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(22, { natural: "A" }, "keyup");
			await userEvent.keyboard("A");
			expect(callback).toHaveBeenNthCalledWith(
				23,
				{ sharp: "A#", flat: "Ab" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				24,
				{ sharp: "A#", flat: "Ab" },
				"keyup"
			);
			await userEvent.keyboard("b");
			expect(callback).toHaveBeenNthCalledWith(25, { natural: "B" }, "keydown");
			expect(callback).toHaveBeenNthCalledWith(26, { natural: "B" }, "keyup");
			await userEvent.keyboard("B");
			expect(callback).toHaveBeenNthCalledWith(
				27,
				{ sharp: "C", flat: "Bb" },
				"keydown"
			);
			expect(callback).toHaveBeenNthCalledWith(
				28,
				{ sharp: "C", flat: "Bb" },
				"keyup"
			);
		});
	});
	it("Should remove listeners when changing the combobox", async () => {
		const callback = jest.fn();
		render(<Keyboard cb={callback}></Keyboard>);
		await userEvent.selectOptions(screen.getByRole("combobox"), ["Layout"]);
		await userEvent.selectOptions(screen.getByRole("combobox"), [
			"Alphabetical",
		]);
		await userEvent.keyboard("c");
		expect(callback).toBeCalledTimes(2);
	});
});
