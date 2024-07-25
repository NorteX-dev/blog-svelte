<script>
	import "../app.css";
</script>

<main class="mx-auto max-w-3xl">
	<nav
		class="mb-4 flex w-full flex-col items-center justify-between py-8 font-bold text-neutral-700 md:flex-row"
	>
		<h1 class="text-2xl">Premier Demo</h1>
		<ul class="flex flex-col gap-8 md:flex-row">
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/posts">Posts</a>
			</li>
		</ul>
		<a href="/login">Login</a>
	</nav>
	<slot></slot>
</main>
