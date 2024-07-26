import { redirect, type RequestHandler } from "@sveltejs/kit";
import { discordAdapter, lucia } from "$lib/server/lucia";
import { prisma } from "$lib/server/prisma";

export const GET: RequestHandler = async ({ cookies, url }) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("discord_state") ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		redirect(302, `/?e=${encodeURIComponent("The code or state is missing! Please try again.")}`);
	}
	try {
		// Exchange code
		const tokens = await discordAdapter.validateAuthorizationCode(code);
		// Download user from discord using newly acquired access token
		const discordUserResponse = await fetch("https://discord.com/api/users/@me", {
			headers: { Authorization: `Bearer ${tokens.accessToken}` }
		});
		const discordUser: DiscordUser = await discordUserResponse.json();

		// Find social account
		const account = await prisma.socialAccount.findFirst({
			where: { providerId: discordUser.id },
			include: { user: true }
		});

		if (account) {
			const session = await lucia.createSession(account.user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		} else {
			const newUser = await prisma.user.create({
				data: {
					username: discordUser.username,
					email: discordUser.email
				}
			});

			await prisma.socialAccount.create({
				data: {
					provider: "discord",
					providerId: discordUser.id,
					userId: newUser.id
				}
			});

			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: { Location: `/?m=${encodeURIComponent("Logged in!")}` }
		});
	} catch (e) {
		console.log(e);
		redirect(302, `/?e=${encodeURIComponent("There was an error logging you in. Please try again.")}`);
	}
};

interface DiscordUser {
	id: string;
	username: string;
	global_name: string;
	email: string;
	avatar: string;
	public_flags: number;
	flags: number;
	banner: string;
	locale: string;
}
