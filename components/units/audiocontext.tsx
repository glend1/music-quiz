import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionPayload, START_AUDIO, State } from '../../util/store'

export function AudioContext() {
    const dispatch = useDispatch<Dispatch<ActionPayload>>();
    const context = useSelector((state: State) => state.context)
    return (
        <button disabled={(context == null) ? false : true} onClick={() => 
            dispatch({type: START_AUDIO, payload:{context: new window.AudioContext()}})
            
        }>Start Audio Context</button>
    )
}