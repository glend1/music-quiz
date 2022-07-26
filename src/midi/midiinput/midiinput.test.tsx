import { renderHook } from "@testing-library/react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MidiInput } from "./midiinput";

describe("midiinput", () => {
	it("Should tell the use midi isn't supported in their browser", () => {
		const callback = jest.fn((input) => input);
		// navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
		// var res;
		// act(() => {
		//     const res = render(<MidiInput setMidiDevice={callback}></MidiInput>)
		// }).then((onRejected) => {
		//     res.debug()
		// })

		let root;
		act(() => {
			root = render(
				<MidiInput setMidiDevice={callback} midiDevice={false}></MidiInput>
			);
		});

		// make assertions on root
		//console.log(root.toJSON())
		expect(screen.getByText("Enable Midi")).toBeInTheDocument();
	});
});
