declare global {
	type Book = "dabt" | "mad";

	type DataItem = {
		date?: string;
		title: string;
	};

	type LayoutData = {
		description: string;
		heading: string;
		headTemplate?: string;
		isAmp?: boolean;
		isDev?: boolean;
		pageTemplate?: string;
		pathname?: string;
	};
}

export {};
