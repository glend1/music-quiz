import { MouseEventHandler } from 'react';
import styles from '../../styles/keyboard.module.css'
import { INote, IStdNote } from '../../util/notes';

type IPiano = {
    width?: number
    height?: number
    tSpace?: number
    higher?: boolean
    highlight: IStdNote[]
    cb: MouseEventHandler<SVGGElement>
}

//"xmlns": "http://www.w3.org/2000/svg",
//"xmlns:xlink": "http://www.w3.org/1999/xlink",
export function Piano({width = 400, height = 150, tSpace = 10, higher = false, highlight, cb}: IPiano) {
    const octaves = ["lower", "higher"]
    const notes = [{natural: "C", alt: null}, {natural: "D", alt: "C"}, {natural: "E", alt: "D"}, {natural: "F", alt: null}, {natural: "G", alt: "F"}, {natural: "A", alt: "G"}, {natural: "B", alt: "A"}]
    const keyWidth = width / (!higher ? notes.length : notes.length*2)
    const wSpace = keyWidth*0.1
    const hSpace = height*0.05
    let whiteKeyPositionX = 0, blackKeyPositionX = -keyWidth/4, key = 0;
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
        <div>
            <svg width={width} viewBox={`0 0 ${width} ${height}`}>
{octaves.map((octave) => {
if (octave == "lower" || (higher == true && (octave == "higher"))) {
return (
        notes.map((noteName) => {
            let result = Array()
            result.push((<g key={key++} width={keyWidth} onClick={cb}>
                <path className={`${styles.whiteKey} key ${displayHighlight({natural: noteName.natural})}`} x={whiteKeyPositionX} 
                    data-natural={noteName.natural} data-octave={octave} rx={wSpace} ry={hSpace} 
                    d={`M ${whiteKeyPositionX} 0 v ${height-hSpace} q 0 ${hSpace} ${wSpace} ${hSpace} h ${keyWidth-(wSpace*2)} q ${wSpace} 0 ${wSpace} -${hSpace} v -${height-hSpace} Z`}></path>
                {keyWidth >= 25 ?
                    <text className={styles.whiteKeyText} x={whiteKeyPositionX + keyWidth / 2} y={height-tSpace} textAnchor="middle" >{noteName.natural}</text>
                : null}
            </g>))
            whiteKeyPositionX += keyWidth;
            if (noteName.alt != null) {
                result.push((<g key={key++} width={keyWidth / 2} onClick={cb}>
                    <path className={`${styles.blackKey} key ${displayHighlight({sharp: noteName.alt + "#", flat: noteName.natural + "b"})}`} 
                        x={blackKeyPositionX} data-sharp={`${ noteName.alt }#`} data-flat={`${ noteName.natural }b`} data-octave={octave} rx={wSpace} ry={hSpace}  
                        d={`M ${blackKeyPositionX} 0 v ${(height / 1.6)-hSpace} q 0 ${hSpace} ${wSpace} ${hSpace} h ${(keyWidth / 2)-(wSpace*2)} q ${wSpace} 0 ${wSpace} -${hSpace} v -${(height / 1.6)-hSpace} Z`}></path>
                    {(keyWidth/2) >= 25 ? <>
                    <text className={styles.blackKeyText} textAnchor="middle" y={(height / 1.6)-tSpace*3} x={blackKeyPositionX + (keyWidth / 4)}>{noteName.natural}♭</text>
                    <text className={styles.blackKeyText} textAnchor="middle" y={(height / 1.6)-tSpace} x={blackKeyPositionX + (keyWidth / 4)}>{noteName.alt}♯</text>
                    </>: null}
                </g>))
            }
            blackKeyPositionX += keyWidth;
            return result
        })
        )
}})}
    </svg>
            </div>
    )
}