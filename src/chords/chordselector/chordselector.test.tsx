import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { TChords } from "../dictionaryutils/dictionaryutils";
import { ChordSelector } from "./chordselector";

function MockSelector() {
	const [state, setState] = useState<TChords>({});
	return (
		<div>
			<h3>{Object.keys(state).join()}</h3>
			<div>
				<ChordSelector chords={setState} />
			</div>
		</div>
	);
}

describe("chordselector", () => {
	it("Should render a default component", () => {
		const callback = jest.fn();
		render(<ChordSelector chords={callback} />);
		expect(screen.getByRole("heading")).toHaveTextContent("Chord");
	});
	it("Should select a chord", () => {
		const selector = render(<MockSelector />);
		userEvent.click(selector.baseElement.querySelectorAll("path")[0]);
		userEvent.click(selector.baseElement.querySelectorAll("path")[6]);
		expect(screen.getByText("C5")).toBeVisible();
	});
	it("Should delete itself", () => {
		const selector = render(<MockSelector />);
		userEvent.click(selector.baseElement.querySelectorAll("path")[0]);
		userEvent.click(selector.baseElement.querySelectorAll("path")[6]);
		expect(screen.getAllByRole("heading")[0]).not.toHaveTextContent("Chord");
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("heading")).toBeEmptyDOMElement();
	});
	it("Should select a Minor Chord, show information and remove it", () => {
		const selector = render(<MockSelector />);
		userEvent.click(selector.baseElement.querySelectorAll("path")[0]);
		userEvent.click(selector.baseElement.querySelectorAll("path")[6]);
		userEvent.click(selector.baseElement.querySelectorAll("path")[4]);
		userEvent.click(screen.getByRole("img"));
		expect(screen.getAllByText("Cm")).toHaveLength(2);
		userEvent.click(selector.baseElement.querySelectorAll("path")[0]);
		expect(screen.queryByText("Cm")).toBeNull();
	});
});
