<script lang="ts">
	import { onDestroy } from "svelte";
	import { cycleChars, cycleTo, DURATION, ms, type Char } from "../splitflap";

	import Stack from "./stack.svelte";
	import Flap from "./flap.svelte";

	export let to: Char;

	let flaps = cycleChars({ to });
	let toShow: { char: Char; index: number }[] = [];

	const interval = cycleTo({
		to,
		delay: DURATION / 2 + ms(-50, 50),
		onTick: (from, to, index) => (toShow = [...toShow, { char: to, index }]),
	});

	onDestroy(() => clearInterval(interval));
</script>

<Stack>
	<Stack style="z-index: 1;">
		{#each toShow as { char, index }}
			<Flap type="top" {char} flip style="z-index: {flaps.length - index}" />
			<Flap type="bot" {char} flip style="z-index: {index}" />
		{/each}
	</Stack>
	<Flap style="z-index: 0;" char={!toShow.length ? " " : to} type="top" />
	<Flap style="z-index: 0;" char={toShow.length < 2 ? " " : to} type="bot" />
</Stack>
