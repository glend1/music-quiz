import { useState } from "react"
import { TQuestionComponent } from "../../pages"
import { useFormState } from "../../util/customHooks"
import { randomFromRange } from "../../util/maths"
import { randomChord, Chord, StdNote } from "../../util/notes"
import { Slider } from "../units/slider"

//TODO this is incomplete
export function RandomChord({root: root, setQuestion: setQuestion, question: question }: TQuestionComponent) {
    const [chord, setChord] = useState<Chord | undefined>()
    const [minD, setMinD] = useFormState("2")
    const [maxD, setMaxD] = useFormState("4")
    function next() {
        let next = isNext()
        if (next != false) {
            if (chord && chord.notes[next]) {
                setQuestion(StdNote(chord.notes[next]))
            }
        }
    }
    function isChord() {
        if (chord && root && root.note == chord.notes[0]) {
            return true
        }
        return false
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
    return (root ? <>
    <div><div>Set Number of Notes</div>
    <Slider id={"minD"} label={"Minimum"} value={minD} set={setMinD} min={2} max={parseInt(maxD)} />
    <Slider id={"maxD"} label={"Maximum"} value={maxD} set={setMaxD} min={parseInt(minD)} max={7} /></div>
        <button onClick={() => {
            let difficulty = randomFromRange(parseInt(minD), parseInt(maxD))
            if (difficulty) {
                let chord = randomChord(difficulty, root!.note)
                setChord(chord)
                setQuestion(StdNote(chord.notes[0]))
            }
        }}>New Chord</button>
        {chord && isChord() ? 
            <>
                <h3>{chord.symbol}</h3>
                {isNext() != false ? <button onClick={next}>Next</button> : ""}
                <h3>{root.note} {question!.note}</h3>
                <div>Number of Notes: {chord.intervals.length}</div>
            </> : 
        <div>Please generate a random Chord</div>
        }
    </> : <div>Please create a Question first</div>)
}