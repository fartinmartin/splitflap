<script>
	import { onMount } from "svelte";
	let domElementCount = 0;

	const updateDomElementCount = () => {
		domElementCount = document.getElementsByTagName("*").length;
	};

	onMount(() => {
		updateDomElementCount();
		const observer = new MutationObserver(updateDomElementCount);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	});
</script>

<pre>elements: {domElementCount}</pre>

<style>
	pre {
		position: absolute;
		top: 0;
		left: 0;
		padding: 1rem;
		font-weight: 400;
		margin: 0;
	}
</style>
