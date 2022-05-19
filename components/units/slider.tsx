import { ChangeEventHandler } from "react"
import styles from "../../styles/slider.module.css"

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
        <label className={styles.sliderLabel} htmlFor={id}>{label}</label>
        <input id={id} type="range" min={min} max={max} onChange={set} value={value}></input>
        <span className={styles.sliderValue}>{display ? display : value}</span>
    </div>)
}