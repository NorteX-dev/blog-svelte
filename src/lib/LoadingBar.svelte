<script lang="ts">
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { onDestroy } from "svelte";

	export let period = 150; /*ms*/
	let className = "";
	export { className as class };
	export let size = 2;

	let width = 0;
	let visible = false;
	let interval: ReturnType<typeof setInterval>;

	beforeNavigate(() => {
		visible = true;
		width = 0;
		clearInterval(interval);
		interval = setInterval(() => {
			width = Math.min(90, width + 10);
		}, period);
	});

	afterNavigate(() => {
		clearInterval(interval);
		width = 100;
		setTimeout(() => {
			visible = false;
			width = 0;
		}, 300);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div
	class="fixed left-0 top-0 rounded-b-xl bg-blue-500 transition-all duration-300 ease-in-out {className}"
	style="width: {width}%; height: {visible ? `${size}px` : '0'}; opacity: {visible ? '1' : '0'}"
></div>
