import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}
	let stats = {
		postCount: await prisma.post.count(),
		userCount: await prisma.user.count(),
		totalViews: await prisma.post.aggregate({ _sum: { views: true } }).then((res) => res._sum.views)
	};
	return { user: locals.user, stats };
};
