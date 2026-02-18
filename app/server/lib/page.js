import { BASE_URL, PROJECT_TITLE, version } from "#common/constants.js";
import { renderLayout } from "#common/templates/layout.js";
import { renderDocumentTitle } from "#common/templates/title.js";
import { isDev } from "#server/constants.js";
import { renderAmpAssets } from "#server/lib/amp.js";
import { hyphenateRu } from "#server/lib/hyphenate.js";

function renderAssets() {
	const bundles = isDev
		? /* html */ `
			<link rel="stylesheet" href="/client/css/critical.css">
			<script src="/client/entries/dev.js" type="module"></script>
		`
		: /* html */ `
			<link rel="stylesheet" href="/bundles/critical.css?v${version.CSS}">
		`;

	return /* html */ `
		${bundles}
		<link rel="preload" href="/fonts/georgia-normal-400.woff2" as="font" crossorigin>
		<link rel="preload" href="/fonts/georgia-italic-400.woff2" as="font" crossorigin>
		<link rel="preload" href="/fonts/verdana-normal-400.woff2" as="font" crossorigin>
		<link rel="preload" href="/fonts/verdana-italic-400.woff2" as="font" crossorigin>
	`;
}

function renderUrlMeta(pathname = "", isAmp = false) {
	if (pathname === "/404.html") {
		return "";
	}

	const page = pathname === "/" ? "/" : `${pathname}/`;
	const ampTemplate = isAmp ? "" : /* html */ `<link rel="ampurl" href="${BASE_URL}/amp${page}">`;

	return /* html */ `
		${ampTemplate}
		<link rel="canonical" href="${BASE_URL}${page}">
		<meta property="og:url" content="${page}">
	`;
}

/** @type {(data: LayoutData) => Promise<string>} */
export async function renderPage({
	description,
	heading = "",
	headTemplate = "",
	isAmp = false,
	pageTemplate = "",
	pathname = "",
}) {
	const ampPrefix = isAmp ? "/amp" : "";
	const title = renderDocumentTitle(heading);
	const assetsTemplate = isAmp ? await renderAmpAssets() : renderAssets();
	const hyphenatedPageTemplate = await hyphenateRu(pageTemplate);

	return /* html */ `
		<!DOCTYPE html>
		<html lang="ru" prefix="og: http://ogp.me/ns#" ${isAmp ? "⚡" : ""}>
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="apple-mobile-web-app-title" content="Андрей Раскатов">
			<meta name="apple-mobile-web-app-capable" content="yes">
			<meta name="mobile-web-app-capable" content="yes">

			<title>${title}</title>
			<meta name="description" content="${description}">
			${renderUrlMeta(pathname, isAmp)}
			<meta property="og:title" content="${title}">
			<meta property="og:description" content="${description}">
			<meta property="og:locale" content="ru_RU">
			<meta property="og:type" content="website">
			<meta property="og:site_name" content="${PROJECT_TITLE}">
			<meta property="og:image" content="${ampPrefix}/web-app-manifest-512x512.png">
			<meta property="og:image:width" content="512">
			<meta property="og:image:height" content="512">

			${assetsTemplate}

			<link rel="icon" type="image/png" href="${ampPrefix}/favicon-96x96.png" sizes="96x96">
			<link rel="icon" type="image/svg+xml" href="${ampPrefix}/favicon.svg">
			<link rel="shortcut icon" href="${ampPrefix}/favicon.ico">
			<link rel="apple-touch-icon" sizes="180x180" href="${ampPrefix}/apple-touch-icon.png">
			<link rel="manifest" href="${ampPrefix}/site.webmanifest">

			${headTemplate}
		</head>

		${renderLayout({ heading, isAmp, isDev, pageTemplate: hyphenatedPageTemplate, pathname })}

		</html>
	`;
}
