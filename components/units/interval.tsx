import { ChangeEvent, useState } from "react";
import { TQuestionComponent } from "../../pages";
import { useFormState } from "../../util/customHooks";
import { createInterval, DirectionType, directionTypes, intervals} from "../../util/notes";
import { Select } from "./select";
import { Slider } from "./slider";

export function Interval({root: root, setQuestion: setQuestion, question: question }: TQuestionComponent) {
    const [intervalRange, setIntervalRange] = useFormState("0")
    const [direction, setDirection] = useState<DirectionType>("Both")
    const [interval, setInterval] = useState<string>()
    function newInterval() {
        if (question) {
            let newInterval = createInterval(root, parseInt(intervalRange), direction)
            if (newInterval) {
                setInterval(newInterval.description)
                setQuestion(newInterval.note)
            }
        }
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
                <h3>
                    {interval != null ? interval : ""}
                </h3>
            </> : <div>Please create a Question first</div>
        }</>
    )
}

