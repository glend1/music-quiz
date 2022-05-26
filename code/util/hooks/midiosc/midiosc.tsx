import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { useArray } from "../customhooks/customhooks";
import { IStdNote, midiToFrequency } from "../../extensions/notes/notes";
import { State } from "../../store/store";
import { OscSettings, setupOscillator } from "../../../components/compound/osccontrols/osccontrols";


export type IAudioEvent = {setAudioEvent: Dispatch<SetStateAction<((type: string, data: IStdNote) => void) | undefined>>}
type IMidiOsc = IAudioEvent & OscSettings
type IHeld = { data: IStdNote; oscilator: OscillatorNode };

export function MidiOsc({setAudioEvent, wave, play, volume}: IMidiOsc) {
  const audioContext = useSelector((state: State) => state.context);
  const { push: heldPush, filter: heldFilter } = useArray<IHeld>();
    useEffect(() => {
        setAudioEvent(() => {
          return (type: string, data: IStdNote) => {
            if (play && audioContext) {
              switch (type) {
                case "start":
                  let osc = setupOscillator(audioContext, wave, volume)
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
      }, [audioContext, play, volume, wave]);
}