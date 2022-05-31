import { useState } from "react";
import { UseAudioContext } from "../../../util/context/audiocontext";
import { IStdNote, midiToFrequency } from "../../../util/extensions/notes/notes";
import { OscQuestion, OscSettings, setupOscillator } from "../../compound/osccontrols/osccontrols";

export function QuestionOsc({ wave, play, volume, question} : OscSettings & OscQuestion) {
  const {context: audioContext} = UseAudioContext()
      const [osc, setOsc] = useState<undefined | OscillatorNode>()
  const [iId, setIId] = useState<undefined | NodeJS.Timer>()
    function playNext(node: OscillatorNode, ctx: AudioContext, queue: IStdNote[]) {
    if (queue[0]) {
      node.frequency.setValueAtTime(midiToFrequency(queue[0].midi), ctx.currentTime)
      queue.shift()
    }
  }
  function clearAndStop(oscilator: OscillatorNode, id: NodeJS.Timer ) {
      oscilator.stop();
      setOsc(undefined)
      if (id) {
        clearInterval(id)
        setIId(undefined)
    }
  }
  function playQuestion(os: OscillatorNode | undefined, type: string, vol: string, question: IStdNote[]) {
    if (audioContext) {
      if (os && iId) {
        clearAndStop(os, iId)
      } else {
        let queue = [...question]
        if (queue[0]) {
          let node = setupOscillator(audioContext, type, vol)
          setOsc(node)
          playNext(node, audioContext, queue)
          let timer = setInterval(() => {
            if (queue[0]) {
              playNext(node, audioContext, queue)
            } else {
              clearAndStop(node, timer)
            }
          }, 500)
          setIId(timer)
        }
      }
    }
  }
  return (<div>{ question[0] && play ? 
    <button onClick={() => {playQuestion(osc, wave, volume, question)}}>{ !osc ? "Play Question" : "Stop Playing"}</button>
    :
    "No question to play"
  }</div>)
}