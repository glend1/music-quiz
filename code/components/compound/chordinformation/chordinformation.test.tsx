import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ChordInformation } from "./chordinformation"

describe("chordInformation", () => {
    it("Should render the component", () => {
        render(<ChordInformation notes={[]} />)
        expect(screen.getByText("Click a Key to begin Chord selection")).toBeVisible()
    })
    it("Should render the chord information", () => {
        render(<ChordInformation notes={["C", "E", "G"]} />)
        expect(screen.getByText("CM")).toBeVisible()
    })
    it("Should tell the user that no chord was found", () => {
        render(<ChordInformation notes={["C", "D", "E"]} />)
        expect(screen.getByText("No Chord found")).toBeVisible()
    })
    it("Should click on the image to show more information", () => {
        render(<ChordInformation notes={["C", "E", "G"]} />)
        userEvent.click(screen.getByRole("img"))
        expect(screen.getByText("Notes")).toBeVisible()
    })
    it("Should delete .generated", () => {
        render(<ChordInformation notes={["C", "E", "G"]} />)
        userEvent.click(screen.getByRole("img"))
        expect(screen.getByText("Notes")).toBeVisible()
        userEvent.click(screen.getByRole("img"))
        expect(screen.queryByText("Notes")).toBeNull()       
    })
})