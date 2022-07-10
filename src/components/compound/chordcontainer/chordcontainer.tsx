import { isChord } from "../../../util/extensions/notes/notes";
import { TNotes } from "../../units/dictionaryutils/dictionaryutils";
import { ChordInformation } from "../chordinformation/chordinformation";
import { Scales } from "../scales/scales";

export function ChordContainer({notes}: TNotes) {
    if (!isChord(notes)) {
        return <div>No valid Chord</div>
    }
    return (<div>
        <ChordInformation notes={notes} />
        <Scales notes={notes}/>
        </div>
    )
}