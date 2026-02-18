import { createServer } from "node:http";
import { log } from "#common/lib/log.js";
import { host, port } from "#server/constants.js";
import { renderPage } from "#server/lib/page.js";
import { routes } from "#server/routes/index.js";

/** @type {(error: unknown, url: URL) => Promise<{ template: string }>} */
async function handleError(error, { href, pathname }) {
	let message = "На сервере произошла ошибка.";
	let statusCode = 500;
	if (error instanceof Error) {
		if (typeof error.cause === "number") {
			statusCode = error.cause;
		}
		({ message } = error);
	}

	if (!pathname?.startsWith("/__")) {
		log.error(`❌ [HTTP ERROR ${statusCode} | ${href}]`, error);
	}

	const template = await renderPage({
		description: "Страница ошибок.",
		heading: `Error ${statusCode}`,
		pageTemplate: /* HTML */ `<p class="_separated-lg">${message}.</p>`,
		pathname,
	});

	return { template };
}

/** @type {ServerMiddleware} */
async function next(req, res) {
	const url = new URL(`${host}${req.url}`);
	const isAmp = url.pathname === "/amp" || url.pathname.startsWith("/amp/");
	const pathname = url.pathname === "/amp" ? "/" : url.pathname.replace(/^\/amp\//, "/");
	const [, routeName = "", rawId] = pathname.split("/");
	const id = Number(rawId);

	const routeKey = Number.isNaN(id) ? pathname : `/${routeName}/:id`;
	const route = routes[routeKey];

	let contentType = "text/html; charset=utf-8";
	let template = "";

	try {
		if (!route?.GET) {
			throw Error("Страница не найдена", { cause: 404 });
		}

		const routeData = await route.GET({ id, isAmp, req, res });
		({ contentType = "text/html; charset=utf-8", template = "" } = routeData);

		if (routeData.page) {
			template = await renderPage({ ...routeData.page, isAmp, pathname });
		}
	} catch (error) {
		({ template } = await handleError(error, url));
	}

	res.setHeader("Content-Type", contentType);
	res.end(template);
}

/** @type {(middleware?: ServerMiddleware) => import("node:http").Server} */
export function createApp(middleware) {
	const server = createServer((req, res) => {
		if (middleware) {
			middleware(req, res, next);
		} else {
			next(req, res);
		}
	});

	server.listen(port, "localhost", () => {
		log.info(`✅ Сервер запущен по адресу: ${host}`);
	});

	return server;
}

/** @type {(server?: import("node:http").Server) => Promise<void>} */
export async function closeApp(server) {
	try {
		if (server) {
			await new Promise((resolve, reject) => {
				server.close((err) => (err ? reject(err) : resolve("")));
			});
		}
	} catch (error) {
		log.error("❌ [CLOSING ERROR]", error);
	}
}
