import { ORDER_TEMPLATE } from "#common/templates/order.js";

export const notFoundRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				description: "Страница ошибок.",
				heading: "Ошибка 404",
				pageTemplate: /* html */ `
					<section class="content content--centered">
						<h2>Страница не найдена</h2>
						<p>
							Свяжитесь с <a class="text-link" href="mailto:efiand@ya.ru?subject=efiand">разработчиком</a>.
						</p>
					</section>
					${ORDER_TEMPLATE}
				`,
			},
		};
	},
};
