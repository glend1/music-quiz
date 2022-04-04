import { useEffect, useState } from "react";
import { HistoryTable, IHistory } from "../units/historytable";
import { useCounter, useStopwatch, useArray } from "../../util/customHooks";
import { IStdNote } from "../../util/notes";

type IAnswer = {
  question: IStdNote,
  answer: IStdNote[]
}

export function Result({ question, answer }: IAnswer) {
  const {i: hits, increment: incrementHits, set: setHits} = useCounter()
  const {i: misses, increment: incrementMisses, set: setMisses} = useCounter()
  const [message, setMessage] = useState("no attempt")
  const {time, start, stop, reset} = useStopwatch()
  const {array: history, push: pushHistory, clear: clearHistory} = useArray<IHistory>()
  useEffect(() => {
      if (answer.length >= 1) {
        if (answer.find(el => {if (el && question) { return el.midi == question.midi}})) {
          setMessage("correct")
          reset()
          incrementHits()
          pushHistory({type: "hit", time})
        } else {
          setMessage("wrong")
          incrementMisses()
          pushHistory({type: "miss", time})
        }
      }
  }, [answer])
  return (
    <>
      <div>{message}</div>
      <div>{time.toFixed(3)}</div>
      <div>
                    <button onClick={start}>start</button>
                    <button onClick={stop}>stop</button>
                    <button onClick={reset}>reset</button>
                    <button onClick={() => {
      setMessage("reset")
      setHits(0)
      setMisses(0)
      clearHistory()
                    }}>reset stats</button>
                    </div>
      <div>
        {hits}/{hits + misses}
      </div>
      <HistoryTable history={history} />
    </>
  );
}