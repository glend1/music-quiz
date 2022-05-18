import { useFormState } from "../../util/customHooks"
import { IStdNote } from "../../util/notes"
import { Slider } from "../units/slider"

export function RandomChord({ newChord, root }: { newChord: (min: number, max: number) => void, root: IStdNote }) {
    const [minD, setMinD] = useFormState("2")
    const [maxD, setMaxD] = useFormState("4")
    return (root ? <>
        <div>Set Number of Notes</div>
        <Slider id={"minD"} label={"Minimum"} value={minD} set={setMinD} min={2} max={parseInt(maxD)} />
        <Slider id={"maxD"} label={"Maximum"} value={maxD} set={setMaxD} min={parseInt(minD)} max={7} />
        <button onClick={() => {newChord(parseInt(minD), parseInt(maxD))}}>New Chord</button>   
    </> : <div>Please create a Question first</div>)
}