<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1 class="text-xl">Welcome, {data.user.username}!</h1>

<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="rounded-lg border border-neutral-700 bg-neutral-900 p-6">
		<h1 class="text-lg font-medium">Statistics</h1>
		<p>{data.stats.userCount} registered users</p>
		<p>{data.stats.postCount} posts</p>
		<p>{data.stats.totalViews ?? 0} total views</p>
	</div>
	<div class="flex flex-col justify-between rounded-lg border border-neutral-700 bg-neutral-900 p-6">
		<h1 class="text-lg font-medium">Create post</h1>
		<a class="mt-4 w-full rounded bg-blue-500 px-6 py-2 text-center text-sm font-medium text-white" href="/dashboard/posts/create">
			Go to creator
		</a>
	</div>
</div>
