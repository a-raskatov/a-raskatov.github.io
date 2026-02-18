declare global {
	import type { IncomingMessage, ServerResponse } from "node:http";

	type Route = {
		[method: IncomingMessage["method"]]: RouteMethod;
	};

	type RouteData = {
		statusCode?: number;
		contentType?: string;
		page?: LayoutData;
		template?: string;
	};

	type RouteMethod = (params: RouteParams) => Promise<RouteData>;

	type RouteParams = {
		id: number;
		isAmp: boolean;
		req: RouteRequest;
		res: RouteResponse;
	};

	type RouteRequest = IncomingMessage;

	type RouteResponse = ServerResponse<IncomingMessage> & { req: IncomingMessage };

	type ServerMiddleware = (req: IncomingMessage, res: RouteResponse, next?: ServerMiddleware) => Promise<void>;
}

export {};
