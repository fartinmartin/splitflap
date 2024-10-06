import { get, writable } from "svelte/store";

export const previous = writable<string[]>([]);

export function set(message: string) {
	const state = get(previous);
	if (state.length === 0 || state[state.length - 1] !== message) {
		previous.set([...state, message]);
	}
}

export function latest(message: string) {
	const state = get(previous);
	for (let i = state.length - 1; i >= 0; i--) {
		if (state[i] !== message) return state[i];
	}
	return "";
}
