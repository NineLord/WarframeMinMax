type WithoutOrderInAllSlotsIndex = number;
type WithoutOrderInAllSlotsChoices<V> = Array<V>;

export class Permutations {

	static* withoutOrderInAllSlots<V>(slots: number, variations: Set<V>): Generator<WithoutOrderInAllSlotsChoices<V>, undefined, undefined> {
		const variationsArray = Array.from(variations);

		const stack: Array<[WithoutOrderInAllSlotsIndex, WithoutOrderInAllSlotsChoices<V>]> = [
			[variationsArray.length - 1, []],
		];

		while (stack.length > 0) {
			const [index, chosen] = stack.pop()!;
			if (chosen.length === slots) {
				yield chosen;
				continue;
			}

			for (let currentIndex = index; 0 <= currentIndex; --currentIndex) {
				stack.push([
					currentIndex,
					[variationsArray[currentIndex], ...chosen]
				]);
			}
		}
	}
}
