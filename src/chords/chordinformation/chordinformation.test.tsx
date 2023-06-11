import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ReactDOM from "react-dom/client";
import {
	ModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import { ChordInformation } from "./chordinformation";

describe("chordInformation", () => {
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
		render(
			<ModalContext>
				<ChordInformation notes={["C", "E", "G"]} />
			</ModalContext>
		);
		await userEvent.click(screen.getByRole("img"));
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("CM");
	});
});
