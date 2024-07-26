import type { RequestHandler } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";

export const GET: RequestHandler = async () => {
	const posts = await prisma.post.findMany();

	return makeJsonResponse({ posts });
};

export const POST: RequestHandler = async ({ request }) => {
	const { title, body } = await request.json();

	const postDto = z.object({
		title: z.string().min(1),
		body: z.string().min(1)
	});
	const result = postDto.safeParse({ title, body });
	if (!result.success) return makeJsonResponse({ error: result.error }, 400);

	const post = await prisma.post.create({
		data: {
			title: title,
			body: body,
			userId: "1"
		}
	});

	return makeJsonResponse({ post }, 201);
};
