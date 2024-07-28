<script lang="ts">
	import type { PageData } from "./$types";
	import { marked } from "marked";

	let estimatedReadTime = 0;

	export let data: PageData;

	//					   ceil(     wordCount                        / 200);
	$: estimatedReadTime = Math.ceil(data.post.body.split(" ").length / 200);

	const imageUrl = `data:image/jpeg;base64,${data.post.image}`;
</script>

<p class="line-clamp-1 text-sm text-neutral-400">
	@{data.post.user.username} • {new Intl.DateTimeFormat("en-US").format(data.post.createdAt)}
</p>
<h1 class="poppins text-4xl font-light">{data.post.title}</h1>
<p class="line-clamp-1 text-sm text-neutral-400">
	~ {estimatedReadTime} minute read
</p>
{#if data.post.image}
	<div class="relative mt-4">
		<img src={imageUrl} alt="Post Cover" class="h-64 w-full rounded-xl object-cover" />
		<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black via-transparent p-4" />
	</div>
{/if}
<hr class="mt-8 border-neutral-700" />
<div class="prose prose-invert mt-8 xl:prose-xl">
	{@html marked(data.post.body)}
</div>
