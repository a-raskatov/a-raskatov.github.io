declare global {
	type ErrorCause = {
		/** HTTP статус (если применимо) */
		status?: number;
	};

	interface Error {
		cause?: unknown;
	}

	type LogLevel = 'error' | 'info' | 'warn';
}

export {};
