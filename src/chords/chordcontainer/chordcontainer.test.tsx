import { render, screen } from "@testing-library/react";
import { ChordContainer } from "./chordcontainer";

describe("chordcontainer", () => {
	it("Should render the component", () => {
		render(<ChordContainer notes={[]} />);
		expect(
			screen.getByText("Click a Key to begin Chord selection")
		).toBeVisible();
	});
	it("Should render no valid chord", () => {
		render(<ChordContainer notes={["C", "F"]} />);
		expect(screen.getByRole("heading")).toHaveTextContent("Scales");
	});
});
