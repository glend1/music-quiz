import { MouseEventHandler } from 'react';
import styles from '../../styles/keyboard.module.css'
import { INote, IStdNote } from '../../util/notes';

type IPiano = {
    highlight: IStdNote[]
    cb: MouseEventHandler<SVGGElement>
}

//"xmlns": "http://www.w3.org/2000/svg",
//"xmlns:xlink": "http://www.w3.org/1999/xlink",
export function Piano({highlight, cb}: IPiano) {
    const whiteKeyWidth = 80, pianoHeight = 400;
    const notes = [{natural: "C", alt: null}, {natural: "D", alt: "C"}, {natural: "E", alt: "D"}, {natural: "F", alt: null}, {natural: "G", alt: "F"}, {natural: "A", alt: "G"}, {natural: "B", alt: "A"}]
    const pianoWidth = notes.length * whiteKeyWidth;
    let whiteKeyPositionX = 0, blackKeyPositionX = -whiteKeyWidth/4, key = 0;
    function displayHighlight(noteName: INote) {
        for (let i = 0; i < highlight.length; i++) {
                let name = highlight[i]!.name
                if ("natural" in noteName) {
                    if (noteName.natural === name) {
                        return styles.show
                    }
                } else {
                    if (noteName.flat === name || noteName.sharp === name) {
                        return styles.show
                    }
                }
            }
        return ""
    }
    return (
        <div id={styles.piano}>
            <svg width="100%" viewBox={`0 0 ${pianoWidth} ${pianoHeight}`}>
        {notes.map((noteName) => {
            let result = Array()
            result.push((<g key={key++} width={whiteKeyWidth} onClick={cb}>
                <path className={`${styles.whiteKey} key ${displayHighlight({natural: noteName.natural})}`} x={whiteKeyPositionX} data-natural={noteName.natural} rx="15" ry="15" d={`M ${whiteKeyPositionX} 0 v ${pianoHeight-15} q 0 15 15 15 h ${whiteKeyWidth-30} q 15 0 15 -15 v -${pianoHeight-15} Z`}></path>
                <text className={styles.whiteKeyText} x={whiteKeyPositionX + whiteKeyWidth / 2} y="380" textAnchor="middle" >{noteName.natural}</text>
            </g>))
            whiteKeyPositionX += whiteKeyWidth;
            if (noteName.alt != null) {
                result.push((<g key={key++} width={whiteKeyWidth / 2} onClick={cb}>
                    <path className={`${styles.blackKey} key ${displayHighlight({sharp: noteName.alt + "#", flat: noteName.natural + "b"})}`} x={blackKeyPositionX} data-sharp={`${ noteName.alt }#`} data-flat={`${ noteName.natural }b`} rx="8" ry="8" d={`M ${blackKeyPositionX} 0 v ${(pianoHeight / 1.6)-15} q 0 15 15 15 h ${(whiteKeyWidth / 2)-30} q 15 0 15 -15 v -${(pianoHeight / 1.6)-15} Z`}></path>
                    <text className={styles.blackKeyText} textAnchor="middle" y="235" x={blackKeyPositionX + (whiteKeyWidth / 4)}>{noteName.natural}♭</text>
                    <text className={styles.blackKeyText} textAnchor="middle" y="215" x={blackKeyPositionX + (whiteKeyWidth / 4)}>{noteName.alt}♯</text>
                </g>))
            }
            blackKeyPositionX += whiteKeyWidth;
            return result
        })}
    </svg>
            </div>
    )
}