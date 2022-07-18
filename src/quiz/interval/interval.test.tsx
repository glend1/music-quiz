import { Interval } from "./interval";
import { render, screen, fireEvent } from "@testing-library/react";
import { useQuestionGeneration } from "../../notes/usequestiongeneration/usequestiongeneration";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

function MockInterval({ makeRoot = true }) {
	const questionGeneration = useQuestionGeneration();
	useEffect(() => {
		if (makeRoot) {
			questionGeneration.newRoot(2, 26, false);
		}
	}, []);
	return (
		<div>
			<Interval
				root={questionGeneration.root}
				newInterval={questionGeneration.newInterval}
			/>
			<h2>{questionGeneration.interval?.description}</h2>
		</div>
	);
}

describe("Interval Component", () => {
	afterAll(() => {
		jest.spyOn(global.Math, "random").mockRestore();
	});
	it("Should prompt to the user that they select an Descending Minor Third", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.5);
		render(<MockInterval />);
		fireEvent.change(screen.getByRole("slider"), { target: { value: "6" } });
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("heading")).toHaveTextContent(
			"Descending Minor Third"
		);
	});
	it("Should change the direction of the interval", () => {
		render(<MockInterval />);
		userEvent.selectOptions(screen.getByRole("combobox"), ["Ascending"]);
		fireEvent.change(screen.getByRole("slider"), { target: { value: "6" } });
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("heading")).toHaveTextContent("Ascending");
	});
	it("Should fail to generate an interval", () => {
		render(<MockInterval makeRoot={false} />);
		expect(
			screen.getByText("Please create a Question first")
		).toBeInTheDocument();
	});
});
