import * as hooks from "./customhooks";
import { renderHook, act } from "@testing-library/react";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

describe("customHooks", () => {
	describe("UseArray: This creates a stateful array object", () => {
		var array: { current: hooks.IArray<number> };
		beforeEach(() => {
			({ result: array } = renderHook(() => hooks.useArray<number>([1, 3, 2])));
		});
		it("array: Should return an array", () => {
			expect(array.current.array).toStrictEqual([1, 3, 2]);
		});
		it("push: Should append to the array", () => {
			act(() => {
				array.current.push(4);
			});
			expect(array.current.array).toStrictEqual([1, 3, 2, 4]);
		});
		it("filter: Should filter the array", () => {
			act(() => {
				array.current.filter((i) => {
					return i == 2 ? false : true;
				});
			});
			expect(array.current.array).toStrictEqual([1, 3]);
		});
		it("update: Should update the array", () => {
			act(() => {
				array.current.update(1, 4);
			});
			expect(array.current.array).toStrictEqual([1, 4, 2]);
		});
		it("remove: Should remove an element from the array", () => {
			act(() => {
				array.current.remove(1);
			});
			expect(array.current.array).toStrictEqual([1, 2]);
		});
		it("clear: Should clear the array", () => {
			act(() => {
				array.current.clear();
			});
			expect(array.current.array).toStrictEqual([]);
		});
	});
	describe("UseBoolean: This create a stateful boolean object", () => {
		var boolean: {
			current: {
				bool: boolean;
				set: Dispatch<SetStateAction<boolean>>;
				toggle: () => void;
			};
		};
		beforeEach(() => {
			({ result: boolean } = renderHook(() => hooks.useBoolean()));
		});
		it("toggle: Should return true", () => {
			act(() => {
				boolean.current.toggle();
			});
			expect(boolean.current.bool).toBe(true);
		});
	});
	describe("UseCounter: This creates a stateful counter", () => {
		var counter: {
			current: {
				i: number;
				set: Dispatch<SetStateAction<number>>;
				increment: (j?: number) => void;
				decrement: (j?: number) => void;
			};
		};
		beforeEach(() => {
			({ result: counter } = renderHook(() => hooks.useCounter(10)));
		});
		it("increment: Should increment the state", () => {
			act(() => {
				counter.current.increment();
			});
			expect(counter.current.i).toBe(11);
		});
		it("decrement: Should decrement the state", () => {
			act(() => {
				counter.current.decrement();
			});
			expect(counter.current.i).toBe(9);
		});
	});
	describe("UseInterval: This creates a stateful interval", () => {
		var interval: {
			current: {
				set: (callback: () => void, delay: number) => void;
				clear: () => void;
			};
		};
		var callback: jest.Mock<any, any>;
		beforeEach(() => {
			jest.useFakeTimers();
			({ result: interval } = renderHook(() => hooks.useInterval()));
			callback = jest.fn();
		});
		afterEach(() => {
			jest.useRealTimers();
		});
		it("set: Should be called 10 times", () => {
			act(() => {
				interval.current.set(callback, 100);
				jest.advanceTimersByTime(1000);
			});
			expect(callback).toHaveBeenCalledTimes(10);
		});
		it("set: Should not override the timer if one is already active", () => {
			act(() => {
				interval.current.set(callback, 100);
				jest.advanceTimersByTime(1000);
			});
			var secondCallback = jest.fn();
			act(() => {
				interval.current.set(secondCallback, 100);
				jest.advanceTimersByTime(1000);
			});
			expect(callback).toHaveBeenCalledTimes(20);
			expect(secondCallback).toHaveBeenCalledTimes(0);
		});
		it("clear: Should clear the interval", () => {
			act(() => {
				interval.current.set(callback, 100);
				jest.advanceTimersByTime(1000);
			});
			act(() => {
				interval.current.clear();
				jest.advanceTimersByTime(1000);
			});
			expect(callback).toHaveBeenCalledTimes(10);
		});
	});
	describe("UseFormState: This creates a stateful form state", () => {
		var formState: {
			current: [
				string,
				ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
			];
		};
		beforeEach(() => {
			({ result: formState } = renderHook(() => hooks.useFormState("test")));
		});
		it("setFromForm: Should be able to set state", () => {
			act(() => {
				formState.current[1](<any>{ target: { value: "change" } });
			});
			expect(formState.current[0]).toBe("change");
		});
	});
	describe("UseStopwatch: This creates a stateful stopwatch", () => {
		var stopwatch: {
			current: {
				time: number;
				start: () => void;
				stop: () => void;
				reset: () => void;
			};
		};
		beforeEach(() => {
			jest.useFakeTimers();
			({ result: stopwatch } = renderHook(() => hooks.useStopwatch()));
		});
		afterEach(() => {
			jest.useRealTimers();
		});
		it("start: Should start the timer", () => {
			act(() => {
				stopwatch.current.start();
				jest.advanceTimersByTime(1568);
			});
			expect(stopwatch.current.time).toBe(1.568);
		});
		it("stop: Should stop the timer", () => {
			act(() => {
				stopwatch.current.start();
				jest.advanceTimersByTime(1568);
			});
			act(() => {
				stopwatch.current.stop();
				jest.advanceTimersByTime(10000);
			});
			expect(stopwatch.current.time).toBe(1.568);
		});
		it("reset: Should reset the timer", () => {
			act(() => {
				stopwatch.current.start();
				jest.advanceTimersByTime(1568);
			});
			act(() => {
				stopwatch.current.reset();
			});
			expect(stopwatch.current.time).toBe(0);
		});
	});
});
