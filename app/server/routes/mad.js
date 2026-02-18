import { getWorkPage } from "#server/lib/work-page.js";

export const madRoute = {
	/** @type {RouteMethod} */
	async GET({ id }) {
		return { page: await getWorkPage("mad", id, "Стихотворение Андрея Раскатова") };
	},
};
