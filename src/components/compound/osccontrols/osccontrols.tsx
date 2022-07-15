import { Select } from "../../elements/select/select";
import {
	useBoolean,
	useFormState,
} from "../../../util/hooks/customhooks/customhooks";
import { IStdNote } from "../../../util/extensions/notes/notes";
import { Slider } from "../../elements/slider/slider";
import { IAudioEvent, MidiOsc } from "../../../util/hooks/midiosc/midiosc";
import { QuestionOsc } from "../../units/questionosc/questionsosc";
import { useAudioContext } from "../../../util/context/audiocontext";

type IOsc = IAudioEvent & OscQuestion;

export type OscQuestion = { question: IStdNote[] };
export type OscSettings = { wave: string; play: boolean; volume: string };

export function setupOscillator(ctx: AudioContext, type: string, vol: string) {
	var osc = ctx.createOscillator();
	osc.start();
	osc.type = type as OscillatorType;
	var volume = ctx.createGain();
	osc.connect(volume);
	volume.connect(ctx.destination);
	volume.gain.value = parseInt(vol) / 100;
	return osc;
}

export function OscControls({ setAudioEvent, question }: IOsc) {
	const { context: audioContext } = useAudioContext();
	const { bool: play, toggle: togglePlay } = useBoolean(false);
	const [volumeState, setVolume] = useFormState("50");
	const [wave, setWave] = useFormState("triangle");
	MidiOsc({ setAudioEvent, wave, play, volume: volumeState });
	function togglePlaying() {
		if (audioContext) {
			togglePlay();
		}
	}
	return (
		<>
			{audioContext ? (
				<>
					<button onClick={togglePlaying}>{play ? "Mute" : "Unmute"}</button>
					{play ? (
						<>
							<div>
								<Slider
									id="volume"
									label="Volume"
									min={1}
									max={100}
									value={volumeState}
									set={setVolume}
								/>
								<Select
									id="wave_type"
									label="Wave Type"
									array={["triangle", "sine", "square", "sawtooth"]}
									cb={setWave}
								/>
							</div>
							<QuestionOsc
								wave={wave}
								play={play}
								volume={volumeState}
								question={question}
							/>
						</>
					) : (
						<div></div>
					)}
				</>
			) : (
				<div>Please Start AudioContext</div>
			)}
		</>
	);
}
