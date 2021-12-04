import { Interval as TInt } from "@tonaljs/core";
import { AbcNotation, Note, Midi, Interval, NoteLiteral, NoInterval} from "@tonaljs/tonal"
import { randomFromArray } from "./maths";

const notes = ["A", "B", "C", "D", "E", "F", "G"];
const accidentals = ["", "", "", "#", "b"];
const octaves = [3, 4, 5, 6];
const qualityWords = {"m": "Minor", "M": "Major", "P": "Perfect", "d": "Diminished"}
const ordinalWords = {
    1: {ordinal: "st", word: "First"},
    2: {ordinal: "nd", word: "Second"},
    3: {ordinal: "rd", word: "Third"},
    4: {ordinal: "th", word: "Fourth"},
    5: {ordinal: "th", word: "Fifth"},
    6: {ordinal: "th", word: "Sixth"},
    7: {ordinal: "th", word: "Seventh"},
    8: {ordinal: "th", word: "Eighth"},
}

export type IStdNote = {
    note: string;
    name: string;
    octave: number;
    abc: string;
    midi: number;
} | null

export function StdNote(name: NoteLiteral): IStdNote {
    let note = Note.get(name)
    if (note.empty || !note.oct || !note.midi) {
        return null
    } else {
        return {note: note.name, name: note.pc, octave: note.oct, abc: AbcNotation.scientificToAbcNotation(note.name), midi: note.midi}
    }
}

export function FromFreq(freq: number) {
    return StdNote(Note.fromFreq(freq))
}

export function RandomNote() {
    let note = randomFromArray(notes) + randomFromArray(accidentals) + randomFromArray(octaves);
    let out = StdNote(note)
    return out;
}

export type IInt = {
    number: {
        number: number;
        ordinal: string;
        word: string;
    };
    quality: {
        q: string;
        word: string;
    };
    direction: String;
    name: string;
    transposeBy: string;
}

export function createInterval(direction: String): IInt | void {
    let range = []
    for (let i = 0; i <= 12; i++) {range.push(i)}
    let random = range[Math.floor(Math.random() * range.length)]
    let obj = Interval.get(Interval.fromSemitones(random))
    if (obj.num && obj.q) {
        let number = (() => { 
            switch (obj.num) {case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
                return {...ordinalWords[obj.num], number: obj.num}
            }
        })()
        let quality = (() => { 
            switch (obj.q) {case "M": case "m": case "P": case "d":
                return {q: obj.q, word: qualityWords[obj.q]}
            }
        })()
        let name = (() => {
            if (quality && number) {
                switch(obj.semitones) {
                    case 0: return "Unison";
                    case 6: return `${direction} Tritone`;
                    case 12: return `${direction} Octave`;
                    default: return `${direction} ${quality.word} ${number.word}`;
                }
            }
        })()
        let transposeBy = `${(direction == "Ascending" ? "+" : "-")}${obj.name}`
        if (number && quality && !obj.empty && name) {
            return {number, quality, direction, name, transposeBy} 
        }
    }
}

export type INote = {sharp: string, flat: string} | {natural: string}

export function normalizeNote(note: INote, octave: number, sharp: boolean) {
    let name = (() => { 
        if ("natural" in note) {
            return note.natural
        } else {
            if (sharp) {
                return note.sharp
            } else {
                return note.flat
            }
        }
    })()
    return StdNote(name + octave.toString())
}

export function normalizeMidi(midi: number, sharp: boolean) {
    let name = Midi.midiToNoteName(midi, { sharps: sharp });
    return StdNote(name)
}

export function controlOctave(octave: number) {
    let direction;
    switch (octave) {
        case 1:
            direction = 1
            break;
        case 7:
            direction = 0
            break;
        default:
            direction = Math.round(Math.random() * 1)
            break;
    }
    return direction ? "Ascending" : "Descending"
}