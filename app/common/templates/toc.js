function renderItem(title = "", url = "") {
	return /* html */ `
		<li class="toc__item">
			<a class="toc__link" href="${url}/">
				<span class="toc__content">${title}</span>
			</a>
		</li>
	`;
}
/** @type {(items: DataItem[], book: Book, isAmp?: boolean) => string} */
export function renderToc(items, book, isAmp = false) {
	const template = items.map(({ title }, i) => renderItem(title, `${isAmp ? "/amp" : ""}/${book}/${i + 1}`)).join("");

	return /* html */ `<ol class="toc">${template}</ol>`;
}
