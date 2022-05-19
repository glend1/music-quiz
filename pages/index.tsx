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
import { Stave } from '../components/units/stave';
import { OscControls } from '../components/units/osccontrols';
import { useQuestionGeneration } from '../util/useQuestionGeneration';
import { QuestionControls } from '../components/compound/questionControls';

export type AudioEvent = (type: string, data: IStdNote) => void

export default function Index() {
  const answer = useArray<IStdNote>()
  const questionGeneration = useQuestionGeneration()
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
        <RandomNote newQuestion={questionGeneration.newRoot} />
      </div>
      <div className={styles.card}>
        <h2>Chord</h2>
        <RandomChord newChord={questionGeneration.newChord} root={questionGeneration.root} />
      </div>
      <div className={styles.card}>
        <h2>Interval</h2>
        <Interval newInterval={questionGeneration.newInterval} root={questionGeneration.root} />
      </div>
    </div>
    <h2>Questions</h2>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Question</h2>
        <QuestionControls current={questionGeneration.current} question={questionGeneration.question} type={questionGeneration.type} chord={questionGeneration.chord} interval={questionGeneration.interval} root={questionGeneration.root} />
      </div>
      <div className={styles.card}>
        <h2>Stave</h2>
        <Stave id={'stave'} notes={questionGeneration.question} current={questionGeneration.current}/>
      </div>
      <div className={styles.card}>
        <h2>Oscillator Output</h2>
        <OscControls question={questionGeneration.question} setAudioEvent={setAudioEvent}/>
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
        <Result nextQuestion={questionGeneration.nextQuestion} question={questionGeneration.question[questionGeneration.current]} answer={answer.array} />
        </div>
      </div>
    </>
  )
}
