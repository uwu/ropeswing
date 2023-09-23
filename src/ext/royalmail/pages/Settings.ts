import { $, html } from "voby";

export default (): JSX.Element => {
	const counter = $(0);
	const increment = () => counter((prev) => prev + 1);

	return html`
		<div class="page">
			<div><span style="color: red;">TODO!</span> The counter is ${counter}</div>
			<button class="w96-button" onClick=${increment}>Click button to make counter go up</button>
		</div>
	`;
};
