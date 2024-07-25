import type { RequestHandler } from "@sveltejs/kit";
import { makeJsonResponse } from "$lib/server/util";
import { prisma } from "$lib/server/prisma";

export const GET: RequestHandler = async () => {
	const posts = await prisma.post.findMany();

	return makeJsonResponse({ posts });
};
