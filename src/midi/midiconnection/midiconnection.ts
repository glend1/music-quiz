import { useState } from "react";
import { WebMidi, PortEvent } from "webmidi";
import { useArray } from "../../util/customhooks/customhooks";

export type TMidiConnection = {
	ports: Array<String>;
	error: String | undefined;
	enable: () => void;
};

function isInput(e: PortEvent) {
	return e.port.type === "input";
}

export function MidiConnection() {
	const {
		array: midiInputs,
		push: midiPush,
		filter: midiFilter,
	} = useArray(["none"]);
	const [error, setError] = useState<string | undefined>();
	function enable() {
		WebMidi.addListener("connected", (e) => {
			if (isInput(e)) {
				midiPush(e.port.name);
			}
		});
		WebMidi.addListener("disconnected", (e) => {
			e.port.removeListener();
			if (isInput(e)) {
				midiFilter((str) => {
					return str != e.port.name;
				});
			}
		});
		WebMidi.enable().catch((err) => {
			setError(err.message);
		});
	}
	return { ports: midiInputs, error, enable, enabled: WebMidi.enabled };
}

export function clearListeners() {
	WebMidi.inputs.forEach((e) => {
		e.removeListener();
	});
}
