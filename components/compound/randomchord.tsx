import { useState } from "react"
import { randomChord, Chord } from "../../util/notes"

//TODO this is incomplete
export function RandomChord() {
    const [chord, setChord] = useState<Chord | undefined>()
    //chord.notes
    return (<>
        <button onClick={() => {setChord(randomChord(3))}}>New Chord</button>
        {chord ? <><h2>{chord.symbol}</h2><div>Difficulty: {chord.intervals.length}</div></> : <div>Please generate a random Chord</div>}
    </>)
}