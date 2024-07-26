import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	// /dashboard/posts is an intermediate route, so if the user happens to navigate to it, redirect them to the dashboard
	redirect(302, `/dashboard?m=${encodeURIComponent("Page not found.")}`);
};
