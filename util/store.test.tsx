import { render, screen } from "@testing-library/react"

describe("Store:", () => {
    it("Should work", () => {
        render(<h1></h1>)
        expect(screen.getByRole("heading")).toBeInTheDocument()
    })
    it("definitely work", () => {
        expect(true).toBe(true)
    })
})