import { TNotes } from "../../units/dictionaryutils/dictionaryutils";
import { Inversions } from "../../units/inversions/inversions";
import { Scales } from "../scales/scales";

export function ChordContainer({notes}: TNotes) {
    return (<>
        <Inversions notes={notes} ></Inversions>
        { notes != undefined ? <div><Scales notes={notes}/></div> : null}
        </>
    )
}