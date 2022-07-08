import { render, screen } from '@testing-library/react'
import { CreateAudio } from './createaudio'
import { AudioContext as ACMock } from 'standardized-audio-context-mock';
import userEvent from '@testing-library/user-event';

describe("audioContext", () => {
    it("Should give the user a button to start the AudioContext", () => {
        render(<CreateAudio/>)
        expect(screen.getByRole("button")).not.toBeDisabled()
    })
    // it("Should disable the button when there is an AudioContext", () => {
    //     const ac = global.AudioContext
    //     global.AudioContext = ACMock as any;
    //     render(<CreateAudio/>)
    //     userEvent.click(screen.getByRole("button"))
    //     expect(screen.getByRole("button")).toBeDisabled()
    //     global.AudioContext = ac
    // })
})