import styles from '../../styles/audiograph.module.css'
import { useEffect, useRef, useState } from 'react';
import { Chart, Tick } from 'chart.js';
import { isMajor, midiToFrequency, midiToNoteName, offsetNotesFromFrequency } from '../../util/notes';

type IGraph = { freq: number | null }

export function AudioGraph({freq}: IGraph) {
    const ctx = useRef<HTMLCanvasElement>(null)
    const history = 40;
    const [chart, setChart] = useState<Chart<"line">>()
    const used = useRef(false)
    useEffect(() => {
        if (!used.current) {
            used.current = true
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
                let offset = offsetNotesFromFrequency(freq, 2)
                if (offset) {
                    let yScale = chart.options.scales!.y!
                    yScale.min = offset.minfreq
                    yScale.max = offset.maxfreq
                    let labels: string[] = []
                    let ticks: Tick[] = []
                    for (let i = offset.min; i <= offset.max; i++) {
                        labels.push(midiToNoteName(i))
                        ticks.push({major:isMajor(i), value: midiToFrequency(i)})
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
            chart.update()    
        }
    return (
        <div id={styles.graphContainer}>
            <canvas id="audioGraph" ref={ctx}></canvas>
        </div>
    )
}