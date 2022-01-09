import { useEffect } from "react";
import styles from '../../styles/stave.module.css'
import { renderAbc } from 'abcjs'

type IStave = {
  id: string,
  notation?: string
}

export function Stave({id, notation}: IStave) {
  useEffect(() => {
    if (notation != null) {
      const suffix = "2|"
      renderAbc(id, `X:1\nK:C\n[${notation}${suffix}]\n`, { scale: 1.5 })
    }
  }, [notation])
  return (
      <div className={styles.stave} id={id}></div> 
  )
}