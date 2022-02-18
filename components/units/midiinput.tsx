import { WebMidi, Input, PortEvent } from 'webmidi';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Select } from './select';
import { useArray } from '../../util/customHooks'

type IInput = {
    setMidiDevice: Dispatch<SetStateAction<false | Input>>
}

export function MidiInput({setMidiDevice}: IInput) {
    function selectAction(e: ChangeEvent<HTMLSelectElement>) {
        let target = e.target;
        setMidiDevice(WebMidi.getInputByName(target.options[target.selectedIndex].text));
    }
    const {array: midiInputs, push: midiPush, filter: midiFilter} = useArray(["none"])
    const [error, setError] = useState<Error | undefined>();
    function isInput(e: PortEvent) { return e.port.type === "input"}
    useEffect(() => {
        WebMidi.addListener("connected", (e) => { if (isInput(e)) {midiPush(e.port.name)}});
        WebMidi.addListener("disconnected", (e) => {
            e.port.removeListener()
            if (isInput(e)) {midiFilter((str) => {return str != e.port.name})}
        });
        WebMidi.
        enable().
        catch((err) => {
            setError(err)
        })
    }, [])
    return (
        <form>
            {(error) ? <div>Midi not available in this browser</div> : <Select id="midi_select" label="Select a Midi Device" array={midiInputs} cb={selectAction}/>}
        </form>
    )
}

export function clearListeners() {
    WebMidi.inputs.forEach(e => {
        e.removeListener()
    })
}