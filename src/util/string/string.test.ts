import * as Test from "./string";

describe("capitalizeFirstLetter", () => {
	it("Should capitalize the first letter of every word", () => {
		expect(Test.capitalizeFirstLetter("hello this is a test")).toBe(
			"Hello This Is A Test"
		);
	});
});
