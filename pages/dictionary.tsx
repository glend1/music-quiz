import styles from '../styles/index.module.css'
import Link from "next/link";
import { useState } from 'react';
import React from 'react';
import { AddChord, TChords } from '../code/components/units/dictionaryutils/dictionaryutils';
import { ChordSelector } from '../code/components/compound/chordselector/chordselector';
import { Scales } from '../code/components/compound/scales/scales';

//TODO maybe if i used a shorter list of scales/chords this would be more usable

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
            <AddChord chords={setChords}/>
        </div>
        <div className={styles.container}>
            <div className={styles.card}><ChordSelector chords={setChords}/></div>
        </div>
        <div className={styles.card}><Scales notes={scale}/></div>
    </>)
}