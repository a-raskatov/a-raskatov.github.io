export const BASE_URL = "https://a-raskatov.github.io";

export const PROJECT_TITLE = "Стихотворения Андрея Раскатова";

export const PROJECT_DESCRIPTION = "Стихотворения молодого российского поэта эпохи нулевых.";

/** @type {Record<string, string>} */
export const STATIC_MIME_TYPES = {
	".css": "text/css; charset=utf-8",
	".html": "text/html; charset=utf-8",
	".ico": "image/x-icon",
	".js": "application/javascript; charset=utf-8",
	".png": "image/png",
	".svg": "image/svg+xml; charset=utf-8",
	".txt": "plain/text; charset=utf-8",
	".webmanifest": "application/json; charset=utf-8",
	".webp": "image/webp",
	".woff2": "font/woff2",
};

/** @type {Set<string>} */
export const staticExtensions = new Set(Object.keys(STATIC_MIME_TYPES));
