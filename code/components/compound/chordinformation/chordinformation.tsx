import { getSingleChord } from "../../../util/extensions/notes/notes"
import { TNotes } from "../../units/dictionaryutils/dictionaryutils"
import Image from 'next/image';
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
// import * as ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import React from "react";
import { Chord } from "../chord/chord";
import { list } from "../../elements/images";

export function ChordInformation({notes}: TNotes) {
    var chordMessage: string | null
    var chord: string | undefined
    if(notes && notes.length) {
        chord = getSingleChord(notes)
        if (chord == undefined) {
            chordMessage = "No Chord found"
        } else {
            chordMessage = null 
        }
    } else {
        chordMessage = "Click a Key to begin Chord selection"
    }
    return (<div>{chordMessage ? chordMessage : <> <span className={dStyles.bold}>Chord Name</span><div className={dStyles.bubble}><span className={dStyles.align}>{chord}</span>
    <Image onClick={(e) => {
        let el = (e.target as HTMLElement).parentElement!.parentElement!
        let generated = el.querySelector(".generated")
        console.log(generated)
        if (generated) {
            generated.remove()
        } else {
            let div = document.createElement("div");
            div.className = "generated"
            el.appendChild(div)
            // ReactDOM.createRoot(div).render(<React.StrictMode><Chord notes={notes} /></React.StrictMode>)
            ReactDOM.render(<React.StrictMode><Chord notes={notes} /></React.StrictMode>, div)
        }
    }} src={list} alt='Chord Information'/></div></>}
</div>)
}