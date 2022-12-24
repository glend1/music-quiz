import { render } from "@testing-library/react";
import { useState } from "react";
import { TChords } from "../types";
import { SmallChord } from "./smallchord";

function MockSmallChord() {
	const [active, setActive] = useState("test");
	const [chords, setChords] = useState<TChords>({ test: [] });
	return (
		<SmallChord
			active={active}
			setActive={setActive}
			chords={chords}
			setChords={setChords}
			id={active}
		/>
	);
}

describe("smallChord", () => {
	it("Should render a default component", () => {
		let component = render(<MockSmallChord />);
		expect(component.baseElement).toMatchSnapshot();
	});
});
