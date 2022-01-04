import { Round } from "../../util/maths";
import { useBoolean } from "../../util/customHooks";

export type IHistory = {
    type: "hit" | "miss",
    time: number
  }

type History= {history: IHistory[]}

export function HistoryTable({history}: History) {
    const {bool: results, toggle: toggleResults} = useBoolean(false)
            var misses = 0, position = 1, totalMisses = 0, totalTime = 0;
    return (
        <>
        <div>
                <input autoComplete="off" type="checkbox" id="results_visibility" name="results_visibility" defaultChecked={results} onChange={toggleResults} />
                <label htmlFor="results_visibility">Show Results?</label>
            </div>
            {results ?
            <table>
                <thead>
                    <tr>
                        <td key="position">position</td>
                        <td key="time">time</td>
                        <td key="misses">misses</td>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry) => {
                        switch(entry.type) {
                            case "miss":
                                misses++
                                break;
                            case "hit":
                                let newMisses = misses
                                totalMisses += misses
                                totalTime += entry.time
                                misses = 0
                                return (<tr key={position}>
                                    <td>{position++}</td>
                                    <td>{entry.time}</td>
                                    <td>{newMisses}</td>
                                </tr>)
                        }})}
                </tbody>
                <tfoot><tr><td>avg</td>
                <td>{
                    position > 1 ? 
                    Round(totalTime / (position-1), 2)
                    : ""
                    }</td>
                <td>{
                    position > 1 ? 
                    Round(totalMisses / (position-1), 2)
                    : ""
                }</td>
                </tr></tfoot>
            </table>
            : ""}
            </>
    )
}