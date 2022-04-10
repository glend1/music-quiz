import * as Test from './maths'

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

describe("randomFromRange: returns a random value between the two values", () => {
    it("Should return a random number between the specified range", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(Test.randomFromRange(3, 10)).toBe(5)
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should return null if the range isn't valid", () => {
        expect(Test.randomFromRange(10, 3)).toBe(null)
    })
    it("Should return the only possible value", () => {
        expect(Test.randomFromRange(3, 3)).toBe(3)
    })
})