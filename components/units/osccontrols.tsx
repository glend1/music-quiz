import { useSelector } from "react-redux";
import { Select } from "./select";
import { useBoolean, useFormState } from "../../util/customHooks";
import { State } from "../../util/store";
import { IStdNote } from "../../util/notes";
import { Slider } from "./slider";
import { IAudioEvent, MidiOsc } from "./midiosc";
import { QuestionOsc } from "./questionsOsc";

type IOsc = IAudioEvent & OscQuestion

export type OscQuestion = {question: IStdNote[]}
export type OscSettings = {wave: string; play: boolean; volume: string}

export function setupOscillator(ctx: AudioContext, type: string, vol: string) {
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
  const {bool: play, toggle: togglePlay} = useBoolean(false)
  const [volumeState, setVolume] = useFormState("50");
  const [wave, setWave] = useFormState("triangle");
  MidiOsc({setAudioEvent, wave, play, volume: volumeState});
  function togglePlaying() {
    if (audioContext) {
      togglePlay()
    }
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
              </div>
              <QuestionOsc wave={wave} play={play} volume={volumeState} question={question} />
            </>) : (<div></div> )}
          </>
      ) : (<div>Please Start AudioContext</div>)}
    </>
  );
}
