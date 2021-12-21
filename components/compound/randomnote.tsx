import { Stave } from '../units/stave';
import { IStdNote, RandomNote as NewRandomNote } from '../../util/notes';
import { Dispatch, SetStateAction, useState } from 'react';

export function RandomNote({1: setQuestion }: [IStdNote, Dispatch<SetStateAction<IStdNote>>]) {
    const [random, setRandom] = useState<IStdNote>()
    function newQuestion() {
        let data = NewRandomNote()
        setRandom(data)
        setQuestion(data)
    }
    return (
        <>
            <button onClick={newQuestion}>New Question</button>
            <Stave notation={random?.abc} id="question"/>
        </>
    )
}