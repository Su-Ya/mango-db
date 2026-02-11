
// Custom plugin to support ==highlight== syntax
export function markPlugin(md: any) {
	md.inline.ruler.push('mark', (state: any, silent: boolean) => {
		const max = state.posMax;
		const start = state.pos;

		if (state.src.charCodeAt(start) !== 0x3D /* = */) return false;
		if (state.src.charCodeAt(start + 1) !== 0x3D /* = */) return false;

		// Found '==', looking for next '=='
		let pos = start + 2;
		let found = false;

		while (pos < max) {
			if (state.src.charCodeAt(pos) === 0x3D && state.src.charCodeAt(pos + 1) === 0x3D) {
				found = true;
				break;
			}
			pos++;
		}

		if (!found || silent) return false;

		// Found closing '=='
		state.pos = start;
		state.push('mark_open', 'mark', 1);
		state.pos += 2;
		state.posMax = pos;

		// Parse content
		state.md.inline.tokenize(state);

		state.push('mark_close', 'mark', -1);

		state.pos = pos + 2;
		state.posMax = max;
		return true;
	});
}
