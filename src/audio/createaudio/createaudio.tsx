import styles from "../../../styles/shared.module.css";
import { useAudioContext } from "../audiocontext/audiocontext";

export function CreateAudio() {
	const audioContext = useAudioContext();
	return (
		<button
			className={styles.float}
			disabled={audioContext.context == null ? false : true}
			onClick={audioContext.createAudioContext}
		>
			Start Audio Context
		</button>
	);
}
