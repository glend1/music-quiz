import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { AddChord, DeleteParent, TChords } from "./dictionaryutils";
import styles from "../../../../styles/shared.module.css";

function MockAddChord() {
	const [chords, setChords] = useState<TChords>({});
	return (
		<div className={styles.container}>
			<AddChord chords={setChords} />
		</div>
	);
}

function MockDeleteParent() {
	return (
		<div>
			<h2>middle</h2>
			<div>
				<h2>bottom</h2>
				<DeleteParent />
			</div>
		</div>
	);
}

describe("dictionaryutils", () => {
	describe("AddChord", () => {
		it("Should render the component", () => {
			render(<MockAddChord />);
			expect(screen.getByRole("button")).toHaveTextContent("Add");
		});
		it("Should add a new chord", async () => {
			render(<MockAddChord />);
			await userEvent.click(screen.getByRole("button"));
			expect(screen.getByRole("heading")).toBeInTheDocument();
		});
	});
	describe("DeleteParent", () => {
		it("Should render the component", () => {
			render(<DeleteParent />);
			expect(screen.getByRole("button")).toHaveTextContent("Remove");
		});
		it("Should delete the parent", async () => {
			render(<MockDeleteParent />);
			await userEvent.click(screen.getByRole("button"));
			expect(screen.getAllByRole("heading")).toHaveLength(1);
		});
		it("Should call the optional callback", async () => {
			const fn = jest.fn();
			render(<DeleteParent cb={fn} />);
			await userEvent.click(screen.getByRole("button"));
			expect(fn).toBeCalledTimes(1);
		});
	});
});
