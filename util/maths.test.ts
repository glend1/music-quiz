import * as Test from './maths'

describe("Round: Round to specific decimal places", () => {
    describe("To 2 decimal places", () => {
        it("Should round down", () => {
            expect(Test.Round(0.674,2)).toEqual(0.67)
        })
        it("Should round up", () => {
            expect(Test.Round(0.248,2)).toEqual(0.25)
        })
    })
    it("Should round to 3 decimal places", () => {
        expect(Test.Round(0.3672,3)).toEqual(0.367)
    })
    describe("Edge cases", () => {
        it("Should Round to 0", () => {
            expect(Test.Round(0,5)).toEqual(0)
        })
        it("Should Round to a negative number", () => {
            expect(Test.Round(-5.466,2)).toEqual(-5.47)
        })
        it("Should Round to whole numbers", () => {
            expect(Test.Round(5.67,0)).toEqual(6)
        })
        it("Should not Round negative decimal places", () => {
            expect(Test.Round(56.46,-1)).not.toEqual(56.5)
        })
        it("Should round up when ending in a 5", () => {
            expect(Test.Round(0.245,2)).toBeCloseTo(0.25)
        })
    })
})

describe("randomFromArray: Returns a random element from an array", () => {
    let array = ["this", "is", "a", "test"]
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should get the first element in the Array", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
        expect(Test.randomFromArray(array)).toEqual("this")
    })
    it("Should get the last element in the Array", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
        expect(Test.randomFromArray(array)).toEqual("test")
    })
    it("Should get the second element in the Array", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
        expect(Test.randomFromArray(array)).toEqual("is")
    })
})

describe("arrayContainsArray: returns true or false if the first array elements are contained within the second array", () => {
    it("Should return false if there is 1 element that is not in the second array", () => {
        expect(Test.arrayContainsArray([0,1,3], [0,1,2])).toBeFalsy()
    })
    it("Should return true if all elements are in the second array", () => {
        expect(Test.arrayContainsArray([0,1], [0,1,2])).toBeTruthy()
    })
})