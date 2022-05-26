import styles from '../styles/Index.module.css'
import { RandomNote } from '../code/components/compound/randomnote/randomnote';
import { RandomChord } from '../code/components/compound/randomchord/randomchord';
import { QuestionInput } from '../code/components/compound/questioninput/questioninput';
import { AudioControls } from '../code/components/compound/audiocontrols/audiocontrols';
import { Result } from '../code/components/compound/result/result';
import { AudioContext } from '../code/components/units/audiocontext/audiocontext';
import { Interval } from '../code/components/units/interval/interval';
import { useState } from 'react';
import { useArray } from '../code/util/hooks/customhooks/customhooks';
import { IStdNote } from '../code/util/extensions/notes/notes';
import Link from 'next/link';
import { Stave } from '../code/components/units/stave/stave';
import { OscControls } from '../code/components/compound/osccontrols/osccontrols';
import { useQuestionGeneration } from '../code/util/hooks/usequestiongeneration/usequestiongeneration';
import { QuestionControls } from '../code/components/compound/questioncontrols/questioncontrols';
import { AudioEvent } from '../code/util/hooks/midievents/midievents';

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
