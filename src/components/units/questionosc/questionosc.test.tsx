import { render } from "@testing-library/react";
import { QuestionOsc } from "./questionsosc";

describe("questionosc", () => {
	it("Should render the default component", () => {
		const component = render(
			<QuestionOsc wave={""} play={false} volume={""} question={[]} />
		);
		expect(component.baseElement.outerHTML).toMatchSnapshot();
	});
});
