import { HEADINGS } from "#common/constants.js";
import { WORK_DATA } from "#server/data/pages.js";

/** @type {(payload: { ampPrefix?: string; pathname?: string; }) => string} */
export function renderNavRing({ ampPrefix = "", pathname = "" }) {
	const [, book, rawId] = /** @type {[void, Book, string]} */ (pathname.split("/"));
	const id = Number(rawId);
	let next = "/mad/1";
	let prev = "/dabt/3";
	let hash = "";

	if (HEADINGS[book]) {
		/** @type {Book} */
		const anotherBook = book === "mad" ? "dabt" : "mad";

		next = id === WORK_DATA[book].length ? `/${anotherBook}/1` : `/${book}/${id + 1}`;
		prev = id === 1 ? `/${anotherBook}/${WORK_DATA[anotherBook].length}` : `/${book}/${id - 1}`;
		hash = `#${book}`;
	}

	const mainToc = ampPrefix
		? /* html */ `
				<li>
					<a class="nav-ring__link nav-ring__link--toc" rel="toc" href="/">
						<span class="nav-ring__toc-text">Книга</span>
					</a>
				</li>
			`
		: "";

	return /* html */ `
		<ul class="nav-ring">
			<li>
				<a class="nav-ring__link nav-ring__link--prev" rel="prev" href="${ampPrefix}${prev}/">
					<span class="nav-ring__text">Назад</span>
				</a>
			</li>
			${
				pathname === "/"
					? mainToc
					: /* html */ `
						<li>
							<a class="nav-ring__link nav-ring__link--toc" rel="toc" href="${ampPrefix}/${hash}">
								<span class="nav-ring__toc-text">Содержание</span>
							</a>
						</li>
					`
			}
			<li>
				<a class="nav-ring__link nav-ring__link--next" rel="next" href="${ampPrefix}${next}/">
					<span class="nav-ring__text">Далее</span>
				</a>
			</li>
		</ul>
	`;
}
