import { TNotes } from "../dictionaryutils/dictionaryutils"
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import { uniqueChords } from "../../../util/extensions/notes/notes"

export function Inversions(obj: TNotes) {
    const {notes, validChord} = obj
    return (
        <div><span className={dStyles.bold}>Inversions</span>{uniqueChords(notes!).map((chord, i) => {
            return (<div key={i} className={dStyles.bubble}>{chord}</div>)
        })
        }</div>
    )
}