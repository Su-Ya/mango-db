
// Custom plugin to support ==highlight== syntax
const markerChar = `=`.charCodeAt(0);

export function HighlightPlugin(md: any) {
	md.inline.ruler.push('mark', (state: any, silent: boolean) => {
		const max = state.posMax;
		const start = state.pos;

		// Check for opening marker '=='
		if (state.src.charCodeAt(start) !== markerChar) return false;
		if (state.src.charCodeAt(start + 1) !== markerChar) return false;

		// Found marker, looking for closing marker
		let pos = start + 2;
		let found = false;

		while (pos < max) {
			if (state.src.charCodeAt(pos) === markerChar && state.src.charCodeAt(pos + 1) === markerChar) {
				found = true;
				break;
			}
			pos++;
		}

		if (!found || silent) return false;

		// Found closing marker
		state.pos = start;

		// Push opening token
		state.push('mark_open', 'mark', 1);

		// Move past opening marker
		state.pos += 2;
		state.posMax = pos;

		// Parse content inside
		state.md.inline.tokenize(state);

		// Push closing token
		state.push('mark_close', 'mark', -1);

		// Move past closing marker
		state.pos = pos + 2;
		state.posMax = max;

		return true;
	});
}
