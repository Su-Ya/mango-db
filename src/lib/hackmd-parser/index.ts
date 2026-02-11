
import { markPlugin } from './hackmd-highlight';
import { calloutPlugin } from './hackmd-callout';

export const hackmdParser = {
	highlight: markPlugin,
	callout: calloutPlugin,
};
