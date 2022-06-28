import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ChordsFromScale } from "./chordfromscale"

describe("chordfromscale", () => {
    it("Should render a defualt component", () => {
        render(<ChordsFromScale notes={[]} />)
        expect(screen.getByText("Not a valid Chord")).toBeVisible()
    })
    it("Should render a chord", () => {
        render(<ChordsFromScale notes={["C", "E", "G"]} />)
        expect(screen.getByText("CM")).toBeVisible()
        expect(screen.getByText("C5")).toBeVisible()
        expect(screen.getByText("Em#5")).toBeVisible()
    })
    it("Should show chord information", () => {
        const component = render(<ChordsFromScale notes={["C", "E", "G"]} />)
        userEvent.click(component.getAllByRole("img")[0])
        expect(component.baseElement).toMatchSnapshot()
    })
    it("Should remove chord information", () => {
        const component = render(<ChordsFromScale notes={["C", "E", "G"]} />)
        userEvent.click(component.getAllByRole("img")[0])
        userEvent.click(component.getAllByRole("img")[0])
        expect(component.baseElement).toMatchSnapshot()
    })
})