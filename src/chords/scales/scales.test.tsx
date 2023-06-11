import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Scales } from "./scales";
import { ModalContext } from "../../elements/modalcontext/modalcontext";

describe("scales", () => {
	it("Should render a default component", () => {
		const component = render(<Scales notes={[]} />);
		expect(component.container.outerHTML).toMatchSnapshot();
	});
	it("Should render scales", async () => {
		const test = render(<Scales notes={["C", "D", "E"]} />);
		await userEvent.click(test.baseElement.querySelectorAll("path")[0]);
		expect(screen.getAllByRole("img").length).toBe(24);
	});
	it("Should return to a default state", async () => {
		const test = render(<Scales notes={["C", "D", "E"]} />);
		await userEvent.click(test.baseElement.querySelectorAll("path")[0]);
		await userEvent.click(test.baseElement.querySelectorAll("path")[0]);
		expect(screen.queryAllByRole("img").length).toBe(0);
	});
	it("Should show modal", async () => {
		const test = render(
			<ModalContext>
				<Scales notes={["C", "D", "E"]} />
			</ModalContext>
		);
		await userEvent.click(test.baseElement.querySelectorAll("path")[5]);
		await userEvent.click(screen.getAllByRole("img")[0]);
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Scales");
	});
});
