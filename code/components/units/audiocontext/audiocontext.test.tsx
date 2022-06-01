import { render, screen } from '@testing-library/react'
import { AudioContext } from './audiocontext'
import { AudioContext as ACMock } from 'standardized-audio-context-mock';
import userEvent from '@testing-library/user-event';

// describe("audioContext", () => {
//     it("Should give the user a button to start the AudioContext", () => {
//         render(<Provider store={Store}><AudioContext/></Provider>)
//         expect(screen.getByRole("button")).not.toBeDisabled()
//     })
//     it("Should disable the button when there is an AudioContext", () => {
//         const ac = global.AudioContext
//         global.AudioContext = ACMock as any;
//         render(<Provider store={Store}><AudioContext/></Provider>)
//         userEvent.click(screen.getByRole("button"))
//         expect(screen.getByRole("button")).toBeDisabled()
//         global.AudioContext = ac
//     })
// })