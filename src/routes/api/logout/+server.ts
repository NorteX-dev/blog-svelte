import { redirect, type RequestHandler } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";
import { lucia } from "$lib/server/lucia";

export const GET: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.session) {
		return makeJsonResponse({ error: "Not logged in" }, 401);
	}
	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	});
	redirect(302, `/?m=${encodeURIComponent("Logged out.")}`);
};
