import { render, waitFor } from '@testing-library/react'
import { generateRandomNote } from '../../../util/extensions/notes'
import { Stave } from './stave'

describe("Stave Component", () => {
    it("Should render a note", async () => {
        var container: HTMLElement
        const note = generateRandomNote(5, 20, false)
        await waitFor(() => {
            ({container} = render(<Stave notation={note!.abc} midi={note!.midi} id="question"/>))
        }).then(() => {
            expect(container.querySelector('[data-name="note"]')).toBeTruthy()
        })
    })
    it("Should render div with the correct ID", async () => {
        var container: HTMLElement
        const note = generateRandomNote(5, 20, false)
        await waitFor(() => {
            ({container} = render(<Stave notation={note!.abc} midi={note!.midi} id="question"/>))
        }).then(() => {
            expect(container.querySelector('#question')).toBeTruthy()
        })
    })
    it("Shouldn't render an note", async () => {
        var container: HTMLElement
        await waitFor(() => {
            ({container} = render(<Stave id="question"/>))
        }).then(() => {
            expect(container.querySelector('[data-name="note"]')).toBeFalsy()
        })
    })
})