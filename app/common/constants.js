import { WORK_PAGES } from "#server/data/pages.js";

export const BASE_URL = "https://a-raskatov.github.io";

export const AUTHOR = "Андрей Раскатов";

export const PROJECT_TITLE = "Произведения Андрея Раскатова";

export const YANDEX_METRIKA_ID = 103961970;

export const version = {
	CSS: 2,
};

export const HEADINGS = {
	dabt: "Сказки о деде Андрее и бабке Тане",
	mad: "Стихотворения",
};

/** @type {Record<string, string>} */
export const STATIC_MIME_TYPES = {
	".css": "text/css; charset=utf-8",
	".ico": "image/x-icon",
	".js": "application/javascript; charset=utf-8",
	".png": "image/png",
	".svg": "image/svg+xml; charset=utf-8",
	".txt": "plain/text; charset=utf-8",
	".webmanifest": "application/json; charset=utf-8",
	".webp": "image/webp",
	".woff2": "font/woff2",
};

export const staticExtensions = new Set(Object.keys(STATIC_MIME_TYPES));

export const AMP_PAGES = ["/amp", ...WORK_PAGES.map((page) => `/amp${page}`)];

export const STATIC_PAGES = ["/", "/404.html", ...WORK_PAGES];
