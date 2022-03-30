import { useState, useRef, MutableRefObject, SetStateAction, Dispatch, ChangeEventHandler } from "react"

export type IArray<Type> = {
  array: Type[];
  set: Dispatch<SetStateAction<Type[]>>;
  push: (element: Type) => void;
  filter: (callback: (i: any) => boolean) => void;
  update: (index: number, newElement: Type) => void;
  remove: (index: number) => void;
  clear: () => void;
}

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

export function useBoolean(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue)

  function toggle() {
    setBool(prevCheck => !prevCheck)
  }

  return { bool, set: setBool, toggle }
}

export function useCounter(defaultValue = 0) {
  const [counter, setCounter] = useState(defaultValue)

  function increment(j = 1) {
    setCounter(counter + j)
  }

  function decrement(j = 1) {
    setCounter(counter - j)
  }

  return { i: counter, set: setCounter, increment, decrement }
}

export function useInterval() {
  const [reference, setReference] = useState<number | undefined>()

  function set(callback: () => void, delay: number) {
    if (!reference) {
      setReference(window.setInterval(callback, delay))
    }
  }

  function clear() {
    if (reference) {
      clearInterval(reference)
      setReference(undefined)
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

export function useStopwatch(defaultValue = 0) {
  const [timer, setTimer] = useState(defaultValue)
  const {set: startInterval, clear: stopInterval} = useInterval()
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
      startInterval(update, 1)
  }
  function reset() {
    stopInterval()
    setTimer(0)
  }
  return { time: timer/1000, start, stop: stopInterval, reset }
}