import { render, screen } from "@testing-library/react"
import { GlobalAudioContext, useAudioContext } from "./audiocontext"
import { AudioContext as ACMock } from 'standardized-audio-context-mock';
import userEvent from "@testing-library/user-event";

function AudioContextDisplay() {
    let audioContext = useAudioContext()
    return (<>
        <h1>{audioContext.context ? "set" : "undefined"}</h1>
        <button onClick={audioContext.createAudioContext}></button>
    </>)
}

function MockAudioContext() {
    return (<GlobalAudioContext>
        <AudioContextDisplay></AudioContextDisplay>
    </GlobalAudioContext>)
}

describe("GlobalAudioContext", () => {
    it("should render the component", () => {
        render(<GlobalAudioContext><h1>Hello World</h1></GlobalAudioContext>)
        expect(screen.getByRole("heading")).toHaveTextContent("Hello World")
    })
})
describe("UseAudioContext", () => {
    let ac: any
    beforeEach(() => {
        ac = global.AudioContext
        global.AudioContext = ACMock as any;
        render(<MockAudioContext />)
    })
    afterEach(() => {
        global.AudioContext = ac
    })
    it("should not have a context", () => {
        expect(screen.getByRole("heading")).toHaveTextContent("undefined")
    })
    it("should set a context", async () => {
        await userEvent.click(screen.getByRole("button"))
        expect(screen.getByRole("heading")).toHaveTextContent("set")
    })
})