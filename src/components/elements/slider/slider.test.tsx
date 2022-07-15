import { fireEvent, render, screen } from "@testing-library/react";
import { useFormState } from "../../../util/hooks/customhooks/customhooks";
import { Slider } from "./slider";

function SliderMock() {
	const [val, set] = useFormState("4");
	return (
		<Slider id="id" label="Label:" value={val} set={set} min={1} max={6} />
	);
}

function CustomDisplaySliderMock() {
	const [val, set] = useFormState("4");
	return (
		<Slider
			id="id"
			label="Label:"
			value={val}
			set={set}
			min={1}
			max={6}
			display="TEST"
		/>
	);
}

describe("slider", () => {
	it("Should have a default value of 4", () => {
		render(<SliderMock />);
		expect(screen.getByRole("slider")).toHaveValue("4");
	});
	it("Should change to a value of 2", async () => {
		render(<SliderMock />);
		fireEvent.change(screen.getByRole("slider"), { target: { value: "2" } });
		expect(screen.getByRole("slider")).toHaveValue("2");
	});
	it("display a custom display value", () => {
		render(<CustomDisplaySliderMock />);
		fireEvent.change(screen.getByRole("slider"), { target: { value: "2" } });
		expect(screen.getByText("TEST")).toBeVisible();
	});
});
