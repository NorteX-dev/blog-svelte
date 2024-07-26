import { redirect, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const GET: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}

	let existingPost = await prisma.post.findUnique({
		where: { id: (params as any).id }
	});

	if (!existingPost) {
		redirect(302, "/dashboard");
	}

	// if not owner of this post           and not admin
	if (locals.user.id !== existingPost.id && !locals.user.admin) {
		redirect(302, "/dashboard");
	}

	let { id } = params;

	await prisma.post
		.delete({
			where: { id }
		})
		.catch(() => null);

	redirect(302, "/dashboard");
};
