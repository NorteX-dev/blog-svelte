<script lang="ts">
	import type { PageData } from "./$types";
	import { marked } from "marked";

	export let data: PageData;
</script>

{#if data.user}
	<main class="flex flex-col gap-4">
		{#if data.posts}
			{#each data.posts as post}
				<a href="/{post.id}">
					<article class="rounded-lg border border-neutral-700 bg-neutral-900 p-8">
						<h1 class="text-3xl">{post.title}</h1>
						<p class="mt-2 line-clamp-1 text-sm text-neutral-300">
							@{post.user.username} • {new Intl.DateTimeFormat("en-US").format(post.createdAt)}
						</p>
						<p class="mt-2 line-clamp-1 overflow-hidden whitespace-nowrap text-xs text-neutral-300">{@html marked(post.body)}</p>
					</article>
				</a>
			{/each}
		{/if}
	</main>
{:else}
	<p>You aren't logged in.</p>
	<p><a class="text-blue-400" href="/login">Log in</a> to start reading!</p>
{/if}
