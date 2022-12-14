import { render, screen } from "@testing-library/react";
import { DetectPitch } from "./detectpitch";

describe("detectPitch", () => {
	it("Should tell the user to start the AudioContext", () => {
		const callback = jest.fn((input) => input);
		render(<DetectPitch cb={callback} />);
		expect(screen.getByText("Please Start AudioContext")).toBeInTheDocument();
	});
});
