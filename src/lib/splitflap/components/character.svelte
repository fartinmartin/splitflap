<script lang="ts">
	import { onDestroy } from "svelte";
	import { cycleChars, cycleTo, DURATION, ms, type Char } from "../splitflap";

	import Stack from "./stack.svelte";
	import Flap from "./flap.svelte";

	export let to: Char;

	let chars = cycleChars({ to });
	let toFlip: { char: Char; index: number }[] = [];
	let showFlipStack = true;

	const interval = cycleTo({
		to,
		delay: DURATION / 2 + ms(-50, 50),
		onTick: (from, to, index) => (toFlip = [...toFlip, { char: to, index }]),
		onDone: () => (showFlipStack = false),
	});

	onDestroy(() => clearInterval(interval));
</script>

<Stack ariaLabel={to}>
	{#if toFlip.length && showFlipStack}
		<Stack style="z-index: 1;">
			{#each toFlip as { char, index }}
				<Flap type="top" {char} flip style="z-index: {chars.length - index}" />
				<Flap type="bot" {char} flip style="z-index: {index}" />
			{/each}
		</Stack>
	{/if}
	<Flap style="z-index: 0;" char={!toFlip.length ? " " : to} type="top" />
	<Flap style="z-index: 0;" char={toFlip.length < 1 ? " " : to} type="bot" />
</Stack>
