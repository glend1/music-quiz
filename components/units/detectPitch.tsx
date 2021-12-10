import { Dispatch, SetStateAction, useEffect } from 'react';
import { PitchDetector } from "pitchy";
import { useSelector } from 'react-redux';
import { useBoolean, useInterval } from '../../util/customHooks';
import { State } from '../../util/store';

export type IFreq = {pitch: number, clarity: number}

type IPitch = {
  cb: Dispatch<SetStateAction<IFreq | undefined>>
}

export function DetectPitch({cb}: IPitch) {
  const audioContext = useSelector((state: State) => state.context )
  const {bool: listening, toggle: toggleListening} = useBoolean()
  const {set: setPitch, clear: clearPitch} = useInterval()
  useEffect(() => {
    if(listening) {
      if (audioContext?.state === "running") {
        const analyserNode = audioContext.createAnalyser();
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          let sourceNode = audioContext.createMediaStreamSource(stream);
          sourceNode.connect(analyserNode);
          const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
          const input = new Float32Array(detector.inputLength);
          setPitch(() => {
            analyserNode.getFloatTimeDomainData(input);
            const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate);
            cb({pitch: (Math.round(pitch * 1000) / 1000), clarity: (Math.round(clarity * 100))});
          }, 100)
        });  
      }
    }
    return () => {
      clearPitch()
    }
  }, [listening])  
  return (
   (audioContext ? <button onClick={toggleListening}>{(listening) ? "Mute" : "Unmute"}</button> : <div>Please Start AudioContext</div>)
  )
}

