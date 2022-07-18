import { useState } from "react";
import { DetectPitch, IFreq } from "../../audio/detectpitch/detectpitch";
import { AudioGraph } from "../../canvas/audiograph/audiograph";

export function AudioControls() {
	const [freq, setFreq] = useState<IFreq>();
	return (
		<>
			<DetectPitch cb={setFreq} />
			{freq ? (
				<>
					<h2>{freq.clarity}%</h2>
					<AudioGraph freq={freq.pitch} />
				</>
			) : (
				""
			)}
		</>
	);
}
