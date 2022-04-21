import { ChangeEventHandler } from "react"

type TSlider = {
    id: string
    label: string
    value: string
    set: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
    min: number
    max: number
    display?: string
}

export function Slider({id, label, value, set, min, max, display}: TSlider) {
    return(<div>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="range" min={min} max={max} onChange={set} value={value}></input>
        <span>{display ? display : value}</span>
    </div>)
}