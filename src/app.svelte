<script lang="ts">
	import { Splitflap } from "./lib/splitflap";

	const messages = ["hello", "jenny"].map((msg) => msg.toUpperCase());
	let message = messages[0];

	// setInterval(() => {
	// 	const currentIndex = message.indexOf(message);
	// 	const nextMessage = messages[currentIndex + 1];
	// 	if (nextMessage) message = nextMessage;
	// 	else message = messages[0];
	// }, 4 * 1000);

	const ts_ignore = (x: any) => x;
</script>

<main>
	<div class="display">
		{#each message as char}
			<Splitflap.Character to={ts_ignore(char)} />
		{/each}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		min-height: 100dvh;

		background: #1d1d1d;
		color: #fff4ef;

		font-family: "IBM Plex Mono", monospace;
		font-weight: 600;
		font-style: normal;
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

	.display {
		display: flex;
		gap: 0.25rem;
		background: hsl(16, 15%, 8%);
		padding: 0.5rem;
		border: 1px solid hsl(16, 15%, 21%);
		border-radius: 8px;
	}
</style>
