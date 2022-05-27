//TODO update depreciated store
import { Action, createStore } from 'redux'

export type State = { context: AudioContext | null}

export const START_AUDIO = "startAudio";

const initialState = {context: null}
  
const reducer = (state: State = initialState, action: Action<String>) => {
    switch (action.type) {
        case START_AUDIO:
            if (state.context == null) {
                return {
                    ...state,
                    context: new AudioContext()
                }
            }
    }
    return state
}

export const Store = createStore(reducer)