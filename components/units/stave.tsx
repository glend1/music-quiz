import { ChangeEvent, useEffect, useState } from "react";
import styles from '../../styles/stave.module.css'
import { renderAbc } from 'abcjs'
import { Select } from "./select";

export type StaveType = "Auto" | "Grand" | "Treble" | "Bass"
type IStave = {
  id: string,
  midi?: number,
  notation?: string
}

export function Stave({id, midi, notation}: IStave) {
  const [stave, setStave] = useState<StaveType>("Auto")
  const staveTypes = ["Auto", "Grand", "Treble", "Bass"]
  useEffect(() => {
    if (notation != null && midi != null) {
      const suffix = "2|"
      let clef
      if (stave == "Auto" || stave == "Grand") {
        clef = midi < 60 ? "bass" : "treble"
      } else {
        clef = stave.toLowerCase()
      }
      if (stave == "Grand") {
        let treble, bass;
        if (clef == "treble") {
          treble = `${notation}${suffix}`
          bass = `z${suffix}`
        } else {
          treble = `z${suffix}`
          bass = `${notation}${suffix}`
        }
        renderAbc(id, `
        X:1 
          V:1 clef=treble 
          K:C
          [${treble}]
          V:2 clef=bass
          K:C
          [${bass}]
          `, { scale: 1.5 })
      } else {
        renderAbc(id, `
          X:1 
          V:1 clef=${clef} 
          K:C
          [${notation}${suffix}]
        `, { scale: 1.5 })
      }
    }
  }, [notation])
  return (
    <>
      <Select label={'Stave Type'} array={staveTypes} id={'staveType'} cb={(e: ChangeEvent<HTMLSelectElement>) => {
          let target = e.target;
          let selected = target.options[target.selectedIndex].text
          if (staveTypes.includes(selected)) {
              setStave(selected as StaveType)
          }
      }} />
      <div className={styles.stave} id={id}></div> 
    </>
  )
}