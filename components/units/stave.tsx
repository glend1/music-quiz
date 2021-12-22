import { useEffect } from "react";
import styles from '../../styles/stave.module.css'

type IStave = {
  id: string,
  notation?: string
}

export function Stave({id, notation}: IStave) {
  useEffect(() => {
    import("abcjs").then((module) => {
      var suffix = "2|"
      if (notation != null) {
        module.renderAbc(id, `X:1\nK:C\n[${notation}${suffix}]\n`, { scale: 1.5 })
      }
    }); 
  }, [notation])
  return (
      <div className={styles.stave} id={id}></div> 
  )
}