import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { useQuestionGeneration } from "../../notes/usequestiongeneration/usequestiongeneration";
import { RandomChord } from "./randomchord";

function MockRandomChord() {
	const questionGeneration = useQuestionGeneration();
	useEffect(() => {
		questionGeneration.newRoot(2, 26, false);
	}, []);
	return (
		<>
			<RandomChord
				root={questionGeneration.root}
				newChord={questionGeneration.newChord}
			/>
			<div>{questionGeneration.chord?.symbol}</div>
		</>
	);
}

describe("randomchord: this will generate a random chord", () => {
	it("Should have default values", () => {
		render(<MockRandomChord />);
		const sliders = screen.getAllByRole("slider");
		expect(sliders).toHaveLength(2);
		expect(sliders[0]).toHaveAttribute("min", "2");
		expect(sliders[0]).toHaveValue("2");
		expect(sliders[1]).toHaveAttribute("max", "7");
		expect(sliders[1]).toHaveValue("4");
	});
	describe("interactions", () => {
		afterEach(() => {
			jest.spyOn(global.Math, "random").mockRestore();
		});
		beforeEach(() => {
			jest.spyOn(global.Math, "random").mockReturnValue(0.5);
		});
		it("Should generate a randomChord", () => {
			render(<MockRandomChord />);
			userEvent.click(screen.getByRole("button"));
			expect(screen.getByText("CMb5")).toBeVisible();
		});
		it("Should change the difficulty", () => {
			render(<MockRandomChord />);
			const sliders = screen.getAllByRole("slider");
			fireEvent.change(sliders[0], { target: { value: "5" } });
			fireEvent.change(sliders[1], { target: { value: "7" } });
			userEvent.click(screen.getByRole("button"));
			expect(screen.getByText("C9#11")).toBeVisible();
		});
	});
});
