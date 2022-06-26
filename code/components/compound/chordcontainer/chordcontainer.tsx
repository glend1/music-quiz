import { TNotes } from "../../units/dictionaryutils/dictionaryutils";
import { Inversions } from "../../units/inversions/inversions";
import { Scales } from "../scales/scales";

export function ChordContainer(obj: TNotes) {
    const {notes, validChord} = obj
    if (validChord) {
        return (<div>
            <Inversions {...obj} ></Inversions>
            <Scales {...obj}/>
            </div>
        )
    }
    if (notes) {
        if (notes.length > 0) {
            return <div>No valid Chord</div>
        }
    }
    return <div>Please press a key</div>
}