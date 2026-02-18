import { access, mkdir, writeFile } from "node:fs/promises";
import { AMP_PAGES, STATIC_PAGES } from "#common/constants.js";
import { minifySitemap } from "#common/lib/minify-sitemap.js";
import { host } from "#server/constants.js";
import { closeApp, createApp } from "#server/lib/app.js";
import { minifyHtml } from "#server/lib/minify-html.js";

const server = createApp();
let completedPages = 0;

try {
	await Promise.all(
		[...STATIC_PAGES, ...AMP_PAGES, "/sitemap.xml"].map(async (url) => {
			const markup = await fetch(`${host}${url}`).then((res) => res.text());
			const dir = `./public${url}`;

			if (url === "/") {
				await writeFile("./public/index.html", await minifyHtml(markup));
			} else if (url === "/404.html") {
				await writeFile(dir, await minifyHtml(markup));
			} else if (url === "/sitemap.xml") {
				await writeFile(`./public${url}`, minifySitemap(markup));
			} else {
				try {
					await access(dir);
				} catch {
					await mkdir(dir, { recursive: true });
				}
				await writeFile(`${dir}/index.html`, await minifyHtml(markup));
			}

			console.info(`Страница ${url} сгенерирована.`);
			completedPages++;
		}),
	);
	console.info(`✅ Всего сгенерировано страниц: ${completedPages}`);
} finally {
	await closeApp(server);
}
