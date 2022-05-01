import { generateRandomNote, getFromNumbersArray, IStdNote } from '../../util/notes';
import { Dispatch, SetStateAction } from 'react';
import { Slider } from '../units/slider';
import { useBoolean, useFormState } from '../../util/customHooks';
import { CheckBox } from '../units/checkbox';

type TRandomNote = {
    setQuestion: Dispatch<SetStateAction<IStdNote>>
    setRoot: Dispatch<SetStateAction<IStdNote>>
}

export function RandomNote({setQuestion, setRoot}: TRandomNote) {
    const {bool: accidental, toggle: toggleAccidental} = useBoolean()
    const [min, setMin] = useFormState("2")
    const [max, setMax] = useFormState("28")
    function newQuestion() {
        let note = generateRandomNote(parseInt(min), parseInt(max), accidental)
        setQuestion(note)
        setRoot(note)
    }
    function display(value: string) {
        return getFromNumbersArray(parseInt(value))
    }
    return (
        <>
            <CheckBox id={'accidentals'} label={'Accidentals?'} bool={accidental} toggle={toggleAccidental}/>
            <Slider id={"minN"} label={"Minimum"} value={min} set={setMin} min={0} max={parseInt(max)} display={display(min)}/>
            <Slider id={"maxN"} label={"Maximum"} value={max} set={setMax} min={parseInt(min)} max={34} display={display(max)}/>
            <button onClick={newQuestion}>New Note</button>
        </>
    )
}