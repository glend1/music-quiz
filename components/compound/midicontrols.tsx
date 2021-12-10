import { useEffect, useState } from 'react';
import { OscControls } from '../units/osccontrols';
import { MidiInput } from '../units/midiinput';
import { Piano } from '../units/piano';
import { Keyboard } from '../units/keyboard';
import keyboardStyles from '../../styles/keyboard.module.css'
import { IArray, useBoolean, useFormState } from '../../util/customHooks';
import { midiEvents } from '../../util/midievents';
import { clearListeners } from '../units/midiinput';
import { IStdNote } from '../../util/notes';
import { Input } from 'webmidi';

export function MidiControls(answer: IArray<IStdNote>) {
    const [audioEvent, setAudioEvent] = useState<((type: string, data: IStdNote) => void) | undefined>()
    const {bool: hideKeyboard, toggle: toggleKeyboard} = useBoolean()
    const {bool: sharp, toggle: toggleSharp} = useBoolean(true)
    const [octave, setOctave] = useFormState("4")
    const [midiDevice, setMidiDevice] = useState<Input | false>(false)
    const {midiKeyboard, key, mouse} = midiEvents(answer, sharp, parseInt(octave), audioEvent, midiDevice)
    useEffect(() => {
        midiKeyboard()
        return () => {
            clearListeners()
        }
    }, [midiKeyboard])
    return (
        <>
            <div>
                <input type="checkbox" id="sharp" name="sharp" defaultChecked={sharp} onChange={toggleSharp} />
                <label htmlFor="sharp">Sharp?</label>
            </div>
            <MidiInput setMidiDevice={setMidiDevice}/>
            <OscControls setAudioEvent={setAudioEvent}/>
            <div>
                <input type="checkbox" id="keyboard_visibility" name="keyboard_visibility" defaultChecked={hideKeyboard} onChange={toggleKeyboard} />
                <label htmlFor="keyboard_visibility">Show Keyboard?</label>
            </div>
            <div id="keyboard_section" className={!hideKeyboard ? keyboardStyles.hide : ""}>
                <form>
                    <div>
                        <label htmlFor="octave">Select Octave:</label>
                        <input id="octave" type="range" min="2" max="6" onChange={setOctave} value={octave}></input>
                        <span>{octave}</span>
                    </div>
                </form>
                <Keyboard cb={key}/>
                <Piano highlight={answer.array} cb={mouse}/>
            </div>
        </>
    )
}