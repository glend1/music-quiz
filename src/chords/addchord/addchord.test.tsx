import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { TChords } from "../types";
import AddChord from "./addchord";
import sharedStyles from "../../../styles/shared.module.css";
import userEvent from "@testing-library/user-event";

function MockAddChord() {
	const [chords, setChords] = useState<TChords>({});
	return (
		<div className={sharedStyles.container}>
			<AddChord chords={setChords} />
		</div>
	);
}

describe("addchord", () => {
	it("Should render the element", () => {
		render(<MockAddChord />);
		expect(screen.getByRole("heading")).toHaveTextContent("Add Chord");
	});
	it("Should add a chord", async () => {
		const component = render(<MockAddChord />);
		await userEvent.click(screen.getByRole("heading"));
		expect(component.baseElement.innerHTML).toMatchSnapshot();
	});
});
