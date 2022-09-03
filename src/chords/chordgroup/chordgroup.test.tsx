import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { TChords } from "../types";
import { ChordGroup } from "./chordgroup";

function MockChordGroup() {
	const [chords, setChords] = useState<TChords>({});
	return (
		<>
			<h3>
				{Object.entries(chords).map((chord, i) => {
					return <div key={i}>{chord[1].join()}</div>;
				})}
			</h3>
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
		const add = screen.getAllByRole("heading")[2];
		await userEvent.click(add);
		await userEvent.click(add);
		const paths = component.baseElement.querySelectorAll("path");
		await userEvent.click(paths[0]);
		await userEvent.click(paths[5]);
		await userEvent.click(paths[6]);
		await userEvent.click(paths[25]);
		await userEvent.click(paths[32]);
		await userEvent.click(paths[51]);
		await userEvent.click(paths[70]);
		expect(screen.getAllByRole("heading")[0]).toHaveTextContent("C,F,GD,AE,B");
	});
});
