import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { TChords } from "../types";
import sharedStyles from "../../../styles/shared.module.css";
import userEvent from "@testing-library/user-event";
import SmallAddChord from "./smalladdchord";

function MockAddChord() {
	const [chords, setChords] = useState<TChords>({ test: [] });
	const [active, setActive] = useState("test");
	return (
		<>
			<h3>{active}</h3>
			<SmallAddChord setChords={setChords} setActive={setActive} />
		</>
	);
}

describe("addchord", () => {
	it("Should render the element", () => {
		let component = render(<MockAddChord />);
		expect(component.baseElement.querySelectorAll(".add")[0]).toBeVisible();
	});
	it("Should add a chord", async () => {
		const component = render(<MockAddChord />);
		await userEvent.click(component.baseElement.querySelectorAll(".add")[0]);
		expect(screen.getByRole("heading")).not.toHaveTextContent("test");
	});
});
