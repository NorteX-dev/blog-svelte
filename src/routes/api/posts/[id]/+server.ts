import type { RequestHandler } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	const post = await prisma.post.findUnique({
		where: { id }
	});

	return makeJsonResponse({ post });
};

export const PUT: RequestHandler = async ({ request, params }) => {
	const { id } = params;
	const { title, body } = await request.json();

	const postDto = z.object({
		title: z.string().min(1),
		body: z.string().min(1)
	});
	const result = postDto.safeParse({ title, body });
	if (!result.success) return makeJsonResponse({ error: result.error }, 400);

	const post = await prisma.post.update({
		where: { id },
		data: { title, body }
	});

	return makeJsonResponse({ post }, 201);
};
