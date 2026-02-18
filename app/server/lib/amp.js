const APM_ASSETS_TEMPLATE = /* html */ `
	<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
`;

let cssCache = "";

export async function renderAmpAssets() {
	if (!cssCache) {
		cssCache = await (await import("../../../src/server/css.js")).getCss("amp/index.css");
	}

	return /* html */ `
		<style amp-custom>${cssCache}</style>
		${APM_ASSETS_TEMPLATE}
		<link rel="preload" href="/fonts/tt-polls-normal-400.woff2" as="font" crossorigin>
		<link rel="preload" href="/images/back.webp" as="image" type="image/webp" media="(min-width: 928px)">
	`;
}
