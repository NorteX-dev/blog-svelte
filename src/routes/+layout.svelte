<script>
	import "../app.css";
</script>

<main class="mx-auto max-w-3xl max-md:px-2">
	<nav class="mb-4 flex w-full flex-col items-center justify-between py-8 text-neutral-200 md:flex-row">
		<a href="/" class="flex-grow">
			<h1 class="poppins bg-gradient-to-r from-[#ec6f66] to-[#f3a082] bg-clip-text text-2xl font-bold text-transparent">Premier Demo</h1>
		</a>
		<ul class="flex flex-col text-sm md:flex-row md:gap-4">
			<li>
				<a href="/" class="px-4 py-3 hover:underline">Home</a>
			</li>
			<li>
				<a href="/posts" class="px-4 py-3 hover:underline">Posts</a>
			</li>
			<li>
				<a
					href="/login"
					class="text-md w-fit items-center rounded-lg border border-transparent px-4 py-3 text-sm transition-colors hover:bg-gray-700"
				>
					Login
				</a>
			</li>
		</ul>
	</nav>
	<slot></slot>
</main>
