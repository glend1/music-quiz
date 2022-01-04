import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { DetectPitch } from './detectPitch'
import { Store } from "../../util/store"

describe("detectPitch", () => {
    it("Should tell the user to start the AudioContext", () => {
        const callback = jest.fn(input => input);
        render(<Provider store={Store}><DetectPitch cb={callback} /></Provider>)
        expect(screen.getByText("Please Start AudioContext")).toBeInTheDocument()
    })
    //TODO more tests need to be done
})