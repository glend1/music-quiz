import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalContext } from "../../elements/modalcontext/modalcontext";
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
			<ModalContext>
				<ChordsFromScale notes={["A", "B", "C", "D", "E", "F", "G"]} />
			</ModalContext>
		);
		await userEvent.click(component.getAllByRole("img")[0]);
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Chord: A5");
	});
});
