import { AUTHOR } from "#common/constants.js";
import { renderNavRing } from "#common/templates/nav-ring.js";
import { YANDEX_METRIKA_TEMPLATE } from "#common/templates/yandex-metrika.js";

const pagesWithoutAuthor = new Set(["/", "/404.html"]);

/** @type {(data: Omit<LayoutData, 'description'>) => string} */
export function renderLayout({ heading, isAmp, isDev, pathname = "", pageTemplate }) {
	const ampPrefix = isAmp ? "/amp" : "";

	return /* html */ `
		<body>
      ${isDev || isAmp || pathname === "/404.html" ? "" : YANDEX_METRIKA_TEMPLATE}
			<div class="layout">
				<header class="layout__header">
					<a class="layout__logo" href="${ampPrefix}/" aria-label="К содержанию"></a>
					<a class="layout__amp-link" href="/amp${pathname === "/404.html" ? "/" : pathname}">Рукопись</a>
				</header>

				<main class="layout__main">
					<section class="layout__content">
						${isAmp ? "" : /* html */ `<h1>${heading}</h1>`}
						${pagesWithoutAuthor.has(pathname) && !isAmp ? "" : /* html */ `<address class="layout__author">${AUTHOR}</address>`}

						${pageTemplate}
					</section>
				</main>

				<footer class="layout__footer">
					<nav>${renderNavRing({ ampPrefix, pathname })}</nav>
				</footer>
			</div>
		</body>
	`;
}
