export default function Index() {
	return (
		<main>
			<section>
				<p>Available questions should be;</p>
				<ul>
					<li>Note</li>
					<li>Chord</li>
					<li>Interval</li>
					<li>Scale</li>
				</ul>
				<p>
					Each question should allow you to see the question, optionally show
					the stave or play audio.
				</p>
				<p>Each question should be answerable with;</p>
				<ul>
					<li>Audio</li>
					<li>Midi</li>
					<li>Mouse</li>
					<li>Keyboard</li>
				</ul>
				<p>Each question should show the results.</p>
				<p>Each test should timed or a chosen number of questions</p>
			</section>
			<section>
				<p>Implement ML</p>
				<ul>
					<li>Store Q&amp;A&apos;s in IndexedDB (dexie.js)</li>
					<li>Use machine learning (tensorflow) to generate questions</li>
				</ul>
			</section>
		</main>
	);
}
