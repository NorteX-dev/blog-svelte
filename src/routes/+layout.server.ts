import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
	let message = url.searchParams.get("m");
	let error = url.searchParams.get("e");
	if (!locals.user) {
		return { user: null };
	}
	return { user: locals.user, message: message, error: error };
};
