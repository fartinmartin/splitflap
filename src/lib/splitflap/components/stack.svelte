<script lang="ts">
	let className: string | undefined | null = undefined;
	export { className as class };
	export let style = "";
</script>

<div class="stack {className ?? ''}" {style}>
	<slot />
</div>

<style>
	.stack {
		display: grid;
		place-items: center;
	}

	:global(.stack > *) {
		grid-area: 1/1;
	}
</style>
