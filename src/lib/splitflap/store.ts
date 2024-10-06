import { get, writable } from "svelte/store";

export const history = {
	set,
	latest,
};

const store = writable<string[]>([]);

function set(message: string) {
	const state = get(store);
	if (state.length === 0 || state[state.length - 1] !== message) {
		store.set([...state, message]);
	}
}

function latest(message: string) {
	const state = get(store);
	for (let i = state.length - 1; i >= 0; i--) {
		if (state[i] !== message) return state[i];
	}
	return "";
}
