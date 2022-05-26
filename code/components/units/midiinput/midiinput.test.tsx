import { renderHook } from '@testing-library/react-hooks/dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MidiInput } from './midiinput'
import { act, create } from 'react-test-renderer'

describe("midiinput", () => {
    it("Should tell the use midi isn't supported in their browser", () => {
        const callback = jest.fn(input => input);
        // navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
        // var res;
        // act(() => {
        //     const res = render(<MidiInput setMidiDevice={callback}></MidiInput>) 
        // }).then((onRejected) => {
        //     res.debug()
        // })

        let root; 
        act(() => {
            root = create(<MidiInput setMidiDevice={callback}></MidiInput>)
        });

        // make assertions on root 
        //console.log(root.toJSON())
        // expect(screen.getByText("Midi not available in this browser")).toBeInTheDocument()
    })
    //TODO more tests need to be done
})