import { useSelector } from "react-redux";
import { Select } from "./select";
import { useArray, useBoolean, useFormState } from "../../util/customHooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { State } from "../../util/store";
import { IStdNote, midiToFrequency } from "../../util/notes";
import { Slider } from "./slider";

type IOsc = {question: IStdNote[], setAudioEvent: Dispatch<SetStateAction<((type: string, data: IStdNote) => void) | undefined>>}

type IHeld = { data: IStdNote; oscilator: OscillatorNode };

function setupOscillator(ctx: AudioContext, type: string, vol: string) {
  var osc = ctx.createOscillator();
  osc.start();
  osc.type = type as OscillatorType;
  var volume = ctx.createGain();
  osc.connect(volume);
  volume.connect(ctx.destination);
  volume.gain.value = parseInt(vol) / 100;
  return osc
}

export function OscControls({ setAudioEvent, question }: IOsc) {
  const audioContext = useSelector((state: State) => state.context);
  const { push: heldPush, filter: heldFilter } = useArray<IHeld>();
  const {bool: play, toggle: togglePlay} = useBoolean(false)
  const [volumeState, setVolume] = useFormState("50");
  const [wave, setWave] = useFormState("triangle");
  const [osc, setOsc] = useState<undefined | OscillatorNode>()
  const [iId, setIId] = useState<undefined | NodeJS.Timer>()
  function togglePlaying() {
    if (audioContext) {
      togglePlay()
    }
  };
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
  function playQuestion(ctx: AudioContext, os: OscillatorNode | undefined, type: string, vol: string, question: IStdNote[]) {
    if (ctx) {
      if (os && iId) {
        clearAndStop(os, iId)
      } else {
        let queue = [...question]
        if (queue[0]) {
          let node = setupOscillator(ctx, type, vol)
          setOsc(node)
          playNext(node, ctx, queue)
          let timer = setInterval(() => {
            if (queue[0]) {
              playNext(node, ctx, queue)
            } else {
              clearAndStop(node, timer)
            }
          }, 500)
          setIId(timer)
        }
      }
    }
  }
  useEffect(() => {
    setAudioEvent(() => {
      return (type: string, data: IStdNote) => {
        if (play && audioContext) {
          switch (type) {
            case "start":
              let osc = setupOscillator(audioContext, type, volumeState)
              if (data?.midi) {
                osc.frequency.setValueAtTime(
                  midiToFrequency(data.midi),
                  audioContext.currentTime
                );
              }
              heldPush({ data: data, oscilator: osc });
              break;
            case "stop":
              heldFilter((i) => {
                if (i.oscilator != null) {
                  if (data?.midi == i.data.midi) {
                    i.oscilator.stop();
                  }
                }
                return data?.midi != i.data.midi;
              });
              break;
          }
        }
      };
    });
  }, [audioContext, play, volumeState, wave]);
  return (
    <>
      {audioContext ? (
          <>
          <button onClick={togglePlaying}>{play ? "Mute" : "Unmute"}</button>
          {play ? (<>
              <div>
                <Slider id="volume" label="Volume" min={1} max={100} value={volumeState} set={setVolume} />
                <Select id="wave_type" label="Wave Type" array={["triangle", "sine", "square", "sawtooth"]} cb={setWave}/>
              </div><div>
                  { question[0] ? 
                    <button onClick={() => {playQuestion(audioContext, osc, wave, volumeState, question)}}>{ !osc ? "Play Question" : "Stop Playing"}</button>
                    :
                    "No question to play"
                  }
              </div>
            </>) : (<div></div> )}
          </>
      ) : (<div>Please Start AudioContext</div>)}
    </>
  );
}
