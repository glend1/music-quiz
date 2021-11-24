
import { ChangeEventHandler, MutableRefObject } from 'react';
import styles from '../../styles/select.module.css';

type ISelect = {
    label: string,
    array: string[],
    id: string,
    forwardRef?: MutableRefObject<HTMLSelectElement> | MutableRefObject<null>
    cb: ChangeEventHandler<HTMLSelectElement>
}

export function Select({label, array, cb, id, forwardRef}: ISelect) {
    return (
        <>
            <label className={styles.selectLabel} htmlFor={id}>{label}:</label>
            <select id={id} onChange={cb} ref={forwardRef}>
                {   
                    array.map((e, index) => {
                        return (<option key={index} value={e}>{e.trim()}</option>)
                    })
                }
            </select>
        </>
    )
}