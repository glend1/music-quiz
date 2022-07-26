import {
	render,
	screen,
	act,
	fireEvent,
	renderHook,
} from "@testing-library/react";
import { useBoolean } from "../../util/customhooks/customhooks";
import { CheckBox } from "./checkbox";

describe("checkbox", () => {
	it("Should not be checked", () => {
		const { result } = renderHook(() => {
			return useBoolean();
		});
		render(
			<CheckBox
				id={"test"}
				label={"Label"}
				bool={result.current.bool}
				toggle={result.current.toggle}
			/>
		);
		expect(screen.getByRole("checkbox")).not.toBeChecked();
		expect(result.current.bool).toBe(false);
	});
	it("Should be checked", () => {
		const { result } = renderHook(() => {
			return useBoolean(true);
		});
		render(
			<CheckBox
				id={"test"}
				label={"Label"}
				bool={result.current.bool}
				toggle={result.current.toggle}
			/>
		);
		expect(screen.getByRole("checkbox")).toBeChecked();
		expect(result.current.bool).toBe(true);
	});
	it("Should toggle the state", () => {
		const { result } = renderHook(() => {
			return useBoolean();
		});
		render(
			<CheckBox
				id={"test"}
				label={"Label"}
				bool={result.current.bool}
				toggle={result.current.toggle}
			/>
		);
		act(() => {
			fireEvent.click(screen.getByRole("checkbox"));
		});
		expect(screen.getByRole("checkbox")).toBeChecked();
		expect(result.current.bool).toBe(true);
	});
});
