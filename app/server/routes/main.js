import { BOOKS, WORK_DATA } from "#common/constants.js";
import { ORDER_TEMPLATE } from "#common/templates/order.js";
import { renderSchema } from "#common/templates/schema.js";
import { renderToc } from "#common/templates/toc.js";

/** @type {Book[]} */
const books = ["mad", "dabt"];

/** @type {(book: Book, isAmp: boolean) => string} */
function renderBookToc(book, isAmp) {
	return /* html */ `<h2 id="${book}">${BOOKS[book]}</h2>${renderToc(WORK_DATA[book], book, isAmp)}`;
}

export const mainRoute = {
	/** @type {RouteMethod} */
	async GET({ isAmp }) {
		return {
			page: {
				description: "Произведения молодого российского литератора эпохи нулевых.",
				heading: "Андрей Раскатов",
				headTemplate: /* html */ `
					<meta property="og:type" content="website">
					<meta name="yandex-verification" content="81c012f87f9f40a8">
					<meta name="google-site-verification" content="5FBzpuD4GpSmOypR46oFjuMdpdTsHJMbNtL_Z6vCXzk">
					${renderSchema()}
				`,
				pageTemplate: /* html */ `
					${books.map((book) => renderBookToc(book, isAmp)).join("")}
					${isAmp ? "" : ORDER_TEMPLATE}
					<p class="copyright">© <a class="text-link" href="https://efiand.ru">efiand</a>, разработка сайта, 2025</p>
				`,
			},
		};
	},
};
