import styles from '../styles/Index.module.css'
import kStyles from '../styles/keyboard.module.css'
import eStyles from '../styles/explorer.module.css'
import Link from "next/link";
import { Piano } from "../components/units/piano";
import { matchScales, uniqueChords, INote, normalizeNote, getSingleChord, getScaleNotes, StdNote, IStdNote, simplify, chordsFromScale } from '../util/notes'
import { Dispatch, SetStateAction, useState } from 'react';
import ReactDOM from 'react-dom';
import listImage from '../public/list_black_24dp.svg'
import Image from 'next/image';
import React from 'react';
import { v4 as uuid } from 'uuid';

type TChords = {[key: string]: Array<string>} & Object
type TChordMethod = {chords: Dispatch<SetStateAction<TChords>>}
type OptionalCallback = {cb?: ()=>void}
type TNotes = {notes: string[]}
type TScale = {scale: string, root: string}

export default function Dictionary() {
    const [chords, setChords] = useState<TChords>({})
    let notes = new Map()
    Object.keys(chords).forEach((i) => {
        chords[i].forEach((j) => {
            notes.set(j, true)
        })
    })
    const scale = [...notes.keys()].sort()
    return (<>
        <div className={styles.float}>
            <Link href={"/"}><a>Go Home</a></Link>
            <GoHome chords={setChords}/>
        </div>
        <div className={styles.container}>
            <div className={styles.card}><ChordSelector chords={setChords}/></div>
        </div>
        <div className={styles.card}><Scales notes={scale}/></div>
    </>)
}

function GoHome({chords}: TChordMethod) {
    return (
<button onClick={(e) => {
            let container = document.querySelector(`.${styles.container}`)
            if (container) {
                let div = document.createElement("div")
                div.classList.add(styles.card)
                container.appendChild(div)
                ReactDOM.render(<React.StrictMode><ChordSelector chords={chords}/></React.StrictMode>, div)
            }
        }}>Add</button>
    )
}

    function ChordSelector({chords}: TChordMethod) {
        const [uid] = useState(uuid())
    const [chordState, setChord] = useState<string[]>([])
    return (<><h2>Chord</h2><span className={eStyles.bold}>Select a Chord</span><Piano higher={true} highlight={[]} cb={(e: React.MouseEvent<SVGElement>): void => {
        let el = e.target as SVGElement
        el.classList.toggle(kStyles.show)
        let selected: string[] = []
        el.parentNode?.parentNode?.querySelectorAll(`.${kStyles.show}`).forEach((e) => {
            let el = e as SVGElement
            let note = el.dataset.natural ? el.dataset.natural : el.dataset.sharp
            if (note?.length) {
                selected.push(note)
            }
        })
        setChord(() => { return selected })
        chords((prev) => {
            prev[uid] = selected
            return {...prev}
        })
        el.parentNode?.parentNode?.parentNode?.parentNode?.querySelector(`.generated`)?.remove()
    } } />
    <ChordMessage notes={chordState} />
    <DeleteParent cb={() => {
        chords((prev) => {
            delete prev[uid]
            return {...prev}
        })
    }}/>
    </>)
}


function DeleteParent({cb}: OptionalCallback) {
    return (<button className={eStyles.deleteParent} onClick={(e) => {
        let element = (e.target as HTMLElement).parentNode
        element?.parentNode?.removeChild(element)
        if (cb) {
            cb()
        }
    }}>remove</button>)
}


function ChordMessage({notes}: TNotes) {
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
    return (<div>{chordMessage ? chordMessage : <> <span className={eStyles.bold}>Chord Name</span><div className={eStyles.bubble}><span className={eStyles.align}>{chord}</span>
    <Image onClick={(e) => {
        let el = (e.target as HTMLElement).parentElement!.parentElement!
        let generated = el.querySelector(".generated")
        if (generated) {
            generated.remove()
        } else {
            let div = document.createElement("div");
            div.className = "generated"
            el.appendChild(div)
            ReactDOM.render(<React.StrictMode><ChordInformation notes={notes} /></React.StrictMode>, div)
        }
    }} src={listImage} alt='Chord Information'/></div></>}
</div>)
}

function ChordInformation({notes}: TNotes) {
    return (<>
        <Inversions notes={notes} ></Inversions>
        { notes != undefined ? <div><Scales notes={notes}/></div> : null}
        </>
    )
}

function Inversions({notes}: TNotes) {
    return (
        <div><span className={eStyles.bold}>Inversions</span>{uniqueChords(notes!).map((chord, i) => {
            return (<div key={i} className={eStyles.bubble}>{chord}</div>)
        })
        }</div>
    )
}


function Scales({notes}: TNotes) {
    const [root, setRoot] = useState<string | undefined>()
    return(<><h2>Scales</h2><span className={eStyles.bold}>Select a Scale Root</span><Piano highlight={[]} width={200} height={75} cb={(e: React.MouseEvent<SVGElement>): void => {
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
        {root ? <> <span className={eStyles.bold}>Scale Names</span>{matchScales(notes, root).map((scale, i) => {
                return (<div className={eStyles.bubble} key={scale}>
                    <span className={eStyles.align}>{root} {scale}</span><Image onClick={(e) => {
        let el = (e.target as HTMLElement).parentElement!.parentElement!
        let generated = el.querySelector(".generated")
        if (generated) {
            generated.remove()
        } else {
            let div = document.createElement("div");
            div.className = "generated"
            el.appendChild(div)
            ReactDOM.render(<React.StrictMode><ScaleInformation scale={scale} root={root}/></React.StrictMode>, div)
        }
    }} src={listImage} alt='Scale Information'/>
                    </div>)
            })}</> : null}
        </>    
    )
}


function ScaleInformation({scale, root}: TScale) {
        const notes = getScaleNotes(root, scale)
        let simplified: IStdNote[] = []
        notes.forEach((note) => {
            simplified.push(StdNote(`${simplify(note)}4`))
        })
    return(<div>
        <Piano width={100} height={50} highlight={simplified} cb={(e: React.MouseEvent<SVGElement>): void => {}}></Piano>
        <div><span className={eStyles.bold}>Notes</span>{notes.map((i) => {
            return (<div key={i} className={eStyles.bubble}>{i}</div>)
        })}</div>
        <ChordsFromScale notes={notes}></ChordsFromScale>
        </div>
    )
}

function ChordsFromScale({notes}: TNotes) {
    return (<><span className={eStyles.bold}>Chords in Scale</span>
    {chordsFromScale(notes).map((chordCollection) => {
        return (<div className={eStyles.bubble} key={chordCollection.name}><span className={eStyles.align}>{chordCollection.name}</span>
        <Image onClick={(e) => {
            let el = (e.target as HTMLElement).parentElement!.parentElement!
            let generated = el.querySelector(".generated")
            if (generated) {
                generated.remove()
            } else {
                let div = document.createElement("div");
                div.className = "generated"
                el.appendChild(div)
                ReactDOM.render(<React.StrictMode><Chord notes={chordCollection.notes}/></React.StrictMode>, div)
            }
        }} src={listImage} alt='Chord Information'/>
        </div>)
    })}
    </>)
}


function Chord({notes}: TNotes) {
    let simplified: IStdNote[] = []
        notes.forEach((note) => {
            simplified.push(StdNote(`${simplify(note)}4`))
        })
    return (<>
    <Piano width={100} height={50} highlight={simplified} cb={(e: React.MouseEvent<SVGElement>): void => {}}></Piano>
    <span className={eStyles.bold}>Notes</span>{
        notes.map((note) => {
            return (<div className={eStyles.bubble} key={note}>{note}</div>)
        })
    }
    <Inversions notes={notes} ></Inversions>
    </>)
}