import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks/dom'
import { Provider } from 'react-redux'
import { useArray } from '../../util/customHooks'
import { IStdNote } from '../../util/notes'
import { MidiControls } from './midicontrols'
import { Store } from "../../util/store";

describe("midicontrols", () => {
    // it("Should work", () => {
    //     const { result: array } = renderHook(() =>  useArray<IStdNote>() )
    //     render(<Provider store={Store}><MidiControls {...array.current} /></Provider>)
    //     screen.getByRole("")
    // })
})