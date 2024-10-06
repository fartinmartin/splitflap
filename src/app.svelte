<script lang="ts">
	import type { FocusEventHandler } from "svelte/elements";
	import Performance from "./lib/performance.svelte";
	import { Splitflap } from "./lib/splitflap";

	let messages = ["hello", "jenny"].map((msg) => msg.toUpperCase());
	$: message = messages[0];

	setInterval(() => {
		const currentIndex = message.indexOf(message);
		const nextMessage = messages[currentIndex + 1];
		if (nextMessage) message = nextMessage;
		else message = messages[0];
	}, 5 * 1000);

	const setMessage: FocusEventHandler<HTMLInputElement> = ({ currentTarget }) =>
		(messages = [currentTarget?.value.toUpperCase(), ...messages]);
</script>

<main>
	<div class="hero">
		<Splitflap.Root {message} />
		<input type="text" on:blur={setMessage} />
	</div>
</main>

<Performance />

<style>
	:global(body) {
		margin: 0;
		min-height: 100dvh;

		background: #1d1d1d;
		color: #fff4ef;

		font-family: "IBM Plex Mono", monospace;
		font-weight: 600;
		font-style: normal;

		overflow: hidden;
	}

	:global(#app) {
		display: contents;
	}

	main {
		display: grid;
		place-items: center;
		gap: 1rem;
		min-height: 100dvh;
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: hidden;
	}

	input {
		text-transform: uppercase;
		text-align: center;

		font-family: inherit;
		font-weight: 500;
		font-size: 1rem;

		background: hsl(16, 15%, 8%);
		color: inherit;

		border: 1px solid hsl(16, 15%, 21%);
		border-radius: 4px;
		max-width: 40ch;
		margin: 0 auto;
	}

	input:focus {
		outline: none;
		background: hsl(16, 15%, 16%);
	}
</style>
