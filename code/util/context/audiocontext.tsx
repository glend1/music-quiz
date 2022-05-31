import { createContext, useContext, useState } from "react"

type ContextT = {
    context: AudioContext | undefined;
    createAudioContext: () => void;
}

export const reactContext = createContext<ContextT>({context: undefined, createAudioContext: () => {}})

export function GlobalAudioContext({children}: {children: React.ReactNode}) {
    const [context, setAudioContext] = useState<undefined | AudioContext>()
    function createAudioContext() {
        if (!context) {
            setAudioContext(new AudioContext())
        }
    }
    return (
        <reactContext.Provider value={{context, createAudioContext}}>
            {children}
        </reactContext.Provider>
    )
}

export function UseAudioContext(){
    return useContext(reactContext) 
  } 