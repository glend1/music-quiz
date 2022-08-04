import { useEffect, useState } from "react";

export default function ColourStyle() {
	const [colours, setColours] = useState<
		| {
				body: string;
				main: string;
				bg: string;
				accent: string;
				outline: string;
				darkAccent: string;
				darkOutline: string;
		  }
		| undefined
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
			outline: getComputedStyle(document.documentElement).getPropertyValue(
				"--outline-colour"
			),
			darkAccent: getComputedStyle(document.documentElement).getPropertyValue(
				"--dark-accent-colour"
			),
			darkOutline: getComputedStyle(document.documentElement).getPropertyValue(
				"--dark-outline-colour"
			),
		});
	}, []);
	return colours;
}
