import styles from "./audiograph.module.css";
import { useEffect, useRef, useState } from "react";
import { Chart, Tick } from "chart.js";
import {
	isMajor,
	midiToFrequency,
	midiToNoteName,
	offsetNotesFromFrequency,
} from "../../notes/notes/notes";
import colourStyle from "../../colorstyle/colorstyle";

type IGraph = { freq: number | null };

export function AudioGraph({ freq }: IGraph) {
	const ctx = useRef<HTMLCanvasElement>(null);
	const history = 40;
	const [chart, setChart] = useState<Chart<"line">>();
	const used = useRef(false);
	const colours = colourStyle();
	useEffect(() => {
		if (!used.current && colours) {
			used.current = true;
			import("chart.js/auto").then((Chart) => {
				if (ctx.current) {
					setChart(
						new Chart.default(ctx.current, {
							type: "line",
							data: {
								labels: [...Array(history).keys()],
								datasets: [
									{
										label: "Data",
										backgroundColor: colours.darkAccent,
										borderColor: colours.accent,
										data: [],
									},
								],
							},
							options: {
								maintainAspectRatio: false,
								responsive: true,
								events: [],
								animation: false,
								plugins: {
									legend: {
										display: false,
									},
								},
								scales: {
									x: {
										display: false,
										grid: {
											display: false,
										},
									},
									y: {
										display: true,
										type: "logarithmic",
										border: {
											color: colours.outline,
											width: 5,
										},
										grid: {
											display: true,
											color: colours.outline,
										},
										ticks: {
											display: true,
											color: colours.main,
										},
									},
								},
							},
						})
					);
				}
			});
		}
	}, [used, colours]);
	if (chart != null) {
		let working = chart.data.datasets[0].data;
		if (freq != null) {
			let offset = offsetNotesFromFrequency(freq, 2);
			if (offset) {
				let yScale = chart.options.scales!.y!;
				yScale.min = offset.minfreq;
				yScale.max = offset.maxfreq;
				let labels: string[] = [];
				let ticks: Tick[] = [];
				for (let i = offset.min; i <= offset.max; i++) {
					labels.push(midiToNoteName(i));
					ticks.push({ major: isMajor(i), value: midiToFrequency(i) });
				}
				yScale.afterBuildTicks = (e) => {
					e.ticks = ticks;
				};
				yScale.ticks!.callback = (_, index) => {
					return labels[index];
				};
			}
		}
		working.push(freq);
		if (working.length >= history / 1.5) {
			working.shift();
		}
		chart.update();
	}
	return (
		<div id={styles.graphContainer}>
			<canvas id="audioGraph" ref={ctx}></canvas>
		</div>
	);
}
