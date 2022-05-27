import { useState } from "react"
import { v4 as uuid } from 'uuid';
import { Piano } from "../../units/piano/piano";
import kStyles from '../../units/piano/piano.module.css'
import { ChordInformation } from "../chordinformation/chordinformation";
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import { TChordMethod } from "../../units/dictionaryutils/dictionaryutils";
import { DeleteParent } from '../../units/dictionaryutils/dictionaryutils'

export function ChordSelector({chords}: TChordMethod) {
    const [uid] = useState(uuid())
const [chordState, setChord] = useState<string[]>([])
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
    setChord(() => { return selected })
    chords((prev) => {
        prev[uid] = selected
        return {...prev}
    })
    el.parentNode?.parentNode?.parentNode?.parentNode?.querySelector(`.generated`)?.remove()
} } />
<ChordInformation notes={chordState} />
<DeleteParent cb={() => {
    chords((prev) => {
        delete prev[uid]
        return {...prev}
    })
}}/>
</>)
}