import { render, waitFor, screen } from "@testing-library/react"
import { AudioGraph } from "./audiograph"

describe("audiograph", () => {
    //TODO more tests need to be done
    it("Should render a canvas", async () => {
        class ResizeObserver {
            observe() {}
            disconnect() {}
        }
        window.ResizeObserver = ResizeObserver as any;
        var container: HTMLElement
        await waitFor(() => {
            ({container} = render(<AudioGraph freq={500}/>))
        }).then(() => {
            expect(container.querySelector('canvas')).toBeTruthy()
        })
    })
})