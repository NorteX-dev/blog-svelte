<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
	import type { ActionData } from "./$types";

	export let data: PageData;
	export let form: ActionData;
</script>

<h1 class="mb-4 text-xl">Edit "{data.post.title}"</h1>
<form method="post" class="flex flex-col" use:enhance>
	{#if form?.message}
		<p class="mb-2 text-xs text-red-400">
			{form.message}
		</p>
	{/if}
	<label for="title" class="mb-2 block text-sm dark:text-white">Title</label>
	<div class="relative">
		<input
			type="text"
			id="title"
			name="title"
			class="mb-2 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-400 placeholder-neutral-500"
			value={form?.fields?.title ?? data.post.title ?? ""}
		/>
	</div>
	{#if form?.errors?.title}
		<p class="mb-2 text-xs text-red-400">
			{form.errors.title}
		</p>
	{/if}

	<label for="title" class=" block text-sm dark:text-white">Post contents</label>
	<p class="mb-2 text-xs text-neutral-400">Supports markdown</p>
	<div class="relative">
		<textarea
			id="body"
			rows="6"
			name="body"
			class="mb-2 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-400 placeholder-neutral-500"
			>{form?.fields?.body ?? data.post.body ?? ""}</textarea
		>
	</div>
	{#if form?.errors?.body}
		<p class="mb-2 text-xs text-red-400">
			{form.errors.body}
		</p>
	{/if}

	<button class="mt-4 w-full rounded bg-blue-500 px-6 py-2 text-sm font-medium text-white" type="submit"> Save </button>
</form>
