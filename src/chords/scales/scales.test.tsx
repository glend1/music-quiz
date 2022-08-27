import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Scales } from "./scales";
import {
	useModalContext,
	GlobalModalContext,
} from "../../elements/modalcontext/modalcontext";
import * as ReactDOM from "react-dom/client";

jest.mock("../../elements/modalcontext/modalcontext");

describe("scales", () => {
	beforeEach(() => {
		(GlobalModalContext as jest.Mock).mockReturnValue(<h3>Modal</h3>);
		(useModalContext as jest.Mock).mockReturnValue((PassedNode: any) => {
			return (e: { target: { parentNode: { parentNode: any } } }) => {
				let topElement = e.target.parentNode.parentNode;
				let div = document.createElement("div");
				topElement.appendChild(div);
				ReactDOM.createRoot(topElement).render(<PassedNode />);
			};
		});
	});
	it("Should render a default component", () => {
		const component = render(<Scales notes={[]} />);
		expect(component.container.outerHTML).toBe("<div></div>");
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
	it("Should show/unshow scales", async () => {
		const test = render(<Scales notes={["C", "D", "E"]} />);
		await userEvent.click(test.baseElement.querySelectorAll("path")[5]);
		await userEvent.click(screen.getAllByRole("img")[0]);
		expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Modal");
	});
});
