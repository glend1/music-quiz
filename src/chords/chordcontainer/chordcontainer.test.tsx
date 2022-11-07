import { render, screen } from "@testing-library/react";
import { ChordContainer } from "./chordcontainer";

describe("chordcontainer", () => {
	it("Should render the component", () => {
		render(<ChordContainer notes={[]} />);
		expect(
			screen.getByText("Select a Chord by Clicking the Notes")
		).toBeVisible();
	});
	it("Should render no valid chord", () => {
		render(<ChordContainer notes={["C", "D"]} />);
		expect(screen.getByText("No Chord found")).toBeVisible();
	});
});
