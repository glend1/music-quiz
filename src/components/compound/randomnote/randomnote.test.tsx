import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuestionGeneration } from "../../../util/hooks/usequestiongeneration/usequestiongeneration";
import { RandomNote } from "./randomnote";

function MockRandomNote() {
	const questionGeneration = useQuestionGeneration();
	return (
		<>
			<RandomNote newQuestion={questionGeneration.newRoot} />
			<h2>{questionGeneration.root?.note}</h2>
		</>
	);
}

describe("RandomNote", () => {
	it("Should ask the use to generate a random note", () => {
		render(<MockRandomNote />);
		expect(screen.getByRole("button")).toBeVisible();
	});
	describe("Interactions", () => {
		beforeEach(() => {
			jest.spyOn(global.Math, "random").mockReturnValue(0.5);
		});
		afterEach(() => {
			jest.spyOn(global.Math, "random").mockRestore();
		});
		it("Should generate a random note", () => {
			render(<MockRandomNote />);
			userEvent.click(screen.getByRole("button"));
			expect(screen.getByRole("heading")).toHaveTextContent("D4");
		});
		it("Should change the type of accidental", () => {
			render(<MockRandomNote />);
			userEvent.click(screen.getByRole("checkbox"));
			userEvent.click(screen.getByRole("button"));
			expect(screen.getByRole("heading")).toHaveTextContent("D#4");
		});
		it("Should change the note range", () => {
			render(<MockRandomNote />);
			const sliders = screen.getAllByRole("slider");
			fireEvent.change(sliders[0], { target: { value: "3" } });
			fireEvent.change(sliders[1], { target: { value: "6" } });
			userEvent.click(screen.getByRole("button"));
			expect(screen.getByRole("heading")).toHaveTextContent("A2");
		});
	});
});
