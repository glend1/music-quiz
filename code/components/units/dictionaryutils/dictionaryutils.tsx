import * as ReactDOM from 'react-dom/client';
import iStyles from '../../../../styles/index.module.css'
import styles from './dictionaryutils.module.css'
import React, { Dispatch, SetStateAction } from 'react';
import { ChordSelector } from '../../compound/chordselector/chordselector';

type OptionalCallback = {cb?: ()=>void}
export type TChords = {[key: string]: Array<string>} & Object
export type TChordMethod = {chords: Dispatch<SetStateAction<TChords>>}
export type TNotes = {notes: string[]}
export type TScale = {scale: string, root: string}

export function AddChord({chords}: TChordMethod) {
    return (
<button onClick={(e) => {
            let container = document.querySelector(`.${iStyles.container}`)
            if (container) {
                let div = document.createElement("div")
                div.classList.add(iStyles.card)
                container.appendChild(div)
                ReactDOM.createRoot(div).render(<React.StrictMode><ChordSelector chords={chords}/></React.StrictMode>)
            }
        }}>Add</button>
    )
}

export function DeleteParent({cb}: OptionalCallback) {
    return (<button className={styles.deleteParent} onClick={(e) => {
        let element = (e.target as HTMLElement).parentNode
        element?.parentNode?.removeChild(element)
        if (cb) {
            cb()
        }
    }}>remove</button>)
}