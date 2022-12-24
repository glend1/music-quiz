import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { TChords } from "../types";
import { ChordGroup } from "./chordgroup";

function MockChordGroup() {
	const [chords, setChords] = useState<TChords>({});
	return (
		<>
			{Object.entries(chords).map((chord, i) => {
				return <h3 key={i}>{chord[1].join()}</h3>;
			})}
			<ChordGroup chords={chords} setChords={setChords} />
		</>
	);
}

describe("chordgroup", () => {
	it("Should render the default component", () => {
		render(<MockChordGroup />);
		expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Chord");
	});
	it("Should render", async () => {
		const component = render(<MockChordGroup />);
		const add = component.baseElement.querySelectorAll(".add");
		const paths = component.baseElement.querySelectorAll(".main path");
		await userEvent.click(paths[0]);
		await userEvent.click(paths[3]);
		await userEvent.click(add[0]);
		await userEvent.click(paths[5]);
		await userEvent.click(paths[10]);
		await userEvent.click(paths[12]);
		await userEvent.click(add[0]);
		await userEvent.click(paths[15]);
		await userEvent.click(paths[19]);
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("C3,E3");
		expect(screen.getAllByRole("heading")[1]).toHaveTextContent("F3,B3,C4");
		expect(screen.getAllByRole("heading")[2]).toHaveTextContent("E4,F#4");
	});
});
