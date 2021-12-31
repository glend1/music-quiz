import { render, screen } from '@testing-library/react'
import { MidiInput } from './midiinput'

describe("midiinput", () => {
    it("Should tell the use midi isn't supported in their browser", () => {
        const callback = jest.fn(input => input);
        render(<MidiInput setMidiDevice={callback}></MidiInput>)
        expect(screen.getByText("Midi not available in this browser")).toBeInTheDocument()
    })
    //TODO more tests need to be done
})