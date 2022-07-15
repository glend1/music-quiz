import styles from "../styles/index.module.css";
import { RandomNote } from "../src/components/compound/randomnote/randomnote";
import { RandomChord } from "../src/components/compound/randomchord/randomchord";
import { QuestionInput } from "../src/components/compound/questioninput/questioninput";
import { AudioControls } from "../src/components/compound/audiocontrols/audiocontrols";
import { Result } from "../src/components/compound/result/result";
import { CreateAudio } from "../src/components/units/createaudio/createaudio";
import { Interval } from "../src/components/units/interval/interval";
import { useState } from "react";
import { useArray } from "../src/util/hooks/customhooks/customhooks";
import { IStdNote } from "../src/util/extensions/notes/notes";
import Link from "next/link";
import { Stave } from "../src/components/units/stave/stave";
import { OscControls } from "../src/components/compound/osccontrols/osccontrols";
import { useQuestionGeneration } from "../src/util/hooks/usequestiongeneration/usequestiongeneration";
import { QuestionControls } from "../src/components/compound/questioncontrols/questioncontrols";
import { AudioEvent } from "../src/util/hooks/midievents/midievents";

export default function Index() {
	const answer = useArray<IStdNote>();
	const questionGeneration = useQuestionGeneration();
	const [audioEvent, setAudioEvent] = useState<AudioEvent | undefined>();
	//TODO use useId
	//TODO testing setup
	//TODO debug setup
	//TODO use undefined
	//TODO use userEvent
	return (
		<>
			<div className={styles.float}>
				<Link href={"/dictionary"}>
					<a>Dictionary</a>
				</Link>
				<CreateAudio />
			</div>
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
					<Result
						nextQuestion={questionGeneration.nextQuestion}
						question={questionGeneration.question[questionGeneration.current]}
						answer={answer.array}
					/>
				</div>
			</div>
		</>
	);
}
