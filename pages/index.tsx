import styles from '../styles/Index.module.css'
import { RandomNote } from '../components/compound/randomnote';
import { MidiControls } from '../components/compound/midicontrols';
import { AudioControls } from '../components/compound/audiocontrols';
import { Answer } from '../components/compound/answer';
import { AudioContext } from '../components/units/audiocontext';
import { Interval } from '../components/units/interval';
import { useState } from 'react';
import { useArray } from '../util/customHooks';
import { IStdNote } from '../util/notes';

export default function Index() {
  const question = useState<IStdNote>(null)
  const answer = useArray<IStdNote>()
  //TODO add something about scales?
  //TODO sort eslint
  //TODO use undefinted
  return (
    <>
    <div className={styles.float}>
        {/*<h2>audio context</h2>*/}
        <AudioContext />
      </div>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Random</h2>
        <RandomNote {...question} />
      </div>
      <div className={styles.card}>
        <h2>Midi note</h2>
        <MidiControls {...answer} />
      </div>
      <div className={styles.card}>
        <h2>Audio input note</h2>
        <AudioControls />
      </div>
      <div className={styles.card}>
        <h2>Interval</h2>
        <Interval {...question} />
      </div>
    </div>
    <div className={styles.card}>
        <h2>Answer</h2>
        <Answer question={question[0]} answer={answer.array} />
      </div>
    </>
  )
}