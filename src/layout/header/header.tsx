import Link from "next/link";

export default function Header() {
	return (
		<div>
			<Link href={"/"}>
				<a>Home</a>
			</Link>
			<Link href={"/dictionary"}>
				<a>Dictionary</a>
			</Link>
			<Link href={"/debug"}>
				<a>Debug</a>
			</Link>
		</div>
	);
}
