import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
	return (
		<>
			<header>Music Quiz</header>
			<nav className={styles.navigation}>
				<Link href={"/"}>
					<a>Home</a>
				</Link>
				<Link href={"/dictionary"}>
					<a>Dictionary</a>
				</Link>
				<Link href={"/debug"}>
					<a>Debug</a>
				</Link>
			</nav>
		</>
	);
}
