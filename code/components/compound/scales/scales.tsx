import { useState } from "react"
import { TNotes } from "../../units/dictionaryutils/dictionaryutils"
import dStyles from '../../units/dictionaryutils/dictionaryutils.module.css'
import kStyles from '../../units/piano/piano.module.css'
import { Piano } from "../../units/piano/piano"
import { INote, matchScales, normalizeNote } from "../../../util/extensions/notes/notes"
import Image from 'next/image';
// import * as ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import React from "react";
import { ScaleInformation } from "../scaleinformation/scaleinformation"
import { list } from "../../elements/images"

export function Scales({notes}: TNotes) {
    const [root, setRoot] = useState<string | undefined>()
    return(<><h2>Scales</h2><span className={dStyles.bold}>Select a Scale Root</span>
        <Piano highlight={[]} width={200} height={75} cb={(e: React.MouseEvent<SVGElement>): void => {
        let element = e.target as SVGElement
        let alreadySet = element.classList.contains(kStyles.show)
        let highlighted = element.parentNode!.parentNode!.querySelectorAll(`.${kStyles.show}`)
        if (highlighted.length > 0) {
            highlighted.forEach((el) => {
                el.classList.remove(kStyles.show)
            })
        }
        if (!alreadySet) {
            element.classList.add(kStyles.show)
            setRoot(normalizeNote(element.dataset as INote, 4, true)!.name)
        } else {
            setRoot(undefined)
        }
    } } />
        {root ? <> <span className={dStyles.bold}>Scale Names</span>{matchScales(notes, root).map((scale, i) => {
                return (<div className={dStyles.bubble} key={scale}>
                    <span className={dStyles.align}>{root} {scale}</span><Image onClick={(e) => {
        let el = (e.target as HTMLElement).parentElement!.parentElement!
        let generated = el.querySelector(".generated")
        if (generated) {
            generated.remove()
        } else {
            let div = document.createElement("div");
            div.className = "generated"
            el.appendChild(div)
            // ReactDOM.createRoot(div).render(<React.StrictMode><ScaleInformation scale={scale} root={root}/></React.StrictMode>)
            ReactDOM.render(<React.StrictMode><ScaleInformation scale={scale} root={root}/></React.StrictMode>, div)
        }
    }} src={list} alt='Scale Information'/>
                    </div>)
            })}</> : null}
        </>    
    )
}