import { AUTHOR, BASE_URL, BOOKS, PUB_DATE, WORK_DATA } from "#common/constants.js";

/** @type {Book[]} */
const books = ["dabt", "mad"];

const authorId = `${BASE_URL}/#author`;
const siteId = `${BASE_URL}/#website`;

const author = {
	"@id": authorId,
	"@type": "Person",
	name: AUTHOR,
	url: `${BASE_URL}/`,
	worksFor: { "@id": siteId },
};

const graph = {
	"@graph": [
		{
			"@id": siteId,
			"@type": "WebSite",
			inLanguage: "ru",
			name: "Произведения Андрея Раскатова",
			publisher: { "@id": authorId },
			url: `${BASE_URL}/`,
		},
		{
			"@id": `${BASE_URL}/#webpage`,
			"@type": "WebPage",
			about: { "@id": authorId },
			inLanguage: "ru",
			isPartOf: { "@id": siteId },
			name: "Андрей Раскатов | Произведения Андрея Раскатова",
			url: `${BASE_URL}/`,
		},
		author,
		...books.map((book) => {
			const id = `${BASE_URL}/#${book}`;
			return {
				"@id": id,
				"@type": "CreativeWorkSeries",
				author: { "@id": authorId },
				name: BOOKS[book],
				url: id,
			};
		}),
	],
};

/** @type {(book?: Book, id?: number) => string} */
export function renderSchema(book, id) {
	const schema = { "@context": "https://schema.org" };

	if (!book || !id) {
		Object.assign(schema, graph);
		return /* html */ `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
	}

	const { date, title } = WORK_DATA[book][id - 1];
	const bookId = `${BASE_URL}/#${book}`;
	const copyrightYear = date.slice(0, 4);
	const datePublished = PUB_DATE.slice(0, 10);
	const url = `${BASE_URL}/${book}/${id}/`;

	Object.assign(schema, {
		"@id": `${url}#work`,
		"@type": "CreativeWork",
		author,
		copyrightHolder: {
			"@type": "Person",
			name: AUTHOR,
		},
		copyrightYear,
		datePublished,
		headline: title,
		inLanguage: "ru",
		isPartOf: {
			"@id": bookId,
			"@type": "CreativeWorkSeries",
			name: BOOKS[book],
			url: bookId,
		},
		mainEntityOfPage: {
			"@id": url,
			"@type": "WebPage",
		},
		name: title,
		url,
	});

	return /* html */ `
		<meta property="og:type" content="article">
		<meta property="article:author" content="${authorId}">
		<meta property="article:publisher" content="${authorId}">
		<meta property="article:published_time" content="${datePublished}">
		<meta name="copyright" content="© ${AUTHOR}, ${copyrightYear}">
		<script type="application/ld+json">${JSON.stringify(schema)}</script>
	`;
}
