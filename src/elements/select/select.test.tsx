import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./select";

describe("Select", () => {
	it("Should have the correct data", async () => {
		var container: HTMLElement;
		await waitFor(() => {
			({ container } = render(
				<Select
					label={"label"}
					array={["data1", "data2", "data3"]}
					id={"test"}
					cb={function (): void {}}
				/>
			));
		}).then(() => {
			expect(container.querySelector("#test")).toBeTruthy();
			expect(container.querySelector("label")).toHaveTextContent("label");
			expect(container.querySelectorAll("option")).toHaveLength(3);
		});
	});
	it("Should trigger the callback when the select has recieved a change event", async () => {
		const callback = jest.fn();
		render(
			<Select
				label={"label"}
				array={["data1", "data2", "data3"]}
				id={"test"}
				cb={callback}
			/>
		);
		const select = screen.getByRole("combobox");
		await userEvent.selectOptions(select, ["data2"]);
		expect(callback).toHaveBeenCalledTimes(1);
	});
});
