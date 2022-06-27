import * as Notes from "./notes";

describe("StdNote: Creates a standard note format", () => {
    it("Should return null", () => {
        expect(Notes.StdNote("hello")).toBeUndefined()
    })
    it("Should return a null when given a partial value", () => {
        expect(Notes.StdNote("c")).toBeUndefined()
    })
    it("Should return a full value", () => {
        expect(Notes.StdNote("c4")).toEqual({ note: 'C4', name: 'C', octave: 4, abc: 'C', midi: 60 })
    })
})
describe("FromFreq: Creates a standard note from frequency", () => {
    it("Should return a StdNote", () => {
        expect(Notes.FromFreq(440)).toEqual({ note: 'A4', name: 'A', octave: 4, abc: 'A', midi: 69 })
    })
    it("Should return null if it is a negative number", () => {
        expect(Notes.FromFreq(-440)).toBeUndefined()
    })
    it("Should return null if frequency is too high for a matching midi range", () => {
        expect(Notes.FromFreq(13289.75)).toBeUndefined()
    })
    it("Should return null if frequency is too low for a matching midi range", () => {
        expect(Notes.FromFreq(6)).toBeUndefined()
    })
})
describe("generateRandomNote: Returns a random StdNote", () => {
    //TODO this sometimes doesn't generate a note, when the value is too low/high
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should return a StdNote", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
        expect(Notes.generateRandomNote(10, 30, false)).toEqual({abc: "E", midi: 64, name: "E", note: "E4", octave: 4})
    })
    it("Should return a Sharp", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
        expect(Notes.generateRandomNote(10, 30, true)).toEqual({abc: "^E", midi: 65, name: "E#", note: "E#4", octave: 4})
    })
    it("Should return a Flat", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        expect(Notes.generateRandomNote(10, 30, true)).toEqual({abc: "_A,", midi: 56, name: "Ab", note: "Ab3", octave: 3})
    })
    it("Should return a Natural", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
        expect(Notes.generateRandomNote(10, 30, true)).toEqual({abc: "d", midi: 74, name: "D", note: "D5", octave: 5})
    })
    it("Should return null if the range is too big", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
        expect(Notes.generateRandomNote(35, 50, false)).toBeNull()
    })
})
describe("getNaturalNoteFromArray", () => {
    it("Should return a value if the argument is in range", () => {
        expect(Notes.getNaturalNoteFromArray(23)).toBe("E5")
    }) 
    it("Should return null if the argument isn't in range", () => {
        expect(Notes.getNaturalNoteFromArray(35)).toBeNull()
    })
})
describe("normalizeMidi: returns a StdNote", () => {
    it("Should return a sharp StdNote if you tell it to", () => {
        expect(Notes.normalizeMidi(61, true)).toEqual({ note: 'C#4', name: 'C#', octave: 4, abc: '^C', midi: 61 })
    })
    it("Should return a flat StdNote if you tell it to", () => {
        expect(Notes.normalizeMidi(61, false)).toEqual({ note: 'Db4', name: 'Db', octave: 4, abc: '_D', midi: 61 })
    })
})
describe("normalizeNote: returns a StdNote", () => {
    it("Should return a StdNote", () => {
        expect(Notes.normalizeNote({natural: "C"}, 4, true)).toEqual({ note: 'C4', name: 'C', octave: 4, abc: 'C', midi: 60 })
    })
    it("Should return a sharp StdNote if you tell it to", () => {
        expect(Notes.normalizeNote({sharp: "C#", flat: "Db"}, 4, true)).toEqual({ note: 'C#4', name: 'C#', octave: 4, abc: '^C', midi: 61 })
    })
    it("Should return a flat StdNote if you tell it to", () => {
        expect(Notes.normalizeNote({sharp: "C#", flat: "Db"}, 4, false)).toEqual({ note: 'Db4', name: 'Db', octave: 4, abc: '_D', midi: 61 })
    })
})
describe("createInterval: returns an IInt type", () => {
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should generate an Ascending Major Second", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(Notes.createInterval(Notes.StdNote("C4"), 4, "Ascending")).toStrictEqual({
            "description": "Ascending Major Second", 
            "note": {
                "abc": "D", 
                "midi": 62, 
                "name": "D", 
                "note": "D4", 
                "octave": 4
            }
        })
    })
    it("Should generate an Descending Perfect Fourth", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(Notes.createInterval(Notes.StdNote("C4"), 4, "Descending")).toStrictEqual({
            "description": "Descending Major Second", 
            "note": {
                "abc": "^A,", 
                "midi": 58, 
                "name": "A#", 
                "note": "A#3", 
                "octave": 3
            }
        })
    })
    it("Should generate an Descending Perfect Fourth", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(Notes.createInterval(Notes.StdNote("C4"), 4, "Both")).toStrictEqual({
            "description": "Ascending Major Second", 
            "note": {
                "abc": "D", 
                "midi": 62, 
                "name": "D", 
                "note": "D4", 
                "octave": 4
            }
        })
    })
    it("Should generate a unison", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        expect(Notes.createInterval(Notes.StdNote("C4"), 4, "Both")).toStrictEqual({
            "description": "Unison", 
            "note": {
                "abc": "C", 
                "midi": 60, 
                "name": "C", 
                "note": "C4", 
                "octave": 4
            }
        })
    })
})
describe("isChord: this should tell the user if there is a chord with these notes or not", () => {
    it("Should return false", () => {
        expect(Notes.isChord(["C", "E"])).toBeFalsy()
    })
    it("Should return true", () => {
        expect(Notes.isChord(["C", "E", "G"])).toBeTruthy()
    })
})
describe("getSingleChord: this is an alias to detect a chord, returns only a single chord name", () => {
    it("Should return a singe chord name", () => {
        expect(Notes.getSingleChord(["C", "E", "G"])).toBe("CM")
    })
})
describe("matchScales: this will take an array of notes and match them to available scales taking into account the selected key", () => {
    it("Should return an array of scales", () => {
        expect(Notes.matchScales(["C", "D", "E", "F", "G", "A", "B"], "F")).toStrictEqual([ 'lydian', 'ichikosucho', 'chromatic' ])
    })
})
describe("uniqueChords: this will return all unique chord names for a specific note collection", () => {
    it("Should return an array of chords", () => {
        expect(Notes.uniqueChords(["C", "G"])).toStrictEqual(["C5", "C5/G"])
    })
})
describe("midiToFrequency: this is an alias for Midi.midiToFreq", () => {
    it("Should return ~261", () => {
        expect(Notes.midiToFrequency(60)).toBe(261.6255653005986)
    }) 
})
describe("simplifyAndTranspose: this is an alias combination", () => {
    it("Should simplify and transpose a note", () => {
        expect(Notes.simplifyAndTranspose("C4", "+6m")).toBe("Ab4")
    })
})
describe("midiToNoteName: this is an alias", () => {
    it("Should return a note name", () => {
        expect(Notes.midiToNoteName(60)).toBe("C4")
    })
})
describe("getScaleNotes: this will return notes from a scale", () => {
    it("Should return an array of notes", () => {
        expect(Notes.getScaleNotes("C", "major")).toStrictEqual(["C", "D", "E", "F", "G", "A", "B"])
    })
})
describe("simplify: this will make notes with many sharps or flats into a simplified version with only 1 accidental sign", () =>{
    it("Should return C", () => {
        expect(Notes.simplify("Dbb")).toBe("C")
    })
})
describe("randomChord: will return a random chord", () => {
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should return a random chord with 3 notes", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        expect(Notes.randomChord(3, "F4")).toStrictEqual({
            "aliases": ["Mb5",],
            "chroma": "100010100000",
            "empty": false,
            "intervals": [ "1P", "3M", "5d", ],
            "name": "F ",
            "normalized": "100000100010",
            "notes": [ "F4", "A4", "Cb5", ],
            "quality": "Major",
            "root": "",
            "rootDegree": 0,
            "setNum": 2208,
            "symbol": "FMb5",
            "tonic": "F4",
            "type": "",
        })
    })
})
describe("isMajor: will return true or false depending if the midi number is a whole tone", () => {
    it("Should return true if this is a whole note", () => {
        expect(Notes.isMajor(60)).toBeTruthy()
    })
    it("Should return true if this is an accidental note", () => {
        expect(Notes.isMajor(61)).toBeFalsy()
    })
})
describe("offsetNotesFromFrequency: will return notes from an offset from a midi note number", () => {
    it("Should return offsets from Middle C", () => {
        expect(Notes.offsetNotesFromFrequency(440, 2)).toStrictEqual({
            "max": 71, 
            "maxfreq": 493.8833012561241, 
            "min": 67, 
            "minfreq": 391.99543598174927}
        )
    })
    it("Should return 0 if the result in unacceptible", () => {
        expect(Notes.offsetNotesFromFrequency(44000000, 20000)).toBeNull()
    })
})
describe("chordsFromScale: will return all the cords from a given scale", () => {
    it("Should return some chords", () => {
        expect(Notes.chordsFromScale(["C", "D", "E", "F", "G", "A", "B"])).toStrictEqual([{"chords": ["C5"], "name": "C5", "notes": ["C", "G"]}, {"chords": ["Csus4", "Fsus2/C"], "name": "Csus4", "notes": ["C", "F", "G"]}, {"chords": ["CM7sus4"], "name": "CM7sus4", "notes": ["C", "F", "G", "B"]}, {"chords": ["CM", "Em#5/C"], "name": "CM", "notes": ["C", "E", "G"]}, {"chords": ["Cmaj7"], "name": "Cmaj7", "notes": ["C", "E", "G", "B"]}, {"chords": ["C6", "Am7/C"], "name": "C6", "notes": ["C", "E", "G", "A"]}, {"chords": ["Csus2", "Gsus4/C"], "name": "Csus2", "notes": ["C", "D", "G"]}, {"chords": ["Csus24", "D4/C", "G7sus4/C"], "name": "Csus24", "notes": ["C", "D", "F", "G"]}, {"chords": ["CM9sus4"], "name": "CM9sus4", "notes": ["C", "F", "G", "B", "D"]}, {"chords": ["CMadd9", "Em7#5/C"], "name": "CMadd9", "notes": ["C", "E", "G", "D"]}, {"chords": ["Cmaj9"], "name": "Cmaj9", "notes": ["C", "E", "G", "B", "D"]}, {"chords": ["C6/9", "D11/C", "D9sus4/C", "Am7add11/C"], "name": "C6/9", "notes": ["C", "E", "G", "A", "D"]}, {"chords": ["Cmaj13", "CM7add13", "D13sus4/C", "Am11/C"], "name": "Cmaj13", "notes": ["C", "E", "G", "B", "D", "A"]}, {"chords": ["Cmaj13", "CM7add13", "D13sus4/C", "Am11/C"], "name": "Cmaj13", "notes": ["C", "E", "G", "A", "B", "D"]}, {"chords": ["D5"], "name": "D5", "notes": ["D", "A"]}, {"chords": ["Dsus4", "Gsus2/D"], "name": "Dsus4", "notes": ["D", "G", "A"]}, {"chords": ["D7sus4", "Gsus24/D", "A4/D"], "name": "D7sus4", "notes": ["D", "G", "A", "C"]}, {"chords": ["Dm"], "name": "Dm", "notes": ["D", "F", "A"]}, {"chords": ["Dm7", "F6/D"], "name": "Dm7", "notes": ["D", "F", "A", "C"]}, {"chords": ["Dm6", "Bm7b5/D"], "name": "Dm6", "notes": ["D", "F", "A", "B"]}, {"chords": ["D4", "Csus24/D", "G7sus4/D"], "name": "D4", "notes": ["D", "G", "C", "F"]}, {"chords": ["Dmadd4", "A7#5sus4/D"], "name": "Dmadd4", "notes": ["D", "F", "G", "A"]}, {"chords": ["Dm7add11", "F6/9/D", "G11/D", "G9sus4/D"], "name": "Dm7add11", "notes": ["D", "F", "A", "C", "G"]}, {"chords": ["Dsus2", "Asus4/D"], "name": "Dsus2", "notes": ["D", "E", "A"]}, {"chords": ["Dsus24", "E4/D", "A7sus4/D"], "name": "Dsus24", "notes": ["D", "E", "G", "A"]}, {"chords": ["D11", "D9sus4", "C6/9/D", "Am7add11/D"], "name": "D11", "notes": ["D", "A", "C", "E", "G"]}, {"chords": ["D11", "D9sus4", "C6/9/D", "Am7add11/D"], "name": "D11", "notes": ["D", "G", "A", "C", "E"]}, {"chords": ["D13sus4", "Cmaj13/D", "CM7add13/D", "Am11/D"], "name": "D13sus4", "notes": ["D", "G", "A", "C", "E", "B"]}, {"chords": ["Dmadd9"], "name": "Dmadd9", "notes": ["D", "F", "A", "E"]}, {"chords": ["Dm9"], "name": "Dm9", "notes": ["D", "F", "A", "C", "E"]}, {"chords": ["Dm69", "Eb9sus/D", "E11b9/D"], "name": "Dm69", "notes": ["D", "F", "A", "B", "E"]}, {"chords": ["Dm13", "E7sus4b9b13/D"], "name": "Dm13", "notes": ["D", "F", "A", "C", "E", "B"]}, {"chords": ["Dm11", "Fmaj13/D", "FM7add13/D", "G13sus4/D"], "name": "Dm11", "notes": ["D", "F", "A", "C", "E", "G"]}, {"chords": ["E5"], "name": "E5", "notes": ["E", "B"]}, {"chords": ["E7#5sus4", "Amadd4/E"], "name": "E7#5sus4", "notes": ["E", "A", "B#", "D"]}, {"chords": ["Esus4", "Asus2/E"], "name": "Esus4", "notes": ["E", "A", "B"]}, {"chords": ["E7sus4", "Asus24/E", "B4/E"], "name": "E7sus4", "notes": ["E", "A", "B", "D"]}, {"chords": ["Em#5", "B#M/E"], "name": "Em#5", "notes": ["E", "G", "B#"]}, {"chords": ["Em7#5", "CMadd9/E"], "name": "Em7#5", "notes": ["E", "G", "C", "D"]}, {"chords": ["Em"], "name": "Em", "notes": ["E", "G", "B"]}, {"chords": ["Em7", "G6/E"], "name": "Em7", "notes": ["E", "G", "B", "D"]}, {"chords": ["E4", "Dsus24/E", "A7sus4/E"], "name": "E4", "notes": ["E", "A", "D", "G"]}, {"chords": ["Emadd4", "B7#5sus4/E"], "name": "Emadd4", "notes": ["E", "G", "A", "B"]}, {"chords": ["Em7add11", "G6/9/E", "A11/E", "A9sus4/E"], "name": "Em7add11", "notes": ["E", "G", "B", "D", "A"]}, {"chords": ["Eb9sus", "E11b9", "Dm69/E"], "name": "Eb9sus", "notes": ["E", "A", "B", "D", "F"]}, {"chords": ["Eb9sus", "E11b9", "Dm69/E"], "name": "Eb9sus", "notes": ["E", "B", "D", "F", "A"]}, {"chords": ["E7sus4b9b13", "Dm13/E"], "name": "E7sus4b9b13", "notes": ["E", "A", "B", "D", "F", "C"]}, {"chords": ["Emb6b9"], "name": "Emb6b9", "notes": ["E", "G", "C", "F"]}, {"chords": ["F5"], "name": "F5", "notes": ["F", "C"]}, {"chords": ["FM", "Am#5/F"], "name": "FM", "notes": ["F", "A", "C"]}, {"chords": ["Fmaj7"], "name": "Fmaj7", "notes": ["F", "A", "C", "E"]}, {"chords": ["F6", "Dm7/F"], "name": "F6", "notes": ["F", "A", "C", "D"]}, {"chords": ["FMb5"], "name": "FMb5", "notes": ["F", "A", "Cb"]}, {"chords": ["FM7b5"], "name": "FM7b5", "notes": ["F", "A", "Cb", "E"]}, {"chords": ["Fmaj#4"], "name": "Fmaj#4", "notes": ["F", "A", "C", "E", "B"]}, {"chords": ["FM6#11"], "name": "FM6#11", "notes": ["F", "A", "C", "D", "B"]}, {"chords": ["Fsus2", "Csus4/F"], "name": "Fsus2", "notes": ["F", "G", "C"]}, {"chords": ["FMadd9", "Am7#5/F"], "name": "FMadd9", "notes": ["F", "A", "C", "G"]}, {"chords": ["Fmaj9"], "name": "Fmaj9", "notes": ["F", "A", "C", "E", "G"]}, {"chords": ["F6/9", "Dm7add11/F", "G11/F", "G9sus4/F"], "name": "F6/9", "notes": ["F", "A", "C", "D", "G"]}, {"chords": ["Fmaj13", "FM7add13", "Dm11/F", "G13sus4/F"], "name": "Fmaj13", "notes": ["F", "A", "C", "E", "G", "D"]}, {"chords": ["Fmaj13", "FM7add13", "Dm11/F", "G13sus4/F"], "name": "Fmaj13", "notes": ["F", "A", "C", "D", "E", "G"]}, {"chords": ["FM9b5", "G13no5/F"], "name": "FM9b5", "notes": ["F", "A", "Cb", "E", "G"]}, {"chords": ["Fmaj9#11"], "name": "Fmaj9#11", "notes": ["F", "A", "C", "E", "G", "B"]}, {"chords": ["F69#11", "Am11A/F"], "name": "F69#11", "notes": ["F", "A", "C", "D", "G", "B"]}, {"chords": ["FM13#11"], "name": "FM13#11", "notes": ["F", "A", "C", "E", "G", "B", "D"]}, {"chords": ["G5"], "name": "G5", "notes": ["G", "D"]}, {"chords": ["Gsus4", "Csus2/G"], "name": "Gsus4", "notes": ["G", "C", "D"]}, {"chords": ["G7sus4", "Csus24/G", "D4/G"], "name": "G7sus4", "notes": ["G", "C", "D", "F"]}, {"chords": ["G7no5"], "name": "G7no5", "notes": ["G", "B", "F"]}, {"chords": ["GM", "Bm#5/G"], "name": "GM", "notes": ["G", "B", "D"]}, {"chords": ["G7"], "name": "G7", "notes": ["G", "B", "D", "F"]}, {"chords": ["G6", "Em7/G"], "name": "G6", "notes": ["G", "B", "D", "E"]}, {"chords": ["G7add6"], "name": "G7add6", "notes": ["G", "B", "D", "F", "E"]}, {"chords": ["Gsus2", "Dsus4/G"], "name": "Gsus2", "notes": ["G", "A", "D"]}, {"chords": ["Gsus24", "D7sus4/G", "A4/G"], "name": "Gsus24", "notes": ["G", "A", "C", "D"]}, {"chords": ["G11", "G9sus4", "Dm7add11/G", "F6/9/G"], "name": "G11", "notes": ["G", "D", "F", "A", "C"]}, {"chords": ["G11", "G9sus4", "Dm7add11/G", "F6/9/G"], "name": "G11", "notes": ["G", "C", "D", "F", "A"]}, {"chords": ["G13sus4", "Dm11/G", "Fmaj13/G", "FM7add13/G"], "name": "G13sus4", "notes": ["G", "C", "D", "F", "A", "E"]}, {"chords": ["G9no5"], "name": "G9no5", "notes": ["G", "B", "F", "A"]}, {"chords": ["G13no5", "FM9b5/G"], "name": "G13no5", "notes": ["G", "B", "F", "A", "E"]}, {"chords": ["GMadd9", "Bm7#5/G"], "name": "GMadd9", "notes": ["G", "B", "D", "A"]}, {"chords": ["G9"], "name": "G9", "notes": ["G", "B", "D", "F", "A"]}, {"chords": ["G6/9", "Em7add11/G", "A11/G", "A9sus4/G"], "name": "G6/9", "notes": ["G", "B", "D", "E", "A"]}, {"chords": ["G13"], "name": "G13", "notes": ["G", "B", "D", "F", "A", "E"]}, {"chords": ["A5"], "name": "A5", "notes": ["A", "E"]}, {"chords": ["A7#5sus4", "Dmadd4/A"], "name": "A7#5sus4", "notes": ["A", "D", "E#", "G"]}, {"chords": ["Asus4", "Dsus2/A"], "name": "Asus4", "notes": ["A", "D", "E"]}, {"chords": ["A7sus4", "Dsus24/A", "E4/A"], "name": "A7sus4", "notes": ["A", "D", "E", "G"]}, {"chords": ["Am#5", "E#M/A"], "name": "Am#5", "notes": ["A", "C", "E#"]}, {"chords": ["Am7#5", "FMadd9/A"], "name": "Am7#5", "notes": ["A", "C", "F", "G"]}, {"chords": ["Am"], "name": "Am", "notes": ["A", "C", "E"]}, {"chords": ["Am7", "C6/A"], "name": "Am7", "notes": ["A", "C", "E", "G"]}, {"chords":  ["A4", "D7sus4/A", "Gsus24/A"], "name": "A4", "notes": ["A", "D", "G", "C"]}, {"chords": ["Amadd4", "E7#5sus4/A"], "name": "Amadd4", "notes": ["A", "C", "D", "E"]}, {"chords": ["Am7add11", "C6/9/A", "D11/A", "D9sus4/A"], "name": "Am7add11", "notes": ["A", "C", "E", "G", "D"]}, {"chords": ["Asus2", "Esus4/A"], "name": "Asus2", "notes": ["A", "B", "E"]}, {"chords": ["Asus24", "E7sus4/A", "B4/A"], "name": "Asus24", "notes": ["A", "B", "D", "E"]}, {"chords": ["A11", "A9sus4", "Em7add11/A", "G6/9/A"], "name": "A11", "notes": ["A", "E", "G", "B", "D"]}, {"chords": ["A11", "A9sus4", "Em7add11/A", "G6/9/A"], "name": "A11", "notes": ["A", "D", "E", "G", "B"]}, {"chords": ["Am9#5"], "name": "Am9#5", "notes": ["A", "C", "F", "G", "B"]}, {"chords": ["Amadd9"], "name": "Amadd9", "notes": ["A", "C", "E", "B"]}, {"chords": ["Am9"], "name": "Am9", "notes": ["A", "C", "E", "G", "B"]}, {"chords": ["Am11A", "E#69#11/A"], "name": "Am11A", "notes": ["A", "C", "E#", "G", "B", "D"]}, {"chords": ["Am11", "Cmaj13/A", "CM7add13/A", "D13sus4/A"], "name": "Am11", "notes": ["A", "C", "E", "G", "B", "D"]}, {"chords": ["B7#5sus4", "Emadd4/B"], "name": "B7#5sus4", "notes": ["B", "E", "F##", "A"]}, {"chords": ["Bm#5", "F##M/B"], "name": "Bm#5", "notes": ["B", "D", "F##"]}, {"chords": ["Bm7#5", "GMadd9/B"], "name": "Bm7#5", "notes": ["B", "D", "G", "A"]}, {"chords": ["Bdim"], "name": "Bdim", "notes": ["B", "D", "F"]}, {"chords": ["Bm7b5", "Dm6/B"], "name": "Bm7b5", "notes": ["B", "D", "F", "A"]}, {"chords": ["B4", "E7sus4/B", "Asus24/B"], "name": "B4", "notes": ["B", "E", "A", "D"]}, {"chords": ["Bmb6b9"], "name": "Bmb6b9", "notes": ["B", "D", "G", "C"]}])
    })
})
describe("compareNotes: will compare notes, returning true if equal", () => {
    it("Should return true", () => {
        expect(Notes.compareNotes("C##", "D")).toBeTruthy()
    })
    it("Should return false", () => {
        expect(Notes.compareNotes("C", "E")).toBeFalsy()
    })
    it("Should return true", () => {
        expect(Notes.compareNotes("C#", "Db")).toBeTruthy()
    })
})