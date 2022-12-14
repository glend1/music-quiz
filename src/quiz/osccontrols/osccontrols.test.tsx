import {
	fireEvent,
	render,
	screen,
	act,
	renderHook,
} from "@testing-library/react";
import { OscControls } from "./osccontrols";
import {
	AudioContext,
	OscillatorNode,
	registrar,
} from "standardized-audio-context-mock";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { StdNote } from "../../notes/notes/notes";

describe("OscControls", () => {
	const ac = global.AudioContext;
	beforeEach(() => {
		global.AudioContext = AudioContext as any;
	});
	afterEach(() => {
		global.AudioContext = ac;
	});
	it("Should wait on an AudioContext", () => {
		const callback = jest.fn();
		render(<OscControls setAudioEvent={callback} question={[StdNote("C4")]} />);
		expect(screen.getByText("Please Start AudioContext")).toBeInTheDocument();
	});
	// it("Should have a mute button when there is an AudioContext", () => {
	// const callback = jest.fn();
	// render(<Provider store={Store}><OscControls setAudioEvent={callback}></OscControls></Provider>)
	// Store.dispatch({type: START_AUDIO})
	// expect(screen.getByRole("button")).toBeInTheDocument()
	// })
	// it("Should be able to change the wave type", () => {
	// const callback = jest.fn();
	// render(<Provider store={Store}><OscControls setAudioEvent={callback}></OscControls></Provider>)
	// Store.dispatch({type: START_AUDIO})
	// userEvent.click(screen.getByRole("button"))
	// const select = screen.getByRole('combobox')
	// userEvent.selectOptions(select, ['sawtooth'])
	// expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("sawtooth")
	// })
	// it("Should be able to change the volume", () => {
	//     const callback = jest.fn();
	//     render(<Provider store={Store}><OscControls setAudioEvent={callback}></OscControls></Provider>)
	//     Store.dispatch({type: START_AUDIO})
	//     userEvent.click(screen.getByRole("button"))
	//     const slider = screen.getByRole('slider')
	//     fireEvent.change(slider, {target: {value: '20'}})
	//     expect(slider.value).toBe("20")
	//})
	// it("Should play a pitch", () => {
	//     const { result: state } = renderHook(() => useState<((type: string, data: IStdNote) => void)>())
	//     render(<Provider store={Store}><OscControls setAudioEvent={state.current[1]}></OscControls></Provider>)
	//     Store.dispatch({type: START_AUDIO})
	//     const context: any = Store.getState().context
	//     act(() => {
	//         userEvent.click(screen.getByRole("button"))
	//     })
	//     act(() => {
	//         state.current[0]!("start", StdNote("c4"))
	//         const [oscnode] = registrar.getAudioNodes<OscillatorNode>(context, "OscillatorNode")
	//         expect(oscnode.start).toHaveBeenCalledTimes(1)
	//     })
	// })
});
