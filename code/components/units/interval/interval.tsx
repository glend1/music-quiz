import { ChangeEvent, useState } from "react";
import { useFormState } from "../../../util/hooks/customhooks/customhooks";
import { DirectionType, directionTypes, intervals, IStdNote} from "../../../util/extensions/notes/notes";
import { Select } from "../../elements/select/select";
import { Slider } from "../../elements/slider/slider";

export function Interval({ newInterval, root}: { newInterval: (intervalRange: number, direction: DirectionType) => void; root: IStdNote; }) {
    const [intervalRange, setIntervalRange] = useFormState("0")
    const [direction, setDirection] = useState<DirectionType>("Both")
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
                <button onClick={() => { newInterval(parseInt(intervalRange), direction) }}>New Interval</button>
            </> : <div>Please create a Question first</div>
        }</>
    )
}
