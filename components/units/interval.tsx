import { Dispatch, SetStateAction, useState } from "react";
import { StdNote, createInterval, clampOctave, IStdNote, IInt, simplifyAndTranspose } from "../../util/notes";

export function Interval({ 0: question, 1: setQuestion }: [IStdNote, Dispatch<SetStateAction<IStdNote>>]) {
    const [interval, setInterval] = useState<IInt>()
    function newInterval() {
        if (question) {
            let int = createInterval(clampOctave(question.octave))
            if (int != null) {
                setInterval(int)
                setQuestion(StdNote(simplifyAndTranspose(question.note, int.transposeBy)))
            }
        }
    }
    //TODO add difficulty
    return (
        <>{
            question ? <>
                <h2>
                    {interval != null ? interval.name : ""}
                </h2>
                <button onClick={newInterval}>New Interval</button>
            </> : <div>Please create a Question first</div>
        }</>
    )
}

