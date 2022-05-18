import { useSelector } from "react-redux";
import { Select } from "./select";
import { useArray, useFormState } from "../../util/customHooks";
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { State } from "../../util/store";
import { IStdNote, midiToFrequency } from "../../util/notes";
import { Slider } from "./slider";

// add a play button

type IOsc = {setAudioEvent: Dispatch<SetStateAction<((type: string, data: IStdNote) => void) | undefined>>}

type IHeld = { data: IStdNote; oscilator: OscillatorNode };

export function OscControls({ setAudioEvent }: IOsc) {
  const audioContext = useSelector((state: State) => state.context);
  const { push: heldPush, filter: heldFilter } = useArray<IHeld>();
  const [play, setPlay] = useState(false);
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
  const togglePlaying: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (audioContext) {
      setPlay((state) => !state);
    }
  };
  return (
    <>
      {audioContext ? (
        <form autoComplete="off">
          <button onClick={togglePlaying}>{play ? "Mute" : "Unmute"}</button>
          {play ? (<>
              <Slider id="volume" label="Volume" min={1} max={100} value={volumeState} set={setVolume} />
              <Select id="wave_type" label="Wave Type" array={["triangle", "sine", "square", "sawtooth"]} cb={setWave}/>
            </>) : (<div></div> )}
        </form>
      ) : (<div>Please Start AudioContext</div>)}
    </>
  );
}
