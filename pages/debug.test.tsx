import { render } from "@testing-library/react";
import Index from "./debug";

describe("dictionary", () => {
	it("Should render the component", () => {
		const index = render(<Index />);
		expect(index.baseElement.outerHTML).toMatchSnapshot();
	});
});
