declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DEV?: string;
			PORT: string;
		}
	}
}

export {};
