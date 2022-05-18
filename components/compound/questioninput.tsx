import { useEffect, useState } from 'react';
import { MidiInput } from '../units/midiinput';
import { Keyboard } from '../units/keyboard';
import { CheckBox } from '../units/checkbox';
import keyboardStyles from '../../styles/keyboard.module.css'
import { IArray, useBoolean, useFormState } from '../../util/customHooks';
import { MidiEvents } from '../../util/midievents';
import { clearListeners } from '../../util/midiConnection';
import { IStdNote } from '../../util/notes';
import { Input } from 'webmidi';
import { Piano } from '../units/piano';
import { Slider } from '../units/slider'
import { AudioEvent } from '../../pages';

type TQuestionInput = {answer: IArray<IStdNote>, audioEvent: AudioEvent | undefined}

export function QuestionInput({answer: answer, audioEvent: audioEvent}: TQuestionInput) {
    const {bool: hideKeyboard, toggle: toggleKeyboard} = useBoolean()
    const {bool: sharp, toggle: toggleSharp} = useBoolean(true)
    const [octave, setOctave] = useFormState("4")
    const [midiDevice, setMidiDevice] = useState<Input | false>(false)
    const {midiKeyboard, key, mouse} = MidiEvents(answer, sharp, parseInt(octave), audioEvent, midiDevice)
    useEffect(() => {
        midiKeyboard()
        return () => {
            clearListeners()
        }
    }, [midiKeyboard])
    return (
        <>
            <div>
                <CheckBox id={'sharp'} label={'Sharp?'} bool={sharp} toggle={toggleSharp}/>
            </div>
            <MidiInput setMidiDevice={setMidiDevice}/>
            
            <div>
                <CheckBox id={'keyboard_visibility'} label={'Show Keyboard?'} bool={hideKeyboard} toggle={toggleKeyboard}/>
            </div>
            <div id="keyboard_section" data-testid="keyboard" className={!hideKeyboard ? keyboardStyles.hide : ""}>
                <Slider id="octave" label="Set Octave:" value={octave} set={setOctave} min={1} max={6}/>
                <Keyboard cb={key}/>
                <Piano highlight={answer.array} cb={mouse}/>
                <button onClick={() => {answer.clear()}}>Clear keyboard</button>
            </div>
        </>
    )
}