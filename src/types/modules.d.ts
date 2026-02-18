declare module "hyphen/ru/index.js" {
	export type HyphenateOptions = {
		exceptions?: string[];
		hyphenChar?: string;
		minWordLength?: number;
		html?: boolean;
	};

	export type Hyphenator = (text: string, options?: HyphenateOptions) => Promise<string>;

	export const hyphenate: Hyphenator;
}
