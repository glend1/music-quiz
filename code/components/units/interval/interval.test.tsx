import { Interval } from './interval'
import { render, screen, fireEvent } from "@testing-library/react"
import { useState } from 'react'
import { IStdNote, StdNote } from '../../util/notes'

function MockInterval({val}: {val?: IStdNote}) {
    const question = useState<IStdNote>(val)
    const root = useState<IStdNote>(val)
    return <Interval root={root[0]} question={question[0]} setQuestion={question[1]} />
}

describe("Interval Component", () => {
    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    it("Should prompt to the user that they select an Descending Minor Third", () => {
        render(<MockInterval val={StdNote("C4")}/>)
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        fireEvent.change(screen.getByRole("slider"), {target: {value: "6"}})
        fireEvent.click(screen.getByRole("button"))
        expect(screen.getByRole("heading")).toHaveTextContent("Descending Minor Third")
    })
})
describe("Edge Cases", () => {
    it("Should fail to generate an interval", () => {
        render(<MockInterval />)
        expect(screen.getByText("Please create a Question first")).toBeInTheDocument()
    })
})