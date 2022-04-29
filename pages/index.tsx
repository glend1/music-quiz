import styles from '../styles/Index.module.css'
import { RandomNote } from '../components/compound/randomnote';
import { RandomChord } from '../components/compound/randomchord';
import { QuestionInput } from '../components/compound/questioninput';
import { AudioControls } from '../components/compound/audiocontrols';
import { Result } from '../components/compound/result';
import { AudioContext } from '../components/units/audiocontext';
import { Interval } from '../components/units/interval';
import { Dispatch, SetStateAction, useState } from 'react';
import { useArray } from '../util/customHooks';
import { IStdNote } from '../util/notes';
import Link from 'next/link';
import { Stave } from '../components/units/stave';
import { OscControls } from '../components/units/osccontrols';

export type AudioEvent = (type: string, data: IStdNote) => void

export type TQuestionComponent = {
  root: IStdNote, 
  question: IStdNote, 
  setQuestion: Dispatch<SetStateAction<IStdNote>>
}

export default function Index() {
  const question = useState<IStdNote>()
  const root = useState<IStdNote>()
  const answer = useArray<IStdNote>()
  const [audioEvent, setAudioEvent] = useState<AudioEvent | undefined>()
  //TODO sort eslint
  //TODO use undefined
  //TODO use userEvent
  return (
    <>
    <div className={styles.float}>
        <Link href={'/dictionary'}><a>Dictionary</a></Link>
        <AudioContext />
      </div>
        <h2>Generate</h2>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Note</h2>
        <RandomNote setQuestion={question[1]} setRoot={root[1]}/>
      </div>
      <div className={styles.card}>
        <h2>Chord</h2>
        <RandomChord root={root[0]} question={question[0]} setQuestion={question[1]} />
      </div>
      <div className={styles.card}>
        <h2>Interval</h2>
        <Interval root={root[0]} question={question[0]} setQuestion={question[1]} />
      </div>
    </div>
    <h2>Questions</h2>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Question</h2>
        <Stave id={'stave'} midi={question[0]?.midi} notation={question[0]?.abc} />
      </div>
      <div className={styles.card}>
        <h2>Oscillator Output</h2>
        <OscControls setAudioEvent={setAudioEvent}/>
      </div>
    </div>
    <h2>Answers</h2>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Input</h2>
        <QuestionInput answer={answer} audioEvent={audioEvent} />
      </div>
      <div className={styles.card}>
        <h2>Audio input pitch</h2>
        <AudioControls />
      </div>
    </div>
        <h2>Results</h2>
    <div className={styles.container}>
    <div className={styles.card}>
    <h2>Result</h2>
        <Result question={question[0]} answer={answer.array} />
        </div>
      </div>
    </>
  )
}