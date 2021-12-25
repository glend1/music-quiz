import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StdNote } from '../../util/notes'
import { Piano } from './piano'

describe("Piano", () => {
    it("Should render a correct Piano", () => {
        const container = render(<Piano highlight={[]} cb={function (): void {} } />)
        expect(container.baseElement).toMatchSnapshot()
    })
    describe("callback", () => {
        it("test", async () => {
            const callback = jest.fn();
            var element: HTMLElement
            await waitFor(() => {
                ({container: element} = render(<Piano highlight={[]} cb={callback} />))
            }).then(() => {
                userEvent.click(element.querySelectorAll('g')[0])
            }).then(() => {
                expect(callback).toHaveBeenCalledTimes(1)
            })
        })
    })
    describe("displayHighlight", () => {
        it("Should highlight 1 natural, 1 sharp and 1 flat note", () => {
            const container = render(<Piano highlight={[StdNote("C4"), StdNote("D#4"), StdNote("Gb4")]} cb={function (): void {} } />)
            expect(container.baseElement).toMatchSnapshot()
        })
    })
})