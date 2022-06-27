import { Piano } from "../../units/piano/piano"
import { isChord, IStdNote, simplify, StdNote } from "../../../util/extensions/notes/notes"
import { Inversions } from "../../units/inversions/inversions"
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'

export function Chord({notes}: {notes: string[]}) {
    if (isChord(notes)) {
        let simplified: IStdNote[] = []
            notes.forEach((note) => {
                simplified.push(StdNote(`${simplify(note)}4`))
            })
        return (<>
        <Piano width={100} height={50} highlight={simplified} cb={(e: React.MouseEvent<SVGElement>): void => {}}></Piano>
        <span className={dStyles.bold}>Notes</span>{
            notes.map((note) => {
                return (<div className={dStyles.bubble} key={note}>{note}</div>)
            })
        }
        <Inversions notes={notes} ></Inversions>
        </>)
    }
    return <div>Not a valid Chord</div>
}