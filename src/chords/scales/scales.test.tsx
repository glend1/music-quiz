import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Scales } from "./scales";

describe("scales", () => {
	it("Should render a default component", () => {
		render(<Scales notes={[]} />);
		expect(screen.getByText("Please provide some Notes")).toBeVisible();
	});
	it("Should render scales", () => {
		const test = render(<Scales notes={["C", "D", "E"]} />);
		userEvent.click(test.baseElement.querySelectorAll("path")[0]);
		expect(screen.getAllByRole("img").length).toBe(24);
	});
	it("Should return to a default state", () => {
		const test = render(<Scales notes={["C", "D", "E"]} />);
		userEvent.click(test.baseElement.querySelectorAll("path")[0]);
		userEvent.click(test.baseElement.querySelectorAll("path")[0]);
		expect(screen.queryAllByRole("img").length).toBe(0);
	});
	it("Should show/unshow scales", () => {
		const test = render(<Scales notes={["C", "D", "E"]} />);
		userEvent.click(test.baseElement.querySelectorAll("path")[5]);
		userEvent.click(screen.getAllByRole("img")[0]);
		expect(test.baseElement.outerHTML).toMatchSnapshot();
		userEvent.click(screen.getAllByRole("img")[0]);
		expect(test.baseElement.outerHTML).toMatchSnapshot();
	});
});