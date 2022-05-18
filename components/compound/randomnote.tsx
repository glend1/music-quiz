import { getNaturalNoteFromArray } from '../../util/notes';
import { Slider } from '../units/slider';
import { useBoolean, useFormState } from '../../util/customHooks';
import { CheckBox } from '../units/checkbox';


export function RandomNote({newQuestion}: { newQuestion: (min: number, max: number, accidental: boolean) => void; }) {
    const {bool: accidental, toggle: toggleAccidental} = useBoolean()
    const [min, setMin] = useFormState("2")
    const [max, setMax] = useFormState("28")
    function display(value: string) {
        return getNaturalNoteFromArray(parseInt(value))
    }
    return (
        <>
            <CheckBox id={'accidentals'} label={'Accidentals?'} bool={accidental} toggle={toggleAccidental}/>
            <Slider id={"minN"} label={"Minimum"} value={min} set={setMin} min={0} max={parseInt(max)} display={display(min)}/>
            <Slider id={"maxN"} label={"Maximum"} value={max} set={setMax} min={parseInt(min)} max={34} display={display(max)}/>
            <button onClick={() => {newQuestion(parseInt(min), parseInt(max), accidental)}}>New Note</button>

        </>
    )
}