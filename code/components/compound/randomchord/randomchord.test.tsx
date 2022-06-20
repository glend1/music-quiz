import { render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect} from 'react'
import { useQuestionGeneration } from '../../../util/hooks/usequestiongeneration/usequestiongeneration'
import { RandomChord } from './randomchord'

function MockRandomChord() {
    const questionGeneration = useQuestionGeneration()
    useEffect(() => {
        questionGeneration.newRoot(2,26, false)
    }, [])
    return <><RandomChord root={questionGeneration.root} newChord={questionGeneration.newChord} /><div>{questionGeneration.chord?.symbol}</div></>
}

describe("randomchord: this will generate a random chord", () => {
    it("Should have default values", () => {
        const rc = render(<MockRandomChord />)
        const sliders = rc.getAllByRole("slider")
        expect(sliders).toHaveLength(2)
        expect(sliders[0]).toHaveAttribute("min", "2")
        expect(sliders[0]).toHaveValue("2")
        expect(sliders[1]).toHaveAttribute("max", "7")
        expect(sliders[1]).toHaveValue("4")
    })
    describe("interactions", () => {
        afterAll(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        it("Should generate a randomChord", () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
            render(<MockRandomChord />)
            userEvent.click(screen.getByRole("button"))
            expect(screen.getByText("CMb5")).toBeVisible()
        })
    })
})