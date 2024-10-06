<script lang="ts">
	import { beforeUpdate } from "svelte";
	import { latest, set } from "../store";
	import Character from "./character.svelte";

	export let message: string;
	beforeUpdate(() => set(message));

	const ts_ignore = (x: any) => x;
</script>

<div class="display">
	{#key message}
		{#each message as char, index}
			<Character
				from={ts_ignore(latest(message)?.[index]) ?? " "}
				to={ts_ignore(char).toUpperCase()}
			/>
		{/each}
	{/key}
</div>

<style>
	.display {
		display: flex;
		gap: 0.25rem;
		background: hsl(16, 15%, 8%);
		padding: 0.5rem;
		border: 1px solid hsl(16, 15%, 21%);
		border-radius: 8px;
	}
</style>
