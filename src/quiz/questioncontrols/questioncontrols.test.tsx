import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuestionGeneration } from "../../notes/usequestiongeneration/usequestiongeneration";
import { QuestionControls } from "./questioncontrols";

function MockQuestionControls() {
	const questionGeneration = useQuestionGeneration();
	return (
		<>
			<button
				onClick={() => {
					questionGeneration.newRoot(20, 20, false);
				}}
			>
				new root
			</button>
			<button
				onClick={() => {
					questionGeneration.newInterval(3, "Both");
				}}
			>
				new interval
			</button>
			<button
				onClick={() => {
					questionGeneration.newChord(2, 3);
				}}
			>
				new chord
			</button>
			<button
				onClick={() => {
					questionGeneration.nextQuestion();
				}}
			>
				next question
			</button>
			<QuestionControls
				current={questionGeneration.current}
				question={questionGeneration.question}
				type={questionGeneration.type}
				chord={questionGeneration.chord}
				interval={questionGeneration.interval}
				root={questionGeneration.root}
			/>
			<h3>{questionGeneration.current}</h3>
		</>
	);
}

describe("questioncontrols", () => {
	it("Should render the component", () => {
		render(<MockQuestionControls />);
		expect(screen.getByText("Show Answer")).toBeVisible();
	});
	describe("Interactions", () => {
		afterEach(() => {
			jest.spyOn(global.Math, "random").mockRestore();
		});
		beforeEach(async () => {
			jest.spyOn(global.Math, "random").mockReturnValue(0.5);
			render(<MockQuestionControls />);
			const buttons = screen.getAllByRole("button");
			await userEvent.click(buttons[0]);
		});
		it("Should display a root", () => {
			const headings = screen.getAllByRole("heading");
			expect(headings[0]).toHaveTextContent("Note");
			expect(headings[1]).toHaveTextContent("B4");
		});
		it("Should display an interval", async () => {
			const buttons = screen.getAllByRole("button");
			await userEvent.click(buttons[1]);
			const headings = screen.getAllByRole("heading");
			expect(headings[0]).toHaveTextContent("Interval");
			expect(headings[1]).toHaveTextContent("B4");
			expect(headings[2]).toHaveTextContent("Descending Major Second");
		});
		it("Should display chord", async () => {
			const buttons = screen.getAllByRole("button");
			await userEvent.click(buttons[2]);
			const headings = screen.getAllByRole("heading");
			expect(headings[0]).toHaveTextContent("Chord");
			expect(headings[1]).toHaveTextContent("B4");
			expect(headings[2]).toHaveTextContent("BMb5");
		});
		it("Should show you the answer", async () => {
			const buttons = screen.getAllByRole("button");
			await userEvent.click(buttons[2]);
			await userEvent.click(buttons[3]);
			await userEvent.click(screen.getByRole("checkbox"));
			expect(screen.getAllByRole("heading")[3].outerHTML).toEqual(
				`<h3 class="answer"><span>B4</span><span class="highlight">D#5</span><span>F5</span></h3>`
			);
		});
		it("Should move the the next part of the question", async () => {
			const buttons = screen.getAllByRole("button");
			await userEvent.click(buttons[2]);
			await userEvent.click(buttons[3]);
			await userEvent.click(screen.getByRole("checkbox"));
			await userEvent.click(buttons[3]);
			expect(screen.getAllByRole("heading")[3].outerHTML).toEqual(
				`<h3 class="answer"><span>B4</span><span>D#5</span><span class="highlight">F5</span></h3>`
			);
		});
	});
});
