import { Dispatch, SetStateAction, useState } from "react"
import { useFormState } from "../../util/customHooks"
import { randomFromRange } from "../../util/maths"
import { randomChord, Chord, IStdNote, StdNote } from "../../util/notes"
import { Slider } from "../units/slider"

//TODO this is incomplete
export function RandomChord({0: question, 1: setQuestion }: [IStdNote, Dispatch<SetStateAction<IStdNote>>]) {
    const [chord, setChord] = useState<Chord | undefined>()
    const [minD, setMinD] = useFormState("2")
    const [maxD, setMaxD] = useFormState("4")
    const [minO, setMinO] = useFormState("3")
    const [maxO, setMaxO] = useFormState("5")
    function next() {
        let next = isNext()
        if (next != false) {
            if (chord && chord.notes[next]) {
                setQuestion(StdNote(chord.notes[next]))
            }
        }
    }
    function isNext() {
        if (question && chord && question.note) {
            let index = chord.notes.indexOf(question.note)
            if (index != null) {
                let next = index+1
                if (chord.notes[next]) {
                    return next
                }
            }
        }
        return false
    }
    return (<>
    <div><div>Set Difficulty</div>
    <Slider id={"minD"} label={"Minimum"} value={minD} set={setMinD} min={2} max={parseInt(maxD)} />
    <Slider id={"maxD"} label={"Maximum"} value={maxD} set={setMaxD} min={parseInt(minD)} max={7} /></div>
    <div><div>Set Root Octave</div>
    <Slider id={"minO"} label={"Minimum"} value={minO} set={setMinO} min={1} max={parseInt(maxO)} />
    <Slider id={"maxO"} label={"Maximum"} value={maxO} set={setMaxO} min={parseInt(minO)} max={7} /></div>
        <button onClick={() => {
            let difficulty = randomFromRange(parseInt(minD), parseInt(maxD))
            let octave = randomFromRange(parseInt(minO), parseInt(maxO))
            if (difficulty && octave) {
                let chord = randomChord(difficulty, octave)
                setChord(chord)
                setQuestion(StdNote(chord.notes[0]))
            }
        }}>New Chord</button>
        {chord && question ? 
            <>
                <h2>{chord.tonic} {chord.symbol}</h2>
                {isNext() != false ? <button onClick={next}>Next</button> : ""}
                <h3>{question.note}</h3>
                <div>Difficulty: {chord.intervals.length}</div>
            </> : 
        <div>Please generate a random Chord</div>
        }
    </>)
}