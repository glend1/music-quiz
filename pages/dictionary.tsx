import Link from "next/link";
import { showChords, matchScales, randomChord, uniqueChords, chordsInScale, getScaleNotes, getChroma } from '../util/notes'

export default function Dictionary() {
    //TODO play a note as an answer
    const input = [[ "G", "C", "D"], ["C", "E", "G", "B"], ["A", "F", "D"] ]
    const chords = showChords(input)
    const scales = matchScales(input)
    
        return (<>
        <Link href={"/"}><a>go home</a></Link>
        <div>
            
            <ul>
                {uniqueChords(input[0]).map((e, i) => {
                    return (<li key={i}>{e}</li>)
                })}
            </ul>
            <ul>{chords.map((e, i) => {
                return (<li key={i}>{e.join(",")}</li>)
            })}</ul>
            <ul>{scales.map((e, i) => {
                return (<li key={i}>{e}: {getScaleNotes("c", e).join(",")}</li>)
            })}</ul>
            <ul>{chordsInScale(getChroma(scales[0])).map((obj, i) => {
                return (<li key={i}>{obj.pitches.join(",")}: {obj.chord}</li>)
            })}
            </ul>
        </div>
    </>)
}