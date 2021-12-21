import { Interval } from './interval'
import { render, screen, fireEvent } from "@testing-library/react"
import { useState } from 'react'
import { renderHook, act } from '@testing-library/react-hooks/dom'
import { IStdNote, RandomNote } from '../../util/notes'

describe("Interval Component", () => {
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should prompt to the user that they select an Ascending Tritone", () => {
        const { result: question } = renderHook(() => useState(RandomNote()))
        render(<Interval {...question.current} />)
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        act(() => {
            fireEvent.click(screen.getByRole("button"))
        })
        expect(screen.getByRole("heading")).toHaveTextContent('Ascending Tritone')
    })
    it("Should fail to generate an interval", () => {
        const { result: question } = renderHook(() => useState<IStdNote>(null))
        render(<Interval {...question.current} />)
        expect(screen.getByText("Create a Question first")).toBeInTheDocument()
    })
})