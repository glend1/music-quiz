import { Note } from "@tonaljs/tonal";
import { Dispatch, SetStateAction, useState } from "react";
import { StdNote, createInterval, controlOctave, IStdNote, IInt } from "../../util/notes";

export function Interval({ 0: question, 1: setQuestion }: [IStdNote, Dispatch<SetStateAction<IStdNote>>]) {
    const [interval, setInterval] = useState<IInt>()
    function newInterval() {
        if (question) {
            let int = createInterval(controlOctave(question.octave))
            if (int != null) {
                setInterval(int)
                setQuestion(StdNote(Note.simplify(Note.transpose(question.note, int.transposeBy))))
            }
        }
    }
    return (
        <>{
            question ? <>
                <h2>
                    {interval != null ? interval.name : ""}
                </h2>
                <button onClick={newInterval}>New Interval</button>
            </> : <div>Create a Question first</div>
        }</>
    )
}
