import { Dispatch, SetStateAction, useEffect } from "react";
import { useArray } from "../../util/customhooks/customhooks";
import { IStdNote, midiToFrequency } from "../../notes/notes/notes";
import { useAudioContext } from "../../audio/audiocontext/audiocontext";
import {
	OscSettings,
	setupOscillator,
} from "../../quiz/osccontrols/osccontrols";

export type IAudioEventType =
	| ((type: string, data: IStdNote) => void)
	| undefined;
export type IAudioEvent = {
	setAudioEvent: Dispatch<SetStateAction<IAudioEventType>>;
};
type IMidiOsc = IAudioEvent & OscSettings;
type IHeld = { data: IStdNote; oscilator: OscillatorNode };

export function MidiOsc({ setAudioEvent, wave, play, volume }: IMidiOsc) {
	const { context: audioContext } = useAudioContext();
	const { push: heldPush, filter: heldFilter } = useArray<IHeld>();
	useEffect(() => {
		setAudioEvent(() => {
			return (type: string, data: IStdNote) => {
				if (play && audioContext) {
					switch (type) {
						case "start":
							let osc = setupOscillator(audioContext, wave, volume);
							if (data?.midi) {
								osc.frequency.setValueAtTime(
									midiToFrequency(data.midi),
									audioContext.currentTime
								);
							}
							heldPush({ data: data, oscilator: osc });
							break;
						case "stop":
							heldFilter((i) => {
								if (i.oscilator != null) {
									if (data?.midi == i.data.midi) {
										i.oscilator.stop();
									}
								}
								return data?.midi != i.data.midi;
							});
							break;
					}
				}
			};
		});
	}, [audioContext, play, volume, wave]);
}
