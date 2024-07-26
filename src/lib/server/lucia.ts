import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { prisma } from "$lib/server/prisma";
import { dev } from "$app/environment";
import { Discord } from "arctic";
import { DISCORD_OAUTH2_CLIENT_ID, DISCORD_OAUTH2_CLIENT_SECRET, PRODUCTION_URL } from "$env/static/private";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const discordAdapter = new Discord(
	DISCORD_OAUTH2_CLIENT_ID,
	DISCORD_OAUTH2_CLIENT_SECRET,
	(dev ? "http://localhost:5173" : PRODUCTION_URL) + "/login/discord/callback"
);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			email: attributes.email,
			admin: attributes.admin
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
	email: string;
	admin: boolean;
}
