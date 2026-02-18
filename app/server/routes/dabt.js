import { getWorkPage } from "#server/lib/work-page.js";

export const dabtRoute = {
	/** @type {RouteMethod} */
	async GET({ id }) {
		return { page: await getWorkPage("dabt", id, "Современная бытовая сказка о деде Андрее и бабке Тане") };
	},
};
