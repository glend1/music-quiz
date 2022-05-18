import { ChangeEvent, useEffect, useState } from "react";
import styles from '../../styles/stave.module.css'
import { renderAbc } from 'abcjs'
import { Select } from "./select";
import { IStdNote } from "../../util/notes";

export type StaveType = "Auto" | "Grand" | "Treble" | "Bass" | "None"
type IStave = {
  id: string,
  notes: IStdNote[],
  current: number;
}

function isTreble(midi: number) {
  return midi < 60 ? false : true
}

function detectClef(notes: IStdNote[]) {
  if (notes.every(e => isTreble(e!.midi))) {
    return "treble"
  } else if (notes.every(e => !isTreble(e!.midi))) {
    return "bass" 
  } 
  return "grand"
}

function highlightNote(i: number, j: number) {
  return i == j ? "!mark!" : ""
}

export function Stave({id, notes, current}: IStave) {
  const displayed = notes.map(e => e?.abc)
  const suffix = "2"
  const [stave, setStave] = useState<StaveType>("Auto")
  const staveTypes = ["Auto", "Grand", "Treble", "Bass", "None"]
  const visualOptions = {staffwidth: 60*notes.length, scale: 1.25, selectTypes: false}
  useEffect(() => {
    if (stave != "None" && notes[0]) {
      let clef: string;
      if (stave == "Auto") {
        clef = detectClef(notes)
      } else {
        clef = stave.toLowerCase()
      }
      switch (clef) {
        case "bass":
        case "treble":
          let notation = ""
          notes.forEach((e,i) => {
            notation += `${highlightNote(i, current)}${e?.abc}${suffix} `
          })
          renderAbc(id, `
            X:1 
            V:1 clef=${clef} 
            K:C
            ${notation}|]
          `, visualOptions)
          break;
        case "grand":
          let treble = "", bass = ""
          notes.forEach((e, i) => {
            if (isTreble(e!.midi)) {
              treble += `${highlightNote(i, current)}${e?.abc}${suffix} `
              bass += `${highlightNote(i, current)}z${suffix} `
            } else {
              treble += `${highlightNote(i, current)}z${suffix} `
              bass += `${highlightNote(i, current)}${e?.abc}${suffix}`
            }
          })
          renderAbc(id, `
          X:1 
            V:1 clef=treble 
            K:C
            ${treble}|]
            V:2 clef=bass
            K:C
            ${bass}|]
          `, visualOptions)
          break;
        }
      }
  }, [displayed, stave, current])
  return (
    <>
      <Select label={'Stave Type'} array={staveTypes} id={'staveType'} cb={(e: ChangeEvent<HTMLSelectElement>) => {
          let target = e.target;
          let selected = target.options[target.selectedIndex].text
          if (staveTypes.includes(selected)) {
              setStave(selected as StaveType)
          }
      }} />
      {stave != "None" ? <div className={styles.stave} id={id}></div> : "" }
    </>
  )
}