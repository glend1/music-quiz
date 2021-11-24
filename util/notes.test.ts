import * as Notes from "./notes";

describe("StdNote: Creates a standard note format", () => {
    it("Should return null", () => {
        expect(Notes.StdNote("hello")).toBeNull()
    })
    it("Should return a null when given a partial value", () => {
        expect(Notes.StdNote("c")).toBeNull()
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
        expect(Notes.FromFreq(-440)).toBeNull()
    })
    it("Should return null if frequency is too high for a matching midi range", () => {
        expect(Notes.FromFreq(13289.75)).toBeNull()
    })
    it("Should return null if frequency is too low for a matching midi range", () => {
        expect(Notes.FromFreq(6)).toBeNull()
    })
})
describe("RandomNote: Returns a random StdNote", () => {
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should return a StdNote", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
        expect(Notes.RandomNote()).toEqual({ note: 'C4', name: 'C', octave: 4, abc: 'C', midi: 60 })
    })
})
describe("controlOctave: returns Ascending or Decending randomly depending on the passed in Octave", () => {
    describe("this will test the random functionality", () => {
        afterAll(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        it("Should return a Ascending if random is less than .5", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
            expect(Notes.controlOctave(4)).toEqual("Descending")
        })
        it("Should return a Ascending if random is greater than .5", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
            expect(Notes.controlOctave(4)).toEqual("Ascending")
        })
    })
    it("Should return Ascending if the passed in octave is 1", () => {
        expect(Notes.controlOctave(1)).toEqual("Ascending")
    })
    it("Should return Descending if the passed in octave is 7", () => {
        expect(Notes.controlOctave(7)).toEqual("Descending")
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
    it("Should generate a random Ascending interval", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(Notes.createInterval("Ascending")).toStrictEqual({
            "number": {
                "number": 4,
                "ordinal": "th",
                "word": "Fourth",
            },
            "quality": {
                "q": "P",
                "word": "Perfect",
            },
            "direction": "Ascending",
            "name": "Ascending Perfect Fourth",
            "transposeBy": "+4P",
        })
    })
    it("Should generate a random Descending interval", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(Notes.createInterval("Descending")).toStrictEqual({
            "number": {
                "number": 4,
                "ordinal": "th",
                "word": "Fourth",
            },
            "quality": {
                "q": "P",
                "word": "Perfect",
            },
            "direction": "Descending",
            "name": "Descending Perfect Fourth",
            "transposeBy": "-4P",
        })
    })
})