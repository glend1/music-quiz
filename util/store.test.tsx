import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { START_AUDIO, Store } from "./store"
import { AudioContext } from 'standardized-audio-context-mock';

describe("Store: This is used to save a reference to the global AudioContext", () => {
    const ac = global.AudioContext
    beforeEach(() => {
        global.AudioContext = AudioContext as any;
        render(<Provider store={Store} />)
    })
    afterEach(() => {
        global.AudioContext = ac
    })
    it("Store should have only context and it should be null on initialization", () => {
        expect(Store.getState()).toStrictEqual({context: null})
    })
    it("Should create its own AudioContext", () => {
        Store.dispatch({type: START_AUDIO})
        expect(Store.getState()).toStrictEqual({context: new AudioContext()})
    })
})