import { html, For } from "voby";
import { extensions } from "@ext/all";
import ExtensionRow from "@ext/royalmail/components/ExtensionRow";
import { Extension } from "@lib/define";

export default (): JSX.Element => {
	return html`
        <div style="display: flex; flex-direction: column; gap: 0.2rem; padding-top: 0.2rem; height: 100%;" class="w96-listbox">
            <${For} values=${extensions.sort((e) => (e.core ? 1 : -1))}>${(e: Extension) => html`<${ExtensionRow} extension=${e} />`}</${For}>
        </div>
    `;
};
