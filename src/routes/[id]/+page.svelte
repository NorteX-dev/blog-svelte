<script lang="ts">
	import type { PageData } from "./$types";
	import { marked } from "marked";

	let estimatedReadTime = 0;

	export let data: PageData;

	//					   ceil(     wordCount                        / 200);
	$: estimatedReadTime = Math.ceil(data.post.body.split(" ").length / 200);
</script>

<p class="line-clamp-1 text-sm text-neutral-400">
	@{data.post.user.username} • {new Intl.DateTimeFormat("en-US").format(data.post.createdAt)}
</p>
<h1 class="poppins mt-4 text-4xl font-light">{data.post.title}</h1>
<p class="line-clamp-1 text-sm text-neutral-400">
	~ {estimatedReadTime} minute read
</p>
<hr class="my-4" />
<div class="prose prose-invert mt-2 xl:prose-xl">
	{@html marked(data.post.body)}
</div>
