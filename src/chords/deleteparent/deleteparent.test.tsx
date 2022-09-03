import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteParent } from "./deleteparent";

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

describe("deleteparent", () => {
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
