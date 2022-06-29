import { Piano } from "../../units/piano/piano"
import { getScaleNotes, IStdNote, simplify, StdNote } from "../../../util/extensions/notes/notes"
import { TScale } from "../../units/dictionaryutils/dictionaryutils"
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import { ChordsFromScale } from "../chordfromscale/chordfromscale"

export function ScaleInformation({scale, root}: TScale) {
    if (scale && root) {
        const notes = getScaleNotes(root, scale)
        let simplified: IStdNote[] = []
        notes.forEach((note) => {
            simplified.push(StdNote(`${simplify(note)}4`))
        })
        return(<div>
            <Piano width={100} height={50} highlight={simplified} cb={(e: React.MouseEvent<SVGElement>): void => {}}></Piano>
            <div><span className={dStyles.bold}>Notes</span>{notes.map((i) => {
                return (<div key={i} className={dStyles.bubble}>{i}</div>)
            })}</div>
            <ChordsFromScale notes={notes}></ChordsFromScale>
            </div>
        )
    }
    return(<div>Please provide some Scale infromation</div>)
}