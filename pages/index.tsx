import styles from '../styles/Index.module.css'
import { RandomNote } from '../components/compound/randomnote';
import { RandomChord } from '../components/compound/randomchord';
import { MidiControls } from '../components/compound/midicontrols';
import { AudioControls } from '../components/compound/audiocontrols';
import { Answer } from '../components/compound/answer';
import { AudioContext } from '../components/units/audiocontext';
import { Interval } from '../components/units/interval';
import { useState } from 'react';
import { useArray } from '../util/customHooks';
import { IStdNote } from '../util/notes';
import Link from 'next/link';

export default function Index() {
  const question = useState<IStdNote>(null)
  const answer = useArray<IStdNote>()
  //TODO sort eslint
  //TODO use undefinted
  return (
    <>
    <div className={styles.float}>
        <Link href={'/dictionary'}><a>Dictionary</a></Link>
        <AudioContext />
      </div>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Random</h2>
        <RandomNote {...question} />
      </div>
      <div className={styles.card}>
        <h2>Random Chord</h2>
        <RandomChord></RandomChord>
      </div>
      <div className={styles.card}>
        <h2>Midi note</h2>
        <MidiControls {...answer} />
      </div>
      <div className={styles.card}>
        <h2>Audio input pitch</h2>
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