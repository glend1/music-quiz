import { ChangeEvent, useState } from "react";
import { TQuestionComponent } from "../../pages";
import { useFormState } from "../../util/customHooks";
import { createInterval, DirectionType, directionTypes, intervals, IStdNote} from "../../util/notes";
import { Select } from "./select";
import { Slider } from "./slider";

type IntervalT = { note: IStdNote; description: string;}

export function Interval({root: root, setQuestion: setQuestion, question: question }: TQuestionComponent) {
    const [intervalRange, setIntervalRange] = useFormState("0")
    const [direction, setDirection] = useState<DirectionType>("Both")
    const [interval, setInterval] = useState<IntervalT>()
    function newInterval() {
        if (question) {
            let newInterval = createInterval(root, parseInt(intervalRange), direction)
            if (newInterval) {
                setInterval(newInterval)
                setQuestion(root)
            }
        }
    }
    function changeQuestion() {
        setQuestion(interval?.note)
    }
    return (
        <>{
            root ? <>
                <Select label={"Direction"} array={directionTypes} id={"direction"} cb={function (e: ChangeEvent<HTMLSelectElement>): void {
                    let target = e.target;
                    let selected = target.options[target.selectedIndex].text
                    if (directionTypes.includes(selected)) {
                        setDirection(selected as DirectionType)
                    }
                } } />
                <Slider id={"interval"} label={"Intervals"} value={intervalRange} set={setIntervalRange} min={0} max={12} display={intervals[parseInt(intervalRange)]}/>
                <button onClick={newInterval}>New Interval</button>
                {interval != null ? <>
                    <h3>{root.note} {interval.description}</h3>
                    {root.name == question?.name ? <button onClick={changeQuestion}>Use Interval</button> : ""}
                    <h3>{question?.note}</h3>
                </> : ""}
            </> : <div>Please create a Question first</div>
        }</>
    )
}
