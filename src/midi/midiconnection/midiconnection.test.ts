import { renderHook, act, RenderResult, waitFor } from "@testing-library/react";
import { MidiConnection, TMidiConnection } from "./midiconnection";
import * as WMT from "web-midi-test";
import { useState } from "react";

describe("midiConnection", () => {
	describe("Enabling Midi", () => {
		it("Should fail if the platofrm doesn't support midi", async () => {
			const { result } = renderHook(() => {
				return MidiConnection();
			});
			await act(async () => {
				result.current.enable();
			});
			expect(result.current.error).toBe(
				"navigator.requestMIDIAccess is not a function"
			);
		});
		describe("Mocking Midi Access", () => {
			// it("testing purposes only", async () => {
			//   navigator.requestMIDIAccess = WMT.requestMIDIAccess
			//   const { result, waitForNextUpdate } = renderHook(() => {return MidiConnection()})
			//   act(() => {
			//       result.current.enable()
			//   })
			//   await waitForNextUpdate();
			//   expect(result.current.error).toBe("failed")
			// })
			// afterEach(() => {
			//   navigator.requestMIDIAccess = ma
			// })
			// it("Should fail when the platform doesn't have permission to use midi", () => {
			// console.log("TEST", hook.result.current.error)
			// WMT.midi = false;
			// expect(result.current.error).toBe("MIDI is not allowed")
			// WMT.midi = true;
			// })
			// it("Shoud allow midi to be used if the platform gives permission", async () => {
			//     navigator.requestMIDIAccess = WMT.requestMIDIAccess
			//     const { result, waitForNextUpdate } = renderHook(() => { return MidiConnection()})
			//     await act(() => {
			//         result.current.enable()
			//     })
			//     expect(result.current.ports).toStrictEqual(['none'])
			// })
		});
	});
	// describe("Connecting Midi", () => {
	//     const MA = navigator.requestMIDIAccess
	//     var result: RenderResult<TMidiConnection>, waitForNextUpdate: () => any;
	//     beforeEach(async () => {
	//         navigator.requestMIDIAccess = WMT.requestMIDIAccess;
	//         ({result, waitForNextUpdate} = renderHook(() => { return MidiConnection()}))
	//         act(() => {
	//             result.current.enable()
	//         })
	//         await waitForNextUpdate();
	//     })
	//     afterEach(() => {
	//         navigator.requestMIDIAccess = MA
	//     })

	//     it("Should accept a connection when you add a midi device", async () => {
	//         navigator.requestMIDIAccess = WMT.requestMIDIAccess;
	//         const hook = renderHook(() => { return MidiConnection()})
	//         await act(async () => {
	//             hook.result.current.enable()
	//         })
	//         await act(async () => {
	//             var port = new WMT.MidiSrc('VIRTUAL MIDI-In');
	//             port.connect();
	//             port.emit([0x90, 0x40, 0x7f]);
	//         })
	//         console.log(WebMidi.inputs)
	//         console.log(hook.result.current.ports)
	//     })
	// })
});
