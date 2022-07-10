import { renderHook } from "@testing-library/react-hooks/dom"
import { useState } from "react"
import { StdNote } from "../../extensions/notes/notes"
import { IAudioEventType, MidiOsc } from "./midiosc"

describe("midiosc", () => {
    it("Should not error", () => {
        const state = renderHook(() => {return useState<IAudioEventType>()})
        renderHook(() => { return MidiOsc({setAudioEvent: state.result.current[1], wave:"Triangle", play:false, volume:"50"})})
        if (state.result.current[0]) {
            state.result.current[0]("start", StdNote("C4"))
        }
    })
})