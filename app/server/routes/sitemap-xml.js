import { BASE_URL } from "#common/constants.js";
import { WORK_PAGES } from "#server/data/pages.js";

/** @type {(page: string) => string} */
function renderPage(page) {
	return /* xml */ `<url><loc>${BASE_URL}${page}/</loc></url>`;
}

export const sitemapXmlRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			contentType: "application/xml",
			template: /* xml */ `<?xml version="1.0" encoding="UTF-8" ?>
				<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
					<url><loc>${BASE_URL}/</loc></url>
					${WORK_PAGES.map(renderPage).join("")}
				</urlset>`,
		};
	},
};
