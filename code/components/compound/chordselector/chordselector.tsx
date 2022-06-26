import { useState } from "react"
import { v4 as uuid } from 'uuid';
import { Piano } from "../../units/piano/piano";
import kStyles from '../../units/piano/piano.module.css'
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import { TChordMethod, TNotes } from "../../units/dictionaryutils/dictionaryutils";
import { DeleteParent } from '../../units/dictionaryutils/dictionaryutils'
import { ChordContainer } from "../chordcontainer/chordcontainer";
import { getSingleChord } from "../../../util/extensions/notes/notes";

export function ChordSelector({chords}: TChordMethod) {
    const [uid] = useState(uuid())
const [chordState, setChord] = useState<TNotes>()
return (<><h2>Chord</h2><span className={dStyles.bold}>Select a Chord</span>
<Piano higher={true} highlight={[]} cb={(e: React.MouseEvent<SVGElement>): void => {
    let el = e.target as SVGElement
    el.classList.toggle(kStyles.show)
    let selected: string[] = []
    el.parentNode?.parentNode?.querySelectorAll(`.${kStyles.show}`).forEach((e) => {
        let el = e as SVGElement
        let note = el.dataset.natural ? el.dataset.natural : el.dataset.sharp
        if (note?.length) {
            selected.push(note)
        }
    })
    setChord(() => { 
        let isChord = false
        if (getSingleChord(selected)) {
            isChord = true
        }
        return { validChord: isChord, notes: selected }})
    chords((prev) => {
        prev[uid] = selected
        return {...prev}
    })
    el.parentNode?.parentNode?.parentNode?.parentNode?.querySelector(`.generated`)?.remove()
} } />
<ChordContainer {...chordState} />
<DeleteParent cb={() => {
    chords((prev) => {
        delete prev[uid]
        return {...prev}
    })
}}/>
</>)
}