import { chordsFromScale } from "../../../util/extensions/notes/notes"
import { TNotes } from "../../units/dictionaryutils/dictionaryutils"
import Image from 'next/image';
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import * as ReactDOM from 'react-dom/client';
import React from "react";
import { Chord } from "../chord/chord";
import { list } from "../../elements/images";

export function ChordsFromScale({notes}: TNotes) {
    return (<><span className={dStyles.bold}>Chords in Scale</span>
    {chordsFromScale(notes).map((chordCollection) => {
        return (<div className={dStyles.bubble} key={chordCollection.name}><span className={dStyles.align}>{chordCollection.name}</span>
        <Image onClick={(e) => {
            let el = (e.target as HTMLElement).parentElement!.parentElement!
            let generated = el.querySelector(".generated")
            if (generated) {
                generated.remove()
            } else {
                let div = document.createElement("div");
                div.className = "generated"
                el.appendChild(div)
                ReactDOM.createRoot(div).render(<React.StrictMode><Chord notes={chordCollection.notes}/></React.StrictMode>)
            }
        }} src={list} alt='Chord Information'/>
        </div>)
    })}
    </>)
}