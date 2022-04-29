import { accidentals, IStdNote, scale, StdNote } from '../../util/notes';
import { Dispatch, SetStateAction } from 'react';
import { Slider } from '../units/slider';
import { useBoolean, useFormState } from '../../util/customHooks';
import { CheckBox } from '../units/checkbox';
import { randomFromArray, randomFromRange } from '../../util/maths';

type RandomNote = {
    setQuestion: Dispatch<SetStateAction<IStdNote>>
    setRoot: Dispatch<SetStateAction<IStdNote>>
}

export function RandomNote({setQuestion, setRoot}: RandomNote) {
    const {bool: accidental, toggle: toggleAccidental} = useBoolean()
    const [min, setMin] = useFormState("2")
    const [max, setMax] = useFormState("28")
    const notes: string[] = []
    for (let i = 2; i <= 6; i++) {
        scale.forEach(note => {
            notes.push(`${note}${i}`)
        });
    }
    function newQuestion() {
        let note = display(randomFromRange(parseInt(min), parseInt(max))!.toString())
        note = note[0] + (accidental ? randomFromArray(accidentals) : "") + note[1]
        let data = StdNote(note)
        setQuestion(data)
        setRoot(data)
    }
    function display(value: string) {
        return notes[parseInt(value)]
    }
    return (
        <>
            <CheckBox id={'accidentals'} label={'Accidentals?'} bool={accidental} toggle={toggleAccidental}/>
            <Slider id={"minN"} label={"Minimum"} value={min} set={setMin} min={0} max={parseInt(max)} display={display(min)}/>
            <Slider id={"maxN"} label={"Maximum"} value={max} set={setMax} min={parseInt(min)} max={notes.length-1} display={display(max)}/>
            <button onClick={newQuestion}>New Note</button>
        </>
    )
}