import { useAudioContext } from "../audiocontext/audiocontext";

export function CreateAudio() {
	const audioContext = useAudioContext();
	return (
		<button
			disabled={audioContext.context == null ? false : true}
			onClick={audioContext.createAudioContext}
		>
			Start Audio Context
		</button>
	);
}
