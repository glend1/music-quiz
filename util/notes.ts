import { AbcNotation, Note, Midi, Interval, NoteLiteral, ChordType, Collection, Chord, Scale} from "@tonaljs/tonal"
import { arrayContainsArray, randomFromArray} from "./maths";
import { Chord as TChord } from "@tonaljs/chord"

export type Chord = TChord;

const notes = ["A", "B", "C", "D", "E", "F", "G"];
export const scale = ["C", "D", "E", "F", "G", "A", "B"];
const accidentalNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
export const accidentals = ["", "", "", "#", "b"];
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

export function createInterval(direction: String): IInt | undefined {
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

export function clampOctave(octave: number) {
    let direction;
    switch (octave) {
        case 1:
            direction = 1
            break;
        case 7:
            direction = 0
            break;
        default:
            direction = Math.round(Math.random())
            break;
    }
    return direction ? "Ascending" : "Descending"
}

export function getSingleChord(arrayChords: Array<string>): string | undefined {
    return Chord.detect(arrayChords)[0]
}

export function matchScales(ArrayChords: Array<string>, key: string) {
    let output: string[] = []
    Scale.names().forEach((scale) => {
        if (arrayContainsArray(ArrayChords, Scale.get(`${key} ${scale}`).notes, compareNotes)) {
            output.push(scale)
        }
    })
    return output
}

 export function uniqueChords(array: Array<string>) {
    let chords: string[] = []
    let dupeChords = new Map()
    Collection.permutations(array).forEach((chordArray: Array<string>) => {
        Chord.detect(chordArray).forEach((chord) => {
            if (!dupeChords.has(chord)) {
                dupeChords.set(chord, true)
                chords.push(chord)
            }
        })
    })
    return chords
}

export function randomChord(difficulty: number, octave: number, includeAccidentals = false) {
    let filter = ChordType.symbols().filter((e) => { return Chord.get(e).intervals.length == difficulty})
    let pitch = includeAccidentals ? accidentalNotes : notes
    return Chord.getChord(randomFromArray(filter), `${randomFromArray(pitch)}${octave}`)
}

export function isMajor(i: number) {
    return (noteFromMidi(i).alt == 0) ? true : false
}

export function offsetNotesFromFrequency(freq: number, offset: number) {
    let nearest = midiFromFrequency(freq)
    if (nearest) {
        let result = {min: 0, max: 0, minfreq: 0, maxfreq: 0}
        result.min = nearest - offset
        result.max = nearest + offset
        result.minfreq = noteFromMidi(result.min).freq!
        result.maxfreq = noteFromMidi(result.max).freq!
        return result
    }
    return null
}

export function midiToFrequency(midi: number) {
    return Midi.midiToFreq(midi)
}

export function simplifyAndTranspose(note: string, transpose: string) {
    return Note.simplify(Note.transpose(note, transpose))
}

export function midiToNoteName(i: number) {
    return Midi.midiToNoteName(i)
}

function noteFromMidi(i: number) {
    return Note.get(midiToNoteName(i))
}

function midiFromFrequency(freq: number) {
    return Midi.toMidi(Note.fromFreq(freq))
}


 export function getScaleNotes(root: string, name: string) {
    return Scale.scaleNotes(Scale.get(`${root} ${name}`).notes)
}

export function compareNotes(i: string, j: string) {
    let iS = simplify(i)
    let iJ = simplify(j)
    if (iS == iJ) {
        return true
    }
    if (iS == Note.enharmonic(iJ)) {
        return true
    }
    return false
}

export function simplify(note: string) {
    return Note.simplify(note)
}

export function chordsFromScale(scale: Array<string>) {
    type ChordCollection = { name: string, chords: Array<string>, notes: Array<string>}
    let chords: ChordCollection[] = []
    scale.forEach((note) => {
        ChordType.symbols().forEach((chord) => {
            let chordNotes = Chord.getChord(chord, note).notes
            if (arrayContainsArray(chordNotes, scale, compareNotes)) {
                let detectedChords = Chord.detect(chordNotes)
                chords.push({name: detectedChords[0], chords: detectedChords, notes: chordNotes})
            }
        })
    })
    return chords
}