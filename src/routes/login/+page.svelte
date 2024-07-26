<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1 class="mb-4 text-center text-3xl font-bold">Welcome back!</h1>
<a href="/register"><p class="text-center text-sm text-neutral-400">Not a user yet? <span class="text-blue-400">Register</span></p></a>
<form method="post" class="flex flex-col" use:enhance>
	<label for="username" class="mb-2 block text-sm dark:text-white">Username</label>
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

	<button class="mt-4 w-full rounded bg-blue-500 px-6 py-2 text-sm font-medium text-white" type="submit"> Log in </button>
</form>
