import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChordsFromScale } from "./chordfromscale";

describe("chordfromscale", () => {
	it("Should render a defualt component", () => {
		render(<ChordsFromScale notes={[]} />);
		expect(screen.getByText("No Chords found")).toBeVisible();
	});
	it("Should render a chord", () => {
		render(<ChordsFromScale notes={["A", "B", "C", "D", "E", "F", "G"]} />);
		expect(screen.getByText("CM")).toBeVisible();
		expect(screen.getByText("C5")).toBeVisible();
		expect(screen.getByText("Em#5")).toBeVisible();
	});
	it("Should show chord information", async () => {
		const component = render(
			<ChordsFromScale notes={["A", "B", "C", "D", "E", "F", "G"]} />
		);
		await userEvent.click(component.getAllByRole("img")[0]);
		expect(component.baseElement).toMatchSnapshot();
	});
	it("Should remove chord information", () => {
		const component = render(
			<ChordsFromScale notes={["A", "B", "C", "D", "E", "F", "G"]} />
		);
		userEvent.click(component.getAllByRole("img")[0]);
		userEvent.click(component.getAllByRole("img")[0]);
		expect(component.baseElement).toMatchSnapshot();
	});
});
