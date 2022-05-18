import { useBoolean } from "../../util/customHooks";
import { Chord, IStdNote } from "../../util/notes";
import { IntervalT, TType } from "../../util/useQuestionGeneration";
import { CheckBox } from "../units/checkbox";
import styles from "../../styles/questionControls.module.css"

function highlightNote(i: number, j: number, string: string | undefined) {
    return i == j ? (<span className={styles.highlight}>{string}</span>) : (<span>{string}</span>)
  }

export function QuestionControls({ type, chord, root, interval, question, current}: { current: number; question: IStdNote[]; type: TType; chord: Chord | undefined; interval: IntervalT | undefined; root: IStdNote; }) {
    const {bool: showAnswer, toggle: toggleViewQuestions} = useBoolean(false)
    return (
        <>
            <h3>{type}</h3>
            { root && root.note ? <h3>{root?.note}</h3> : ""}
            { type == "Chord" ? <h3>{chord?.symbol}</h3> : ""}
            { type == "Interval" ? <h3>{interval?.description}</h3> : ""}
            <CheckBox id={'viewQuestions'} label={'Show Answer'} bool={showAnswer} toggle={toggleViewQuestions}/>
            { question && showAnswer ? <h3 className={styles.answer}>{
                question.map((e, i) => {
                    if (e && e.note) {
                        return highlightNote(i, current, e.note)
                    }
                })}</h3> 
            : ""}
        </>
    )
}