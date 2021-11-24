//import { render } from "../ES6Workaround"
import { render, screen } from "@testing-library/react"

describe("Store:", () => {
    it("Should work", () => {
        render(<h1></h1>)
        expect(screen.getAllByRole("h1")).toBeInTheDocument()
    })
    it("definitely work", () => {
        expect(true).toBe(true)
    })
})