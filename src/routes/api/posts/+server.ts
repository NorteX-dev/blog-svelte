import { type RequestHandler } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";

export const GET: RequestHandler = async ({ url }) => {
	const reverse = url.searchParams.get("reverse") === "true";

	const posts = await prisma.post.findMany({ orderBy: { createdAt: reverse ? "asc" : "desc" }, include: { user: true } });

	return makeJsonResponse({ posts });
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const { title, imageBase64, body } = await request.json();

	const postDto = z.object({
		title: z.string().min(1),
		imageBase64: z.string().optional(),
		body: z.string().min(1)
	});
	const result = postDto.safeParse({ title, body });
	if (!result.success) return makeJsonResponse({ error: result.error }, 400);

	const post = await prisma.post.create({
		data: {
			title: title,
			body: body,
			image: imageBase64,
			userId: locals.user!.id
		}
	});

	return makeJsonResponse({ post }, 201);
};
