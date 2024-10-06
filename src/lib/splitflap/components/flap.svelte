<script lang="ts">
	import { onMount } from "svelte";

	import type { AnimationEventHandler } from "svelte/elements";
	import { DELAY, DURATION, prev, type Char } from "../splitflap";

	export let char: Char;
	export let delay = DELAY;
	export let duration = DURATION;
	export let flip = false;
	export let type: "bot" | "top" = "top";
	export let style = "";

	let show = true;
	const end: AnimationEventHandler<HTMLDivElement> = () => (show = false);

	onMount(() => {
		// console.log(`[mount] ${type} flap ${char}`);
		() => console.log(`[unmount] ${type} flap ${char}`);
	});
</script>

{#if show}
	<div
		class="splitflap {type}"
		class:flip
		{style}
		style:--duration={Math.round(duration) + "ms"}
		style:--delay={Math.round(delay) + "ms"}
		data-char={char}
		aria-hidden="true"
	>
		{#if type === "top"}
			<div class="flap from top" on:animationend={end}>
				<span>{flip ? prev(char) : char.toUpperCase()}</span>
			</div>
		{:else if type === "bot"}
			<div class="flap to bottom" on:animationend={end}>
				<span>{char.toUpperCase()}</span>
			</div>
			<div class="flap bottom shadow" on:animationend={end}></div>
		{/if}
	</div>
{/if}

<style>
	div {
		perspective: 500px;
	}

	.splitflap {
		--size: 100px;
		--height: calc(var(--size) * 1.5);
		--gap: -1.25px;
		--color: hsl(16, 15%, 17%);

		position: relative;

		width: var(--size);
		height: var(--height);

		line-height: var(--height);
		font-size: var(--size);
		font-family: "menlo", monospace;
		text-align: center;

		color: white;
	}

	.splitflap.top {
		z-index: 10;
	}

	.flap {
		position: absolute;
		height: 50%;
		width: 100%;
		overflow: hidden;
		background: var(--color);
	}

	.top {
		top: var(--gap);
		border-radius: 4px 4px 2px 2px;
	}

	.bottom {
		bottom: var(--gap);
		border-radius: 2px 2px 4px 4px;
	}

	span {
		display: inline-block;
	}

	.top span {
		transform: translateY(calc(0% - var(--gap)));
	}

	.bottom span {
		transform: translateY(calc(-50% + var(--gap)));
	}

	/*  */

	.from.top {
		transform-origin: bottom;
	}

	.to.bottom {
		transform-origin: top;
	}

	.shadow {
		z-index: -1;
		--color: hsla(20, 5%, 12%, 1);
		/* background: linear-gradient(0deg, transparent 0%, var(--color) 50%); */
		background: radial-gradient(
			circle at top,
			var(--color) 0%,
			transparent 80%
		);
	}

	/*  */

	.flip .from.top {
		animation: from-top ease-in var(--duration);
		animation-delay: var(--delay);
	}

	.flip .shadow {
		animation: shadow linear var(--duration);
		animation-delay: var(--delay);
	}

	.flip .to.bottom {
		animation: to-bottom linear var(--duration);
		animation-delay: var(--delay);
	}

	@keyframes from-top {
		0% {
			transform: rotateX(0deg);
			background-color: var(--color);
		}
		50% {
			transform: rotateX(-90deg);
			background-color: black;
		}
		100% {
			transform: rotateX(-90deg);
		}
	}

	@keyframes to-bottom {
		0% {
			transform: rotateX(90deg);
		}
		50% {
			transform: rotateX(90deg);
		}
		65% {
			transform: rotateX(0deg);
			background-color: var(--color);
		}
		100% {
			transform: rotateX(0deg);
			background-color: var(--color);
		}
	}

	@keyframes shadow {
		0% {
			opacity: 0;
		}
		40% {
			opacity: 0;
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}
</style>
