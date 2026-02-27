import { readFile } from "node:fs/promises";
import { BOOKS, WORK_DATA } from "#common/constants.js";
import { renderSchema } from "#common/templates/schema.js";
import { cwd } from "#server/constants.js";

/** @type {Record<string, string>} */
const cache = {};

/** @type {(book: Book, id: number, description: string) => Promise<LayoutData>} */
export async function getWorkPage(book, id, description) {
	const key = `${book}/${id}`;
	if (!cache[key]) {
		cache[key] = await readFile(`${cwd}/app/server/data/${key}.html`, "utf-8");
	}
	const { title, date } = WORK_DATA[book][id - 1];
	const [year, month, day] = date.split("-");

	return {
		description: `${description} «${title}».`,
		heading: BOOKS[book],
		headTemplate: renderSchema(book, id),
		pageTemplate: /* html */ `
			<h2>${title}</h2>
			<div class="content content--${book === "mad" ? "poem" : "prose"}">
				${cache[key]}
				<time class="_separated" datetime="${date}">${day}.${month}.${year}</time>
			</div>
			<p class="copyright">© Андрей Раскатов, ${year}</p>
		`,
	};
}
