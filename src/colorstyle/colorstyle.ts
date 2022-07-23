import { useEffect, useState } from "react";

export default function ColourStyle() {
	const [colours, setColours] = useState<
		{ body: string; main: string; bg: string; accent: string } | undefined
	>();
	useEffect(() => {
		setColours({
			body: getComputedStyle(document.documentElement).getPropertyValue(
				"--body-colour"
			),
			main: getComputedStyle(document.documentElement).getPropertyValue(
				"--main-colour"
			),
			bg: getComputedStyle(document.documentElement).getPropertyValue(
				"--bg-colour"
			),
			accent: getComputedStyle(document.documentElement).getPropertyValue(
				"--accent-colour"
			),
		});
	}, []);
	return colours;
}
