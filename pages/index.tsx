import styles from '../styles/Index.module.css'
import { RandomNoteComponent } from '../components/compound/randomnote';
import { MidiControls } from '../components/compound/midicontrols';
import { AudioControls } from '../components/compound/audiocontrols';
import { Answer } from '../components/compound/answer';
import { AudioContext } from '../components/units/audiocontext';
import { Maths } from '../components/units/maths';
import { useState } from 'react';
import { useArray } from '../util/customHooks';
import { IStdNote } from '../util/notes';

export default function Index() {
  const question = useState<IStdNote>(null)
  const answer = useArray<IStdNote>()
  //TODO add something about scales?
  //TODO sort eslint
  return (
    <>
    <div className={styles.float}>
        {/*<h2>audio context</h2>*/}
        <AudioContext />
      </div>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>random</h2>
        <RandomNoteComponent {...question} />
      </div>
      <div className={styles.card}>
        <h2>midi note</h2>
        <MidiControls {...answer} />
      </div>
      <div className={styles.card}>
        <h2>audio input note</h2>
        <AudioControls />
      </div>
      <div className={styles.card}>
        <h2>maths</h2>
        <Maths {...question} />
      </div>
    </div>
    <div className={styles.card}>
        <h2>answer</h2>
        <Answer question={question[0]} answer={answer.array} />
      </div>
    </>
  )
}