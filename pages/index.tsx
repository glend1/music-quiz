import styles from '../styles/Index.module.css'
import { RandomNote } from '../components/compound/randomnote';
import { RandomChord } from '../components/compound/randomchord';
import { QuestionInput } from '../components/compound/questioninput';
import { AudioControls } from '../components/compound/audiocontrols';
import { Result } from '../components/compound/result';
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
        <h2>Question</h2>
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
        <h2>Interval</h2>
        <Interval {...question} />
      </div>
    </div>
    <h2>Answer</h2>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Input</h2>
        <QuestionInput {...answer} />
      </div>
      <div className={styles.card}>
        <h2>Audio input pitch</h2>
        <AudioControls />
      </div>
    </div>
        <h2>Result</h2>
    <div className={styles.container}>
    <div className={styles.card}>
    <h2>Result</h2>
        <Result question={question[0]} answer={answer.array} />
        </div>
      </div>
    </>
  )
}