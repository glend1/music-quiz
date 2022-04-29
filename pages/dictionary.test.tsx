import { render } from "@testing-library/react"
import Dictionary from "./dictionary"


describe("dictionary", () => {
    it("Should render", () => {
        render(<Dictionary/>)
    })
})