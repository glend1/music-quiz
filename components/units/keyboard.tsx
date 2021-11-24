import { useEffect, useRef, useState } from "react";
import { INote } from "../../util/notes";
import { Select } from "./select"

type IKeyboard = {cb: (note: INote, type: string) => void}

export function Keyboard({cb}: IKeyboard) {
    const keyboardSelectId = "keyboard_mode"
    const keyboardSelect = useRef<HTMLSelectElement | null>(null)
    const [event, setEvent] = useState<(e: any) => void>()
    useEffect(() => {
        keyboardEvent()
    }, [cb])
function keyboardEvent() {
    if (event != null) {
        document.body.removeEventListener("keydown", event)
        document.body.removeEventListener("keyup", event)
    }
    if (keyboardSelect.current) {
        let newEvent = Type(keyboardSelect.current.selectedIndex)
        if (newEvent) {
            document.body.addEventListener("keydown", newEvent)
            document.body.addEventListener("keyup", newEvent)
        }
        setEvent(() => { return newEvent})
    }
}
    function Type(i: number) {
        switch (i) {
            case 1:
                return layout;
            case 2: 
                return alphabetical;
            default:
                return undefined
        }
    }
    function layout(e: KeyboardEvent) {
        if (!e.repeat) {
            switch (e.key) {
                case "z": 
                    cb({natural: "C"}, e.type)
                    break;
                case "s": 
                    cb({sharp: "C#", flat: "Db"}, e.type)
                    break;
                case "x": 
                    cb({natural: "D"}, e.type)
                    break;
                case "d": 
                    cb({sharp: "D#", flat: "Eb"}, e.type)
                    break;
                case "c": 
                    cb({natural: "E"}, e.type)
                    break;
                case "v": 
                    cb({natural: "F"}, e.type)
                    break;
                case "g": 
                    cb({sharp: "F#", flat: "Gb"}, e.type)
                    break;
                case "b": 
                    cb({natural: "G"}, e.type)
                    break;
                case "h": 
                    cb({sharp: "G#", flat: "Ab"}, e.type)
                    break;
                case "n": 
                    cb({natural: "A"}, e.type)
                    break;
                case "j": 
                    cb({sharp: "A#", flat: "Bb"}, e.type)
                    break;
                case "m": 
                    cb({natural: "B"}, e.type)
                    break;
            }
        }
    }
    function alphabetical(e: KeyboardEvent) {
        if (!e.repeat) {
            switch (e.key) {
                case "c": 
                    cb({natural: "C"}, e.type)
                    break;
                case "C": 
                    cb({sharp: "C#", flat: "B"}, e.type)
                    break;
                case "d": 
                    cb({natural: "D"}, e.type)
                    break;
                case "D": 
                    cb({sharp: "D#", flat: "Db"}, e.type)
                    break;
                case "e": 
                    cb({natural: "E"}, e.type)
                    break;
                case "E": 
                    cb({sharp: "F", flat: "Eb"}, e.type)
                    break;
                case "f": 
                    cb({natural: "F"}, e.type)
                    break;
                case "F": 
                    cb({sharp: "F#", flat: "E"}, e.type)
                    break;
                case "g": 
                    cb({natural: "G"}, e.type)
                    break;
                case "G": 
                    cb({sharp: "G#", flat: "Gb"}, e.type)
                    break;
                case "a": 
                    cb({natural: "A"}, e.type)
                    break;
                case "A": 
                    cb({sharp: "A#", flat: "Ab"}, e.type)
                    break;
                case "b": 
                    cb({natural: "B"}, e.type)
                    break;
                case "B": 
                    cb({sharp: "C", flat: "Bb"}, e.type)
                    break;
            }
        }
    }
    return (<Select id={keyboardSelectId} forwardRef={keyboardSelect} label="Keyboard Mode" array={["None", "Layout", "Alphabetical"]} cb={keyboardEvent}/>)
}

