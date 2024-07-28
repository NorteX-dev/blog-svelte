import type { RequestHandler } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	const post = await prisma.post.findUnique({
		where: { id },
		include: { user: true }
	});

	return makeJsonResponse({ post });
};

export const PUT: RequestHandler = async ({ request, params }) => {
	const { id } = params;
	const { title, body } = await request.json();

	const postDto = z.object({
		title: z.string().min(1),
		imageBase64: z.string().optional(),
		body: z.string().min(1)
	});
	const result = postDto.safeParse({ title, body });
	if (!result.success) return makeJsonResponse({ error: result.error }, 400);

	const post = await prisma.post.update({
		where: { id },
		data: { title, body, image: result.data.imageBase64 ?? undefined }
	});

	return makeJsonResponse({ post }, 201);
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const { id } = params;

	const post = await prisma.post.findUnique({
		where: { id },
		select: { userId: true }
	});

	if (!post) return makeJsonResponse({ error: "Post not found" }, 404);

	if (post.userId !== locals.user!.id) return makeJsonResponse({ error: "Unauthorized" }, 401);

	await prisma.post.delete({ where: { id } });

	return makeJsonResponse({ success: true });
};
