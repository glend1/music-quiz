import { useState } from "react";
import { MidiInput } from "../../midi/midiinput/midiinput";
import { Keyboard } from "../../midi/keyboard/keyboard";
import { CheckBox } from "../../elements/checkbox/checkbox";
import keyboardStyles from "../../canvas/piano/piano.module.css";
import {
	IArray,
	useBoolean,
	useFormState,
} from "../../util/customhooks/customhooks";
import { MidiEvents } from "../../midi/midievents/midievents";
import { IStdNote } from "../../notes/notes/notes";
import { Input } from "webmidi";
import { Piano } from "../../canvas/piano/deletepiano";
import { Slider } from "../../elements/slider/slider";
import { AudioEvent } from "../../midi/midievents/midievents";

type TQuestionInput = {
	answer: IArray<IStdNote>;
	audioEvent: AudioEvent | undefined;
};

export function QuestionInput({
	answer: answer,
	audioEvent: audioEvent,
}: TQuestionInput) {
	const { bool: hideKeyboard, toggle: toggleKeyboard } = useBoolean();
	const { bool: sharp, toggle: toggleSharp } = useBoolean(true);
	const [octave, setOctave] = useFormState("4");
	const [midiDevice, setMidiDevice] = useState<Input | undefined>();
	const { key, mouse } = MidiEvents(
		answer,
		sharp,
		parseInt(octave),
		audioEvent,
		midiDevice
	);
	return (
		<>
			<div>
				<CheckBox
					id={"sharp"}
					label={"Sharp?"}
					bool={sharp}
					toggle={toggleSharp}
				/>
			</div>
			<MidiInput midiDevice={midiDevice} setMidiDevice={setMidiDevice} />
			<div>
				<CheckBox
					id={"keyboard_visibility"}
					label={"Show Keyboard?"}
					bool={hideKeyboard}
					toggle={toggleKeyboard}
				/>
			</div>
			<div
				id="keyboard_section"
				data-testid="keyboard"
				className={!hideKeyboard ? keyboardStyles.hide : ""}
			>
				<Slider
					id="octave"
					label="Set Octave:"
					value={octave}
					set={setOctave}
					min={1}
					max={6}
				/>
				<Keyboard cb={key} />
				<Piano clickable={true} highlight={answer.array} cb={mouse} />
				<button
					onClick={() => {
						answer.clear();
					}}
				>
					Clear keyboard
				</button>
			</div>
		</>
	);
}
