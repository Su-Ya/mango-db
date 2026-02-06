import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import container from 'markdown-it-container';

// Custom plugin for HackMD-style callouts (:::info, :::danger, etc.)
// Reference: daily-oops/callout.js concept
function hackmdCalloutPlugin(md: MarkdownIt) {
	const ALERT_TYPES = ['info', 'success', 'warning', 'danger', 'spoiler'];

	ALERT_TYPES.forEach(type => {
		md.use(container, type, {
			render: function (tokens: any[], idx: number) {
				// tokens[idx] is the opening token ':::type'
				// tokens[idx].info is the text after ::: (e.g., ':::info Title')

				const token = tokens[idx];
				if (token.nesting === 1) {
					// Opening tag
					const title = token.info.trim().slice(type.length).trim();
					let icon = '💡'; // Default icon

					if (type === 'success') icon = '✅';
					if (type === 'warning') icon = '⚠️';
					if (type === 'danger') icon = '🚨';
					if (type === 'spoiler') icon = '🤫';

					return `<div class="callout callout-${type} my-4 rounded-md border-l-4 p-4" data-type="${type}">
                    <div class="callout-title font-bold flex items-center gap-2">
                       <span class="callout-icon">${icon}</span>
                       <span>${title || type.toUpperCase()}</span>
                    </div>
                    <div class="callout-content mt-2">`;
				} else {
					// Closing tag
					return '</div></div>\n';
				}
			}
		});
	});
}

const md = new MarkdownIt({
	html: true,       // Enable HTML tags in source
	linkify: true,    // Autoconvert URL-like text to links
	typographer: true // Enable some language-neutral replacement + quotes beautification
});

// Use plugins
md.use(anchor, {
	permalink: anchor.permalink.headerLink()
});
md.use(hackmdCalloutPlugin);

export async function processMarkdown(content: string): Promise<string> {
	// Use gray-matter to strip frontmatter before rendering? 
	// No, processMarkdown receives 'content' which usually implies raw markdown.
	// BUT the 'content' field in Article interface comes from gray-matter's 'content', which ALREADY stripped frontmatter.
	// So we just render it.

	return md.render(content);
}
