import { Action, createStore } from 'redux'

export type ActionPayload = Action<String> & {
    payload: { context: AudioContext | null}
}

export type State = { context: AudioContext | null}

export const START_AUDIO = "startAudio";

const initialState = {context: null}
  
const reducer = (state: State = initialState, action: ActionPayload) => {
    switch (action.type) {
        case START_AUDIO:
            if (state.context == null) {
                return {
                    ...state,
                    context: action.payload.context
                }
            }
    }
    return state
}

export const Store = createStore(reducer)