<script lang="ts">
	import type { PageData } from "./$types";
	import { TrashIcon, XIcon } from "lucide-svelte";

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

<div class="mt-4 w-full overflow-x-auto">
	<div class="min-w-[700px] rounded-xl border border-neutral-700 bg-neutral-900 shadow-sm">
		<div class="border-b border-neutral-700 px-6 py-4">
			<h2 class="text-xl font-semibold text-neutral-200">Posts</h2>
		</div>
		<table class="min-w-full divide-y divide-neutral-700">
			<thead class="bg-neutral-800">
				<tr>
					<th scope="col" class="whitespace-nowrap px-6 py-3 text-left">
						<span class="text-xs font-semibold uppercase tracking-wide text-neutral-200"> # </span>
					</th>
					<th scope="col" class="whitespace-nowrap px-6 py-3 text-left">
						<span class="text-xs font-semibold uppercase tracking-wide text-neutral-200"> Title </span>
					</th>
					<th scope="col" class="whitespace-nowrap px-6 py-3 text-left">
						<span class="text-xs font-semibold uppercase tracking-wide text-neutral-200"> Author </span>
					</th>
					<th scope="col" class="whitespace-nowrap px-6 py-3 text-left">
						<span class="text-xs font-semibold uppercase tracking-wide text-neutral-200"> Date </span>
					</th>
					<th scope="col" class="whitespace-nowrap px-6 py-3 text-right">
						<span class="text-xs font-semibold uppercase tracking-wide text-neutral-200"> Actions </span>
					</th>
				</tr>
			</thead>
			<tbody class="bottom-b borber-b-neutral-700">
				{#each data.posts as post, idx}
					<tr>
						<td class="whitespace-nowrap px-6 py-3">
							<span class="text-sm text-neutral-200">{idx + 1}</span>
						</td>
						<td class="whitespace-nowrap px-6 py-3">
							<span class="text-sm text-neutral-200">{post.title}</span>
						</td>
						<td class="whitespace-nowrap px-6 py-3">
							<span class="text-sm text-neutral-200">{post.user?.username ?? post.userId}</span>
						</td>
						<td class="whitespace-nowrap px-6 py-3">
							<span class="text-sm text-neutral-200">{new Intl.DateTimeFormat("en-US").format(post.createdAt)}</span>
						</td>
						<td class="flex justify-end whitespace-nowrap px-6 py-3">
							<button class="aspect-square rounded bg-red-500 p-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-20" disabled>
								<TrashIcon size="14" />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
