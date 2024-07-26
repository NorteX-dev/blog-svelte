import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "../../../../../.svelte-kit/types/src/routes/login/$types";
import { z } from "zod";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user || !locals.user.admin) {
			return fail(403, {
				message: "You do not have permission to create posts"
			});
		}
		const formData = await request.formData();
		const title = formData.get("title");
		const body = formData.get("body");

		let bouncebackFields = {
			title,
			body
		};

		const userLoginDto = z.object({
			title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title is too long" }),
			body: z.string().min(1, { message: "Body is required" })
		});
		const dtoParsingResult = userLoginDto.safeParse({ title, body });
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

		await prisma.post.create({
			data: {
				title: title as string,
				body: body as string,
				userId: locals.user.id
			}
		});

		redirect(302, "/dashboard");
	}
};
