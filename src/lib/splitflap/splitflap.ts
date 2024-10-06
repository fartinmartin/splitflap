export const DELAY = 0;
export const DURATION = 500;

export type Char = (typeof chars)[number];
// prettier-ignore
export const chars = [
  ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
  '3', '4', '5', '6', '7', '8', '9', '.', ',', "'",
] as const;

export const get = (c: Char, i: number) => {
	const index = chars.indexOf(c);
	return chars[(index + i + chars.length) % chars.length];
};

export const next = (c: Char) => get(c, 1);
export const prev = (c: Char) => get(c, -1);

type CylceOptions = {
	to: Char;
	from?: Char;
	delay?: number;
	onTick?: (from: Char, to: Char, index: number) => void;
	onDone?: () => void;
};

export const cycleTo = ({
	from = " ",
	to,
	delay = 500,
	onTick = () => {},
	onDone = () => {},
}: CylceOptions) => {
	const fromIndex = chars.indexOf(from);
	const toIndex = chars.indexOf(to);
	if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

	let currentIndex = fromIndex;
	const interval = setInterval(() => {
		currentIndex = (currentIndex + 1) % chars.length;
		const currentChar = chars[currentIndex];
		onTick(prev(currentChar), chars[currentIndex], currentIndex);

		if (chars[currentIndex] === to) {
			onDone();
			clearInterval(interval);
		}
	}, delay);

	return interval;
};

export const cycleChars = ({
	from = " ",
	to,
}: Omit<CylceOptions, "delay" | "onTick">) => {
	const fromIndex = chars.indexOf(from);
	const toIndex = chars.indexOf(to);
	if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return [];

	const result: Char[] = [];
	let currentIndex = fromIndex;

	do {
		result.push(chars[currentIndex] as Char);
		currentIndex = (currentIndex + 1) % chars.length;
	} while (currentIndex !== toIndex + 1);

	return result;
};

export const ms = (min = 0, max = 100) => {
	return Math.random() * (max - min) + min;
};
