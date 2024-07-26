import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { user: null, posts: null };
	}
	const posts = await prisma.post.findMany({
		orderBy: { createdAt: "desc" },
		include: { user: true }
	});
	return { user: locals.user, posts };
};
