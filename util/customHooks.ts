import { useState, useRef, MutableRefObject, SetStateAction, Dispatch, ChangeEventHandler } from "react"
import { Round } from "./maths"

export type IArray<Type> = {
  array: Type[];
  set: Dispatch<SetStateAction<Type[]>>;
  push: (element: Type) => void;
  filter: (callback: (i: any) => boolean) => void;
  update: (index: number, newElement: Type) => void;
  remove: (index: number) => void;
  clear: () => void;
}

//TODO set defaults
export function useArray<Type>(defaultValue: Type[] = []): IArray<Type> {
  const [array, setArray] = useState(defaultValue)

  function push(element: Type) {
    setArray(a => [...a, element])
  }

  function filter(callback: (i: any) => boolean) {
    setArray(a => a.filter(callback))
  }

  function update(index: number, newElement: Type) {
    setArray(a => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ])
  }

  function remove(index: number) {
    setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)])
  }

  function clear() {
    setArray([])
  }

  return { array, set: setArray, push, filter, update, remove, clear }
}

export function useBoolean(defaultValue: boolean) {
  const [bool, setBool] = useState(defaultValue)

  function toggle() {
    setBool(prevCheck => !prevCheck)
  }

  return { bool, set: setBool, toggle }
}

export function useCounter(defaultValue: number) {
  const [i, setI] = useState(defaultValue)

  function increment(j = 1) {
    setI(i + j)
  }

  function decrement(j = 1) {
    setI(i - j)
  }

  return { i, set: setI, increment, decrement }
}

export function useInterval() {
  const ref: MutableRefObject<NodeJS.Timer | null > = useRef(null);

  function set(callback: () => void, delay: number) {
    ref.current = setInterval(callback, delay)
  }

  function clear() {
    if (ref.current) {
      clearInterval(ref.current)
      ref.current = null
    }
  }

  return { set, clear }
}

export function useFormState(defaultValue: string): [string, ChangeEventHandler<HTMLInputElement | HTMLSelectElement>] {
  const [state, setState] = useState(defaultValue)

  const setFromForm: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
      setState(e.target.value)
  }
  return [state, setFromForm]
}

export function useStopwatch(defaultValue: number) {
  const [time, setTimer] = useState(defaultValue)
  const [interval, setIntervalState] = useState<NodeJS.Timer | null>(null)
  var offset = 0;
  function delta() {
    let now = Date.now()
    let delta =  now - offset;
    offset = now
    return delta
  }
  function update() {
    setTimer(prev => prev+delta())
  }
  function start() {
      offset = Date.now();
      setIntervalState(setInterval(update, 1))
  }
  function stop() {
    if (interval) {
      clearInterval(interval);
      setIntervalState(null)
    }
  }
  function reset() {
    stop()
    setTimer(0)
  }
  return { time: Round(time/1000, 2), start, stop, reset }
}