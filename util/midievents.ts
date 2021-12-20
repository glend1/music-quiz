import { useCallback } from "react";
import { Input } from "webmidi";
import { AudioEvent } from "../components/compound/midicontrols";
import { IArray } from "./customHooks";
import { INote, IStdNote, normalizeMidi, normalizeNote} from "./notes"

export function MidiEvents(answer: IArray<IStdNote>, sharp: boolean, octave: number, audioEvent?: AudioEvent, midiDevice?: Input | false) {
    const start = useCallback((data: IStdNote | null) => {
        if (data) {
            if (audioEvent) {
                audioEvent("start", data)
            }
            answer.push(data)
        }
    }, [audioEvent, answer])
    const stop = useCallback((data: IStdNote | null) => {
        if (data) {
            if (audioEvent) {
                audioEvent("stop", data)
            }
            answer.filter((obj) => {return obj.name != data.name })
        }
    }, [audioEvent, answer])
   const midiKeyboard = useCallback(() => {
        if (midiDevice) {
            midiDevice.addListener('noteon', "all", (e) => {
                let data = normalizeMidi(e.note.number, sharp)
                start(data)
            });
            midiDevice.addListener('noteoff', "all", (e) => {
                let data =  normalizeMidi(e.note.number, sharp)
                stop(data)
            });
        }
    }, [start, stop, midiDevice, sharp])
    const mouse = useCallback((e : React.MouseEvent<SVGElement>): void  => {
        let data = normalizeNote((e.target as SVGElement).dataset as INote, octave, sharp)
        function contains() {
            if (data) {
                for (let i = 0; i < answer.array.length; i++) {
                    if (answer.array[i]) {
                        return answer.array[i]!.name === data.name
                    }
                }
            }
            return false
        }
        if (data) {
            if (!contains()) {
                start(data)
            } else {
                stop(data)
            }
        }
    }, [start, stop, octave, sharp, answer])
    const key = useCallback((event: INote, type: string) => {
        let data = normalizeNote(event, octave, sharp)
        switch (type) {
            case "keydown":
                start(data)
                break;
            case "keyup":
                stop(data)
                break;
            default:
                throw 'Event not recognized'
        }
    }, [start, stop, octave, sharp])
    return { midiKeyboard, key, mouse }
}