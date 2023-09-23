import { html } from "voby";

interface Props {
	extension: Extension;
}

export default ({ extension }: Props): JSX.Element => {
	return html`
		<div class="item" style=${`display: flex;${extension.core && " opacity: 50%"}`}>
			<div style="display: flex; flex-direction: column;">
				<div class="bold-noaa">${extension.manifest.name} <i style="opacity: 50%">${extension.manifest.authors.join(", ")}</i></div>
				<div>${extension.manifest.description}</div>
			</div>
		</div>
	`;
};
