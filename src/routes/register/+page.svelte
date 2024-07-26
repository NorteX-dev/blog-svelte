<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1 class="mb-4 text-center text-3xl font-bold">Sign up</h1>
<a href="/login"><p class="text-center text-sm text-neutral-400">Already registered? <span class="text-blue-400">Log in instead</span></p></a>
<form method="post" use:enhance class="flex flex-col">
	<label for="username" class="mb-2 block text-sm text-white">Username</label>
	<div class="relative">
		<input
			type="text"
			id="username"
			name="username"
			class="mb-2 block w-full rounded-lg border-neutral-700 bg-gray-900 px-4 py-3 text-sm text-neutral-400 placeholder-neutral-500"
			value={form?.fields?.username ?? ""}
		/>
	</div>
	{#if form?.errors?.username}
		<p class="mb-2 text-xs text-red-400">
			{form.errors.username}
		</p>
	{/if}

	<label for="email" class="mb-2 block text-sm text-white">Email</label>
	<div class="relative">
		<input
			type="text"
			id="email"
			name="email"
			class="mb-2 block w-full rounded-lg border-neutral-700 bg-gray-900 px-4 py-3 text-sm text-neutral-400 placeholder-neutral-500"
			value={form?.fields?.email ?? ""}
		/>
	</div>
	{#if form?.errors?.email}
		<p class="mb-2 text-xs text-red-400">
			{form.errors.email}
		</p>
	{/if}

	<label for="password" class="mb-2 block text-sm dark:text-white">Password</label>
	<div class="relative">
		<input
			type="password"
			id="password"
			name="password"
			class="mb-2 block w-full rounded-lg border-neutral-700 bg-gray-900 px-4 py-3 text-sm text-neutral-400 placeholder-neutral-500"
		/>
	</div>
	{#if form?.errors?.password}
		<p class="mb-2 text-xs text-red-400">
			{form.errors.password}
		</p>
	{/if}

	<label for="confirmPassword" class="mb-2 block text-sm dark:text-white">Confirm Password</label>
	<div class="relative">
		<input
			type="password"
			id="confirmPassword"
			name="confirmPassword"
			class="mb-2 block w-full rounded-lg border-neutral-700 bg-gray-900 px-4 py-3 text-sm text-neutral-400 placeholder-neutral-500"
		/>
	</div>
	{#if form?.errors?.confirmPassword}
		<p class="mb-2 text-xs text-red-400">
			{form.errors.confirmPassword}
		</p>
	{/if}

	<button class="mt-4 w-full rounded bg-blue-500 px-6 py-2 text-sm font-medium text-white" type="submit">Sign up</button>
</form>
