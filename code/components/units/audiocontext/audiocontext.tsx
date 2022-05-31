import { UseAudioContext } from '../../../util/context/audiocontext';

export function AudioContext() {
    const audioContext = UseAudioContext()
    return (
        <button disabled={(audioContext.context == null) ? false : true} onClick={audioContext.createAudioContext}>Start Audio Context</button>
    )
}