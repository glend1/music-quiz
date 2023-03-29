import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ReactDOM from "react-dom/client";
import {
	GlobalModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import { ChordInformation } from "./chordinformation";

jest.mock("../../elements/modalcontext/modalcontext");

describe("chordInformation", () => {
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
	it("Should render the component", () => {
		render(<ChordInformation notes={[]} />);
		expect(
			screen.getByText("Select a Chord by Clicking the Notes")
		).toBeVisible();
	});
	it("Should render the chord information", () => {
		render(<ChordInformation notes={["C", "E", "G"]} />);
		expect(screen.getByText("CM")).toBeVisible();
	});
	it("Should tell the user that no chord was found", () => {
		render(<ChordInformation notes={["C", "D", "E"]} />);
		expect(screen.getByText("No Chord found")).toBeVisible();
	});
	it("Should click on the image to show more information", async () => {
		let html = render(<ChordInformation notes={["C", "E", "G"]} />);
		await userEvent.click(screen.getByRole("img"));
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Modal");
	});
});
