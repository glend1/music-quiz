import { useCallback, useEffect } from "react";
import { Input } from "webmidi";
import { IArray } from "../customhooks/customhooks";
import { clearListeners } from "../../extensions/midiconnection/midiconnection";
import {
	INote,
	IStdNote,
	normalizeMidi,
	normalizeNote,
} from "../../extensions/notes/notes";

export type AudioEvent = (type: string, data: IStdNote) => void;

export function MidiEvents(
	answer: IArray<IStdNote>,
	sharp: boolean,
	octave: number,
	audioEvent?: AudioEvent,
	midiDevice?: Input | false
) {
	const start = useCallback(
		(data: IStdNote | null) => {
			if (data) {
				if (audioEvent) {
					audioEvent("start", data);
				}
				answer.push(data);
			}
		},
		[audioEvent, answer]
	);
	const stop = useCallback(
		(data: IStdNote | null) => {
			if (data) {
				if (audioEvent) {
					audioEvent("stop", data);
				}
				answer.filter((obj) => {
					return obj.name != data.name;
				});
			}
		},
		[audioEvent, answer]
	);
	const midiKeyboard = useCallback(() => {
		if (midiDevice) {
			midiDevice.addListener("noteon", (e) => {
				let data = normalizeMidi(e.note.number, sharp);
				start(data);
			});
			midiDevice.addListener("noteoff", (e) => {
				let data = normalizeMidi(e.note.number, sharp);
				stop(data);
			});
		}
	}, [start, stop, midiDevice, sharp]);
	const mouse = useCallback(
		(e: React.MouseEvent<SVGElement>): void => {
			let data = normalizeNote(
				(e.target as SVGElement).dataset as INote,
				octave,
				sharp
			);
			function contains() {
				if (data) {
					for (let i = 0; i < answer.array.length; i++) {
						if (answer.array[i]) {
							if (answer.array[i]!.name === data.name) {
								return true;
							}
						}
					}
				}
				return false;
			}
			if (data) {
				if (!contains()) {
					start(data);
				} else {
					stop(data);
				}
			}
		},
		[start, stop, octave, sharp, answer]
	);
	const key = useCallback(
		(event: INote, type: string) => {
			let data = normalizeNote(event, octave, sharp);
			switch (type) {
				case "keydown":
					start(data);
					break;
				case "keyup":
					stop(data);
					break;
				default:
					throw "Event not recognized";
			}
		},
		[start, stop, octave, sharp]
	);
	useEffect(() => {
		midiKeyboard();
		return () => {
			clearListeners();
		};
	}, [midiKeyboard]);
	return { midiKeyboard, key, mouse };
}
