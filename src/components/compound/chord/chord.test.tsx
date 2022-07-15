import { render, screen } from "@testing-library/react";
import { Chord } from "./chord";

describe("chord", () => {
	it("Should render the component", () => {
		render(<Chord notes={[]} />);
		expect(screen.getByText("Not a valid Chord")).toBeVisible();
	});
	it("Should render the component", () => {
		render(<Chord notes={["C", "E", "G"]} />);
		expect(screen.getByText("C")).toBeVisible();
		expect(screen.getByText("E")).toBeVisible();
		expect(screen.getByText("G")).toBeVisible();
	});
});
