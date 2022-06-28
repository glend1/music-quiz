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
        expect(Notes.chordsFromScale(["C", "D", "E", "F", "G", "A", "B"])).toMatchSnapshot()
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