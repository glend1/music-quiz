import styles from '../../styles/audiograph.module.css'
import { useEffect, useRef, useState } from 'react';
import { Midi, Note } from "@tonaljs/tonal";
import { Chart, Tick } from 'chart.js';

type IGraph = { freq: number | null }

export function AudioGraph({freq}: IGraph) {
    const ctx = useRef<HTMLCanvasElement>(null)
    const history = 40;
    const offset = 2;
    const [chart, setChart] = useState<Chart<"line">>()
    useEffect(() => {
        if (chart == null) {
            import("chart.js/auto").then((Chart) => {
                if (ctx.current) {
                setChart(new Chart.default(ctx.current, {
                    type: 'line',
                    data: {
                        labels: [...Array(history).keys()],
                        datasets: [{
                        label: 'Data',
                        backgroundColor: 'rgb(0, 112, 243)',
                        borderColor: 'rgb(0, 112, 243)',
                        data: [],
                        }]
                    },
                    options: {
                        maintainAspectRatio:false,
                        responsive:true,
                        events: [],
                        animation: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                            display: false,
                            grid: {
                                    display: false
                                }
                            },
                            y: {
                                display: true,
                                type: 'logarithmic',
                                grid: {
                                    display: true
                                },
                                ticks: {
                                    display: true,
                                }
                            }
                        }
                    },
                }))
            }
            })
        }
    }, [])
        if (chart != null) {
            let working = chart.data.datasets[0].data
            if (freq != null) {
                let nearest = Midi.toMidi(Note.fromFreq(freq));
                if (nearest) {
                    let min = nearest - offset
                    let max = nearest + offset
                    let yScale = chart.options.scales!.y!
                    yScale.min = Note.get(Midi.midiToNoteName(min)).freq!
                    yScale.max = Note.get(Midi.midiToNoteName(max)).freq!
                    let labels: string[] = []
                    let ticks: Tick[] = []
                    for (let i = min; i <= max; i++) {
                        labels.push(Midi.midiToNoteName(i))
                        let isMajor = (Note.get(Midi.midiToNoteName(i)).alt == 0) ? true : false
                        ticks.push({major:isMajor, value: Midi.midiToFreq(i)})
                    }
                    yScale.afterBuildTicks = (e) => {
                        e.ticks = ticks
                    }
                    yScale.ticks!.callback = (_, index) => {
                        return labels[index]
                    }
                }
            }
            working.push(freq)
            if (working.length >= history/1.5) {
                working.shift()
            }
            console.log(working)
            chart.update()    
        }
    return (
        <div id={styles.graphContainer}>
            <canvas id="audioGraph" ref={ctx}></canvas>
        </div>
    )
}