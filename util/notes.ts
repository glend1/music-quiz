import { AbcNotation, Note, Midi, Interval, NoteLiteral, ChordType, Collection, Chord, Scale} from "@tonaljs/tonal"
import { arrayContainsArray, randomFromArray, randomFromRange} from "./maths";
import { Chord as TChord } from "@tonaljs/chord"

export type Chord = TChord;

const notes = ["A", "B", "C", "D", "E", "F", "G"];
export const scale = ["C", "D", "E", "F", "G", "A", "B"];
//TODO i don't like this
export const accidentals = ["", "", "", "#", "b"];
//TODO remove this eventually
const octaves = [3, 4, 5, 6];
export const intervals = [
    "Unison",
    "Minor Second",
    "Major Second",
    "Minor Third",
    "Major Third",
    "Perfect Forth",
    "Tritone",
    "Perfect Fifth",
    "Minor Sixth",
    "Major Sixth",
    "Minor Seventh",
    "Major Seventh",
    "Octave"
]

export const directionTypes = ["Both", "Ascending", "Descending"]

export type DirectionType = "Both" | "Descending" | "Ascending"

export type IStdNote = {
    note: string;
    name: string;
    octave: number;
    abc: string;
    midi: number;
} | undefined

export function StdNote(name: NoteLiteral): IStdNote {
    let note = Note.get(name)
    if (note.empty || !note.oct || !note.midi) {
        return undefined
    } else {
        return {note: note.name, name: note.pc, octave: note.oct, abc: AbcNotation.scientificToAbcNotation(note.name), midi: note.midi}
    }
}

export function FromFreq(freq: number) {
    return StdNote(Note.fromFreq(freq))
}

//TODO remove this eventually
export function RandomNote() {
    let note = randomFromArray(notes) + randomFromArray(accidentals) + randomFromArray(octaves);
    let out = StdNote(note)
    return out;
}

export function createInterval(root: IStdNote, maxInterval: number, direction: DirectionType) {
    let random = randomFromRange(0, maxInterval)
    if (random != null && root) {
        if (direction == "Both") {
            direction = randomFromArray(["Ascending", "Descending"])
        } 
        let note;
        switch (direction) {
            case "Ascending":
                note = root.midi + random
                break;
            case "Descending":
                note = root.midi - random
                break;
        }
        if (note) {
            let description
            switch (random) {
                case 0:
                    description = intervals[random]
                    break;
                default:
                    description = `${direction} ${intervals[random]}`
            }
            return {note: normalizeMidi(note, randomFromArray([true, false])), description}
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

export function randomChord(difficulty: number, root: string) {
    let filter = ChordType.symbols().filter((e) => { return Chord.get(e).intervals.length == difficulty})
    return Chord.getChord(randomFromArray(filter), root)
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