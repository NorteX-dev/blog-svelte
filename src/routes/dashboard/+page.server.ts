import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}
	if (locals.user.admin) {
		let stats = {
			postCount: await prisma.post.count(),
			userCount: await prisma.user.count(),
			totalViews: await prisma.post.aggregate({ _sum: { views: true } }).then((res) => res._sum.views)
		};
		const allPosts = await prisma.post.findMany({
			orderBy: { createdAt: "desc" },
			include: { user: true }
		});
		return { user: locals.user, stats, posts: allPosts };
	}
	const posts = await prisma.post.findMany({
		orderBy: { createdAt: "desc" },
		include: { user: true },
		where: { userId: locals.user.id }
	});
	return { user: locals.user, posts };
};
