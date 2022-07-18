import Link from "next/link";
import { CreateAudio } from "../src/audio/createaudio/createaudio";
import styles from "../styles/index.module.css";

export default function Index() {
	return (
		<div className={styles.float}>
			<Link href={"/dictionary"}>
				<a>Dictionary</a>
			</Link>
			<Link href={"/debug"}>
				<a>Debug</a>
			</Link>
			<CreateAudio />
		</div>
	);
	// return (<Header /><Body /><Footer />)
}
