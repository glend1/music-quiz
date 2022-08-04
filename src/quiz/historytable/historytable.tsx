import { useBoolean } from "../../util/customhooks/customhooks";
import { CheckBox } from "../../elements/checkbox/checkbox";

export type IHistory = {
	type: "hit" | "miss";
	time: number;
};

type History = { history: IHistory[] };

export function HistoryTable({ history }: History) {
	const { bool: results, toggle: toggleResults } = useBoolean(false);
	var misses = 0,
		position = 1,
		totalMisses = 0,
		totalTime = 0;
	return (
		<>
			<div>
				<CheckBox
					id={"results_visibility"}
					label={"Show Results?"}
					bool={results}
					toggle={toggleResults}
				/>
			</div>
			{results ? (
				<table>
					<thead>
						<tr>
							<th key="position">Position</th>
							<th key="time">Time</th>
							<th key="misses">Misses</th>
						</tr>
					</thead>
					<tbody>
						{history.map((entry) => {
							switch (entry.type) {
								case "miss":
									misses++;
									break;
								case "hit":
									let newMisses = misses;
									totalMisses += misses;
									totalTime += entry.time;
									misses = 0;
									return (
										<tr key={position}>
											<td>{position++}</td>
											<td>{entry.time}</td>
											<td>{newMisses}</td>
										</tr>
									);
							}
						})}
					</tbody>
					<tfoot>
						<tr>
							<td>Average</td>
							<td>
								{position > 1 ? (totalTime / (position - 1)).toFixed(3) : ""}
							</td>
							<td>
								{position > 1 ? (totalMisses / (position - 1)).toFixed(3) : ""}
							</td>
						</tr>
					</tfoot>
				</table>
			) : (
				""
			)}
		</>
	);
}
