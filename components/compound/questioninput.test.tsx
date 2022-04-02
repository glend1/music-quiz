import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks/dom'
import { Provider } from 'react-redux'
import { useArray } from '../../util/customHooks'
import { IStdNote } from '../../util/notes'
import { QuestionInput } from './questioninput'
import { Store } from "../../util/store";

describe("questioninput", () => {
    it("Should work", () => {
        const { result: array } = renderHook(() =>  useArray<IStdNote>() )
        render(<Provider store={Store}><QuestionInput {...array.current} /></Provider>)
        screen.debug()
    })
})