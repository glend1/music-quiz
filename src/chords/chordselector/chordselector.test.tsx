import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { TChords } from "../types";
import { ChordSelector } from "./chordselector";

function MockSelector() {
	const [chords, setChords] = useState<TChords>({ test: [] });
	const [active, setActive] = useState("test");
	return (
		<div>
			<h3>{Object.keys(chords).join()}</h3>
			<div>
				<ChordSelector chords={chords} setChords={setChords} active={active} />
			</div>
		</div>
	);
}

describe("chordselector", () => {
	it("Should render a default component", () => {
		render(<MockSelector />);
		expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Chord");
	});
	it("Should select a chord", async () => {
		const selector = render(<MockSelector />);
		await userEvent.click(selector.baseElement.querySelectorAll("path")[0]);
		await userEvent.click(selector.baseElement.querySelectorAll("path")[6]);
		expect(screen.getByText("C5")).toBeVisible();
	});
});
