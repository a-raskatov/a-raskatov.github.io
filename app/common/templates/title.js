import { PROJECT_TITLE } from '#common/constants.js';

/** @type {(title?: string, heading?: string) => string} */
export function renderDocumentTitle(title, heading) {
	return [title, heading, PROJECT_TITLE].filter(Boolean).join(' | ');
}
