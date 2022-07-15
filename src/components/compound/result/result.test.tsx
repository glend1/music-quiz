import { fireEvent, render, screen, act } from "@testing-library/react";
import { useEffect } from "react";
import { IStdNote, StdNote } from "../../../util/extensions/notes/notes";
import { useQuestionGeneration } from "../../../util/hooks/usequestiongeneration/usequestiongeneration";
import { Result } from "./result";

function MockResult({ answer }: { answer: IStdNote[] }) {
	const questionGeneration = useQuestionGeneration();
	useEffect(() => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.5);
		questionGeneration.newRoot(20, 30, false);
		jest.spyOn(global.Math, "random").mockRestore();
	}, []);
	return (
		<Result
			question={questionGeneration.question[questionGeneration.current]}
			answer={answer}
			nextQuestion={questionGeneration.nextQuestion}
		/>
	);
}

describe("answer", () => {
	it("Should render a default component", () => {
		render(<MockResult answer={[]} />);
		expect(screen.getByText("0.000")).toBeVisible();
		expect(screen.getByText("no attempt")).toBeVisible();
		expect(screen.getByText("0/0")).toBeVisible();
	});
	describe("Timer test", () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});
		afterEach(() => {
			jest.useRealTimers();
		});
		it("Should start the timer", () => {
			render(<MockResult answer={[]} />);
			act(() => {
				fireEvent.click(screen.getByText("start"));
				jest.advanceTimersByTime(1568);
			});
			expect(screen.getByText("1.568")).toBeVisible();
		});
		it("Should stop the timer", () => {
			render(<MockResult answer={[]} />);
			act(() => {
				fireEvent.click(screen.getByText("start"));
				jest.advanceTimersByTime(1568);
			});
			act(() => {
				fireEvent.click(screen.getByText("stop"));
				jest.advanceTimersByTime(1568);
			});
			expect(screen.getByText("1.568")).toBeVisible();
		});
		it("Should reset the timer", () => {
			render(<MockResult answer={[]} />);
			act(() => {
				fireEvent.click(screen.getByText("start"));
				jest.advanceTimersByTime(1568);
			});
			act(() => {
				fireEvent.click(screen.getByText("stop"));
				fireEvent.click(screen.getByText("reset"));
				jest.advanceTimersByTime(1568);
			});
			expect(screen.getByText("0.000")).toBeVisible();
		});
	});
	describe("Test results", () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});
		afterEach(() => {
			jest.useRealTimers();
		});
		it("give you the correct score", () => {
			const component = render(<MockResult answer={[]} />);
			act(() => {
				fireEvent.click(screen.getByText("Show Results?"));
				fireEvent.click(screen.getByText("start"));
				jest.advanceTimersByTime(1568);
				component.rerender(<MockResult answer={[StdNote("D5")]} />);
			});
			act(() => {
				jest.advanceTimersByTime(1568);
				component.rerender(
					<MockResult answer={[StdNote("C4"), StdNote("G5")]} />
				);
			});
			expect(component.container).toMatchSnapshot();
			act(() => {
				fireEvent.click(screen.getByText("reset stats"));
			});
			expect(component.container).toMatchSnapshot();
		});
	});
});
