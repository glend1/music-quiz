import { renderHook } from "@testing-library/react";
import ColourStyle from "./colorstyle";

describe("ColourStyle", () => {
	it("Should return undefined if the browsers isn't loaded", () => {
		const cs = renderHook(() => {
			ColourStyle();
		});
		expect(cs.result.current).toBeUndefined();
	});
	it("Should an object with placeholders for colour attributes", () => {
		const cs = renderHook(ColourStyle);
		cs.rerender();
		//This doesn't actually return any values because styles are mocked out during testing
		expect(cs.result.current).toStrictEqual({
			accent: "",
			bg: "",
			body: "",
			darkAccent: "",
			darkOutline: "",
			main: "",
			outline: "",
		});
	});
});
