import { isChord } from "../../../util/extensions/notes/notes";
import { TNotes } from "../../units/dictionaryutils/dictionaryutils";
import { Inversions } from "../../units/inversions/inversions";
import { Scales } from "../scales/scales";

export function ChordContainer({notes}: TNotes) {
    if (!isChord(notes)) {
        return <div>No valid Chord</div>
    }
    return (<div>
        <Inversions notes={notes} ></Inversions>
        <Scales notes={notes}/>
        </div>
    )
}