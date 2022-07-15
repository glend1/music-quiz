import { Inversions } from "./inversions";
import { render, screen } from "@testing-library/react";

describe("inversions", () => {
	it("Should render a blank component", () => {
		render(<Inversions notes={[]} />);
		expect(screen.getByText("No Chords found")).toBeVisible();
	});
	it("Should render the inversions", () => {
		render(<Inversions notes={["C", "E", "G"]} />);
		expect(screen.getByText("CM")).toBeVisible();
		expect(screen.getByText("Em#5/C")).toBeVisible();
		expect(screen.getByText("Em#5")).toBeVisible();
		expect(screen.getByText("CM/E")).toBeVisible();
		expect(screen.getByText("CM/G")).toBeVisible();
		expect(screen.getByText("Em#5/G")).toBeVisible();
	});
	it("Should fail if no chords are found", () => {
		render(<Inversions notes={["C", "E"]} />);
		expect(screen.getByText("No Chords found")).toBeVisible();
	});
});
