import { Dispatch, SetStateAction, useEffect } from "react";
import { PitchDetector } from "pitchy";
import { useBoolean, useInterval } from "../../util/customhooks/customhooks";
import { useAudioContext } from "../audiocontext/audiocontext";

export type IFreq = { pitch: number | null; clarity: number };

type IPitch = {
	cb: Dispatch<SetStateAction<IFreq | undefined>>;
};

export function DetectPitch({ cb }: IPitch) {
	const { context: audioContext } = useAudioContext();
	const { bool: listening, toggle: toggleListening } = useBoolean(false);
	const { set: setPitch, clear: clearPitch } = useInterval();
	useEffect(() => {}, [listening]);
	return audioContext ? (
		<button onClick={toggleListening}>{listening ? "Mute" : "Unmute"}</button>
	) : (
		<div>Please Start AudioContext</div>
	);
}
