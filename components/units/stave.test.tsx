import { render, waitFor } from '@testing-library/react'
import { RandomNote } from '../../util/notes'
import { Stave } from './stave'

describe("Stave Component", () => {
    it("Should render a note", async () => {
        var container: HTMLElement
        await waitFor(() => {
            ({container} = render(<Stave notation={RandomNote()!.abc} id="question"/>))
        }).then(() => {
            expect(container.querySelector('[data-name="note"]')).toBeTruthy()
        })
    })
    it("Should render div with the correct ID", async () => {
        var container: HTMLElement
        await waitFor(() => {
            ({container} = render(<Stave notation={RandomNote()!.abc} id="question"/>))
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