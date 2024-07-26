import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}
	const { id } = params;

	const post = await prisma.post.findUnique({
		where: {
			id: id
		},
		include: { user: true }
	});

	if (!post) {
		redirect(302, "/");
	}

	return { post };
};
