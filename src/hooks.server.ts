import { lucia } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";

export const handle: Handle = async ({ event, resolve }) => {
	if (event.route.id?.startsWith("/api")) {
		// Handle Rest API auth
		const auth = event.request.headers.get("Authorization");
		if (!auth) {
			return makeJsonResponse({ error: "Authorization header required" }, 401);
		}
		const sessionId = lucia.readBearerToken(auth);
		if (!sessionId) {
			return makeJsonResponse({ error: "Invalid Authorization header format" }, 401);
		}
		const { session, user } = await lucia.validateSession(sessionId);

		if (!session) {
			return makeJsonResponse({ error: "Invalid session" }, 401);
		}

		if (!user) {
			return makeJsonResponse({ error: "Invalid user" }, 401);
		}

		event.locals.user = user;
		return resolve(event);
	}

	// Handle normal, cookie based auth
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, { path: ".", ...sessionCookie.attributes });
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, { path: ".", ...sessionCookie.attributes });
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
