import { useSelector } from "react-redux";
import { Select } from "./select";
import { useArray, useBoolean, useFormState } from "../../util/customHooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { State } from "../../util/store";
import { IStdNote, midiToFrequency } from "../../util/notes";
import { Slider } from "./slider";

//TODO add a play button

type IOsc = {question: IStdNote[], setAudioEvent: Dispatch<SetStateAction<((type: string, data: IStdNote) => void) | undefined>>}

type IHeld = { data: IStdNote; oscilator: OscillatorNode };

export function OscControls({ setAudioEvent, question }: IOsc) {
  const audioContext = useSelector((state: State) => state.context);
  const { push: heldPush, filter: heldFilter } = useArray<IHeld>();
  const {bool: play, toggle: togglePlay} = useBoolean(false)
  const [volumeState, setVolume] = useFormState("50");
  const [wave, setWave] = useFormState("triangle");

  useEffect(() => {
    setAudioEvent(() => {
      return (type: string, data: IStdNote) => {
        if (play && audioContext) {
          switch (type) {
            case "start":
              var osc = audioContext.createOscillator();
              osc.type = wave as OscillatorType;
              var volume = audioContext.createGain();
              osc.connect(volume);
              volume.connect(audioContext.destination);
              volume.gain.value = parseInt(volumeState) / 100;
              if (data?.midi) {
                osc.frequency.setValueAtTime(
                  midiToFrequency(data.midi),
                  audioContext.currentTime
                );
              }
              osc.start();
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
  function togglePlaying() {
    if (audioContext) {
      togglePlay()
    }
  };
  function playQuestion() {
    console.log(question)
  };
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
                <button onClick={playQuestion}>Play Question</button>
              </div>
            </>) : (<div></div> )}
          </>
      ) : (<div>Please Start AudioContext</div>)}
    </>
  );
}
