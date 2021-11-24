import { MouseEventHandler } from "react";
import { Input } from "webmidi";
import { IArray } from "./customHooks";
import { INote, IStdNote, normalizeMidi, normalizeNote} from "./notes"

export function midiEvents(answer: IArray<IStdNote>, sharp: boolean, octave: number, audioEvent?: ((type: string, data: IStdNote) => void), midiDevice?: Input | false) {
    function filter(data: IStdNote) { 
        return (obj: IStdNote) => { 
            if (data != null && obj != null) {
                return obj.name != data.name 
            } else {
                return false
            }
        } 
    }
   function midiKeyboard() {
        if (midiDevice) {
            midiDevice.addListener('noteon', "all", (e) => {
                let data = normalizeMidi(e.note.number, sharp)
                if (audioEvent) {
                    audioEvent("start", data)
                }
                answer.push(data)
            });
            midiDevice.addListener('noteoff', "all", (e) => {
                let data =  normalizeMidi(e.note.number, sharp)
                if (audioEvent) {
                    audioEvent("stop", data)
                }
                answer.filter(filter(data))
            });
        }
    }

    const mouse: MouseEventHandler<SVGGElement> = (e) => {
            let data = normalizeNote((e.target as SVGElement).dataset as INote, octave, sharp)
            function contains() {
                if (data) {
                    for (let i = 0; i < answer.array.length; i++) {
                        if (answer.array[i]?.name === data.name) { return true }
                    }
                }
                return false
            }
            if (!contains()) {
                if (audioEvent) {
                    audioEvent("start", data)
                }
                answer.push(data)
            } else {
                if (audioEvent) {
                    audioEvent("stop", data)
                }
                answer.filter(filter(data))
            }
        }
    function key(event: INote, type: string) {
            let data = normalizeNote(event, octave, sharp)
            switch (type) {
                case "keydown":
                    if (audioEvent) {
                        audioEvent("start", data)
                    }
                    answer.push(data)
                    break;
                case "keyup":
                    if (audioEvent) {
                        audioEvent("stop", data)
                    }
                    answer.filter(filter(data))
                    break;
            }
        }
    return { midiKeyboard, key, mouse }
}