import { fireEvent, render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks/dom"
import { useState } from "react"
import { IStdNote } from "../../../util/extensions/notes/notes"
import { RandomNote } from "./randomnote"

describe("RandomNote", () => {
    it("Should ask the use to generate a random note", () => {
        const { result: question } = renderHook(() => useState<IStdNote>())
        const { result: root } = renderHook(() => useState<IStdNote>())
        render(<RandomNote setQuestion={question.current[1]} setRoot={root.current[1]} />)
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
    it("Should generate a random note", () => {
        const { result: question } = renderHook(() => useState<IStdNote>())
        const { result: root } = renderHook(() => useState<IStdNote>())
        render(<RandomNote setQuestion={question.current[1]} setRoot={root.current[1]} />)
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        fireEvent.click(screen.getByRole("button"))
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(question.current[0]?.midi).toBe(62)
    })
})