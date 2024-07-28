import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, "/login");
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(403, { message: "You are not logged in." });
		}
		const formData = await request.formData();
		const title = formData.get("title") as string | null;
		const image = formData.get("image") as File;
		const body = formData.get("body") as string | null;

		let bouncebackFields = {
			title,
			body
		};

		const imgArrayBuffer = await image.arrayBuffer();
		const imgBuffer = Buffer.from(imgArrayBuffer);

		if (!image || !imgBuffer || image.size === 0) {
			return fail(400, {
				errors: { image: "Image is required", title: null, body: null },
				fields: bouncebackFields
			});
		}

		const postSubmitDto = z.object({
			title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title is too long" }),
			body: z.string().min(1, { message: "Body is required" })
		});
		const dtoParsingResult = postSubmitDto.safeParse({ title, body });
		if (!dtoParsingResult.success) {
			let titleIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "title");
			let bodyIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "body");

			return fail(400, {
				errors: {
					image: null,
					title: titleIssue?.message,
					body: bodyIssue?.message
				},
				fields: bouncebackFields
			});
		}

		await prisma.post.create({
			data: {
				title: dtoParsingResult.data.title,
				body: dtoParsingResult.data.body,
				image: imgBuffer.toString("base64"),
				userId: locals.user.id
			}
		});

		redirect(302, `/dashboard?m=${encodeURIComponent("Post created successfully.")}`);
	}
};
