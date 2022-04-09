import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks/dom'
import { Provider } from 'react-redux'
import { useArray } from '../../util/customHooks'
import { IStdNote } from '../../util/notes'
import { QuestionInput } from './questioninput'
import { Store } from "../../util/store";

//TODO this might need more testing
describe("questioninput", () => {
    describe("show keyboard", () => {
        it("Should not show a keyboard", () => {
            const { result: array } = renderHook(() =>  useArray<IStdNote>() )
            render(<Provider store={Store}><QuestionInput {...array.current} /></Provider>)
            expect(screen.getByTestId("keyboard")).toHaveClass("hide")
            act(() => {
                fireEvent.click(screen.getAllByRole("checkbox")[1])
            })
            expect(screen.getByTestId("keyboard")).not.toHaveClass("hide")
        })
        it("Should show a keyboard", () => {
            const { result: array } = renderHook(() =>  useArray<IStdNote>() )
            render(<Provider store={Store}><QuestionInput {...array.current} /></Provider>)
            act(() => {
                fireEvent.click(screen.getAllByRole("checkbox")[1])
            })
            expect(screen.getByTestId("keyboard")).not.toHaveClass("hide")
        })
    })
})