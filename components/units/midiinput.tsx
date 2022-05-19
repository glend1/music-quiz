import { WebMidi, Input } from 'webmidi';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Select } from './select';
import { MidiConnection } from '../../util/midiConnection';

type IInput = {
    setMidiDevice: Dispatch<SetStateAction<false | Input>>
}

export function MidiInput({setMidiDevice}: IInput) {
    function selectAction(e: ChangeEvent<HTMLSelectElement>) {
        let target = e.target;
        setMidiDevice(WebMidi.getInputByName(target.options[target.selectedIndex].text));
    }
    const midi = MidiConnection()
    return (
        <>
            {
                (midi.error) ? 
                    <div>Midi not available in this browser</div> : 
                        (midi.enabled) ? 
                            <Select id="midi_select" label="Select a Midi Device" array={midi.ports} cb={selectAction}/> : 
                            <button onClick={(e) => {midi.enable()}}>Enable Midi</button>
            }
        </>
    )
}