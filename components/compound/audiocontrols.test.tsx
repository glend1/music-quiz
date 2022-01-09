import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { START_AUDIO, Store } from "../../util/store";
import { AudioControls } from "./audiocontrols";
import { AudioContext as ACMock } from 'standardized-audio-context-mock';

describe("audiocontrols", () => {
    it("Should ask for a audiocontext", () => {
        render(<Provider store={Store}><AudioControls /></Provider>)
        expect(screen.getByText("Please Start AudioContext")).toBeInTheDocument()
    })
    it("Should wait for the user to unmute the audio", () => {
        const ac = global.AudioContext
        global.AudioContext = ACMock as any;
        render(<Provider store={Store}><AudioControls /></Provider>)
        Store.dispatch({type: START_AUDIO})
        expect(screen.getByText("Unmute"))
        global.AudioContext = ac
    })
    it("Should unmute the audio", () => {
        //TODO more tests need to be done
        const ac = global.AudioContext
        global.AudioContext = ACMock as any;
        render(<Provider store={Store}><AudioControls /></Provider>)
        Store.dispatch({type: START_AUDIO})
        fireEvent.click(screen.getByRole("button"))
        screen.getByText("")
        global.AudioContext = ac
    })
})