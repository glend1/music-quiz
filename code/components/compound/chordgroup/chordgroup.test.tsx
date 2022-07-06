import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { AddChord, TChords } from "../../units/dictionaryutils/dictionaryutils"
import { ChordGroup } from "./chordgroup"

function MockChordGroup() {
    const [chords, setChords] = useState<TChords>({})
    
    return (<><AddChord chords={setChords}/><h3>{Object.entries(chords).map((chord, i) => {
        return (<div key={i}>{chord[1].join()}</div>)
    })}</h3><ChordGroup chords={chords} setChords={setChords}/></>)
}

describe("chordgroup", () => {
    it("Should render the default component", () => {
        render(<MockChordGroup/>)
        expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Chord")
    })
    it("Should render", () => {
        const component = render(<MockChordGroup/>)
        const add = screen.getAllByRole("button")[0]
        userEvent.click(add)
        userEvent.click(add)
        const paths = component.baseElement.querySelectorAll("path")
        userEvent.click(paths[0])
        userEvent.click(paths[5])
        userEvent.click(paths[6])
        userEvent.click(paths[25])
        userEvent.click(paths[32])
        userEvent.click(paths[51])
        userEvent.click(paths[70])
        expect(screen.getAllByRole("heading")[0]).toHaveTextContent("C,F,GD,AE,B")
    })
})