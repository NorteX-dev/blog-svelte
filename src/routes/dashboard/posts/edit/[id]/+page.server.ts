import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "../../../../../../.svelte-kit/types/src/routes/login/$types";
import { z } from "zod";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}

	let { id } = params;
	let post = await prisma.post.findUnique({
		where: { id },
		include: { user: true }
	});

	if (!post) {
		redirect(302, "/dashboard");
	}

	return { user: locals.user, post };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		if (!locals.user) {
			return fail(403, { message: "You are not logged in." });
		}

		let existingPost = await prisma.post.findUnique({
			where: { id: (params as any).id }
		});

		if (!existingPost) {
			return fail(404, { message: "Post not found" });
		}

		// if not owner of this post           and not admin
		if (locals.user.id !== existingPost.id && !locals.user.admin) {
			return fail(403, { message: "You do not have permission to edit this post" });
		}

		const formData = await request.formData();
		const title = formData.get("title");
		const body = formData.get("body");

		let bouncebackFields = {
			title,
			body
		};

		const postEditDto = z.object({
			title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title is too long" }).optional(),
			body: z.string().min(1, { message: "Body is required" }).optional()
		});
		const dtoParsingResult = postEditDto.safeParse({ title, body });
		if (!dtoParsingResult.success) {
			let titleIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "title");
			let bodyIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "body");

			return fail(400, {
				errors: {
					title: titleIssue?.message,
					body: bodyIssue?.message
				},
				fields: bouncebackFields
			});
		}

		await prisma.post.update({
			where: { id: (params as any).id },
			data: {
				title: title as string,
				body: body as string
			}
		});

		redirect(302, `/dashboard?m${encodeURIComponent("Post updated successfully.")}`);
	}
};
