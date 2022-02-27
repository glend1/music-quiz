import { render, RenderResult, waitFor } from "@testing-library/react"
import { AudioGraph } from "./audiograph"
import { queries } from "@testing-library/dom/types/"

//TODO this can't be unit tested
// describe("audiograph", () => {
//     beforeAll(() => {
//         class ResizeObserver {
//             observe() {}
//             disconnect() {}
//         }
//         window.ResizeObserver = ResizeObserver as any;
//     })
//     it("Should render a canvas", async () => {
//         let ag: RenderResult<typeof queries, HTMLElement>
//         await waitFor(() => {
//             ag = render(<AudioGraph freq={500}/>)
//         }).then(() => {
//             expect(ag.container.querySelector('canvas')?.getContext("2d")?.__getDrawCalls()).toMatchSnapshot()
//         })
//     })
//     it("Should fill up the graph with data", async () => {
//         let ag: RenderResult<typeof queries, HTMLElement>
//         await waitFor(() => {
//             ag = render(<AudioGraph freq={1}/>)
//         }).then(() => {
//             for (let i = 2; i <= 40; i++) {
//                 ag.rerender(<AudioGraph freq={i}/>)
//             }
//         }).then(() => {
//             expect(ag.container.querySelector('canvas')?.getContext("2d")?.__getDrawCalls()).toMatchSnapshot()
//         })
//     })
// })