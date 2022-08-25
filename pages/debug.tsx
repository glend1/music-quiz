import styles from "../styles/shared.module.css";
import { CreateAudio } from "../src/audio/createaudio/createaudio";
import { useState } from "react";
import { useArray } from "../src/util/customhooks/customhooks";
import { IStdNote } from "../src/notes/notes/notes";
import { Stave } from "../src/canvas/stave/stave";
import { useQuestionGeneration } from "../src/notes/usequestiongeneration/usequestiongeneration";
import { AudioEvent } from "../src/midi/midievents/midievents";
import { RandomNote } from "../src/quiz/randomnote/randomnote";
import { RandomChord } from "../src/quiz/randomchord/randomchord";
import { Interval } from "../src/quiz/interval/interval";
import { QuestionControls } from "../src/quiz/questioncontrols/questioncontrols";
import { OscControls } from "../src/quiz/osccontrols/osccontrols";
import { QuestionInput } from "../src/quiz/questioninput/questioninput";
import { AudioControls } from "../src/quiz/audiocontrols/audiocontrols";
import { Result } from "../src/quiz/result/result";

export default function Debug() {
	const answer = useArray<IStdNote>();
	const questionGeneration = useQuestionGeneration();
	const [audioEvent, setAudioEvent] = useState<AudioEvent | undefined>();
	return (
		<>
			<CreateAudio />
			<section>
				<h2>Generate</h2>
				<div className={styles.container}>
					<div className={styles.card}>
						<h2>Note</h2>
						<RandomNote newQuestion={questionGeneration.newRoot} />
					</div>
					<div className={styles.card}>
						<h2>Chord</h2>
						<RandomChord
							newChord={questionGeneration.newChord}
							root={questionGeneration.root}
						/>
					</div>
					<div className={styles.card}>
						<h2>Interval</h2>
						<Interval
							newInterval={questionGeneration.newInterval}
							root={questionGeneration.root}
						/>
					</div>
				</div>
			</section>
			<section>
				<h2>Questions</h2>
				<div className={styles.container}>
					<div className={styles.card}>
						<h2>Question</h2>
						<QuestionControls
							current={questionGeneration.current}
							question={questionGeneration.question}
							type={questionGeneration.type}
							chord={questionGeneration.chord}
							interval={questionGeneration.interval}
							root={questionGeneration.root}
						/>
					</div>
					<div className={styles.card}>
						<h2>Stave</h2>
						<Stave
							id={"stave"}
							notes={questionGeneration.question}
							current={questionGeneration.current}
						/>
					</div>
					<div className={styles.card}>
						<h2>Oscillator Output</h2>
						<OscControls
							question={questionGeneration.question}
							setAudioEvent={setAudioEvent}
						/>
					</div>
				</div>
			</section>
			<section>
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
			</section>
			<section>
				<h2>Results</h2>
				<div className={styles.container}>
					<div className={styles.card}>
						<h2>Result</h2>
						<Result
							nextQuestion={questionGeneration.nextQuestion}
							question={questionGeneration.question[questionGeneration.current]}
							answer={answer.array}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
