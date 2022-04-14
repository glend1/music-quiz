import { render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
// import { act } from 'react-test-renderer'
import { IStdNote } from '../../util/notes'
import { RandomChord } from '../compound/randomchord'

function MockRandomChord() {
    const question = useState<IStdNote>(null)
    return <RandomChord {...question}/>
}

describe("randomchord: this will generate a random chord", () => {
    it("Should have default values", () => {
        const rc = render(<MockRandomChord />)
        const sliders = rc.getAllByRole("slider")
        expect(sliders).toHaveLength(4)
        expect(sliders[0]).toHaveAttribute("min", "2")
        expect(sliders[0]).toHaveValue("2")
        expect(sliders[1]).toHaveAttribute("max", "7")
        expect(sliders[1]).toHaveValue("4")
        expect(sliders[2]).toHaveAttribute("min", "1")
        expect(sliders[2]).toHaveValue("3")
        expect(sliders[3]).toHaveAttribute("max", "7")
        expect(sliders[3]).toHaveValue("5")
    })
    describe("interactions", () => {
        afterAll(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        it("Should generate a randomChord and go through notes when next is pressed", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
            const rc = render(<MockRandomChord />)
            act(() => {
                userEvent.click(screen.getByRole("button"))
            })
            expect(rc.getByText("D4 DMb5")).toBeVisible()
            act(() => {
                userEvent.click(screen.getAllByRole("button")[1])
            })
            expect(rc.getByText("F#4")).toBeVisible()
            act(() => {
                userEvent.click(screen.getAllByRole("button")[1])
            })
            expect(screen.getAllByRole("button")).toHaveLength(1)
        })
    })
})