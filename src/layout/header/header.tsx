import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
	return (
		<>
			<header>Music Quiz</header>
			<nav className={styles.navigation}>
				<Link href={"/"}>
					Home
				</Link>
				<Link href={"/dictionary"}>
					Dictionary
				</Link>
				<Link href={"/debug"}>
					Debug
				</Link>
			</nav>
		</>
	);
}
