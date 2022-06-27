import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import { uniqueChords } from "../../../util/extensions/notes/notes"

export function Inversions({notes}: {notes: string[]}) {
    const chords = uniqueChords(notes)
    if (chords.length > 0) {
        return (
            <div><span className={dStyles.bold}>Inversions</span>{chords.map((chord, i) => {
                return (<div key={i} className={dStyles.bubble}>{chord}</div>)
            })
            }</div>
        )
    }
    return <div>No Chords found</div>
}