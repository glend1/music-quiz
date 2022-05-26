import { fireEvent, render, screen, act } from '@testing-library/react'
import { StdNote } from '../../util/notes'
import { Result } from './result'

describe("answer", () => {
    it("Should render a default component", () => {
        render(<Result question={undefined} answer={[]} />)
        expect(screen.getByText("0.000")).toBeVisible()
        expect(screen.getByText("no attempt")).toBeVisible()
        expect(screen.getByText("0/0")).toBeVisible()
    })
    describe("Timer test", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        })
        afterEach(() => {
            jest.useRealTimers()
        })
        it("Should start the timer", () => {
            render(<Result question={undefined} answer={[]} />)
            act(() => {
                fireEvent.click(screen.getByText("start"))
                jest.advanceTimersByTime(1568)
            })
            expect(screen.getByText("1.568")).toBeVisible()
        })
        it("Should stop the timer", () => {
            render(<Result question={undefined} answer={[]} />)
            act(() => {
                fireEvent.click(screen.getByText("start"))
                jest.advanceTimersByTime(1568)
            })
            act(() => {
                fireEvent.click(screen.getByText("stop"))
                jest.advanceTimersByTime(1568)
            })
            expect(screen.getByText("1.568")).toBeVisible()
        })
        it("Should reset the timer", () => {
            render(<Result question={undefined} answer={[]} />)
            act(() => {
                fireEvent.click(screen.getByText("start"))
                jest.advanceTimersByTime(1568)
            })
            act(() => {
                fireEvent.click(screen.getByText("stop"))
                fireEvent.click(screen.getByText("reset"))
                jest.advanceTimersByTime(1568)
            })
            expect(screen.getByText("0.000")).toBeVisible()
        })
    })
    describe("Test results", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        })
        afterEach(() => {
            jest.useRealTimers()
        })
        it("give you the correct score", () => {
            const component = render(<Result question={undefined} answer={[]} />)
            act(() => {
                fireEvent.click(screen.getByText("Show Results?"))
                fireEvent.click(screen.getByText("start"))
                jest.advanceTimersByTime(1568)
                component.rerender(<Result question={StdNote("C4")} answer={[StdNote("D4")]} />)
            })
            act(() => {
                jest.advanceTimersByTime(1568)
                component.rerender(<Result question={StdNote("D4")} answer={[StdNote("C4"), StdNote("D4")]} />)
            })
            expect(component.container).toMatchSnapshot()
            act(() => {
                fireEvent.click(screen.getByText("reset stats"))
            })
            expect(component.container).toMatchSnapshot()
        })
    })
})