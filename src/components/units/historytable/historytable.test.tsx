import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HistoryTable, IHistory } from "./historytable";

describe("historytable", () => {
	it("Should not show the table", () => {
		render(<HistoryTable history={[]} />);
		expect(screen.queryByRole("table")).toBeFalsy();
	});
	it("Should show the table", () => {
		render(<HistoryTable history={[]} />);
		userEvent.click(screen.getByRole("checkbox"));
		expect(screen.queryByRole("table")).toBeInTheDocument();
	});
	describe("Test values in the table", () => {
		const data: IHistory[] = [
			{ type: "hit", time: 1 },
			{ type: "hit", time: 4 },
			{ type: "hit", time: 2 },
			{ type: "miss", time: 3 },
			{ type: "miss", time: 6 },
			{ type: "hit", time: 9 },
			{ type: "miss", time: 2 },
			{ type: "miss", time: 4 },
			{ type: "miss", time: 11 },
			{ type: "hit", time: 15 },
			{ type: "hit", time: 4 },
		];
		beforeEach(() => {
			render(<HistoryTable history={data} />);
			userEvent.click(screen.getByRole("checkbox"));
		});
		it("Should display the amount of data", () => {
			expect(screen.getAllByRole("row")).toHaveLength(8);
		});
		it("Should add up misses", () => {
			expect(screen.getAllByRole("cell")[4 * 3 + 2]).toHaveTextContent("2");
		});
		it("Should use the lastest time", () => {
			expect(screen.getAllByRole("cell")[4 * 3 + 1]).toHaveTextContent("9");
		});
		it("Should use averages for the last row", () => {
			expect(screen.getAllByRole("cell")[7 * 3 + 1]).toHaveTextContent("5.83");
			expect(screen.getAllByRole("cell")[7 * 3 + 2]).toHaveTextContent("0.83");
		});
	});
});
