import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(302, "/dashboard");
	}
};
export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirmPassword");

		let bouncebackFields = {
			username,
			email
		};

		const userRegisterDto = z.object({
			username: z.string().min(1, { message: "Username is required" }),
			email: z.string().email().min(1, { message: "Email is required" }),
			password: z.string().min(4, { message: "Password should be at least 4 characters" }),
			confirmPassword: z.string().min(4, { message: "Password should be at least 4 characters" })
		});

		const dtoParsingResult = userRegisterDto.safeParse({
			username,
			email,
			password,
			confirmPassword
		});

		if (!dtoParsingResult.success) {
			let usernameIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "username");
			let emailIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "email");
			let passwordIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "password");
			let confirmPasswordIssue = dtoParsingResult.error.errors.find((e) => e.path[0] === "confirmPassword");

			return fail(400, {
				errors: {
					username: usernameIssue?.message,
					email: emailIssue?.message,
					password: passwordIssue?.message,
					confirmPassword: confirmPasswordIssue?.message
				},
				fields: bouncebackFields
			});
		}

		const existingUser = await prisma.user.findUnique({
			where: { email: dtoParsingResult.data.email }
		});

		if (existingUser) {
			return fail(400, {
				errors: {
					email: "Email is already in use",
					username: null,
					password: null,
					confirmPassword: null
				},
				fields: bouncebackFields
			});
		}

		const hashedPassword = await bcrypt.hash(dtoParsingResult.data.password, 10);

		const newUser = await prisma.user.create({
			data: {
				username: dtoParsingResult.data.username,
				email: dtoParsingResult.data.email,
				hashedPassword
			}
		});

		// Create session for newly registered user so they don't have to log in
		const session = await lucia.createSession(newUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, `/?m=${encodeURIComponent("Successfully registered. Welcome!")}`);
	}
};
