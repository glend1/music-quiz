import { render } from "@testing-library/react";
import Dictionary from "../pages/dictionary";

describe("dictionary", () => {
	it("Should render the component", () => {
		const dictionary = render(<Dictionary />);
		expect(dictionary.baseElement.outerHTML).toMatchSnapshot();
	});
});
