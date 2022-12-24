import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ReactDOM from "react-dom/client";
import {
	GlobalModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import { ChordsFromScale } from "./chordfromscale";

jest.mock("../../elements/modalcontext/modalcontext");

describe("chordfromscale", () => {
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
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Modal");
	});
});
