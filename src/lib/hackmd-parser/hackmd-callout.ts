
import Container from 'markdown-it-container';

// Plugin for standard HackMD callouts (:::info, :::success, :::warning, :::danger, :::spoiler)
export function CalloutPlugin(md: any) {
	const createContainer = (name: string, defaultTitle: string) => {
		return [
			Container,
			name,
			{
				render: (tokens: any[], idx: number) => {
					const token = tokens[idx];
					const info = token.info.trim().slice(name.length).trim();

					if (token.nesting === 1) {
						// Opening tag
						return `<div class="callout callout-${name}">
                      <p class="callout-title">
                        ${info || defaultTitle}
                      </p>\n`;
					} else {
						// Closing tag
						return '</div>\n';
					}
				},
			},
		];
	};

	md.use(...createContainer('info', 'Info'))
		.use(...createContainer('success', 'Success'))
		.use(...createContainer('warning', 'Warning'))
		.use(...createContainer('danger', 'Danger'))
		.use(...createContainer('spoiler', 'Spoiler'));
}
