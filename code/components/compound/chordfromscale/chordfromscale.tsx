import { chordsFromScale, isChord } from "../../../util/extensions/notes/notes"
import { TNotes } from "../../units/dictionaryutils/dictionaryutils"
import Image from 'next/image';
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
// import * as ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import React from "react";
import { Chord } from "../chord/chord";
import { list } from "../../elements/images";

export function ChordsFromScale({notes: scale}: TNotes) {
    const scales = chordsFromScale(scale)
    if (scales.length > 0) {
        return (<><span className={dStyles.bold}>Chords in Scale</span>
            {scales.map((chordCollection) => {
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
                        // ReactDOM.createRoot(div).render(<React.StrictMode><Chord notes={chordCollection.notes}/></React.StrictMode>)
                        ReactDOM.render(<React.StrictMode><Chord notes={chordCollection.notes}/></React.StrictMode>, div)
                    }
                }} src={list} alt='Chord Information'/>
                </div>)
            })}
        </>)
    }
    return <div>No Chords found</div>
}