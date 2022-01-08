import { fireEvent, render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks/dom"
import { useState } from "react"
import { IStdNote } from "../../util/notes"
import { RandomNote } from "./randomnote"

describe("randomnote", () => {
    it("Should ask the use to generate a random note", () => {
        const { result: state } = renderHook(() => useState<IStdNote>(null))
        render(<RandomNote {...state.current} />)
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
    it("Should generate a random note", () => {
        const { result: state } = renderHook(() => useState<IStdNote>(null))
        render(<RandomNote {...state.current} />)
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        fireEvent.click(screen.getByRole("button"))
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(state.current[0]?.midi).toBe(74)
    })
})