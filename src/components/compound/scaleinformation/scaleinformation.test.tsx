import { render, screen } from "@testing-library/react";
import { ScaleInformation } from "./scaleinformation";

describe("scaleinformation", () => {
	it("Should render a default component", () => {
		render(<ScaleInformation scale={""} root={""} />);
		expect(
			screen.getByText("Please provide some Scale infromation")
		).toBeVisible();
	});
	it("Should render a Scale", () => {
		const element = render(<ScaleInformation scale={"ionian"} root={"C#"} />);
		expect(element.baseElement).toMatchSnapshot();
	});
});
