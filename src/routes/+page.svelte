<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.user}
	<pre>{JSON.stringify(data.user, null, 2)} </pre>
{:else}
	<p>Not logged in</p>
{/if}
