
import Container from 'markdown-it-container';

// Plugin for standard HackMD callouts (:::info, :::success, :::warning, :::danger, :::spoiler)
export function CalloutPlugin(md: any) {
	const createCallout = (name: string) => {
		return [
			Container,
			name,
			{
				render: (tokens: any[], idx: number) => {
					const token = tokens[idx];
					const info = token.info.trim().slice(name.length).trim();

					if (token.nesting === 1) {
						return `<div class="callout callout-${name}">`;
					} else {
						// Closing tag
						return '</div>';
					}
				},
			},
		];
	};

	const createSpoiler = () => {
		return [
			Container,
			'spoiler',
			{
				render: (tokens: any[], idx: number) => {
					const token = tokens[idx];
					const info = token.info.trim().slice('spoiler'.length).trim();
					const title = info || '詳細資料';

					if (token.nesting === 1) {
						// Opening tag
						return `<details>
											<summary>${title}</summary>
											<div class="details-content">`;
					} else {
						// Closing tag
						return '</div></details>';
					}
				},
			},
		];
	};

	md.use(...createCallout('info'))
		.use(...createCallout('success'))
		.use(...createCallout('warning'))
		.use(...createCallout('danger'))
		.use(...createSpoiler());
}
