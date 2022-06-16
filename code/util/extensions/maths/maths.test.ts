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
    it("Should return null if the range isn't valid", () => {
        expect(Test.randomFromRange(10, 3)).toBe(null)
    })
    it("Should return the only possible value", () => {
        expect(Test.randomFromRange(3, 3)).toBe(3)
    })
    it("Should return a relatively even distribution", () => {
        let arr = [], min = 0, max = 7, total = 100000;
        for(let i = 0; i <= total; i++) {
            let rand = Test.randomFromRange(min,max)
            if (rand != null) {
                if (!arr[rand]) {
                    arr[rand] = 0
                }
                arr[rand]++
            }
        }
        arr = arr.sort()
        expect(total * 0.005).toBeGreaterThan(arr[7] - arr[0])
    })
    describe("random tests", () => {
        afterAll(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        it("Should return a random number between the specified range", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
            expect(Test.randomFromRange(3, 10)).toBe(6)
        })
        it("Should return the first number in the range", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
            expect(Test.randomFromRange(3, 10)).toBe(3)
        })
        it("Should return the last number in the range", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
            expect(Test.randomFromRange(3, 10)).toBe(10)
        })
    })
})

describe("randomWeights", () => {
    it("should return the first value", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        const randomVal = Test.randomWeight([{percent: 1/2, value: 2}], 1)
        expect(randomVal).toBe(2)
    })
    it("should return the second value", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
        const randomVal = Test.randomWeight([{percent: 1/2, value: 2}, {percent: 1/3, value: 3}], 1)
        expect(randomVal).toBe(3)
    })
    it("should return the default value", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
        const randomVal = Test.randomWeight([{percent: 1/2, value: 2}], 1)
        expect(randomVal).toBe(1)
    })
    it("should return an error that the chance is too great", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
        const randomVal = Test.randomWeight([{percent: 1/2, value: 2}, {percent: 1, value: 3}], 1)
        expect(randomVal).toBeNull()
    })
})