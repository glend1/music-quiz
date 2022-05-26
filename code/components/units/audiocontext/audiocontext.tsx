import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { START_AUDIO, State } from '../../../util/store/store'

export function AudioContext() {
    const dispatch = useDispatch<Dispatch<Action<String>>>();
    const context = useSelector((state: State) => state.context)
    return (
        <button disabled={(context == null) ? false : true} onClick={() => dispatch({type: START_AUDIO}) }>Start Audio Context</button>
    )
}