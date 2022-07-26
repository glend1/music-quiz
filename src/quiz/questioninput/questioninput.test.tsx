import {
	fireEvent,
	render,
	screen,
	renderHook,
	act,
} from "@testing-library/react";
import { IStdNote } from "../../notes/notes/notes";
import { useArray } from "../../util/customhooks/customhooks";
import { QuestionInput } from "./questioninput";

describe("questioninput", () => {
	describe("show keyboard", () => {
		it("Should not show a keyboard", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			render(<QuestionInput answer={array.current} audioEvent={undefined} />);
			expect(screen.getByTestId("keyboard")).toHaveClass("hide");
			act(() => {
				fireEvent.click(screen.getAllByRole("checkbox")[1]);
			});
			expect(screen.getByTestId("keyboard")).not.toHaveClass("hide");
		});
		it("Should show a keyboard", () => {
			const { result: array } = renderHook(() => useArray<IStdNote>());
			render(<QuestionInput answer={array.current} audioEvent={undefined} />);
			act(() => {
				fireEvent.click(screen.getAllByRole("checkbox")[1]);
			});
			expect(screen.getByTestId("keyboard")).not.toHaveClass("hide");
		});
	});
});
