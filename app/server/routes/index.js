import { notFoundRoute } from "#server/routes/404.js";
import { dabtRoute } from "#server/routes/dabt.js";
import { madRoute } from "#server/routes/mad.js";
import { mainRoute } from "#server/routes/main.js";
import { sitemapXmlRoute } from "#server/routes/sitemap-xml.js";

/** @type {{ [name: string]: Route }} */
export const routes = {
	"/": mainRoute,
	"/404.html": notFoundRoute,
	"/dabt/:id": dabtRoute,
	"/mad/:id": madRoute,
	"/sitemap.xml": sitemapXmlRoute,
};
